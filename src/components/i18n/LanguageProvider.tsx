"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { DEFAULT_SITE_LANGUAGE, SITE_LANGUAGE_STORAGE_KEY, type SiteLanguage } from "@/src/lib/i18n";

type LanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<SiteLanguage>(DEFAULT_SITE_LANGUAGE);

  useEffect(() => {
    const stored = window.localStorage.getItem(SITE_LANGUAGE_STORAGE_KEY);
    if (stored === "fr" || stored === "en" || stored === "es") {
      setLanguageState(stored);
      document.documentElement.lang = stored;
      return;
    }
    document.documentElement.lang = DEFAULT_SITE_LANGUAGE;
  }, []);

  function setLanguage(next: SiteLanguage) {
    setLanguageState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SITE_LANGUAGE_STORAGE_KEY, next);
      document.documentElement.lang = next;
    }
  }

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) {
    return {
      language: DEFAULT_SITE_LANGUAGE,
      setLanguage: () => {
        // noop fallback to keep rendering resilient if provider is missing.
      },
    };
  }
  return context;
}
