import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollAnimator } from "@/components/ScrollAnimator";
import { contact } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Compañeros-JBK Empire",
  description:
    "Site vitrine de Compañeros & Services et JBK & Services : voyages, formations, langues, audiovisuel, événementiel et services créatifs.",
  icons: {
    icon: "/brand/companeros-empire-logo.png",
    shortcut: "/brand/companeros-empire-logo.png",
    apple: "/brand/companeros-empire-logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <ScrollAnimator />
        {children}
        <Footer />
        <a className="fab" href={contact.whatsapp} target="_blank" rel="noreferrer" aria-label="Écrire sur WhatsApp">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path
              fill="currentColor"
              d="M16.02 3.2A12.78 12.78 0 0 0 5.05 22.52L3.2 29l6.64-1.74A12.75 12.75 0 0 0 16.02 28.8h.01A12.8 12.8 0 0 0 16.02 3.2Zm0 23.43h-.01a10.6 10.6 0 0 1-5.4-1.48l-.39-.23-3.94 1.03 1.05-3.84-.25-.4a10.6 10.6 0 1 1 8.94 4.92Zm5.82-7.94c-.32-.16-1.9-.94-2.2-1.04-.3-.11-.52-.16-.74.16-.21.32-.84 1.04-1.03 1.25-.19.21-.38.24-.7.08-.32-.16-1.35-.5-2.58-1.59-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.38.48-.57.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.68 0 1.58 1.16 3.11 1.32 3.32.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.04.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z"
            />
          </svg>
        </a>
      </body>
    </html>
  );
}
