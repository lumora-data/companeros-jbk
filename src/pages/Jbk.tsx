"use client";

import { motion } from "motion/react";
import { ArrowRight, Video, Camera, Smartphone, MessageCircle, Palette, Layout, Type, Mic, Wind, Tv, GraduationCap, Play, Globe, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { JBK_SERVICES, PRODUCTIONS } from "../constants";

export default function Jbk() {
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
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/main/hero.jpg"
            alt="Hero JBK Films"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-b from-noir-deep/80 via-noir-deep/40 to-noir-deep"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
           <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gold-gradient text-noir-deep px-5 md:px-6 py-1.5 rounded-full text-[10px] md:text-xs font-black tracking-widest uppercase mb-6 md:mb-8 inline-block shadow-lg shadow-gold/20"
          >
            Films • Événementiel • Communication
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-8xl font-display font-black tracking-tighter mb-6 md:mb-8 uppercase leading-[0.9]"
          >
            Films, com & <br />
            <span className="text-gold italic">services créatifs</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-para text-lg md:text-2xl max-w-4xl mx-auto mb-10 md:mb-12 font-medium leading-relaxed px-4"
          >
            JBK Films réunit une maison de production, une équipe technique, une agence d'acteurs et des services créatifs pour marques et artistes.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6"
          >
            <a
              href={`https://wa.me/237678032746?text=${encodeURIComponent("Bonjour, je souhaite demander un service à JBK Films.")}`}
              className="gold-gradient text-noir-deep px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:scale-110 transition-all shadow-2xl gold-glow w-full sm:w-auto"
            >
              DEMANDER UN SERVICE
            </a>
             <a
              href={`https://wa.me/237678032746?text=${encodeURIComponent("Bonjour, je souhaite contacter l'équipe JBK Films.")}`}
              className="bg-noir-card border border-white/10 text-white px-8 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-base md:text-lg hover:bg-white hover:text-noir-deep transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
            >
              WHATSAPP <MessageCircle className="w-6 h-6" />
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
            <h2 className="text-3xl md:text-7xl font-display font-black uppercase tracking-tighter mb-4 md:mb-6">Expertises JBK</h2>
            <p className="text-text-para text-base md:text-xl max-w-2xl mx-auto font-medium">
              Nous accompagnons vos projets de l'idée jusqu'à la diffusion avec des outils professionnels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {JBK_SERVICES.map((service, idx) => {
              const Icon = iconMap[service.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-noir-card border border-white/5 p-8 rounded-[2rem] hover:border-gold/50 transition-all group flex flex-col h-full"
                >
                  <Icon className="w-10 h-10 text-gold mb-6 group-hover:rotate-6 transition-transform duration-500" />
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight text-white leading-tight">{service.title}</h3>
                  <p className="text-text-para text-sm md:text-base leading-relaxed mb-8 flex-grow">
                    {service.description}
                  </p>
                  <a 
                    href={`https://wa.me/237678032746?text=${encodeURIComponent(`Bonjour, je souhaite en savoir plus sur l'expertise JBK : ${service.title}`)}`}
                    className="flex items-center gap-2 text-gold font-black text-xs group-hover:gap-4 transition-all uppercase tracking-widest mt-auto border-t border-white/5 pt-6"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Productions Section */}
      <section className="py-20 md:py-32 bg-noir-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24 gap-8">
            <div className="max-w-xl">
               <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter">Nos Productions</h2>
               <div className="w-32 h-1.5 md:h-2 bg-gold mt-6"></div>
            </div>
            <p className="text-text-para text-base md:text-lg max-w-sm mb-2 font-bold uppercase tracking-tight opacity-70">Courts & Longs Métrages</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {PRODUCTIONS.map((prod, idx) => (
              <motion.div
                key={prod.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative aspect-[800/1067] bg-noir-deep rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl"
              >
                 <img 
                    src={prod.image}
                    alt={prod.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                 />
                 <div className="absolute inset-0 bg-linear-to-t from-noir-deep via-noir-deep/40 to-transparent"></div>
                 <div className="absolute inset-x-0 bottom-0 p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-gold text-[10px] font-black uppercase tracking-[0.2em] mb-4 block">Production JBK</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight group-hover:text-gold transition-colors">{prod.title}</h3>
                    <div className="mt-8 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center gap-2 text-[10px] font-black text-white/50 tracking-widest">
                       EN SAVOIR PLUS <ArrowRight className="w-4 h-4 text-gold" />
                    </div>
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
                  Démarrer un projet
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.9]"
                >
                  Donnez vie <br />
                  <span className="text-gold italic">à vos idées</span>
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-text-para font-medium mb-12 leading-relaxed"
                >
                  Qu'il s'agisse d'un film, d'une campagne publicitaire ou d'un événement majeur, JBK Films transforme votre vision en réalité visuelle percutante.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <a
                    href="https://wa.me/237678032746"
                    className="gold-gradient text-noir-deep px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl gold-glow text-center"
                  >
                    LANCER MON PROJET
                  </a>
                  <Link
                    href="/contact"
                    className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white hover:text-noir-deep transition-all text-center"
                  >
                    DEVIS GRATUIT
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
                {[
                  { label: "Qualité 4K", desc: "Production ultra HD" },
                  { label: "Expertise", desc: "10+ ans d'expérience" },
                  { label: "Créativité", desc: "Concepts uniques" },
                  { label: "Rapidité", desc: "Livraison optimisée" }
                ].map((stat, i) => (
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
