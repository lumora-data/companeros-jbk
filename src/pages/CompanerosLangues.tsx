"use client";

import { MessageCircle } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function CompanerosLangues() {
  const content = SITE_CONTENT.pages.companerosLangues;
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
            <img
              src={content.firstImage.src}
              alt={content.firstImage.alt}
              className="h-auto w-full object-cover"
            />
          </div>

          <h2 className="mt-10 text-2xl font-black uppercase tracking-wide text-gold md:text-4xl">
            {content.nationalLanguages.title}
          </h2>
          <div className="mt-6 space-y-6 text-base leading-relaxed text-text-para md:text-lg">
            {content.nationalLanguages.paragraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 space-y-4">
            {content.nationalLanguages.formats.map((format: { title: string; description: string }) => (
              <div key={format.title} className="rounded-2xl border border-white/10 bg-noir-deep/40 p-4 md:p-6">
                <p className="text-sm font-black uppercase tracking-wide text-white md:text-base">{format.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-text-para md:text-base">{format.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img
              src={content.secondImage.src}
              alt={content.secondImage.alt}
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img
              src={content.thirdImage.src}
              alt={content.thirdImage.alt}
              className="h-auto w-full object-cover"
            />
          </div>

          <h2 className="mt-10 text-2xl font-black uppercase tracking-wide text-gold md:text-4xl">
            {content.internationalLanguages.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-para md:text-lg">
            {content.internationalLanguages.description}
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {content.internationalLanguages.items.map((language: { name: string; flag: string }) => (
              <div
                key={language.name}
                className="flex items-center gap-3 rounded-xl border border-white/10 bg-noir-deep/40 px-4 py-3"
              >
                <span className="text-2xl" aria-hidden="true">{language.flag}</span>
                <span className="text-sm font-bold uppercase tracking-wide text-white md:text-base">{language.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img
              src={content.fourthImage.src}
              alt={content.fourthImage.alt}
              className="h-auto w-full object-cover"
            />
          </div>

          <h2 className="mt-10 text-2xl font-black uppercase tracking-wide text-gold md:text-4xl">
            {content.translationSection.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-para md:text-lg">
            {content.translationSection.description}
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img
              src={content.fifthImage.src}
              alt={content.fifthImage.alt}
              className="h-auto w-full object-cover"
            />
          </div>

          <h2 className="mt-10 text-2xl font-black uppercase tracking-wide text-gold md:text-4xl">
            {content.holidayCampSection.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-para md:text-lg">
            {content.holidayCampSection.description}
          </p>

          <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 md:rounded-3xl">
            <img
              src={content.sixthImage.src}
              alt={content.sixthImage.alt}
              className="h-auto w-full object-cover"
            />
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
