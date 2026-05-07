"use client";

import { motion } from "motion/react";
import { ArrowRight, Plane, Globe, FileText, Languages, BookOpen, Music, CheckCircle2, MessageCircle } from "lucide-react";
import Link from "next/link";
import { COMPANEROS_SERVICES } from "../constants";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function Companeros() {
  const content = SITE_CONTENT.pages.companeros;
  const routes = SITE_CONTENT.links.routes;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const whatsappBaseUrl = SITE_CONTENT.links.whatsappBaseUrl;
  const serviceRedirects = content.services.redirectByServiceId as Record<string, string>;
  const toWhatsappUrl = (message: string) =>
    `${whatsappBaseUrl}/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const renderTextWithLinks = (text: string) => {
    const parts = text.split(/(https?:\/\/[^\s]+)/g);
    return parts.map((part, idx) =>
      /^https?:\/\//.test(part) ? (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold underline underline-offset-2 break-all"
        >
          {part}
        </a>
      ) : (
        <span key={idx}>{part}</span>
      ),
    );
  };

  const iconMap = {
    Plane: Plane,
    Globe: Globe,
    FileText: FileText,
    Languages: Languages,
    BookOpen: BookOpen,
    Music: Music,
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={content.hero.image}
            alt={content.hero.imageAlt}
            className="h-full w-full object-cover opacity-55"
          />
          <div className="absolute inset-0 bg-linear-to-b from-noir-deep/80 via-noir-deep/40 to-noir-deep"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="gold-gradient text-noir-deep px-5 md:px-6 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-6 md:mb-8 inline-block shadow-lg shadow-gold/20"
          >
            {content.hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-display font-black tracking-tighter mb-6 md:mb-8 uppercase leading-[0.9]"
          >
            {content.hero.titleLine1} <br />
            <span className="text-gold italic">{content.hero.titleHighlight}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-text-para text-lg md:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed font-medium px-4"
          >
            {content.hero.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <a
              href={toWhatsappUrl(content.hero.primaryWhatsappMessage)}
              className="gold-gradient text-noir-deep px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:scale-105 transition-all shadow-2xl gold-glow w-full sm:w-auto text-center"
            >
              {content.hero.primaryButtonLabel}
            </a>
            <Link
              href={routes.companerosOrientation}
              className="bg-noir-card border border-white/10 text-text-main px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-gris-sep transition-all w-full sm:w-auto text-center"
            >
              {content.hero.secondaryButtonLabel}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-noir-deep">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6">{content.services.heading}</h2>
            <p className="text-text-para text-base md:text-xl max-w-2xl mx-auto font-medium">
              {content.services.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {COMPANEROS_SERVICES.map((service, idx) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              const serviceRedirectUrl = serviceRedirects?.[service.id];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-noir-card border border-white/5 p-8 rounded-[2rem] hover:border-gold/50 transition-all group relative overflow-hidden flex flex-col h-full"
                >
                  <Icon className="w-10 h-10 text-gold mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight leading-tight">{service.title}</h3>
                  <p className="text-text-para text-sm md:text-base leading-relaxed mb-8 flex-grow whitespace-pre-line">
                    {renderTextWithLinks(service.description)}
                  </p>
                  {serviceRedirectUrl ? (
                    <Link
                      href={serviceRedirectUrl}
                      className="flex items-center gap-2 text-gold font-black text-xs group-hover:gap-4 transition-all uppercase tracking-widest mt-auto border-t border-white/5 pt-6"
                    >
                      {content.services.cardCtaLabel} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={toWhatsappUrl(content.services.cardWhatsappTemplate.replace("{{serviceTitle}}", service.title))}
                      className="flex items-center gap-2 text-gold font-black text-xs group-hover:gap-4 transition-all uppercase tracking-widest mt-auto border-t border-white/5 pt-6"
                    >
                      {content.services.cardCtaLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Voyages Detail */}
      <section className="py-20 md:py-32 bg-noir-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter mb-8">{content.voyageDetail.headingLine1} <br /><span className="text-gold italic">{content.voyageDetail.headingHighlight}</span></h2>
              <div className="space-y-6 md:space-y-8">
                {content.voyageDetail.items.map((item, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 md:gap-6 group"
                  >
                     <div className="bg-gold/10 p-2 md:p-3 rounded-lg md:rounded-xl group-hover:bg-gold group-hover:text-noir-deep transition-all">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-gold group-hover:text-noir-deep" />
                     </div>
                     <span className="text-lg md:text-xl font-bold group-hover:text-gold transition-colors">{item}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-12 md:mt-16"
              >
                 <a
                  href={toWhatsappUrl(content.voyageDetail.ctaWhatsappMessage)}
                  className="gold-gradient text-noir-deep px-8 py-5 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg inline-flex items-center gap-4 gold-glow shadow-2xl w-full sm:w-auto justify-center"
                >
                  {content.voyageDetail.ctaLabel} <MessageCircle className="w-6 h-6" />
                </a>
              </motion.div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50, rotate: 2 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              viewport={{ once: true }}
              className="relative hidden md:block"
            >
              <img
                src={content.voyageDetail.image}
                alt={content.voyageDetail.imageAlt}
                className="h-auto w-full rounded-[3rem] border border-white/5 shadow-2xl"
              />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.6 }}
                 className="absolute -bottom-10 -right-10 bg-gold text-noir-deep p-12 rounded-[2.5rem] font-black text-2xl rotate-3 shadow-2xl uppercase tracking-tighter"
               >
                {content.voyageDetail.floatingBadge}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Langues Section */}
      <section className="py-20 md:py-32 bg-noir-deep overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-16 md:mb-24 gap-12 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
               <h2 className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter mb-6 md:underline md:decoration-gold md:underline-offset-8 md:decoration-4">{content.languages.heading}</h2>
               <p className="text-text-soft text-base md:text-lg italic leading-relaxed">
                 {content.languages.description}
               </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-noir-card border border-white/5 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem]"
            >
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 md:mb-10 text-gold">{content.languages.international.title}</h3>
              <p className="text-text-para mb-8 md:mb-10 text-base md:text-lg">{content.languages.international.description}</p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {content.languages.international.items.map((l, idx) => (
                  <motion.span 
                    key={l}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-gris-sep px-4 py-2 md:px-6 md:py-3 rounded-full font-black uppercase tracking-widest text-[10px] md:text-xs border border-white/5 text-text-para hover:bg-gold transition-colors cursor-default hover:text-noir-deep"
                  >
                    {l}
                  </motion.span>
                ))}
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-noir-card border border-white/5 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem]"
            >
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 md:mb-10 text-gold">{content.languages.national.title}</h3>
              <p className="text-text-para mb-8 md:mb-10 text-base md:text-lg">{content.languages.national.description}</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-left">
                {content.languages.national.items.map((item, idx) => (
                  <motion.li 
                    key={item} 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3 font-bold text-text-main"
                  >
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Soutien Scolaire */}
      <section className="py-20 md:py-32 bg-noir-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-noir-deep p-8 md:p-20 rounded-[2rem] md:rounded-[4rem] border border-gold/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-12 opacity-5 hidden lg:block">
              <BookOpen className="w-64 h-64 text-gold" />
            </div>
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter mb-6 md:mb-8 text-white">{content.support.heading}</h2>
              <p className="text-lg md:text-xl text-text-para max-w-3xl mb-10 md:mb-12 leading-relaxed">
                {content.support.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-12 md:mb-16">
                 <div>
                   <h4 className="text-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{content.support.subjectsTitle}</h4>
                   <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
                     {content.support.subjects.map((m) => (
                       <span key={m} className="bg-gris-sep px-4 py-2 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-sm md:text-base font-bold border border-white/5">{m}</span>
                     ))}
                   </div>
                 </div>
                 <div className="space-y-6">
                   <h4 className="text-gold font-bold uppercase tracking-widest text-xs md:text-sm mb-6">{content.support.pricingTitle}</h4>
                   <div className="space-y-4 text-left">
                     {content.support.pricingRows.map((row, idx) => (
                      <div key={row.label} className={`flex justify-between items-center ${idx < content.support.pricingRows.length - 1 ? "border-b border-white/5 pb-4" : ""}`}>
                        <span className="font-bold text-sm md:text-base">{row.label}</span>
                        <span className="text-gold font-black text-sm md:text-base">{row.value}</span>
                      </div>
                     ))}
                   </div>
                 </div>
              </div>

               <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={toWhatsappUrl(content.support.ctaWhatsappMessage)}
                className="gold-gradient text-noir-deep px-8 py-4 md:px-12 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg inline-flex items-center gap-4 gold-glow shadow-2xl w-full sm:w-auto justify-center"
              >
                {content.support.ctaLabel} <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-32 md:py-40 bg-gold text-noir-deep relative overflow-hidden">
         <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
           className="absolute top-[-50%] right-[-10%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[100px]"
         />
         <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter mb-8 md:mb-10 leading-tight"
           >
             {content.finalCta.heading}
           </motion.h2>
           <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-2xl font-bold opacity-80 mb-10 md:mb-16 leading-relaxed"
           >
             {content.finalCta.description}
           </motion.p>
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
             className="flex flex-col sm:flex-row items-center justify-center gap-6"
           >
             <a
                href={toWhatsappUrl(content.finalCta.buttonWhatsappMessage)}
                className="bg-noir-deep text-text-main px-10 py-5 md:px-12 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl shadow-2xl hover:scale-105 transition-all w-full sm:w-auto text-center"
              >
                {content.finalCta.buttonLabel}
              </a>
           </motion.div>
         </div>
      </section>
    </div>
  );
}
