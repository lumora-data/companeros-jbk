export type SiteLanguage = "fr" | "en" | "es";

export const DEFAULT_SITE_LANGUAGE: SiteLanguage = "fr";
export const SITE_LANGUAGE_STORAGE_KEY = "companeros_site_language";

export const SITE_LANGUAGE_OPTIONS: Array<{ value: SiteLanguage; label: string }> = [
  { value: "fr", label: "FR" },
  { value: "en", label: "EN" },
  { value: "es", label: "ES" },
];

type LanguageMap = Record<SiteLanguage, string>;

function pickByLanguage(values: LanguageMap, language: SiteLanguage): string {
  return values[language];
}

export function translateRouteName(path: string, fallback: string, language: SiteLanguage): string {
  const routeMap: Record<string, LanguageMap> = {
    "/": { fr: "Accueil", en: "Home", es: "Inicio" },
    "/companeros": { fr: "Compañeros & Services", en: "Compañeros & Services", es: "Compañeros y Servicios" },
    "/jbk": { fr: "JBK Films & Services", en: "JBK Films & Services", es: "JBK Films y Servicios" },
    "/a-propos": { fr: "À propos", en: "About", es: "Acerca de" },
    "/contact": { fr: "Contact", en: "Contact", es: "Contacto" },
  };

  const translated = routeMap[path];
  if (!translated) {
    return fallback;
  }
  return pickByLanguage(translated, language);
}

export function translateUiLabel(
  key:
    | "desktopWhatsapp"
    | "mobileWhatsapp"
    | "footerNavigation"
    | "footerContact"
    | "footerPartners"
    | "footerDescription"
    | "footerCopyright"
    | "homeHeroTitleLine1"
    | "homeHeroTitleLine2"
    | "homeHeroDescription"
    | "homeCompanerosDescription"
    | "homeJbkDescription"
    | "homeCtaHeading"
    | "homeTravelWithUs"
    | "homeCompanerosCta"
    | "homeJbkCta"
    | "homeContactCta"
    | "homeSince",
  language: SiteLanguage,
): string {
  const dictionary: Record<string, LanguageMap> = {
    desktopWhatsapp: {
      fr: "WhatsApp",
      en: "WhatsApp",
      es: "WhatsApp",
    },
    mobileWhatsapp: {
      fr: "DISCUTER SUR WHATSAPP",
      en: "CHAT ON WHATSAPP",
      es: "HABLAR POR WHATSAPP",
    },
    footerNavigation: {
      fr: "Navigation",
      en: "Navigation",
      es: "Navegación",
    },
    footerContact: {
      fr: "Coordonnées",
      en: "Contact Info",
      es: "Contacto",
    },
    footerPartners: {
      fr: "Partenaires",
      en: "Partners",
      es: "Socios",
    },
    footerDescription: {
      fr: "Deux pôles complémentaires pour accompagner vos projets : formation, voyages, langues, traduction, production audiovisuelle, événementiel et services créatifs.",
      en: "Two complementary divisions support your projects: training, travel, languages, translation, audiovisual production, events and creative services.",
      es: "Dos polos complementarios acompañan sus proyectos: formación, viajes, idiomas, traducción, producción audiovisual, eventos y servicios creativos.",
    },
    footerCopyright: {
      fr: "© 2026 Compañeros-JBK Empire. Tous droits réservés.",
      en: "© 2026 Compañeros-JBK Empire. All rights reserved.",
      es: "© 2026 Compañeros-JBK Empire. Todos los derechos reservados.",
    },
    homeHeroTitleLine1: {
      fr: "L'excellence",
      en: "Excellence",
      es: "La excelencia",
    },
    homeHeroTitleLine2: {
      fr: "à 360 degrés",
      en: "at 360 degrees",
      es: "a 360 grados",
    },
    homeHeroDescription: {
      fr: "Deux pôles complémentaires accompagnent vos projets : D'une part, Compañeros pour les voyages à l'étranger, le service de traduction et interprétation, les cours de langues et la formation professionnelle en danse Flamenco. D'autre part, JBK Films pour l'audiovisuel, l'événementiel et les services créatifs artistiques.",
      en: "Two complementary divisions support your projects: on one side, Compañeros for international travel, translation and interpretation, language courses and professional Flamenco training. On the other side, JBK Films for audiovisual, event and artistic creative services.",
      es: "Dos polos complementarios acompañan sus proyectos: por un lado, Compañeros para viajes al extranjero, traducción e interpretación, cursos de idiomas y formación profesional en baile Flamenco. Por otro lado, JBK Films para servicios audiovisuales, de eventos y creativos artísticos.",
    },
    homeCompanerosDescription: {
      fr: "Voyages, concours, langues, traduction, cours de soutien et activités culturelles.",
      en: "Travel, competitive exams, languages, translation, tutoring and cultural activities.",
      es: "Viajes, concursos, idiomas, traducción, clases de apoyo y actividades culturales.",
    },
    homeJbkDescription: {
      fr: "Production audiovisuelle, communication, événementiel, talents et services créatifs.",
      en: "Audiovisual production, communication, events, talent and creative services.",
      es: "Producción audiovisual, comunicación, eventos, talentos y servicios creativos.",
    },
    homeCtaHeading: {
      fr: "Besoin d'un accompagnement ?",
      en: "Need support?",
      es: "¿Necesitas acompañamiento?",
    },
    homeTravelWithUs: {
      fr: "Voyagez avec nous",
      en: "Travel with us",
      es: "Viaja con nosotros",
    },
    homeCompanerosCta: {
      fr: "DÉCOUVRIR LE CENTRE",
      en: "DISCOVER THE CENTER",
      es: "DESCUBRIR EL CENTRO",
    },
    homeJbkCta: {
      fr: "DÉCOUVRIR JBK",
      en: "DISCOVER JBK",
      es: "DESCUBRIR JBK",
    },
    homeContactCta: {
      fr: "NOUS CONTACTER",
      en: "CONTACT US",
      es: "CONTÁCTANOS",
    },
    homeSince: {
      fr: "Depuis",
      en: "Since",
      es: "Desde",
    },
  };

  return pickByLanguage(dictionary[key], language);
}
