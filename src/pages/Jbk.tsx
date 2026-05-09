"use client";

import { motion } from "motion/react";
import { ArrowRight, Video, Camera, Smartphone, MessageCircle, Palette, Layout, Type, Mic, Wind, Tv, GraduationCap, Play, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { JBK_SERVICES, PRODUCTIONS } from "../constants";
import { SITE_CONTENT } from "@/src/content/site-content";

type TeamMember = {
  name: string;
  role: string;
  bio?: string;
  image: string;
  imageAlt: string;
};

type TeamSection = {
  heading: string;
  members: TeamMember[];
};

export default function Jbk() {
  const content = SITE_CONTENT.pages.jbk;
  const routes = SITE_CONTENT.links.routes;
  const whatsappNumber = SITE_CONTENT.common.whatsappNumber;
  const whatsappBaseUrl = SITE_CONTENT.links.whatsappBaseUrl;
  const directionSection = content.directionSection as TeamSection;
  const technicalTeamSection = content.technicalTeamSection as TeamSection;
  const serviceRedirects = content.services.redirectByServiceId as Record<string, string>;
  const toWhatsappUrl = (message: string) =>
    `${whatsappBaseUrl}/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  const renderTextWithLinks = (text: string) => {
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
  };

  const iconMap = {
    Palette: Palette,
    Camera: Camera,
    Layout: Layout,
    Type: Type,
    Mic: Mic,
    Wind: Wind,
    Smartphone: Smartphone,
    Tv: Tv,
    Video: Video,
    GraduationCap: GraduationCap,
    Globe: Globe,
  };

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[82svh] items-center justify-center overflow-hidden py-20 md:h-[80vh] md:py-0">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src={content.hero.image}
            alt={content.hero.imageAlt}
            className="h-full w-full object-cover opacity-75"
          />
          <div className="absolute inset-0 bg-linear-to-b from-noir-deep/80 via-noir-deep/40 to-noir-deep"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gold-gradient text-noir-deep px-5 md:px-6 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-6 md:mb-8 inline-block shadow-lg shadow-gold/20"
          >
            {content.hero.badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-8xl font-display font-black tracking-tighter mb-6 md:mb-8 uppercase leading-[0.9]"
          >
            {content.hero.titleLine1} <br />
            <span className="text-gold italic">{content.hero.titleHighlight}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-para text-base sm:text-lg md:text-2xl max-w-4xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed px-2 sm:px-4"
          >
            {content.hero.description}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <a
              href={toWhatsappUrl(content.hero.primaryWhatsappMessage)}
              className="gold-gradient text-noir-deep px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:scale-110 transition-all shadow-2xl gold-glow w-full sm:w-auto"
            >
              {content.hero.primaryButtonLabel}
            </a>
             <a
              href={toWhatsappUrl(content.hero.secondaryWhatsappMessage)}
              className="bg-noir-card border border-white/10 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-white hover:text-noir-deep transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              {content.hero.secondaryButtonLabel} <MessageCircle className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-32 bg-noir-deep">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6">{content.services.heading}</h2>
            <p className="text-text-para text-base md:text-xl max-w-2xl mx-auto font-medium">
              {content.services.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {JBK_SERVICES.map((service, idx) => {
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
                  className="bg-noir-card border border-white/5 p-6 md:p-8 rounded-[1.6rem] md:rounded-[2rem] hover:border-gold/50 transition-all group flex flex-col h-full"
                >
                  <Icon className="w-10 h-10 text-gold mb-6 group-hover:rotate-6 transition-transform duration-500" />
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-white leading-tight">{service.title}</h3>
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

      {/* Direction JBK */}
      <section className="py-20 md:py-32 bg-noir-card">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter">
              {directionSection.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {directionSection.members.map((member, idx) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                className="bg-noir-deep border border-white/10 rounded-[1.4rem] overflow-hidden flex flex-col"
              >
                <div className="aspect-[3/4] bg-black/30 p-2">
                  <img src={member.image} alt={member.imageAlt} className="h-full w-full rounded-xl object-contain object-center" />
                </div>
                <div className="p-5 md:p-7">
                  <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white break-words">{member.name}</h3>
                  <p className="mt-2 text-sm md:text-base font-bold text-gold">{member.role}</p>
                  {member.bio ? (
                    <p className="mt-4 text-sm leading-6 md:text-base md:leading-relaxed text-text-para whitespace-pre-line">
                      {member.bio}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe technique & agence d'acteurs */}
      <section className="py-20 md:py-32 bg-noir-deep">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter">
              {technicalTeamSection.heading}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
            {technicalTeamSection.members.map((member, idx) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03 }}
                className="bg-noir-card border border-white/10 rounded-[1.4rem] overflow-hidden flex flex-col"
              >
                <div className="aspect-[3/4] bg-black/30 p-2">
                  <img src={member.image} alt={member.imageAlt} className="h-full w-full rounded-xl object-contain object-center" />
                </div>
                <div className="p-5 md:p-7">
                  <h3 className="text-lg md:text-2xl font-black uppercase tracking-tight text-white break-words">{member.name}</h3>
                  <p className="mt-2 text-sm md:text-base font-bold text-gold">{member.role}</p>
                  {member.bio ? (
                    <p className="mt-4 text-sm leading-6 md:text-base md:leading-relaxed text-text-para whitespace-pre-line">
                      {member.bio}
                    </p>
                  ) : null}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Productions Section */}
      <section className="py-20 md:py-32 bg-noir-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">{content.productions.heading}</h2>
               <div className="w-32 h-1.5 md:h-2 bg-gold mt-6"></div>
            </div>
            <p className="text-text-para text-base md:text-lg max-w-sm mb-2 font-bold uppercase tracking-tight opacity-70">{content.productions.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
            {PRODUCTIONS.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group rounded-[1.3rem] border border-white/10 bg-noir-deep p-3 shadow-2xl"
              >
                <div className="aspect-[800/1067] overflow-hidden rounded-xl bg-black/20">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="px-1 pb-1 pt-4 text-center">
                  <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.2em] text-gold">
                    {content.productions.badge}
                  </span>
                  <h3 className="text-xl font-black uppercase leading-tight tracking-tighter text-white md:text-2xl">
                    {prod.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-24 md:py-40 bg-noir-deep relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.15),transparent_70%)]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-noir-card border border-gold/20 p-8 md:p-24 rounded-[3rem] md:rounded-[5rem] text-center md:text-left shadow-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-gold font-black uppercase tracking-[0.3em] text-xs mb-8 block"
                >
                  {content.conversion.kicker}
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.9]"
                >
                  {content.conversion.headingLine1} <br />
                  <span className="text-gold italic">{content.conversion.headingHighlight}</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-text-para font-medium mb-12 leading-relaxed"
                >
                  {content.conversion.description}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <a
                    href={content.conversion.primaryWhatsappLink}
                    className="gold-gradient text-noir-deep px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg hover:scale-105 transition-all shadow-2xl gold-glow text-center"
                  >
                    {content.conversion.primaryButtonLabel}
                  </a>
                  <Link
                    href={routes.contact}
                    className="bg-white/5 border border-white/10 text-white px-8 py-4 md:px-10 md:py-5 rounded-2xl font-black text-base md:text-lg hover:bg-white hover:text-noir-deep transition-all text-center"
                  >
                    {content.conversion.secondaryButtonLabel}
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="hidden lg:grid grid-cols-2 gap-4"
              >
                {content.conversion.stats.map((stat, i) => (
                  <div key={i} className="bg-noir-deep p-8 rounded-3xl border border-white/5 text-center">
                    <div className="text-gold font-black text-xl mb-1">{stat.label}</div>
                    <div className="text-text-soft text-xs font-bold uppercase tracking-widest">{stat.desc}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
