"use client";

import { ExternalLink } from "lucide-react";
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
};

interface JbkEvenementsProps {
  contentKey?: "jbkEvenements" | "jbkDoublage";
}

export default function JbkEvenements({ contentKey = "jbkEvenements" }: JbkEvenementsProps) {
  const content = SITE_CONTENT.pages[contentKey] as JbkVideoPageContent;
  const introParagraphs = content.introText?.split("\n\n").filter(Boolean) ?? [];

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
                <p key={paragraph}>{paragraph}</p>
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
        </div>
      </section>
    </div>
  );
}
