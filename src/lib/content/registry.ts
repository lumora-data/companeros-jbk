import "server-only";

import type { AdminContentType, EditableContentEntry } from "@/src/lib/content/types";

export const SITE_CONTENT_GITHUB_PATH = "src/content/site-content.json";

export const EDITABLE_CONTENT_REGISTRY: Record<AdminContentType, EditableContentEntry> = {
  home: {
    title: "Accueil",
    sections: [
      { key: "pages.home", label: "Page accueil" },
      { key: "navbar.logos", label: "Logos navbar / cartes" },
      { key: "constants.stats", label: "Statistiques accueil" },
      { key: "constants.partners", label: "Partenaires accueil" },
    ],
  },
  companeros: {
    title: "Compañeros",
    sections: [
      { key: "pages.companeros", label: "Page Compañeros" },
      { key: "constants.companerosServices", label: "Cartes services Compañeros" },
    ],
  },
  jbk: {
    title: "JBK",
    sections: [
      { key: "pages.jbk", label: "Page JBK" },
      { key: "constants.jbkServices", label: "Cartes services JBK" },
      { key: "constants.productions", label: "Productions JBK" },
    ],
  },
  about: {
    title: "À propos",
    sections: [
      { key: "pages.about", label: "Page À propos" },
    ],
  },
};

export function isAdminContentType(value: string): value is AdminContentType {
  return value in EDITABLE_CONTENT_REGISTRY;
}

export function allowedSectionKeysFor(type: AdminContentType): string[] {
  return EDITABLE_CONTENT_REGISTRY[type].sections.map((section) => section.key);
}
