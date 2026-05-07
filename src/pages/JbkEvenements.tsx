"use client";

import { ExternalLink } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function JbkEvenements() {
  const content = SITE_CONTENT.pages.jbkEvenements;

  return (
    <div className="bg-noir-deep pb-24 pt-32 md:pt-40">
      <section className="px-6">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/5 bg-noir-card p-8 md:rounded-[3rem] md:p-14">
          <h1 className="text-center text-3xl font-display font-black tracking-tighter text-gold md:text-6xl">
            {content.title}
          </h1>

          <div className="mt-10 space-y-10">
            {content.videos.map((video: { url: string; embedUrl: string }, idx: number) => (
              <div key={video.url} className="space-y-4">
                <div className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
                  <iframe
                    src={video.embedUrl}
                    title={`Video JBK ${idx + 1}`}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
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
