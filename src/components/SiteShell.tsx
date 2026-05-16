"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider, useSiteLanguage } from "@/src/components/i18n/LanguageProvider";

function LocalizedFrame({ children }: { children: ReactNode }) {
  const { language } = useSiteLanguage();

  return (
    <div key={language} className="flex min-h-screen flex-col bg-noir-deep font-sans text-text-main selection:bg-gold">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin") ?? false;

  if (isAdminPath) {
    return (
      <>
        <ScrollToTop />
        {children}
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <LanguageProvider>
        <LocalizedFrame>{children}</LocalizedFrame>
      </LanguageProvider>
    </>
  );
}
