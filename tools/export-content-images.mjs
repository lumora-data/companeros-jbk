import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const startUrl = "https://686343fd3dffb.site123.me/";
const outDir = path.resolve("content-export");
const imagesDir = path.join(outDir, "images");
const siteOrigin = new URL(startUrl).origin;

const pageQueue = [
  startUrl,
  `${siteOrigin}/compa%C3%91eros-services`,
  `${siteOrigin}/jbk-services`,
  `${siteOrigin}/%C3%80-propos`,
  `${siteOrigin}/t%C3%A9moignages`,
  `${siteOrigin}/contact`,
  `${siteOrigin}/partenaires-1`,
  `${siteOrigin}/services-compa%C3%91eros/service-de-traduction-interpretation`,
  `${siteOrigin}/services-compa%C3%91eros/preparation-concours`,
  `${siteOrigin}/services-compa%C3%91eros/cours-de-langues-nationales-internationales`,
  `${siteOrigin}/services-compa%C3%91eros/suivis-de-voyages`,
  `${siteOrigin}/services-compa%C3%91eros/cours-de-soutien`,
];
const visitedPages = new Set();
const pageData = [];
const imageUrls = new Set();
const maxPages = pageQueue.length;

function decodeEntities(text) {
  return text
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function cleanText(text) {
  return decodeEntities(text)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function stripTags(html) {
  return cleanText(html.replace(/<[^>]+>/g, " "));
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}=["']([^"']*)["']`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function absolutize(raw, base) {
  if (!raw) return null;
  const clean = decodeEntities(raw)
    .replace(/\\\//g, "/")
    .replace(/^url\(/, "")
    .replace(/\)$/, "")
    .replace(/^["']|["']$/g, "")
    .trim();

  if (
    !clean ||
    clean.startsWith("#") ||
    clean.startsWith("mailto:") ||
    clean.startsWith("tel:") ||
    clean.startsWith("javascript:") ||
    clean.startsWith("data:")
  ) {
    return null;
  }

  try {
    return new URL(clean, base).toString();
  } catch {
    return null;
  }
}

function slugFromUrl(url) {
  const parsed = new URL(url);
  const slug = decodeURIComponent(parsed.pathname)
    .replace(/^\/|\/$/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
  return slug || "accueil";
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function extractUrls(html, base) {
  const pages = [];
  const images = [];

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)) {
    const url = absolutize(match[1], base);
    if (url && new URL(url).origin === siteOrigin) pages.push(url.split("#")[0]);
  }

  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src = absolutize(attr(tag, "src") || attr(tag, "data-src"), base);
    if (src) images.push({ url: src, alt: cleanText(attr(tag, "alt")) });

    const srcset = attr(tag, "srcset");
    if (srcset) {
      for (const part of srcset.split(",")) {
        const candidate = absolutize(part.trim().split(/\s+/)[0], base);
        if (candidate) images.push({ url: candidate, alt: cleanText(attr(tag, "alt")) });
      }
    }
  }

  for (const match of html.matchAll(/\bdata-bg=["']([^"']+)["']/gi)) {
    const url = absolutize(match[1], base);
    if (url) images.push({ url, alt: "" });
  }

  for (const match of html.matchAll(/https?:\\?\/\\?\/[^"'`\s<>\\)]+\.(?:avif|gif|jpe?g|png|svg|webp)(?:\?[^"'`\s<>\\)]*)?/gi)) {
    const url = absolutize(match[0], base);
    if (url) images.push({ url, alt: "" });
  }

  return { pages: unique(pages), images };
}

function isContentImage(url) {
  const parsed = new URL(url);
  if (!/\.(avif|gif|jpe?g|png|webp)(?:$|\?)/i.test(url)) return false;
  if (!["files.cdn-files-a.com", "images.cdn-files-a.com"].includes(parsed.hostname)) return false;
  return parsed.pathname.includes("/uploads/10951229/") || parsed.pathname.includes("/ready_uploads/media/");
}

