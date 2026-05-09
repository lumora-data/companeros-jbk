"use client";

import { ExternalLink, MessageCircle } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";
import ResponsiveVideoFrame from "@/src/components/ResponsiveVideoFrame";

type JbkVideoPageContent = {
  title: string;
  introImage?: {
    src: string;
    alt: string;
  };
  introText?: string;
  videos: {
    url: string;
    embedUrl: string;
  }[];
  cta?: {
    buttonLabel: string;
    whatsappMessage: string;
  };
};

interface JbkEvenementsProps {
  contentKey?: "jbkEvenements" | "jbkDoublage";
}

function normalizeText(value: string): string {
  return value
    .replace(/\r/g, "")
    .replace(/[^\S\r\n]+/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .trim();
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

export default function JbkEvenements({ contentKey = "jbkEvenements" }: JbkEvenementsProps) {
  const content = SITE_CONTENT.pages[contentKey] as JbkVideoPageContent;
  const whatsappBaseUrl = SITE_CONTENT.links.whatsappBaseUrl;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const introParagraphs = content.introText
    ?.replace(/\n{3,}/g, "\n\n")
    .split("\n\n")
    .map((paragraph) => normalizeText(paragraph))
    .filter(Boolean) ?? [];
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

          {content.introImage ? (
            <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
              <img
                src={content.introImage.src}
                alt={content.introImage.alt}
                className="h-auto w-full object-cover"
              />
            </div>
          ) : null}

          {introParagraphs.length > 0 ? (
            <div className="mt-8 space-y-5 text-base leading-relaxed text-text-para md:text-lg">
              {introParagraphs.map((paragraph) => (
                <p key={paragraph}>{renderTextWithLinks(paragraph)}</p>
              ))}
            </div>
          ) : null}

          <div className="mt-10 space-y-10">
            {content.videos.map((video, idx) => (
              <div key={video.url} className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
                  <ResponsiveVideoFrame
                    src={video.embedUrl}
                    title={`Video JBK ${idx + 1}`}
                  />
                </div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold text-gold underline underline-offset-4 md:text-base"
                >
                  {video.url}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
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
