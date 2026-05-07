"use client";

import { motion } from "motion/react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function CompanerosOrientation() {
  const content = SITE_CONTENT.pages.companerosOrientation;
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
          <h2 className="mb-8 text-center text-2xl font-black uppercase tracking-[0.12em] text-gold md:text-4xl">
            {content.travelTypesTitle}
          </h2>
          <p className="mb-3 text-center text-sm font-black uppercase tracking-wide text-white md:text-lg">
            {content.travelTypesLine1}
          </p>
          <p className="mb-10 text-center text-sm font-black uppercase tracking-wide text-white md:text-lg">
            {content.travelTypesLine2}
          </p>

          <div className="space-y-6 text-base leading-relaxed text-text-para md:text-lg">
            {content.paragraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <ul className="mt-10 space-y-4">
            {content.studySteps.map((step: string) => (
              <li key={step} className="flex items-start gap-3 text-text-main">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                <span className="text-base leading-relaxed md:text-lg">{step}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-text-para md:text-lg">
            {content.closingParagraphs.map((paragraph: string) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
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
