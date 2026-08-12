"use client";

import { Eye, Laptop, Loader2, Redo2, RotateCcw, Save, Smartphone, Tablet, Undo2 } from "lucide-react";
import type { DeviceMode } from "./utils";

type EditorTopbarProps = {
  title: string;
  device: DeviceMode;
  hasChanges: boolean;
  changedCount: number;
  saving: boolean;
  canUndo: boolean;
  canRedo: boolean;
  onDeviceChange: (device: DeviceMode) => void;
  onSave: () => void;
  onReload: () => void;
  onUndo: () => void;
  onRedo: () => void;
};

const DEVICES = [
  { value: "desktop", label: "Desktop", icon: Laptop },
  { value: "tablet", label: "Tablet", icon: Tablet },
  { value: "mobile", label: "Mobile", icon: Smartphone },
] as const;

export default function EditorTopbar({
  title,
  device,
  hasChanges,
  changedCount,
  saving,
  canUndo,
  canRedo,
  onDeviceChange,
  onSave,
  onReload,
  onUndo,
  onRedo,
}: EditorTopbarProps) {
  return (
    <div className="sticky top-0 z-30 rounded-2xl border border-black/10 bg-white/95 px-3 py-3 shadow-sm backdrop-blur md:px-4">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-black uppercase tracking-wide text-[#8a806b]">CMS visuel</p>
          <h1 className="truncate text-lg font-black text-[#17130b] md:text-xl">{title}</h1>
        </div>

        <div className="flex items-center gap-1 rounded-xl bg-[#f5f2ea] p-1">
          {DEVICES.map((item) => {
            const Icon = item.icon;
            const active = device === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onDeviceChange(item.value)}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-black transition ${
                  active ? "bg-white text-[#17130b] shadow-sm" : "text-[#756b57] hover:text-[#17130b]"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1.5 text-xs font-bold ${hasChanges ? "bg-gold/20 text-[#6f560f]" : "bg-emerald-50 text-emerald-800"}`}>
            {hasChanges ? `${changedCount} modification${changedCount > 1 ? "s" : ""} non enregistrée${changedCount > 1 ? "s" : ""}` : "Toutes les modifications sont enregistrées"}
          </span>
          <button type="button" onClick={onUndo} disabled={!canUndo} className="rounded-lg border border-black/10 bg-white p-2 text-[#17130b] disabled:opacity-30" aria-label="Annuler">
            <Undo2 className="h-4 w-4" />
          </button>
          <button type="button" onClick={onRedo} disabled={!canRedo} className="rounded-lg border border-black/10 bg-white p-2 text-[#17130b] disabled:opacity-30" aria-label="Rétablir">
            <Redo2 className="h-4 w-4" />
          </button>
          <button type="button" onClick={onReload} disabled={saving} className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase text-[#17130b] disabled:opacity-50">
            <RotateCcw className="h-4 w-4" />
            Recharger
          </button>
          <a href="/" target="_blank" className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase text-[#17130b]">
            <Eye className="h-4 w-4" />
            Aperçu
          </a>
          <button type="button" onClick={onSave} disabled={!hasChanges || saving} className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2 text-xs font-black uppercase text-[#17130b] disabled:opacity-50">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
