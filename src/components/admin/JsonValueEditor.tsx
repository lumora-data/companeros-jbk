"use client";

import { useId, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ImagePlus, Plus, Trash2 } from "lucide-react";

type JsonValueEditorProps = {
  label: string;
  path: string;
  value: unknown;
  depth?: number;
  onChange: (next: unknown) => void;
  onUpload: (file: File) => Promise<string>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function looksLikeMediaField(path: string): boolean {
  return /(image|images|logo|photo|thumbnail|cover|avatar|background|banner|src|url)/i.test(path);
}

function looksLikeImageValue(value: string): boolean {
  if (!value) {
    return false;
  }
  return /^https?:\/\//i.test(value) || value.startsWith("/") || /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(value);
}

function shouldUseTextarea(path: string, label: string, value: string): boolean {
  if (value.includes("\n") || value.length > 120) {
    return true;
  }
  return /(description|content|texte|text|paragraph|subtitle|body|message)/i.test(`${path} ${label}`);
}

function guessNewArrayItem(from: unknown[]): unknown {
  const sample = from.find((item) => item !== null && item !== undefined);
  if (typeof sample === "string") {
    return "";
  }
  if (typeof sample === "number") {
    return 0;
  }
  if (typeof sample === "boolean") {
    return false;
  }
  if (Array.isArray(sample)) {
    return [];
  }
  if (isRecord(sample)) {
    return {};
  }
  return "";
}

function StringField({
  label,
  path,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  path: string;
  value: string;
  onChange: (next: string) => void;
  onUpload: (file: File) => Promise<string>;
}) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const isLongText = shouldUseTextarea(path, label, value);
  const mediaField = looksLikeMediaField(path) || looksLikeImageValue(value);
  const showPreview = looksLikeImageValue(value);

  async function handleFileChange(file: File | null) {
    if (!file) {
      return;
    }
    setUploading(true);
    setUploadError(null);
    try {
      const uploadedUrl = await onUpload(file);
      onChange(uploadedUrl);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload impossible.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-xl border border-white/10 bg-noir-card/50 p-3 md:p-4">
      <label className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-text-soft">{label}</label>

      {isLongText ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={Math.min(10, Math.max(3, Math.ceil(value.length / 90)))}
          className="w-full resize-y rounded-lg border border-white/10 bg-noir-deep px-3 py-2 text-sm text-text-main outline-none transition focus:border-gold/70"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-white/10 bg-noir-deep px-3 py-2 text-sm text-text-main outline-none transition focus:border-gold/70"
        />
      )}

      {showPreview ? (
        <div className="mt-3 overflow-hidden rounded-lg border border-white/10 bg-black/30 p-2">
          <img src={value} alt={label} className="max-h-72 w-full rounded-md object-contain object-center" />
        </div>
      ) : null}

      {mediaField ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 bg-noir-deep px-3 py-2 text-xs font-bold uppercase tracking-wide text-text-main transition hover:border-gold/50"
          >
            <ImagePlus className="h-3.5 w-3.5" />
            {uploading ? "Upload..." : "Changer image"}
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => void handleFileChange(event.target.files?.[0] ?? null)}
          />
        </div>
      ) : null}

      {uploadError ? <p className="mt-2 text-xs text-red-300">{uploadError}</p> : null}
    </div>
  );
}

export default function JsonValueEditor({
  label,
  path,
  value,
  depth = 0,
  onChange,
  onUpload,
}: JsonValueEditorProps) {
  const indentationClass = useMemo(() => {
    if (depth <= 0) {
      return "";
    }
    if (depth === 1) {
      return "md:ml-2";
    }
    if (depth === 2) {
      return "md:ml-4";
    }
    return "md:ml-6";
  }, [depth]);

  if (typeof value === "string") {
    return (
      <div className={indentationClass}>
        <StringField label={label} path={path} value={value} onChange={onChange} onUpload={onUpload} />
      </div>
    );
  }

  if (typeof value === "number") {
    return (
      <label className={`block ${indentationClass}`}>
        <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-text-soft">{label}</span>
        <input
          type="number"
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full rounded-lg border border-white/10 bg-noir-deep px-3 py-2 text-sm text-text-main outline-none transition focus:border-gold/70"
        />
      </label>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className={`flex items-center justify-between rounded-xl border border-white/10 bg-noir-card/50 px-3 py-3 ${indentationClass}`}>
        <span className="text-sm font-bold text-text-main">{label}</span>
        <input
          type="checkbox"
          checked={value}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 accent-gold"
        />
      </label>
    );
  }

  if (Array.isArray(value)) {
    return (
      <div className={`space-y-3 rounded-xl border border-white/10 bg-noir-card/40 p-3 md:p-4 ${indentationClass}`}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-text-soft">{label}</p>
          <button
            type="button"
            onClick={() => onChange([...value, guessNewArrayItem(value)])}
            className="inline-flex items-center gap-1 rounded-md border border-white/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-text-main transition hover:border-gold/50"
          >
            <Plus className="h-3.5 w-3.5" />
            Ajouter
          </button>
        </div>

        <div className="space-y-3">
          {value.map((item, index) => (
            <div key={`${path}.${index}`} className="rounded-lg border border-white/10 bg-noir-deep/60 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-text-soft">Élément {index + 1}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (index === 0) return;
                      const copy = [...value];
                      const previous = copy[index - 1];
                      copy[index - 1] = copy[index];
                      copy[index] = previous;
                      onChange(copy);
                    }}
                    className="rounded-md border border-white/10 p-1 text-text-main hover:border-gold/60"
                    aria-label="Monter"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (index >= value.length - 1) return;
                      const copy = [...value];
                      const next = copy[index + 1];
                      copy[index + 1] = copy[index];
                      copy[index] = next;
                      onChange(copy);
                    }}
                    className="rounded-md border border-white/10 p-1 text-text-main hover:border-gold/60"
                    aria-label="Descendre"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange(value.filter((_, currentIndex) => currentIndex !== index))}
                    className="rounded-md border border-white/10 p-1 text-red-300 hover:border-red-400/70"
                    aria-label="Supprimer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <JsonValueEditor
                label={`${label}[${index}]`}
                path={`${path}.${index}`}
                value={item}
                depth={depth + 1}
                onChange={(nextItem) => {
                  const copy = [...value];
                  copy[index] = nextItem;
                  onChange(copy);
                }}
                onUpload={onUpload}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isRecord(value)) {
    return (
      <div className={`space-y-3 rounded-xl border border-white/10 bg-noir-card/30 p-3 md:p-4 ${indentationClass}`}>
        <p className="text-xs font-semibold text-text-soft">{label}</p>
        {Object.entries(value).map(([key, nestedValue]) => (
          <JsonValueEditor
            key={`${path}.${key}`}
            label={key}
            path={`${path}.${key}`}
            value={nestedValue}
            depth={depth + 1}
            onChange={(nextNested) => onChange({ ...value, [key]: nextNested })}
            onUpload={onUpload}
          />
        ))}
      </div>
    );
  }

  return (
    <label className={`block ${indentationClass}`}>
      <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-text-soft">{label}</span>
      <input
        type="text"
        value={value == null ? "" : String(value)}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-white/10 bg-noir-deep px-3 py-2 text-sm text-text-main outline-none transition focus:border-gold/70"
      />
    </label>
  );
}
