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

function enforceStableServiceSchema(content: typeof siteContentFr): typeof siteContentFr {
  const canonical = siteContentFr.constants;
  const canonicalContactItems = siteContentFr.pages.contact.coordinates.items;

  if (!content?.constants) {
    return content;
  }

  const companerosServices = (content.constants.companerosServices || []).map((service, index) => {
    const source = canonical.companerosServices[index];
    return {
      ...service,
      id: source?.id ?? service.id,
      icon: source?.icon ?? service.icon,
    };
  });

  const jbkServices = (content.constants.jbkServices || []).map((service, index) => {
    const source = canonical.jbkServices[index];
    return {
      ...service,
      id: source?.id ?? service.id,
      icon: source?.icon ?? service.icon,
    };
  });

  const productions = (content.constants.productions || []).map((production, index) => {
    const source = canonical.productions[index];
    return {
      ...production,
      id: source?.id ?? production.id,
    };
  });

  const contactItems = (content.pages?.contact?.coordinates?.items || []).map((item, index) => {
    const source = canonicalContactItems[index];
    return {
      ...item,
      icon: source?.icon ?? item.icon,
    };
  });

  return {
    ...content,
    constants: {
      ...content.constants,
      companerosServices,
      jbkServices,
      productions,
    },
    pages: {
      ...content.pages,
      contact: {
        ...content.pages.contact,
        coordinates: {
          ...content.pages.contact.coordinates,
          items: contactItems,
        },
      },
    },
  };
}

const CONTENT_BY_LANGUAGE = {
  fr: enforceStableServiceSchema(normalizeNWithTilde(siteContentFr) as typeof siteContentFr),
  en: enforceStableServiceSchema(normalizeNWithTilde(siteContentEn) as typeof siteContentFr),
  es: enforceStableServiceSchema(normalizeNWithTilde(siteContentEs) as typeof siteContentFr),
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
