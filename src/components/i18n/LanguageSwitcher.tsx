"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { SITE_LANGUAGE_OPTIONS } from "@/src/lib/i18n";
import { useSiteLanguage } from "@/src/components/i18n/LanguageProvider";

type LanguageSwitcherProps = {
  compact?: boolean;
};

export default function LanguageSwitcher({ compact = false }: LanguageSwitcherProps) {
  const { language, setLanguage } = useSiteLanguage();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    window.addEventListener("mousedown", onPointerDown);
    return () => window.removeEventListener("mousedown", onPointerDown);
  }, []);

  const current = SITE_LANGUAGE_OPTIONS.find((option) => option.value === language) || SITE_LANGUAGE_OPTIONS[0];

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        className={`inline-flex items-center gap-2 rounded-full border border-white/15 bg-noir-deep/80 text-text-main transition hover:border-gold/60 ${
          compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-1.5 text-xs"
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none" aria-hidden="true">
          {current.flag}
        </span>
        <span className="font-black tracking-wide">{current.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div
          className="absolute right-0 z-[70] mt-2 min-w-[170px] overflow-hidden rounded-xl border border-white/15 bg-noir-card shadow-2xl"
          role="listbox"
          aria-label="Sélectionner la langue"
        >
          <div className="flex flex-col">
            {SITE_LANGUAGE_OPTIONS.map((option) => {
              const active = option.value === language;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setLanguage(option.value);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition ${
                    active ? "bg-gold/15 text-gold" : "text-text-main hover:bg-white/5"
                  }`}
                  role="option"
                  aria-selected={active}
                >
                  <span className="text-lg leading-none" aria-hidden="true">
                    {option.flag}
                  </span>
                  <span className="font-semibold">{option.nativeLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
