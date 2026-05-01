import { mkdir, copyFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";

const root = path.resolve(".");
const exportDir = path.join(root, "content-export");
const organizedDir = path.join(root, "organized-content");

const content = JSON.parse(await import("node:fs/promises").then((fs) => fs.readFile(path.join(exportDir, "content.json"), "utf8")));
const imageManifest = JSON.parse(await import("node:fs/promises").then((fs) => fs.readFile(path.join(exportDir, "images.json"), "utf8")));

const imageByUrl = new Map(
  imageManifest
    .filter((image) => image.file)
    .map((image) => [image.originalUrl, image])
);

const navigationText = new Set([
  "Accueil",
  "COMPAÑEROS & SERVICES",
  "JBK & SERVICES",
  "À propos",
  "Témoignages",
  "Contact",
  "PARTENAIRES",
  "All",
]);

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function fileSafe(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w-]+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase() || "page";
}

function cleanedParagraphs(page) {
  return unique(page.paragraphs || [])
    .filter((text) => !navigationText.has(text))
    .filter((text) => !text.includes("Propulsé par SITE123"))
    .filter((text) => !text.includes("CE SITE A ÉTÉ CONSTRUIT"))
    .filter((text) => text.length > 1);
}

function cleanedLinks(page) {
  const seen = new Set();
  return (page.links || [])
    .filter((link) => link.text && link.href)
    .filter((link) => !navigationText.has(link.text))
    .filter((link) => !link.href.includes("site123.com"))
    .filter((link) => {
      const key = `${link.text}|${link.href}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function pageImages(page) {
  const seen = new Set();
  const images = [];

  for (const url of page.images || []) {
    const image = imageByUrl.get(url);
    if (!image || seen.has(image.file)) continue;
    seen.add(image.file);
    images.push(image);
  }

  return images;
}

function markdownForPage(page, images) {
  const title = page.title || page.slug;
  const paragraphs = cleanedParagraphs(page);
  const links = cleanedLinks(page);

  let md = `# ${title}\n\n`;
  md += `Source: ${page.url}\n\n`;
  if (page.description) md += `Description: ${page.description}\n\n`;

  if (page.headings?.length) {
    md += `## Structure de contenu\n\n`;
    for (const heading of page.headings) {
      const level = Math.min(Math.max(heading.level + 1, 2), 6);
      md += `${"#".repeat(level)} ${heading.text}\n\n`;
    }
  }

  if (paragraphs.length) {
    md += `## Textes utiles\n\n`;
    for (const paragraph of paragraphs) md += `- ${paragraph}\n`;
    md += "\n";
  }

  if (images.length) {
    md += `## Images liées\n\n`;
    for (const image of images) {
      const name = path.basename(image.file);
      md += `![${image.alt || name}](./images/${name})\n\n`;
      md += `Fichier: ./images/${name}\n\n`;
    }
  }

  if (links.length) {
    md += `## Liens et appels à l'action\n\n`;
    for (const link of links) md += `- ${link.text}: ${link.href}\n`;
    md += "\n";
  }

  return md;
}

await rm(organizedDir, { recursive: true, force: true });
await mkdir(organizedDir, { recursive: true });

const summary = {
  source: content.source,
  generatedAt: new Date().toISOString(),
  pages: [],
};

let globalMarkdown = `# Contenu organisé pour refonte moderne\n\nSource: ${content.source}\n\n`;

for (const [index, page] of content.pages.entries()) {
  const folderName = `${String(index + 1).padStart(2, "0")}-${fileSafe(page.slug || page.title)}`;
  const pageDir = path.join(organizedDir, folderName);
  const pageImagesDir = path.join(pageDir, "images");
  const images = pageImages(page);

  await mkdir(pageImagesDir, { recursive: true });

  const copiedImages = [];
  for (const image of images) {
    const source = path.join(exportDir, image.file);
    const target = path.join(pageImagesDir, path.basename(image.file));
    await copyFile(source, target);
    copiedImages.push({
      file: `images/${path.basename(image.file)}`,
      originalUrl: image.originalUrl,
      alt: image.alt || "",
    });
  }

  const pageJson = {
    url: page.url,
    slug: page.slug,
    title: page.title,
    description: page.description,
    headings: page.headings || [],
    paragraphs: cleanedParagraphs(page),
    links: cleanedLinks(page),
    images: copiedImages,
  };

  await writeFile(path.join(pageDir, "content.json"), JSON.stringify(pageJson, null, 2), "utf8");
  await writeFile(path.join(pageDir, "content.md"), markdownForPage(page, copiedImages), "utf8");

  summary.pages.push({
    folder: folderName,
    title: page.title,
    slug: page.slug,
    url: page.url,
    textBlocks: pageJson.paragraphs.length,
    images: copiedImages.length,
  });

  globalMarkdown += `## ${index + 1}. ${page.title || page.slug}\n\n`;
  globalMarkdown += `Dossier: ./${folderName}\n\n`;
  globalMarkdown += `Source: ${page.url}\n\n`;
  globalMarkdown += `Images liées: ${copiedImages.length}\n\n`;
}

await writeFile(path.join(organizedDir, "index.json"), JSON.stringify(summary, null, 2), "utf8");
await writeFile(path.join(organizedDir, "README.md"), globalMarkdown, "utf8");

console.log(`Organized ${summary.pages.length} pages in ${organizedDir}`);
console.log(`Linked images: ${summary.pages.reduce((total, page) => total + page.images, 0)}`);
