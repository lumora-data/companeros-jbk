"use client";

import { motion, useMotionValue, useTransform, animate, useInView } from "motion/react";
import { ArrowRight, Globe, Camera, MessageCircle, Mail, Crown, BookOpen, Plane } from "lucide-react";
import Link from "next/link";
import { STATS, PARTNERS } from "../constants";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

function Counter({ value, label, suffix = "", prefix = "" }: any) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    return Math.round(latest).toLocaleString('fr-FR').replace(/\s/g, '\u00A0');
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-5xl font-display font-black text-gold mb-2 uppercase">
        {prefix}<motion.span>{rounded}</motion.span>{suffix}
      </div>
      <div className="text-text-soft text-[10px] uppercase tracking-[0.3em] font-black">{label}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Dual Hero Section */}
      <section className="relative min-h-screen pt-20 flex flex-col items-center">
        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <img
              src="/main/hero-accueil.jpg"
              alt="Compañeros-JBK Empire"
              className="h-full w-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-linear-to-b from-noir-deep/52 via-noir-deep/42 to-noir-deep/58"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-20 text-center relative z-10 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3 mb-8"
            >
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                className="h-[1px] bg-gold"
              ></motion.div>
              <span className="text-gold font-black uppercase tracking-[0.4em] text-xs">Compañeros-JBK Empire</span>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 48 }}
                transition={{ delay: 0.1 }}
                className="h-[1px] bg-gold"
              ></motion.div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-9xl font-display font-black tracking-tighter mb-8 md:mb-12 uppercase leading-[0.95] md:leading-[0.85]"
            >
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="block"
              >L'excellence</motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gold italic block"
              >à 360 degrés</motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-text-para text-lg md:text-2xl max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed font-medium px-4"
            >
              Deux pôles complémentaires accompagnent vos projets : <span className="text-white">Compañeros</span> pour la formation, les langues et les voyages ; <span className="text-gold">JBK</span> pour l'audiovisuel, l'événementiel et les services créatifs.
            </motion.p>
          </div>
        </div>

        {/* Dual Cards */}
        <div className="max-w-[1400px] mx-auto w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-20 md:mb-32">
          {/* Companeros Pole */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group relative bg-noir-card rounded-[2rem] md:rounded-[3rem] border border-white/5 overflow-hidden p-8 md:p-16 flex flex-col justify-between min-h-[420px] md:min-h-[500px]"
          >
            <div className="relative z-10">
              <div className="bg-white/10 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-8 md:mb-10 group-hover:bg-white/20 transition-all text-white">
                <Globe className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6 text-white leading-tight">Compańeros <br />& Services</h2>
              <p className="text-text-para text-base md:text-lg mb-8 md:mb-12 max-w-sm">Voyages, concours, langues, traduction, cours de soutien et activités culturelles.</p>
              <Link href="/companeros" className="bg-white text-noir-deep px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black inline-flex items-center gap-4 hover:bg-white/90 transition-all uppercase text-xs md:text-sm tracking-tighter w-fit">
                DÉCOUVRIR LE CENTRE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
               <Plane className="w-48 h-48 md:w-80 md:h-80 text-white" />
            </div>
          </motion.div>

          {/* JBK Pole */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="group relative bg-noir-card rounded-[2rem] md:rounded-[3rem] border border-gold/10 overflow-hidden p-8 md:p-16 flex flex-col justify-between min-h-[420px] md:min-h-[500px]"
          >
            <div className="relative z-10">
              <div className="bg-gold/20 w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mb-8 md:mb-10 group-hover:bg-gold/30 transition-all text-gold">
                <Camera className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <h2 className="text-3xl md:text-6xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6 text-gold leading-tight">JBK Films <br />& Services</h2>
              <p className="text-text-para text-base md:text-lg mb-8 md:mb-12 max-w-sm">Production audiovisuelle, communication, événementiel, talents et services créatifs.</p>
              <Link href="/jbk" className="gold-gradient text-noir-deep px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black inline-flex items-center gap-4 hover:brightness-110 transition-all gold-glow shadow-2xl uppercase text-xs md:text-sm tracking-tighter w-fit text-center">
                DÉCOUVRIR JBK <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="absolute top-0 right-0 p-4 md:p-8 opacity-[0.07] pointer-events-none group-hover:opacity-15 transition-opacity text-gold">
               <Crown className="w-48 h-48 md:w-80 md:h-80" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section Mini */}
      <section className="py-24 bg-noir-deep border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {STATS.map((stat, idx) => {
              if (stat.label === "Expertise") {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="text-3xl md:text-5xl font-display font-black text-gold mb-2 uppercase">Depuis {stat.value}</div>
                    <div className="text-text-soft text-[10px] uppercase tracking-[0.3em] font-black">{stat.label}</div>
                  </motion.div>
                );
              }
              return (
                <Counter 
                  key={idx} 
                  value={parseInt(stat.value)} 
                  label={stat.label} 
                  suffix={stat.label === "Engagement" ? "%" : "+"} 
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Partners Scrolling Section */}
      <section className="py-24 bg-noir-card border-b border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="h-[1px] bg-gold/30 flex-grow"></div>
            <h3 className="text-text-soft text-[10px] uppercase tracking-[0.4em] font-black">Nos Partenaires de Confiance</h3>
            <div className="h-[1px] bg-gold/30 flex-grow"></div>
          </div>
        </div>
        <div className="relative flex overflow-hidden">
          <motion.div 
            animate={{ x: [0, "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex items-center space-x-20 whitespace-nowrap px-10 md:px-20 min-w-max"
          >
            {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, idx) => (
              <img 
                key={idx} 
                src={partner.logo} 
                alt={partner.name} 
                className="h-10 cursor-pointer opacity-90 transition-all hover:opacity-100 md:h-14"
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Basic CTA */}
      <section className="py-32 bg-gold relative overflow-hidden">
         <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="absolute inset-0 pointer-events-none"
         >
            <div className="absolute top-[-50%] left-[-10%] w-full h-full bg-white/20 rounded-full blur-[100px] animate-pulse"></div>
         </motion.div>
         <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter mb-10 text-noir-deep leading-tight"
            >
              Besoin d'un accompagnement ?
            </motion.h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
               <Link href="/contact" className="bg-noir-deep text-text-main px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 hover:bg-noir-deep/90 transition-all shadow-2xl">
                  NOUS CONTACTER
               </Link>
            </motion.div>
         </div>
      </section>
    </div>
  );
}
