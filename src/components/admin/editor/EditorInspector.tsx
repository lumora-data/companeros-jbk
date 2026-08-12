"use client";

import { SlidersHorizontal } from "lucide-react";
import ValueField from "./fields/ValueField";
import type { EditorSection } from "./utils";

type EditorInspectorProps = {
  section?: EditorSection;
  value: unknown;
  onChange: (next: unknown) => void;
  onUpload: (file: File) => Promise<string>;
};

export default function EditorInspector({ section, value, onChange, onUpload }: EditorInspectorProps) {
  if (!section) {
    return (
      <aside className="hidden w-[360px] shrink-0 rounded-2xl border border-black/10 bg-white p-4 shadow-sm xl:block">
        <p className="text-sm font-bold text-[#756b57]">Sélectionnez une section pour modifier son contenu.</p>
      </aside>
    );
  }

  return (
    <aside className="w-full shrink-0 rounded-2xl border border-black/10 bg-white shadow-sm xl:sticky xl:top-6 xl:h-[calc(100svh-3rem)] xl:w-[370px] xl:overflow-hidden">
      <div className="border-b border-black/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-wide text-[#8a806b]">
          <SlidersHorizontal className="h-4 w-4" />
          Inspecteur
        </div>
        <h2 className="text-xl font-black text-[#17130b]">{section.label}</h2>
        {section.description ? <p className="mt-1 text-sm text-[#756b57]">{section.description}</p> : null}
      </div>
      <div className="max-h-[calc(100svh-10rem)] space-y-3 overflow-y-auto p-4">
        <ValueField label={section.label} path={section.key.split(".")} value={value} onChange={onChange} onUpload={onUpload} />
      </div>
    </aside>
  );
}
