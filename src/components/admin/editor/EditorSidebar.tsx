"use client";

import Link from "next/link";
import { Building2, Film } from "lucide-react";
import type { EditorSection } from "./utils";
import { sectionIconFor } from "./utils";

type EditorSidebarProps = {
  type: "companeros" | "jbk";
  sections: EditorSection[];
  selectedKey: string;
  changedKeys: Set<string>;
  onSelect: (key: string) => void;
};

const PAGES = [
  { type: "companeros", label: "Compañeros", href: "/admin/companeros", icon: Building2 },
  { type: "jbk", label: "JBK", href: "/admin/jbk", icon: Film },
] as const;

export default function EditorSidebar({ type, sections, selectedKey, changedKeys, onSelect }: EditorSidebarProps) {
  return (
    <aside className="w-full shrink-0 rounded-2xl border border-black/10 bg-white p-3 shadow-sm xl:sticky xl:top-6 xl:h-[calc(100svh-3rem)] xl:w-[270px]">
      <div className="mb-4 border-b border-black/10 pb-4">
        <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Pages</p>
        <div className="space-y-1">
          {PAGES.map((page) => {
            const Icon = page.icon;
            const active = page.type === type;
            return (
              <Link
                key={page.type}
                href={page.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-black transition ${
                  active ? "bg-gold text-[#17130b]" : "text-[#514837] hover:bg-[#f5f2ea]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {page.label}
              </Link>
            );
          })}
        </div>
      </div>

      <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Sections</p>
      <div className="space-y-1">
        {sections.map((section) => {
          const Icon = sectionIconFor(section);
          const active = section.key === selectedKey;
          const changed = changedKeys.has(section.key);
          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onSelect(section.key)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-bold transition ${
                active ? "bg-[#17130b] text-white shadow-sm" : "text-[#514837] hover:bg-[#f5f2ea]"
              }`}
            >
              <Icon className={`h-4 w-4 shrink-0 ${active ? "text-gold" : "text-[#987716]"}`} />
              <span className="min-w-0 flex-1 truncate">{section.label}</span>
              {changed ? <span className="h-2 w-2 rounded-full bg-gold" aria-label="Modifié" /> : null}
            </button>
          );
        })}
      </div>
      <p className="mt-4 rounded-xl bg-[#f5f2ea] p-3 text-xs font-semibold leading-5 text-[#756b57]">
        L'ordre des sections est conservé pour respecter la structure actuelle du site.
      </p>
    </aside>
  );
}
