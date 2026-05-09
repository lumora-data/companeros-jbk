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

function formatLines(text: string): string[] {
  return text
    .replace(/\r/g, "")
    .replace(/\n{2,}/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function isShortLine(line: string): boolean {
  return line.length <= 56;
}

function renderLineList(lines: string[]) {
  return (
    <ul className="mt-4 space-y-2 pl-5 text-base text-text-main md:text-lg list-disc">
      {lines.map((line) => (
        <li key={line} className="leading-relaxed">{line}</li>
      ))}
    </ul>
  );
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
                const lines = formatLines(section.text);
                const firstLine = lines[0];
                const remainingLines = lines.slice(1);
                const allLinesShort = lines.length >= 2 && lines.every(isShortLine);
                const remainingLooksLikeList =
                  remainingLines.length >= 2 && remainingLines.every(isShortLine);

                if (!firstLine) {
                  return null;
                }

                return (
                  <div key={`text-${index}`} className="text-base leading-relaxed text-text-para md:text-lg">
                    {firstLine.endsWith(":") && remainingLines.length > 0 ? (
                      <>
                        <p>{firstLine}</p>
                        {remainingLooksLikeList ? (
                          renderLineList(remainingLines)
                        ) : (
                          <div className="mt-4 space-y-3">
                            {remainingLines.map((line) => (
                              <p key={line}>{line}</p>
                            ))}
                          </div>
                        )}
                      </>
                    ) : remainingLooksLikeList ? (
                      <>
                        <p>{firstLine}</p>
                        {renderLineList(remainingLines)}
                      </>
                    ) : allLinesShort ? (
                      renderLineList(lines)
                    ) : (
                      <div className="space-y-3">
                        {lines.map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                      </div>
                    )}
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
