"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, RotateCcw, Save, X } from "lucide-react";
import ServiceCardEditor from "./ServiceCardEditor";
import ServiceContentEditor from "./ServiceContentEditor";
import ServiceList from "./ServiceList";
import {
  SERVICE_CARD_SECTION_KEY,
  configForService,
  createServiceFromTemplate,
  type ServiceCard,
} from "./serviceConfig";
import { isRecord } from "@/src/components/admin/editor/utils";

type ServicesManagerProps = {
  title: string;
  sections: Record<string, unknown>;
  initialSections: Record<string, unknown>;
  saving: boolean;
  success?: string | null;
  lastCommitUrl?: string | null;
  onSectionsChange: (next: Record<string, unknown>) => void;
  onSave: () => void;
  onReload: () => void;
  onUpload: (file: File) => Promise<string>;
};

function serviceCardsFromSections(sections: Record<string, unknown>): ServiceCard[] {
  const cards = sections[SERVICE_CARD_SECTION_KEY];
  return Array.isArray(cards) ? (cards as ServiceCard[]) : [];
}

function getCardCtaLabel(sections: Record<string, unknown>): string {
  const page = sections["pages.companeros"];
  if (isRecord(page) && isRecord(page.services) && typeof page.services.cardCtaLabel === "string") {
    return page.services.cardCtaLabel;
  }
  return "Modifier";
}

export default function ServicesManager({
  title,
  sections,
  initialSections,
  saving,
  success,
  lastCommitUrl,
  onSectionsChange,
  onSave,
  onReload,
  onUpload,
}: ServicesManagerProps) {
  const services = serviceCardsFromSections(sections);
  const [selectedId, setSelectedId] = useState(services[0]?.id || "");
  const [previewOpen, setPreviewOpen] = useState(false);

  useEffect(() => {
    if (!services.some((service) => service.id === selectedId)) {
      setSelectedId(services[0]?.id || "");
    }
  }, [selectedId, services]);

  const selectedIndex = services.findIndex((service) => service.id === selectedId);
  const selectedService = services[selectedIndex];
  const selectedConfig = selectedService ? configForService(selectedService.id) : undefined;
  const detailValue = selectedConfig ? sections[selectedConfig.pageKey] : undefined;
  const initialServices = serviceCardsFromSections(initialSections);
  const changedServiceIds = useMemo(() => {
    const ids = new Set<string>();
    services.forEach((service, index) => {
      const initial = initialServices.find((item) => item.id === service.id) || initialServices[index];
      if (JSON.stringify(service) !== JSON.stringify(initial)) ids.add(service.id);
      const config = configForService(service.id);
      if (config && JSON.stringify(sections[config.pageKey]) !== JSON.stringify(initialSections[config.pageKey])) ids.add(service.id);
    });
    return ids;
  }, [initialServices, initialSections, sections, services]);
  const hasChanges = JSON.stringify(sections) !== JSON.stringify(initialSections);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        if (hasChanges && !saving) onSave();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [hasChanges, onSave, saving]);

  function updateServices(nextServices: ServiceCard[]) {
    onSectionsChange({ ...sections, [SERVICE_CARD_SECTION_KEY]: nextServices });
  }

  function updateSelectedService(next: ServiceCard) {
    updateServices(services.map((service) => (service.id === next.id ? next : service)));
  }

  function moveService(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= services.length) return;
    const copy = [...services];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    updateServices(copy);
  }

  function addService() {
    const next = createServiceFromTemplate(services.length);
    updateServices([...services, next]);
    setSelectedId(next.id);
  }

  function deleteService(service: ServiceCard) {
    const confirmed = window.confirm(`Supprimer définitivement le service « ${service.title} » ?`);
    if (!confirmed) return;
    updateServices(services.filter((item) => item.id !== service.id));
  }

  function updateDetail(next: unknown) {
    if (!selectedConfig) return;
    onSectionsChange({ ...sections, [selectedConfig.pageKey]: next });
  }

  return (
    <div className="space-y-4">
      <div className="sticky top-0 z-20 rounded-2xl border border-black/10 bg-white/95 p-4 shadow-sm backdrop-blur">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Vue principale</p>
            <h1 className="text-2xl font-black text-[#17130b]">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${hasChanges ? "bg-gold/20 text-[#6f560f]" : "bg-emerald-50 text-emerald-800"}`}>
              {hasChanges ? "Modifications non enregistrées" : "Toutes les modifications sont enregistrées"}
            </span>
            <button type="button" onClick={onReload} disabled={saving} className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase text-[#17130b] disabled:opacity-50">
              <RotateCcw className="h-4 w-4" />
              Recharger
            </button>
            <button type="button" onClick={onSave} disabled={!hasChanges || saving} className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-xs font-black uppercase text-[#17130b] disabled:opacity-50">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Enregistrer
            </button>
          </div>
        </div>
        {success ? (
          <div className="mt-3 rounded-lg border border-emerald-500/40 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <span>{success}</span>
            </div>
            {lastCommitUrl ? <a href={lastCommitUrl} target="_blank" className="mt-2 inline-block text-xs font-bold underline underline-offset-4">Voir le commit GitHub</a> : null}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 lg:flex lg:items-start">
        <ServiceList services={services} selectedId={selectedId} changed={changedServiceIds} onSelect={setSelectedId} onMove={moveService} onAdd={addService} onDelete={deleteService} />
        <main className="min-w-0 flex-1 space-y-4">
          {selectedService ? (
            <>
              <ServiceCardEditor service={selectedService} cardCtaLabel={getCardCtaLabel(sections)} onChange={updateSelectedService} />
              <ServiceContentEditor config={selectedConfig} value={detailValue} onChange={updateDetail} onUpload={onUpload} onPreview={() => setPreviewOpen(true)} />
            </>
          ) : (
            <div className="rounded-2xl border border-black/10 bg-white p-8 text-center text-sm font-semibold text-[#756b57]">Aucun service pour le moment.</div>
          )}
        </main>
      </div>

      {previewOpen && selectedService ? (
        <div className="fixed inset-0 z-50 bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
          <div className="mx-auto flex max-h-[92svh] max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-black/10 p-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Aperçu</p>
                <h2 className="text-xl font-black text-[#17130b]">{selectedService.title}</h2>
              </div>
              <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-lg border border-black/10 p-2">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto bg-noir-deep p-6 text-white">
              <div className="rounded-2xl border border-white/10 bg-noir-card p-6">
                <p className="mb-4 inline-block rounded-full bg-gold px-4 py-1 text-[10px] font-black uppercase tracking-wide text-noir-deep">{selectedService.icon}</p>
                <h3 className="text-4xl font-black uppercase tracking-tight">{selectedService.title}</h3>
                <p className="mt-4 max-w-3xl whitespace-pre-line text-lg leading-8 text-text-para">{selectedService.description}</p>
                {selectedService.details?.length ? (
                  <ul className="mt-8 grid gap-3 md:grid-cols-2">
                    {selectedService.details.map((detail) => <li key={detail} className="rounded-xl border border-white/10 bg-noir-deep p-4 text-sm font-bold">{detail}</li>)}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
