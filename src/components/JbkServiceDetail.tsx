"use client";

import { ExternalLink, MessageCircle } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";
import ResponsiveVideoFrame from "@/src/components/ResponsiveVideoFrame";

type ImageItem = {
  src: string;
  alt: string;
};

type TextSection = {
  type: "text";
  text: string;
};

type ImageSection = {
  type: "image";
  src: string;
  alt: string;
};

type ImageGridSection = {
  type: "imageGrid";
  images: ImageItem[];
};

type VideoSection = {
  type: "video";
  url: string;
  embedUrl: string;
  title?: string;
};

type ServiceSection = TextSection | ImageSection | ImageGridSection | VideoSection;

type JbkServiceContent = {
  title: string;
  sections: ServiceSection[];
  cta?: {
    buttonLabel: string;
    whatsappMessage: string;
  };
};

export type JbkServiceContentKey =
  | "jbkSiteWeb"
  | "jbkGraphisme"
  | "jbkVoixOff"
  | "jbkDrone"
  | "jbkPublicite"
  | "jbkCommunication"
  | "jbkFormation";

interface JbkServiceDetailProps {
  contentKey: JbkServiceContentKey;
}

function toParagraphs(text: string): string[] {
  return text
    .replace(/\r/g, "")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function looksUppercaseLabel(value: string): boolean {
  return /^[A-ZÀ-ÖØ-Þ0-9\s'’&()\-!]+$/u.test(value);
}

function isCompactUppercaseItem(value: string): boolean {
  return looksUppercaseLabel(value) && !value.includes(":") && value.length <= 44;
}

function splitHeadingAndBody(value: string): { heading: string; body: string | null } | null {
  const separatorIndex = value.indexOf(":");
  if (separatorIndex <= 0) {
    return null;
  }

  const heading = value.slice(0, separatorIndex + 1).trim();
  const body = value.slice(separatorIndex + 1).trim();
  if (!looksUppercaseLabel(heading.replace(":", "").trim())) {
    return null;
  }

  return {
    heading,
    body: body.length > 0 ? body : null,
  };
}

function paragraphLines(paragraph: string): string[] {
  return paragraph
    .split("\n")
    .map((line) => line.replace(/[^\S\r\n]+/g, " ").trim())
    .filter(Boolean);
}

function renderTextWithLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s]+)/g);
  return parts.map((part, idx) =>
    /^https?:\/\//.test(part) ? (
      <a
        key={`${part}-${idx}`}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all text-gold underline underline-offset-2"
      >
        {part}
      </a>
    ) : (
      <span key={`${part}-${idx}`}>{part}</span>
    ),
  );
}

function stripListMarker(value: string): string {
  return value.replace(/^[-*]\s+/, "").trim();
}

