"use client";

import { ChangeEvent, DragEvent, useId, useState } from "react";
import { ImagePlus, LinkIcon, Loader2, Trash2, Type } from "lucide-react";

type BaseProps<T> = {
  label: string;
  value: T;
  onChange: (next: T) => void;
};

export function TextField({ label, value, onChange }: BaseProps<string>) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#514837]">
        <Type className="h-3.5 w-3.5 text-[#987716]" />
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#17130b] outline-none transition focus:border-gold"
      />
    </label>
  );
}

export function TextareaField({ label, value, onChange }: BaseProps<string>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-[#514837]">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={Math.min(9, Math.max(4, Math.ceil(value.length / 95)))}
        className="w-full resize-y rounded-lg border border-black/10 bg-white px-3 py-2 text-sm leading-6 text-[#17130b] outline-none transition focus:border-gold"
      />
    </label>
  );
}

export function UrlField({ label, value, onChange }: BaseProps<string>) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-xs font-bold text-[#514837]">
        <LinkIcon className="h-3.5 w-3.5 text-[#987716]" />
        {label}
      </span>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#17130b] outline-none transition focus:border-gold"
      />
    </label>
  );
}

export function NumberField({ label, value, onChange }: BaseProps<number>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold text-[#514837]">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm text-[#17130b] outline-none transition focus:border-gold"
      />
    </label>
  );
}

export function BooleanField({ label, value, onChange }: BaseProps<boolean>) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-black/10 bg-white px-3 py-2">
      <span className="text-sm font-bold text-[#17130b]">{label}</span>
      <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-4 w-4 accent-gold" />
    </label>
  );
}

type ImageFieldProps = BaseProps<string> & {
  onUpload: (file: File) => Promise<string>;
};

export function ImageField({ label, value, onChange, onUpload }: ImageFieldProps) {
  const inputId = useId();
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function upload(file?: File | null) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      onChange(await onUpload(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload impossible.");
    } finally {
      setUploading(false);
      setDragging(false);
    }
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    void upload(event.target.files?.[0]);
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    void upload(event.dataTransfer.files?.[0]);
  }

  return (
    <div>
      <p className="mb-1.5 text-xs font-bold text-[#514837]">{label}</p>
      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`rounded-xl border border-dashed p-3 transition ${dragging ? "border-gold bg-gold/10" : "border-black/15 bg-white"}`}
      >
        {value ? (
          <img src={value} alt={label} className="mb-3 max-h-56 w-full rounded-lg object-contain" />
        ) : (
          <div className="mb-3 flex h-36 items-center justify-center rounded-lg bg-[#f5f2ea] text-sm font-semibold text-[#756b57]">
            Aucune image
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          <label htmlFor={inputId} className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#17130b] px-3 py-2 text-xs font-black uppercase text-white">
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
            Changer
          </label>
          {value ? (
            <button type="button" onClick={() => onChange("")} className="inline-flex items-center gap-2 rounded-lg border border-black/10 bg-white px-3 py-2 text-xs font-black uppercase text-red-700">
              <Trash2 className="h-3.5 w-3.5" />
              Supprimer
            </button>
          ) : null}
        </div>
        <input id={inputId} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
        <details className="mt-3">
          <summary className="cursor-pointer text-xs font-bold text-[#756b57]">Option avancée : URL</summary>
          <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-2 w-full rounded-lg border border-black/10 px-3 py-2 text-xs" />
        </details>
        {error ? <p className="mt-2 text-xs font-semibold text-red-700">{error}</p> : null}
      </div>
    </div>
  );
}
