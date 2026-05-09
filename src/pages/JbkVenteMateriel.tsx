"use client";

import { ExternalLink, MessageCircle } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";
import ResponsiveVideoFrame from "@/src/components/ResponsiveVideoFrame";

type VideoItem = {
  url: string;
  embedUrl: string;
};

type JbkVenteMaterielContent = {
  title: string;
  introParagraphs: string[];
  images: {
    src: string;
    alt: string;
  }[];
  droneSection: {
    text: string;
    videos: VideoItem[];
  };
  cameraSection: {
    text: string;
    videos: VideoItem[];
  };
  cta?: {
    buttonLabel: string;
    whatsappMessage: string;
  };
};

function VideoGallery({ videos }: { videos: VideoItem[] }) {
  return (
    <div className="mt-6 space-y-8">
      {videos.map((video, idx) => (
        <div key={video.url} className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <ResponsiveVideoFrame
              src={video.embedUrl}
              title={`Video matériel JBK ${idx + 1}`}
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
  );
}

export default function JbkVenteMateriel() {
  const content = SITE_CONTENT.pages.jbkVenteMateriel as JbkVenteMaterielContent;
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

          <div className="mt-8 space-y-5 text-base leading-relaxed text-text-para md:text-lg">
            {content.introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {content.images.map((image) => (
              <div key={image.src} className="overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:rounded-3xl">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-black uppercase tracking-wide text-gold md:text-4xl">Drones</h2>
            <p className="mt-5 text-base leading-relaxed text-text-para md:text-lg">{content.droneSection.text}</p>
            <VideoGallery videos={content.droneSection.videos} />
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-black uppercase tracking-wide text-gold md:text-4xl">Appareils Photos & Caméras</h2>
            <p className="mt-5 text-base leading-relaxed text-text-para md:text-lg">{content.cameraSection.text}</p>
            <VideoGallery videos={content.cameraSection.videos} />
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
