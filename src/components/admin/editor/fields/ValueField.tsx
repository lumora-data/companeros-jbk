"use client";

import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, Plus, Trash2 } from "lucide-react";
import { BooleanField, ImageField, NumberField, TextareaField, TextField, UrlField } from "./PrimitiveFields";
import { getItemTitle, humanizeLabel, isRecord, looksLikeImage, looksLikeUrl } from "@/src/components/admin/editor/utils";

type ValueFieldProps = {
  label: string;
  path: string[];
  value: unknown;
  onChange: (next: unknown) => void;
  onUpload: (file: File) => Promise<string>;
};

function shouldUseTextarea(path: string[], label: string, value: string): boolean {
  return value.includes("\n") || value.length > 120 || /(description|content|texte|text|paragraph|subtitle|body|message|bio)/i.test([...path, label].join("."));
}

function guessNewArrayItem(items: unknown[]): unknown {
  const sample = items.find((item) => item !== null && item !== undefined);
  if (typeof sample === "string") return "";
  if (typeof sample === "number") return 0;
  if (typeof sample === "boolean") return false;
  if (Array.isArray(sample)) return [];
  if (isRecord(sample)) {
    return Object.fromEntries(Object.entries(sample).map(([key, value]) => [key, typeof value === "number" ? 0 : typeof value === "boolean" ? false : ""]));
  }
  return "";
}

export default function ValueField({ label, path, value, onChange, onUpload }: ValueFieldProps) {
  const readableLabel = humanizeLabel(label, path);

  if (typeof value === "string") {
    if (looksLikeImage(path, value)) {
      return <ImageField label={readableLabel} value={value} onChange={onChange} onUpload={onUpload} />;
    }
    if (looksLikeUrl(path)) {
      return <UrlField label={readableLabel} value={value} onChange={onChange} />;
    }
    if (shouldUseTextarea(path, label, value)) {
      return <TextareaField label={readableLabel} value={value} onChange={onChange} />;
    }
    return <TextField label={readableLabel} value={value} onChange={onChange} />;
  }

  if (typeof value === "number") {
    return <NumberField label={readableLabel} value={value} onChange={onChange} />;
  }

  if (typeof value === "boolean") {
    return <BooleanField label={readableLabel} value={value} onChange={onChange} />;
  }

  if (Array.isArray(value)) {
    return (
      <div className="rounded-xl border border-black/10 bg-[#f8f6ef] p-3">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-black text-[#17130b]">{readableLabel}</p>
            <p className="text-xs font-semibold text-[#756b57]">{value.length} élément{value.length > 1 ? "s" : ""}</p>
          </div>
          <button
            type="button"
            onClick={() => onChange([...value, guessNewArrayItem(value)])}
            className="inline-flex items-center gap-1 rounded-lg bg-gold px-2.5 py-1.5 text-[11px] font-black uppercase text-[#17130b]"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>
        <div className="space-y-2">
          {value.map((item, index) => (
            <details key={`${path.join(".")}.${index}`} className="group rounded-lg border border-black/10 bg-white p-2" open={index === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="flex min-w-0 items-center gap-2 text-sm font-bold text-[#17130b]">
                  <ChevronRight className="h-4 w-4 text-[#756b57] group-open:hidden" />
                  <ChevronDown className="hidden h-4 w-4 text-[#756b57] group-open:block" />
                  <span className="truncate">{getItemTitle(item, `${readableLabel} ${index + 1}`)}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    aria-label="Monter"
                    disabled={index === 0}
                    onClick={(event) => {
                      event.preventDefault();
                      const copy = [...value];
                      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
                      onChange(copy);
                    }}
                    className="rounded-md border border-black/10 p-1 text-[#17130b] disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Descendre"
                    disabled={index === value.length - 1}
                    onClick={(event) => {
                      event.preventDefault();
                      const copy = [...value];
                      [copy[index + 1], copy[index]] = [copy[index], copy[index + 1]];
                      onChange(copy);
                    }}
                    className="rounded-md border border-black/10 p-1 text-[#17130b] disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Supprimer"
                    onClick={(event) => {
                      event.preventDefault();
                      onChange(value.filter((_, itemIndex) => itemIndex !== index));
                    }}
                    className="rounded-md border border-black/10 p-1 text-red-700"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </span>
              </summary>
              <div className="mt-3 space-y-3 border-t border-black/10 pt-3">
                <ValueField
                  label={getItemTitle(item, `${readableLabel} ${index + 1}`)}
                  path={[...path, String(index)]}
                  value={item}
                  onChange={(nextItem) => {
                    const copy = [...value];
                    copy[index] = nextItem;
                    onChange(copy);
                  }}
                  onUpload={onUpload}
                />
              </div>
            </details>
          ))}
        </div>
      </div>
    );
  }

  if (isRecord(value)) {
    return (
      <div className="space-y-3 rounded-xl border border-black/10 bg-[#f8f6ef] p-3">
        <p className="text-sm font-black text-[#17130b]">{readableLabel}</p>
        {Object.entries(value).map(([key, nestedValue]) => (
          <ValueField
            key={[...path, key].join(".")}
            label={key}
            path={[...path, key]}
            value={nestedValue}
            onChange={(nextNested) => onChange({ ...value, [key]: nextNested })}
            onUpload={onUpload}
          />
        ))}
      </div>
    );
  }

  return <TextField label={readableLabel} value={value == null ? "" : String(value)} onChange={onChange} />;
}
