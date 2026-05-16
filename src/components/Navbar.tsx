"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { SITE_CONTENT } from "@/src/content/site-content";
import { translateRouteName, translateUiLabel } from "@/src/lib/i18n";
import { useSiteLanguage } from "@/src/components/i18n/LanguageProvider";
import LanguageSwitcher from "@/src/components/i18n/LanguageSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { language } = useSiteLanguage();
  const { links, desktopWhatsappLabel, mobileWhatsappLabel, logos } =
    SITE_CONTENT.navbar;
  const routes = SITE_CONTENT.links.routes;
  const whatsappUrl = `${SITE_CONTENT.links.whatsappBaseUrl}/${SITE_CONTENT.common.whatsappNumber}`;
  const desktopWhatsappText = translateUiLabel("desktopWhatsapp", language) || desktopWhatsappLabel;
  const mobileWhatsappText = translateUiLabel("mobileWhatsapp", language) || mobileWhatsappLabel;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLogo = () => {
    if (pathname === routes.companeros) {
      return (
        <div className="flex items-center group">
          <img
            src={logos.companeros.src}
            alt={logos.companeros.alt}
            className="h-12 w-auto max-w-[170px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-105 md:h-14"
          />
        </div>
      );
    }
    if (pathname === routes.jbk) {
      return (
        <div className="flex items-center group">
          <img
            src={logos.jbk.src}
            alt={logos.jbk.alt}
            className="h-12 w-auto max-w-[150px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-105 md:h-14"
          />
        </div>
      );
    }
    return (
      <div className="flex items-center group">
        <img
          src={logos.default.src}
          alt={logos.default.alt}
          className="h-12 w-auto max-w-[190px] rounded-lg object-contain transition-transform duration-300 group-hover:scale-105 md:h-14"
        />
      </div>
    );
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-noir-deep/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link href={routes.home} className="flex items-center">
           {getLogo()}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {links.map((link, idx) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <Link
                href={link.path}
                className={`text-xs font-bold tracking-widest uppercase transition-all hover:text-gold relative group ${
                  pathname === link.path ? "text-gold" : "text-text-para"
                }`}
              >
                {translateRouteName(link.path, link.name, language)}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full ${pathname === link.path ? 'w-full' : ''}`}></span>
              </Link>
            </motion.div>
          ))}
          <LanguageSwitcher />
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            href={whatsappUrl}
            className="gold-gradient text-noir-deep px-6 py-2 rounded-full text-xs font-black transition-all transform hover:scale-105 active:scale-95 gold-glow uppercase tracking-tighter"
          >
            {desktopWhatsappText}
          </motion.a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-text-main"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 lg:hidden bg-noir-deep flex flex-col p-8 pt-24"
          >
             <button
              className="absolute top-6 right-6 text-text-main"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-10 h-10" />
            </button>
            <div className="flex flex-col space-y-8">
              <div className="flex justify-start">
                <LanguageSwitcher />
              </div>
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl font-display font-black tracking-tighter ${
                    pathname === link.path ? "text-gold" : "text-text-main"
                  }`}
                >
                  {translateRouteName(link.path, link.name, language)}
                </Link>
              ))}
              <a
                href={whatsappUrl}
                onClick={() => setIsOpen(false)}
                className="gold-gradient text-noir-deep text-center py-5 rounded-2xl font-black text-xl gold-glow shadow-2xl"
              >
                {mobileWhatsappText}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
