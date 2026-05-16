import siteContentFr from "./site-content.json";
import siteContentEn from "./site-content.en.json";
import siteContentEs from "./site-content.es.json";
import { getCurrentSiteLanguage, type SiteLanguage } from "@/src/lib/i18n";

function normalizeNWithTilde(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/ń/g, "ñ").replace(/Ń/g, "Ñ");
  }

  if (Array.isArray(value)) {
    return value.map(normalizeNWithTilde);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, normalizeNWithTilde(nestedValue)]),
    );
  }

  return value;
}

const CONTENT_BY_LANGUAGE = {
  fr: normalizeNWithTilde(siteContentFr) as typeof siteContentFr,
  en: normalizeNWithTilde(siteContentEn) as typeof siteContentFr,
  es: normalizeNWithTilde(siteContentEs) as typeof siteContentFr,
};

export function getSiteContentForLanguage(language: SiteLanguage): typeof siteContentFr {
  return CONTENT_BY_LANGUAGE[language] || CONTENT_BY_LANGUAGE.fr;
}

function getActiveSiteContent(): typeof siteContentFr {
  return getSiteContentForLanguage(getCurrentSiteLanguage());
}

export const SITE_CONTENT = new Proxy(CONTENT_BY_LANGUAGE.fr, {
  get(_target, property, receiver) {
    const active = getActiveSiteContent();
    return Reflect.get(active, property, receiver);
  },
}) as typeof siteContentFr;
