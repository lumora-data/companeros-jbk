"use client";

import { motion } from "motion/react";
import { Crown, Globe, History, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function About() {
  const content = SITE_CONTENT.pages.about;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const toWhatsappUrl = (message: string) =>
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="py-24 md:py-36 relative overflow-hidden text-center px-6">
        <img
          src={content.hero.image}
          alt={content.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-noir-deep/80 via-noir-deep/60 to-noir-deep"></div>
        <div className="relative z-10 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="gold-gradient text-noir-deep px-5 md:px-6 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-8 md:mb-10 inline-block gold-glow"
        >
          {content.hero.badge}
        </motion.div>
        <h1 className="text-4xl md:text-8xl font-display font-black tracking-tighter mb-8 md:mb-10 text-white uppercase leading-[0.9]">{content.hero.titleLine1} <br /><span className="text-gold italic">{content.hero.titleHighlight}</span></h1>
        <p className="text-text-para text-lg md:text-2xl max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium">
          {content.hero.description}
        </p>
        </div>
      </section>

      {/* Poles Intro */}
      <section className="py-16 md:py-20 bg-noir-card border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="bg-noir-deep p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-white/5">
             <Globe className="w-12 h-12 md:w-16 md:h-16 text-white mb-6 md:mb-8" />
             <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 uppercase">{content.poles.companerosTitle}</h2>
             <p className="text-text-para text-base md:text-lg leading-relaxed">{content.poles.companerosDescription}</p>
          </div>
          <div className="bg-noir-deep p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-gold/10">
             <Crown className="w-12 h-12 md:w-16 md:h-16 text-gold mb-6 md:mb-8" />
             <h2 className="text-3xl md:text-4xl font-display font-black text-gold mb-4 uppercase">{content.poles.jbkTitle}</h2>
             <p className="text-text-para text-base md:text-lg leading-relaxed">{content.poles.jbkDescription}</p>
          </div>
        </div>
      </section>

      {/* History Area */}
      <section className="py-20 md:py-32 bg-noir-deep">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24 items-center">
           <img
              src={content.history.image}
              alt={content.history.imageAlt}
              className="h-auto w-full rounded-[2rem] shadow-2xl md:rounded-[3rem]"
            />
           <div className="text-center md:text-left">
              <History className="w-10 h-10 md:w-12 md:h-12 text-gold mb-6 md:mb-8 mx-auto md:mx-0" />
              <h2 className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 md:mb-8 leading-tight">{content.history.headingLine1} <span className="text-gold italic">{content.history.headingHighlight}</span></h2>
              <p className="text-text-para text-base md:text-lg leading-relaxed font-medium mb-6">
                {content.history.description}
              </p>
           </div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-24 md:py-40 bg-noir-card border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-2 lg:order-1"
              >
                 <div className="aspect-[4/5] bg-noir-deep rounded-[3rem] md:rounded-[4rem] border border-white/5 overflow-hidden group shadow-3xl">
                    <img
                      src={content.ceo.image}
                      alt={content.ceo.imageAlt}
                      className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                 </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2 text-center lg:text-left"
              >
                 <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-6 md:mb-8 leading-[0.8] text-white">{content.ceo.nameLine1} <br /><span className="text-gold italic">{content.ceo.nameLine2}</span></h2>
                 <div className="gold-gradient text-noir-deep px-5 md:px-6 py-2 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-8 md:mb-10 inline-block shadow-lg">
                    {content.ceo.badge}
                 </div>
                 <p className="text-text-para text-lg md:text-xl leading-relaxed mb-10 md:mb-12 font-medium">
                   {content.ceo.description}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                    <a 
                      href={toWhatsappUrl(content.ceo.visionWhatsappMessage)}
                      className="text-white font-black uppercase tracking-[0.2em] text-[10px] md:text-xs flex items-center justify-center gap-4 hover:text-gold transition-all"
                    >
                      {content.ceo.visionButtonLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                 </div>
              </motion.div>
           </div>
        </div>
      </section>

      {/* CTA final */}
      <div className="text-center py-24 md:py-32 bg-noir-card px-6">
        <Link 
          href="/contact" 
          className="gold-gradient text-noir-deep px-8 md:px-12 py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-lg md:text-xl uppercase tracking-tighter gold-glow hover:scale-105 transition-all shadow-2xl inline-block"
        >
          {content.finalCta.buttonLabel}
        </Link>
      </div>
    </div>
  );
}
