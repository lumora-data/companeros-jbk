import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import SiteShell from "@/src/components/SiteShell";
import { SITE_CONTENT } from "@/src/content/site-content";

export const metadata: Metadata = {
  title: SITE_CONTENT.metadata.title,
  description: SITE_CONTENT.metadata.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