function isCompactListLine(value: string): boolean {
  const normalized = stripListMarker(value);
  if (normalized.length === 0 || normalized.includes(":") || normalized.length > 44) {
    return false;
  }

  if (/https?:\/\//i.test(normalized)) {
    return false;
  }

  return /^[\p{L}\p{N}\s'’&()\-./]+$/u.test(normalized);
}

export default function JbkServiceDetail({ contentKey }: JbkServiceDetailProps) {
  const content = SITE_CONTENT.pages[contentKey] as JbkServiceContent;
  const whatsappBaseUrl = SITE_CONTENT.links.whatsappBaseUrl;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const whatsappUrl = content.cta
    ? `${whatsappBaseUrl}/${whatsappNumber}?text=${encodeURIComponent(content.cta.whatsappMessage)}`
    : null;

  return (
    <div className="bg-noir-deep pb-24 pt-32 md:pt-40">
      <section className="px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/5 bg-noir-card p-8 md:rounded-[3rem] md:p-14">
          <h1 className="text-center text-3xl font-display font-black tracking-tighter text-gold md:text-6xl">
            {content.title}
          </h1>

          <div className="mt-10 space-y-10">
            {content.sections.map((section, index) => {
              if (section.type === "text") {
                const paragraphs = toParagraphs(section.text);

                return (
                  <div
                    key={`text-${index}`}
                    className="rounded-2xl border border-white/10 bg-noir-deep/40 p-5 text-base leading-relaxed text-text-para md:rounded-3xl md:p-8 md:text-lg"
                  >
                    <div className="space-y-3">
                      {(() => {
                        const blocks: JSX.Element[] = [];

                        for (let paragraphIndex = 0; paragraphIndex < paragraphs.length; paragraphIndex += 1) {
                          const lines = paragraphLines(paragraphs[paragraphIndex]);
                          if (lines.length === 0) {
                            continue;
                          }

                          if (lines.length === 1 && isCompactListLine(lines[0])) {
                            const items = [stripListMarker(lines[0])];
                            let cursor = paragraphIndex + 1;

                            while (cursor < paragraphs.length) {
                              const nextLines = paragraphLines(paragraphs[cursor]);
                              if (nextLines.length !== 1 || !isCompactListLine(nextLines[0])) {
                                break;
                              }
                              items.push(stripListMarker(nextLines[0]));
                              cursor += 1;
                            }

                            if (items.length >= 3) {
                              blocks.push(
                                <ul
                                  key={`paragraph-list-${paragraphIndex}`}
                                  className="list-disc space-y-2 pl-5 text-text-main"
                                >
                                  {items.map((item, itemIndex) => (
                                    <li key={`${item}-${itemIndex}`}>{renderTextWithLinks(item)}</li>
                                  ))}
                                </ul>,
                              );
                              paragraphIndex = cursor - 1;
                              continue;
                            }
                          }

                          if (lines.length >= 2 && lines.every((line) => isCompactUppercaseItem(stripListMarker(line)))) {
                            blocks.push(
                              <ul
                                key={`paragraph-${paragraphIndex}`}
                                className="list-disc space-y-2 pl-5 text-text-main"
                              >
                                {lines.map((item, itemIndex) => (
                                  <li key={`${item}-${itemIndex}`}>{renderTextWithLinks(stripListMarker(item))}</li>
                                ))}
                              </ul>,
                            );
                            continue;
                          }

                          const singleLine = lines.length === 1 ? lines[0] : null;
                          if (singleLine) {
                            const headingAndBody = splitHeadingAndBody(singleLine);
                            if (headingAndBody) {
                              blocks.push(
                                <div key={`paragraph-${paragraphIndex}`} className="space-y-2">
                                  <h3 className="text-lg font-black uppercase tracking-wide text-gold md:text-xl">
                                    {headingAndBody.heading}
                                  </h3>
                                  {headingAndBody.body ? <p>{renderTextWithLinks(headingAndBody.body)}</p> : null}
                                </div>,
                              );
                              continue;
                            }
                          }

                          blocks.push(
                            <div key={`paragraph-${paragraphIndex}`} className="space-y-2.5">
                              {lines.map((line, lineIndex) => (
                                <p key={`${line}-${lineIndex}`}>{renderTextWithLinks(line)}</p>
                              ))}
                            </div>,
                          );
                        }

                        return blocks;
                      })()}
                    </div>
                  </div>
                );
              }

              if (section.type === "image") {
                return (
                  <div key={`image-${index}`} className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
                    <img src={section.src} alt={section.alt} className="h-auto w-full object-cover" />
                  </div>
                );
              }

              if (section.type === "imageGrid") {
                return (
                  <div key={`image-grid-${index}`} className="space-y-6">
                    {section.images.map((image) => (
                      <div key={image.src} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:rounded-3xl">
                        <img src={image.src} alt={image.alt} className="h-auto w-full object-cover" />
                      </div>
                    ))}
                  </div>
                );
              }

              return (
                <div key={`video-${index}`} className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
                    <ResponsiveVideoFrame
                      src={section.embedUrl}
                      title={section.title || `Video ${index + 1}`}
                    />
                  </div>
                  <a
                    href={section.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-gold underline underline-offset-4 md:text-base"
                  >
                    {section.url}
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>

          {content.cta && whatsappUrl ? (
            <div className="mt-12 text-center">
              <a
                href={whatsappUrl}
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-noir-deep transition-all hover:brightness-110 md:px-10 md:py-5 md:text-base"
              >
                {content.cta.buttonLabel}
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
