"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function CompanerosTraduction() {
  const content = SITE_CONTENT.pages.companerosTraduction;
  const whatsappBaseUrl = SITE_CONTENT.links.whatsappBaseUrl;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const whatsappUrl = `${whatsappBaseUrl}/${whatsappNumber}?text=${encodeURIComponent(content.cta.whatsappMessage)}`;

  return (
    <div className="bg-noir-deep pb-24 pt-32 md:pt-40">
      <section className="px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-6 inline-block rounded-full bg-gold px-5 py-2 text-[10px] font-black uppercase tracking-widest text-noir-deep">
            {content.hero.badge}
          </p>
          <h1 className="mb-6 text-4xl font-display font-black uppercase tracking-tighter text-white md:text-7xl">
            {content.hero.title}
          </h1>
          <p className="mx-auto max-w-3xl text-lg font-medium text-text-para md:text-2xl">
            {content.hero.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 pt-14 md:pt-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/5 bg-noir-card p-8 md:rounded-[3rem] md:p-14">
          <div className="overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img src={content.firstImage.src} alt={content.firstImage.alt} className="h-auto w-full object-cover" />
          </div>

          <p className="mt-8 text-base leading-relaxed text-text-para md:text-lg">{content.introText}</p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img src={content.secondImage.src} alt={content.secondImage.alt} className="h-auto w-full object-cover" />
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
