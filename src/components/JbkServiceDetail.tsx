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
  cta: {
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
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function JbkServiceDetail({ contentKey }: JbkServiceDetailProps) {
  const content = SITE_CONTENT.pages[contentKey] as JbkServiceContent;
  const whatsappBaseUrl = SITE_CONTENT.links.whatsappBaseUrl;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const whatsappUrl = `${whatsappBaseUrl}/${whatsappNumber}?text=${encodeURIComponent(content.cta.whatsappMessage)}`;

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
                    <div className="space-y-4">
                      {paragraphs.map((paragraph, paragraphIndex) => {
                        const lines = paragraphLines(paragraph);
                        if (lines.length === 0) {
                          return null;
                        }

                        if (lines.length >= 2 && lines.every(isCompactUppercaseItem)) {
                          return (
                            <ul
                              key={`paragraph-${paragraphIndex}`}
                              className="list-disc space-y-2 pl-5 text-text-main"
                            >
                              {lines.map((item) => (
                                <li key={item}>{item}</li>
                              ))}
                            </ul>
                          );
                        }

                        const singleLine = lines.length === 1 ? lines[0] : null;
                        if (singleLine) {
                          const headingAndBody = splitHeadingAndBody(singleLine);
                          if (headingAndBody) {
                            return (
                              <div key={`paragraph-${paragraphIndex}`} className="space-y-2">
                                <h3 className="text-lg font-black uppercase tracking-wide text-gold md:text-xl">
                                  {headingAndBody.heading}
                                </h3>
                                {headingAndBody.body ? <p>{headingAndBody.body}</p> : null}
                              </div>
                            );
                          }

                          if (looksUppercaseLabel(singleLine) && singleLine.length <= 68) {
                            return (
                              <h3
                                key={`paragraph-${paragraphIndex}`}
                                className="text-lg font-black uppercase tracking-wide text-gold md:text-xl"
                              >
                                {singleLine}
                              </h3>
                            );
                          }
                        }

                        return (
                          <div key={`paragraph-${paragraphIndex}`} className="space-y-3">
                            {lines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        );
                      })}
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

          <div className="mt-12 text-center">
            <a
              href={whatsappUrl}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gold px-8 py-4 text-sm font-black uppercase tracking-wider text-noir-deep transition-all hover:brightness-110 md:px-10 md:py-5 md:text-base"
            >
              {content.cta.buttonLabel}
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
