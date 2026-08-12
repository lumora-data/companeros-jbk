"use client";

import { MousePointer2 } from "lucide-react";
import type { DeviceMode, EditorSection } from "./utils";
import { getItemTitle, isRecord } from "./utils";

type EditorCanvasProps = {
  sections: EditorSection[];
  values: Record<string, unknown>;
  selectedKey: string;
  device: DeviceMode;
  onSelect: (key: string) => void;
};

const DEVICE_WIDTH: Record<DeviceMode, string> = {
  desktop: "min(100%, 1320px)",
  tablet: "768px",
  mobile: "390px",
};

function findFirstImage(value: unknown): string | null {
  if (typeof value === "string" && (/^https?:\/\//i.test(value) || value.startsWith("/"))) return value;
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findFirstImage(item);
      if (found) return found;
    }
  }
  if (isRecord(value)) {
    for (const key of ["image", "imageUrl", "logo", "src", "cover", "background"]) {
      const found = value[key];
      if (typeof found === "string" && found) return found;
    }
    for (const nested of Object.values(value)) {
      const found = findFirstImage(nested);
      if (found) return found;
    }
  }
  return null;
}

function SectionPreview({ value }: { value: unknown }) {
  if (Array.isArray(value)) {
    return (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {value.slice(0, 9).map((item, index) => {
          const image = findFirstImage(item);
          return (
            <article key={index} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              {image ? <img src={image} alt="" className="mb-3 h-40 w-full rounded-xl object-cover" /> : null}
              <h3 className="text-lg font-black text-white">{getItemTitle(item, `Élément ${index + 1}`)}</h3>
              {isRecord(item) && typeof item.description === "string" ? <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/65">{item.description}</p> : null}
            </article>
          );
        })}
      </div>
    );
  }

  if (isRecord(value)) {
    const hero = isRecord(value.hero) ? value.hero : value;
    const image = findFirstImage(value);
    const title =
      (typeof hero.titleLine1 === "string" ? hero.titleLine1 : "") ||
      (typeof hero.heading === "string" ? hero.heading : "") ||
      (typeof value.heading === "string" ? value.heading : "") ||
      getItemTitle(value, "Section");
    const highlight = typeof hero.titleHighlight === "string" ? hero.titleHighlight : typeof hero.headingHighlight === "string" ? hero.headingHighlight : "";
    const description = typeof hero.description === "string" ? hero.description : typeof value.description === "string" ? value.description : "";
    const members = Array.isArray(value.members) ? value.members : null;
    const items = Array.isArray(value.items) ? value.items : null;

    return (
      <div>
        {image ? (
          <div className="relative mb-8 h-[360px] overflow-hidden rounded-[2rem] bg-black">
            <img src={image} alt="" className="h-full w-full object-cover opacity-65" />
            <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/80" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <h2 className="max-w-3xl text-5xl font-black uppercase leading-none text-white">
                {title} {highlight ? <span className="text-gold">{highlight}</span> : null}
              </h2>
              {description ? <p className="mt-4 max-w-2xl text-lg leading-7 text-white/75">{description}</p> : null}
            </div>
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-4xl font-black uppercase text-white">{title}</h2>
            {description ? <p className="mt-3 max-w-3xl text-lg leading-7 text-white/65">{description}</p> : null}
          </div>
        )}

        {members ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {members.slice(0, 9).map((member, index) => {
              const imageSrc = findFirstImage(member);
              return (
                <article key={index} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {imageSrc ? <img src={imageSrc} alt="" className="h-56 w-full object-cover object-top" /> : null}
                  <div className="p-4">
                    <h3 className="font-black uppercase text-white">{getItemTitle(member, `Membre ${index + 1}`)}</h3>
                    {isRecord(member) && typeof member.role === "string" ? <p className="mt-1 text-sm font-bold text-gold">{member.role}</p> : null}
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}

        {items ? (
          <div className="grid gap-3 md:grid-cols-2">
            {items.slice(0, 8).map((item, index) => (
              <div key={index} className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/80">
                {getItemTitle(item, `Élément ${index + 1}`)}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  }

  return <p className="text-lg text-white/80">{String(value ?? "")}</p>;
}

export default function EditorCanvas({ sections, values, selectedKey, device, onSelect }: EditorCanvasProps) {
  return (
    <main className="min-w-0 flex-1 overflow-hidden rounded-2xl border border-black/10 bg-[#e8e1d2] shadow-sm">
      <div className="flex items-center justify-between border-b border-black/10 bg-white px-4 py-3">
        <div className="flex items-center gap-2 text-sm font-black text-[#17130b]">
          <MousePointer2 className="h-4 w-4 text-[#987716]" />
          Canvas live
        </div>
        <span className="text-xs font-bold uppercase tracking-wide text-[#756b57]">{device}</span>
      </div>
      <div className="h-[calc(100svh-12rem)] overflow-auto p-5">
        <div className="mx-auto min-h-full overflow-hidden rounded-[1.8rem] bg-noir-deep shadow-2xl transition-all duration-200" style={{ width: DEVICE_WIDTH[device], maxWidth: "100%" }}>
          {sections.map((section) => {
            const active = section.key === selectedKey;
            return (
              <button
                key={section.key}
                type="button"
                onClick={() => onSelect(section.key)}
                className={`relative block w-full border-2 px-6 py-14 text-left transition ${
                  active ? "border-gold bg-gold/5" : "border-transparent hover:border-white/25"
                }`}
              >
                <span className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-black uppercase tracking-wide ${active ? "bg-gold text-[#17130b]" : "bg-white/10 text-white/80"}`}>
                  {section.label}
                </span>
                <SectionPreview value={values[section.key]} />
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}
