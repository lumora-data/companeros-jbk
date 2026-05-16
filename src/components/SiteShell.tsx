"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Footer from "./Footer";
import FloatingWhatsApp from "./FloatingWhatsApp";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";
import { LanguageProvider } from "@/src/components/i18n/LanguageProvider";

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
        <div className="flex min-h-screen flex-col bg-noir-deep font-sans text-text-main selection:bg-gold">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </div>
      </LanguageProvider>
    </>
  );
}
