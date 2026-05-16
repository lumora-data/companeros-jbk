"use client";

import { SITE_LANGUAGE_OPTIONS } from "@/src/lib/i18n";
import { useSiteLanguage } from "@/src/components/i18n/LanguageProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
};

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useSiteLanguage();

  return (
    <div
      className={`inline-flex items-center rounded-full border border-white/15 bg-noir-deep/80 ${
        compact ? "p-0.5" : "p-1"
      }`}
      aria-label="Language selector"
    >
      {SITE_LANGUAGE_OPTIONS.map((option) => {
        const isActive = language === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => setLanguage(option.value)}
            className={`rounded-full px-2.5 py-1 text-[10px] font-black tracking-wide transition md:text-xs ${
              isActive ? "bg-gold text-noir-deep" : "text-text-soft hover:text-text-main"
            }`}
            aria-pressed={isActive}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
