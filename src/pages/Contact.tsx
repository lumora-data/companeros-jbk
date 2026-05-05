"use client";

import { motion } from "motion/react";
import { Phone, Mail, MessageCircle, MapPin, Clock, Send, Crown, ArrowRight } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";

export default function Contact() {
  const content = SITE_CONTENT.pages.contact;
  const iconMap = { Phone, Mail, MapPin, Clock };

  return (
    <div className="pb-16 md:pb-24">
      <section className="relative overflow-hidden px-6 pb-20 pt-32 text-center md:pb-28 md:pt-44">
        <img
          src={content.hero.image}
          alt={content.hero.imageAlt}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-linear-to-b from-noir-deep/85 via-noir-deep/65 to-noir-deep"></div>
        <div className="relative z-10 mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gold-gradient text-noir-deep px-5 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-6 md:mb-8 inline-block gold-glow"
          >
            {content.hero.badge}
          </motion.div>
          <h1 className="text-4xl sm:text-6xl md:text-[8rem] font-display font-black mb-8 md:mb-10 uppercase tracking-tighter text-white leading-[0.9] md:leading-[0.8]">{content.hero.titleLine1} <br /><span className="text-gold italic underline decoration-2 md:decoration-4 underline-offset-4 md:underline-offset-8">{content.hero.titleHighlight}</span></h1>
          <p className="text-lg md:text-2xl text-text-para font-medium max-w-3xl mx-auto px-4">
            {content.hero.description}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pt-16 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-24">
          {/* Info Side */}
          <div className="space-y-8 md:space-y-12">
            <div className="bg-noir-card border border-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5 pointer-events-none hidden md:block">
                  <Crown className="w-48 h-48 text-gold" />
               </div>
               <h2 className="text-2xl md:text-3xl font-display font-black mb-8 md:mb-12 uppercase tracking-tighter text-center md:text-left">{content.coordinates.title}</h2>
               <div className="space-y-8 md:space-y-10">
                  {content.coordinates.items.map((c) => {
                    const Icon = iconMap[c.icon as keyof typeof iconMap];
                    return (
                    <div key={c.label} className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-4 md:gap-6 group">
                       <div className="bg-gold/10 p-3 md:p-4 rounded-xl md:rounded-2xl group-hover:bg-gold transition-all duration-500">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold group-hover:text-noir-deep" />
                       </div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-text-soft mb-1 md:mb-2">{c.label}</p>
                          <p className="text-lg md:text-xl font-bold leading-tight text-white">{c.value}</p>
                       </div>
                    </div>
                  )})}
               </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
               <a
                  href={content.coordinates.whatsappLink}
                  className="flex-1 bg-[#25D366] text-white py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-center flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-green-500/20 text-sm md:text-base uppercase"
                >
                  <MessageCircle className="w-5 h-5 md:w-6 md:h-6" />
                  {content.coordinates.whatsappButtonLabel}
                </a>
                <a
                  href={content.coordinates.emailLink}
                  className="flex-1 gold-gradient text-noir-deep py-5 md:py-6 rounded-2xl md:rounded-3xl font-black text-center flex items-center justify-center gap-3 hover:scale-105 transition-all gold-glow text-sm md:text-base uppercase"
                >
                  {content.coordinates.emailButtonLabel}
                </a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-noir-deep border border-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem]">
             <h2 className="text-2xl md:text-3xl font-display font-black mb-8 md:mb-10 uppercase tracking-tighter text-center md:text-left">{content.form.title}</h2>
             <form className="space-y-5 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                   <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-soft ml-2">{content.form.labels.fullName}</label>
                      <input type="text" className="w-full bg-noir-card border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:outline-none focus:border-gold transition-colors font-bold text-sm md:text-base" placeholder={content.form.placeholders.fullName} />
                   </div>
                   <div className="space-y-2">
                       <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-soft ml-2">{content.form.labels.phone}</label>
                       <input type="tel" className="w-full bg-noir-card border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:outline-none focus:border-gold transition-colors font-bold text-sm md:text-base" placeholder={content.form.placeholders.phone} />
                   </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-soft ml-2">{content.form.labels.email}</label>
                    <input type="email" className="w-full bg-noir-card border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:outline-none focus:border-gold transition-colors font-bold text-sm md:text-base" placeholder={content.form.placeholders.email} />
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-soft ml-2">{content.form.labels.service}</label>
                    <div className="relative">
                      <select className="w-full bg-noir-card border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:outline-none focus:border-gold transition-colors font-bold appearance-none text-sm md:text-base">
                        {content.form.serviceOptions.map((option) => (
                          <option key={option}>{option}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-20 hidden md:block">
                        <ArrowRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-text-soft ml-2">{content.form.labels.message}</label>
                    <textarea className="w-full bg-noir-card border border-white/5 rounded-xl md:rounded-2xl p-4 md:p-5 focus:outline-none focus:border-gold transition-colors font-bold h-32 md:h-40 text-sm md:text-base" placeholder={content.form.placeholders.message}></textarea>
                </div>
                <button className="w-full gold-gradient text-noir-deep py-5 md:py-6 rounded-xl md:rounded-2xl font-black text-lg md:text-xl hover:scale-[1.02] active:scale-95 transition-all gold-glow shadow-2xl flex items-center justify-center gap-4">
                   {content.form.submitLabel} <Send className="w-5 h-5 md:w-6 md:h-6" />
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
}
