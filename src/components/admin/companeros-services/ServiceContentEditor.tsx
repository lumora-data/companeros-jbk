"use client";

import { Eye, ExternalLink } from "lucide-react";
import ValueField from "@/src/components/admin/editor/fields/ValueField";
import { humanizeLabel, isRecord } from "@/src/components/admin/editor/utils";
import type { ServiceConfig } from "./serviceConfig";

type ServiceContentEditorProps = {
  config?: ServiceConfig;
  value: unknown;
  onChange: (next: unknown) => void;
  onUpload: (file: File) => Promise<string>;
  onPreview: () => void;
};

function priorityEntries(value: Record<string, unknown>): [string, unknown][] {
  const preferred = ["hero", "firstImage", "introText", "secondImage", "thirdImage", "video", "cta"];
  const entries = Object.entries(value);
  return [
    ...preferred.flatMap((key) => entries.filter(([entryKey]) => entryKey === key)),
    ...entries.filter(([key]) => !preferred.includes(key)),
  ];
}

export default function ServiceContentEditor({ config, value, onChange, onUpload, onPreview }: ServiceContentEditorProps) {
  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 border-b border-black/10 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Contenu du service</p>
          <h2 className="text-xl font-black text-[#17130b]">{config?.label || "Service sans page dédiée"}</h2>
          <p className="mt-1 max-w-2xl text-sm text-[#756b57]">Modifiez ici la page détaillée : titres, paragraphes, images, listes, vidéo et bouton.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={onPreview} className="inline-flex items-center gap-2 rounded-lg bg-[#17130b] px-3 py-2 text-xs font-black uppercase text-white">
            <Eye className="h-4 w-4" />
            Voir le rendu
          </button>
          {config ? (
            <a href={config.publicPath} target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase text-[#17130b]">
              <ExternalLink className="h-4 w-4" />
              Page publique
            </a>
          ) : null}
        </div>
      </div>

      {!config ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
          Ce service n'a pas encore de page détaillée reliée dans la structure actuelle. Sa carte reste modifiable.
        </div>
      ) : isRecord(value) ? (
        <div className="space-y-4">
          {priorityEntries(value).map(([key, nested]) => (
            <div key={key} className="rounded-xl border border-black/10 bg-[#f8f6ef] p-4">
              <ValueField label={humanizeLabel(key)} path={[config.pageKey, key]} value={nested} onChange={(nextNested) => onChange({ ...value, [key]: nextNested })} onUpload={onUpload} />
            </div>
          ))}
        </div>
      ) : (
        <ValueField label="Contenu" path={[config.pageKey]} value={value} onChange={onChange} onUpload={onUpload} />
      )}
    </section>
  );
}
