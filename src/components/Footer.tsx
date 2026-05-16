"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Crown, Instagram, Facebook, Youtube, Linkedin, Send, Music2, Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";
import { translateRouteName, translateUiLabel } from "@/src/lib/i18n";
import { useSiteLanguage } from "@/src/components/i18n/LanguageProvider";

export default function Footer() {
  const { language } = useSiteLanguage();
  const { footer, navbar, common, links } = SITE_CONTENT;
  const navLinks = navbar.links.filter((link) => link.path !== links.routes.home);
  const socialLinks = [
    { href: links.social.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: links.social.instagram, label: "Instagram", icon: Instagram },
    { href: links.social.facebook, label: "Facebook", icon: Facebook },
    { href: links.social.facebookAlt, label: "Facebook 2", icon: Facebook },
    { href: links.social.youtube, label: "YouTube", icon: Youtube },
    { href: links.social.telegram, label: "Telegram", icon: Send },
    { href: links.social.tiktok, label: "TikTok", icon: Music2 },
  ] as const;

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
            <Link href={links.routes.home} className="flex items-center justify-center md:justify-start space-x-2 mb-8 group">
              <div className="bg-gold p-1 md:p-1.5 rounded-lg shadow-lg shadow-gold/20 group-hover:rotate-12 transition-transform shrink-0">
                <Crown className="text-noir-deep w-6 h-6 md:w-8 md:h-8" />
              </div>
              <span className="font-display font-bold text-xl md:text-3xl tracking-tighter text-text-main uppercase whitespace-nowrap">
                {footer.brandMain} <span className="text-gold">{footer.brandHighlight}</span>
              </span>
            </Link>
            <p className="text-text-para max-w-sm text-lg leading-relaxed mb-10 mx-auto md:mx-0 font-medium">
              {translateUiLabel("footerDescription", language) || footer.description}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-5">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a
                  key={`${label}-${href}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className="bg-noir-deep p-4 rounded-full hover:bg-gold transition-all group scale-wrap"
                >
                  <Icon className="w-6 h-6 text-text-soft group-hover:text-noir-deep" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="text-text-main font-black mb-8 uppercase tracking-widest text-xs">
              {translateUiLabel("footerNavigation", language) || footer.navigationTitle}
            </h4>
            <ul className="space-y-4 text-text-soft font-bold text-sm tracking-tight">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link href={link.path} className="hover:text-gold transition-colors inline-block hover:translate-x-1 transition-transform">
                    {translateRouteName(link.path, link.name, language)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-text-main font-black mb-8 uppercase tracking-widest text-xs">
              {translateUiLabel("footerContact", language) || footer.contactTitle}
            </h4>
            <ul className="space-y-6 text-text-soft text-sm font-bold">
              <li className="flex items-start md:items-center space-x-4 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-gold shrink-0" />
                <span className="leading-tight">{common.phones}</span>
              </li>
              <li className="flex items-start md:items-center space-x-4 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-gold shrink-0" />
                <span className="leading-tight lowercase">{common.email}</span>
              </li>
              <li className="flex items-start space-x-4 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-gold shrink-0 mt-1" />
                <span className="leading-tight">{common.address}</span>
              </li>
              <li className="flex items-start md:items-center space-x-4 justify-center md:justify-start">
                <Clock className="w-5 h-5 text-gold shrink-0" />
                <span className="leading-tight uppercase text-[10px]">{common.hours}</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center text-text-soft text-[10px] font-black tracking-[0.2em] uppercase mb-12">
          <p>{translateUiLabel("footerCopyright", language) || footer.copyright}</p>
          <div className="mt-4 flex items-center gap-4 md:mt-0">
             <Link href={links.routes.partners} className="hover:text-gold transition-all">
              {translateUiLabel("footerPartners", language) || footer.partnerLinkLabel}
             </Link>
             <Link
               href="/admin/login"
               className="text-[9px] tracking-[0.25em] opacity-35 transition hover:opacity-80 hover:text-gold"
               aria-label="Espace admin"
             >
               Espace admin
             </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
