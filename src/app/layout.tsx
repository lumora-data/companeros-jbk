import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import SiteShell from "@/src/components/SiteShell";

export const metadata: Metadata = {
  title: "Compañeros-JBK Empire",
  description:
    "Deux pôles complémentaires accompagnent vos projets : Compañeros pour la formation, les langues et les voyages ; JBK pour l'audiovisuel, l'événementiel et les services créatifs.",
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
