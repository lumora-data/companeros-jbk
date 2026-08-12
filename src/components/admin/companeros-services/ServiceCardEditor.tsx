"use client";

import { ArrowRight, Globe, Plus, Trash2 } from "lucide-react";
import { TextareaField, TextField } from "@/src/components/admin/editor/fields/PrimitiveFields";
import type { ServiceCard } from "./serviceConfig";

type ServiceCardEditorProps = {
  service: ServiceCard;
  cardCtaLabel: string;
  onChange: (next: ServiceCard) => void;
};

export default function ServiceCardEditor({ service, cardCtaLabel, onChange }: ServiceCardEditorProps) {
  const details = service.details || [];

  return (
    <section className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Carte du service</p>
          <h2 className="text-xl font-black text-[#17130b]">Informations visibles sur la carte</h2>
        </div>
        <div className="hidden w-64 rounded-2xl bg-[#17130b] p-4 text-white md:block">
          <Globe className="mb-4 h-7 w-7 text-gold" />
          <h3 className="text-sm font-black uppercase leading-tight">{service.title}</h3>
          <p className="mt-2 line-clamp-3 text-xs leading-5 text-white/65">{service.description}</p>
          <p className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[10px] font-black uppercase tracking-wide text-gold">
            {cardCtaLabel} <ArrowRight className="h-3.5 w-3.5" />
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TextField label="Titre de la carte" value={service.title} onChange={(title) => onChange({ ...service, title })} />
        <TextField label="Icône" value={service.icon} onChange={(icon) => onChange({ ...service, icon })} />
        <div className="md:col-span-2">
          <TextareaField label="Résumé de la carte" value={service.description} onChange={(description) => onChange({ ...service, description })} />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-black/10 bg-[#f8f6ef] p-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-[#17130b]">Points clés</h3>
            <p className="text-xs font-semibold text-[#756b57]">Contenu complémentaire du modèle actuel.</p>
          </div>
          <button type="button" onClick={() => onChange({ ...service, details: [...details, "Nouveau point"] })} className="inline-flex items-center gap-1 rounded-lg bg-gold px-2.5 py-1.5 text-[11px] font-black uppercase text-[#17130b]">
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {details.map((detail, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                value={detail}
                onChange={(event) => {
                  const copy = [...details];
                  copy[index] = event.target.value;
                  onChange({ ...service, details: copy });
                }}
                className="min-w-0 flex-1 rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-gold"
              />
              <button type="button" onClick={() => onChange({ ...service, details: details.filter((_, itemIndex) => itemIndex !== index) })} className="rounded-lg border border-black/10 bg-white p-2 text-red-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
