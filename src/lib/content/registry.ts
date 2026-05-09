import "server-only";

import type { AdminContentType, EditableContentEntry } from "@/src/lib/content/types";

export const SITE_CONTENT_GITHUB_PATH = "src/content/site-content.json";

export const EDITABLE_CONTENT_REGISTRY: Record<AdminContentType, EditableContentEntry> = {
  companeros: {
    title: "Compañeros",
    sections: [
      { key: "pages.companeros", label: "Page Compañeros" },
      { key: "constants.companerosServices", label: "Cartes services Compañeros" },
    ],
  },
  jbk: {
    title: "JBK - Direction & Acteurs",
    sections: [
      {
        key: "pages.jbk.directionSection",
        label: "Direction JBK",
        description: "Direction JBK Films (titre + membres).",
      },
      {
        key: "pages.jbk.technicalTeamSection",
        label: "Équipe Technique & Agence d'Acteurs",
        description: "Acteurs et équipe technique JBK.",
      },
    ],
  },
};

export function isAdminContentType(value: string): value is AdminContentType {
  return value in EDITABLE_CONTENT_REGISTRY;
}

export function allowedSectionKeysFor(type: AdminContentType): string[] {
  return EDITABLE_CONTENT_REGISTRY[type].sections.map((section) => section.key);
}