function extractContent(html, url) {
  const withoutNoise = html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript\b[\s\S]*?<\/noscript>/gi, " ");

  const title = cleanText((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
  const description = cleanText((html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || [])[1] || "");

  const headings = [];
  for (const match of withoutNoise.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)) {
    const text = stripTags(match[2]);
    if (text) headings.push({ level: Number(match[1]), text });
  }

  const paragraphs = [];
  for (const match of withoutNoise.matchAll(/<(p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)) {
    const text = stripTags(match[2]);
    if (text && text.length > 1) paragraphs.push(text);
  }

  const buttonsAndLinks = [];
  for (const match of withoutNoise.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)) {
    const text = stripTags(match[2]);
    const href = absolutize(match[1], url);
    if (text && href) buttonsAndLinks.push({ text, href });
  }

  const visibleText = stripTags(withoutNoise)
    .split(/(?<=[.!?])\s+|\n+/)
    .map(cleanText)
    .filter((text) => text.length > 1);

  return {
    url,
    slug: slugFromUrl(url),
    title,
    description,
    headings,
    paragraphs: unique(paragraphs),
    links: buttonsAndLinks,
    visibleText: unique(visibleText).slice(0, 250),
  };
}

async function fetchText(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; content export)",
      "accept": "text/html,application/xhtml+xml",
    },
  });
  clearTimeout(timeout);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.text();
}

async function downloadImage(url, index) {
  const parsed = new URL(url);
  const ext = path.extname(parsed.pathname).split(".")[1] || "jpg";
  const hash = crypto.createHash("sha1").update(url).digest("hex").slice(0, 8);
  const baseName = path.basename(parsed.pathname, path.extname(parsed.pathname))
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "image";
  const fileName = `${String(index).padStart(2, "0")}-${baseName}-${hash}.${ext}`;
  const target = path.join(imagesDir, fileName);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      "user-agent": "Mozilla/5.0 (compatible; content export)",
      "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*",
    },
  });
  clearTimeout(timeout);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  await writeFile(target, Buffer.from(await response.arrayBuffer()));
  return target;
}

await mkdir(outDir, { recursive: true });
await mkdir(imagesDir, { recursive: true });

for (let index = 0; index < pageQueue.length && index < maxPages; index += 1) {
  const url = pageQueue[index];
  if (visitedPages.has(url)) continue;
  visitedPages.add(url);

  try {
    const html = await fetchText(url);
    const { images } = extractUrls(html, url);
    const content = extractContent(html, url);
    pageData.push({ ...content, images: images.map((image) => image.url) });

    for (const image of images) {
      const parsed = new URL(image.url);
      if (isContentImage(image.url)) {
        imageUrls.add(JSON.stringify(image));
      }
    }
  } catch (error) {
    pageData.push({
      url,
      slug: slugFromUrl(url),
      error: error.message,
      title: "",
      description: "",
      headings: [],
      paragraphs: [],
      links: [],
      visibleText: [],
      images: [],
    });
  }
}

const preDownloadData = {
  source: startUrl,
  exportedAt: new Date().toISOString(),
  pages: pageData,
  imageUrls: [...imageUrls].map((encoded) => JSON.parse(encoded)),
};
await writeFile(path.join(outDir, "content.json"), JSON.stringify(preDownloadData, null, 2), "utf8");

const imageManifest = [];
let imageIndex = 1;
for (const encoded of imageUrls) {
  const image = JSON.parse(encoded);
  try {
    const target = await downloadImage(image.url, imageIndex);
    imageManifest.push({
      originalUrl: image.url,
      alt: image.alt,
      file: path.relative(outDir, target),
    });
    imageIndex += 1;
  } catch (error) {
    imageManifest.push({
      originalUrl: image.url,
      alt: image.alt,
      error: error.message,
    });
  }
}

const exportData = {
  source: startUrl,
  exportedAt: new Date().toISOString(),
  pages: pageData,
  images: imageManifest,
};

await writeFile(path.join(outDir, "content.json"), JSON.stringify(exportData, null, 2), "utf8");

let markdown = `# Export contenu - COMPANEROS / JBK EMPIRE\n\nSource: ${startUrl}\n\n`;
for (const page of pageData) {
  markdown += `## ${page.title || page.slug}\n\nURL: ${page.url}\n\n`;
  if (page.description) markdown += `Description: ${page.description}\n\n`;
  if (page.headings.length) {
    markdown += `### Titres\n\n`;
    for (const heading of page.headings) markdown += `${"#".repeat(Math.min(heading.level + 3, 6))} ${heading.text}\n\n`;
  }
  if (page.paragraphs.length) {
    markdown += `### Textes\n\n`;
    for (const paragraph of page.paragraphs) markdown += `- ${paragraph}\n`;
    markdown += "\n";
  }
}
await writeFile(path.join(outDir, "content.md"), markdown, "utf8");
await writeFile(path.join(outDir, "images.json"), JSON.stringify(imageManifest, null, 2), "utf8");

console.log(`Pages exported: ${pageData.length}`);
console.log(`Images downloaded: ${imageManifest.filter((image) => image.file).length}`);
console.log(`Output: ${outDir}`);
