export type SiteLanguage = "fr" | "en" | "es";

export const DEFAULT_SITE_LANGUAGE: SiteLanguage = "fr";
export const SITE_LANGUAGE_STORAGE_KEY = "companeros_site_language";

export const SITE_LANGUAGE_OPTIONS: Array<{
  value: SiteLanguage;
  label: string;
  flag: string;
  nativeLabel: string;
}> = [
  { value: "fr", label: "FR", flag: "🇫🇷", nativeLabel: "Français" },
  { value: "en", label: "EN", flag: "🇬🇧", nativeLabel: "English" },
  { value: "es", label: "ES", flag: "🇪🇸", nativeLabel: "Español" },
];

let currentSiteLanguage: SiteLanguage = DEFAULT_SITE_LANGUAGE;

export function setCurrentSiteLanguage(language: SiteLanguage) {
  currentSiteLanguage = language;
}

export function getCurrentSiteLanguage(): SiteLanguage {
  if (typeof document !== "undefined") {
    const htmlLang = document.documentElement.lang.toLowerCase();
    if (htmlLang.startsWith("en")) return "en";
    if (htmlLang.startsWith("es")) return "es";
    if (htmlLang.startsWith("fr")) return "fr";
  }
  return currentSiteLanguage;
}
