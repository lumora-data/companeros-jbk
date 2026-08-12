"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ServiceCard } from "./serviceConfig";

type ServiceListProps = {
  services: ServiceCard[];
  selectedId: string;
  changed: Set<string>;
  onSelect: (id: string) => void;
  onMove: (index: number, direction: -1 | 1) => void;
  onAdd: () => void;
  onDelete: (service: ServiceCard) => void;
};

export default function ServiceList({ services, selectedId, changed, onSelect, onMove, onAdd, onDelete }: ServiceListProps) {
  return (
    <aside className="rounded-2xl border border-black/10 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-[calc(100svh-3rem)] lg:w-[310px]">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-black/10 pb-4">
        <div>
          <p className="text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Compañeros</p>
          <h2 className="text-xl font-black text-[#17130b]">Services</h2>
        </div>
        <button type="button" onClick={onAdd} className="inline-flex items-center gap-1 rounded-lg bg-gold px-3 py-2 text-xs font-black uppercase text-[#17130b]">
          <Plus className="h-4 w-4" />
          Ajouter
        </button>
      </div>

      <div className="space-y-2 overflow-y-auto lg:max-h-[calc(100svh-11rem)]">
        {services.map((service, index) => {
          const active = service.id === selectedId;
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => onSelect(service.id)}
              className={`w-full rounded-xl border p-3 text-left transition ${
                active ? "border-[#17130b] bg-[#17130b] text-white" : "border-black/10 bg-[#f8f6ef] text-[#17130b] hover:border-gold/70"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-sm font-black">{service.title}</h3>
                  <p className={`mt-1 line-clamp-2 text-xs leading-5 ${active ? "text-white/70" : "text-[#756b57]"}`}>{service.description}</p>
                </div>
                {changed.has(service.id) ? <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" /> : null}
              </div>
              <div className="mt-3 flex items-center gap-1">
                <span className={`mr-auto rounded-full px-2 py-1 text-[10px] font-black uppercase ${active ? "bg-white/10 text-white" : "bg-white text-[#756b57]"}`}>
                  {service.icon}
                </span>
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(event) => {
                    event.stopPropagation();
                    onMove(index, -1);
                  }}
                  className="rounded-md border border-current/15 p-1"
                >
                  <ArrowUp className="h-3.5 w-3.5" />
                </span>
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(event) => {
                    event.stopPropagation();
                    onMove(index, 1);
                  }}
                  className="rounded-md border border-current/15 p-1"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </span>
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={(event) => {
                    event.stopPropagation();
                    onDelete(service);
                  }}
                  className="rounded-md border border-current/15 p-1 text-red-500"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
