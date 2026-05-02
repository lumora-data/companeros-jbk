"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Crown, Instagram, Facebook, Youtube, Mail, Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-noir-card border-t border-white/5 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20 text-center md:text-left">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2"
          >
            <Link href="/" className="flex items-center justify-center md:justify-start space-x-2 mb-8 group">
              <div className="bg-gold p-1 md:p-1.5 rounded-lg shadow-lg shadow-gold/20 group-hover:rotate-12 transition-transform shrink-0">
                <Crown className="text-noir-deep w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="font-display font-bold text-xl md:text-3xl tracking-tighter text-text-main uppercase whitespace-nowrap">
                COMPAÑEROS-JBK <span className="text-gold">EMPIRE</span>
              </span>
            </Link>
            <p className="text-text-para max-w-sm text-lg leading-relaxed mb-10 mx-auto md:mx-0 font-medium">
              Deux pôles complémentaires pour accompagner vos projets : formation, voyages, langues, traduction, production audiovisuelle, événementiel et services créatifs.
            </p>
            <div className="flex justify-center md:justify-start space-x-5">
              <a href="#" className="bg-noir-deep p-4 rounded-full hover:bg-gold transition-all group scale-wrap">
                <Instagram className="w-6 h-6 text-text-soft group-hover:text-noir-deep" />
              </a>
              <a href="#" className="bg-noir-deep p-4 rounded-full hover:bg-gold transition-all group scale-wrap">
                <Facebook className="w-6 h-6 text-text-soft group-hover:text-noir-deep" />
              </a>
              <a href="#" className="bg-noir-deep p-4 rounded-full hover:bg-gold transition-all group scale-wrap">
                <Youtube className="w-6 h-6 text-text-soft group-hover:text-noir-deep" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-text-main font-black mb-8 uppercase tracking-widest text-xs">Navigation</h4>
            <ul className="space-y-4 text-text-soft font-bold text-sm tracking-tight">
              <li><Link href="/companeros" className="hover:text-gold transition-colors inline-block hover:translate-x-1 transition-transform">Compaños & Services</Link></li>
              <li><Link href="/jbk" className="hover:text-gold transition-colors inline-block hover:translate-x-1 transition-transform">JBK Films & Services</Link></li>
              <li><Link href="/a-propos" className="hover:text-gold transition-colors inline-block hover:translate-x-1 transition-transform">À Propos</Link></li>
              <li><Link href="/contact" className="hover:text-gold transition-colors inline-block hover:translate-x-1 transition-transform">Contact</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-text-main font-black mb-8 uppercase tracking-widest text-xs">Coordonnées</h4>
            <ul className="space-y-6 text-text-soft text-sm font-bold">
              <li className="flex items-start md:items-center space-x-4 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="leading-tight">+237 678 032 746 / 698 058 931</span>
              </li>
              <li className="flex items-start md:items-center space-x-4 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="leading-tight lowercase">jbkfilms2014@gmail.com</span>
              </li>
              <li className="flex items-start space-x-4 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <span className="leading-tight">Carrefour Cradat - Rue pavés 3744, en face de l'auto école Kassap</span>
              </li>
              <li className="flex items-start md:items-center space-x-4 justify-center md:justify-start">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span className="leading-tight uppercase text-[10px]">Lundi au Vendredi - 8h00 à 19h00</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-text-soft text-[10px] font-black tracking-[0.2em] uppercase mb-12">
          <p>© 2026 Compañeros-JBK Empire. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0">
             <Link href="/partenaires" className="hover:text-gold transition-all">Partenaires</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
