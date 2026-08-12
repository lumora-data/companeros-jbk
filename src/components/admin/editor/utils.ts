import {
  BookOpen,
  BriefcaseBusiness,
  CircleDot,
  FileText,
  ImageIcon,
  Layers3,
  Megaphone,
  Monitor,
  MousePointer2,
  Users,
} from "lucide-react";

export type DeviceMode = "desktop" | "tablet" | "mobile";

export type EditorSection = {
  key: string;
  label: string;
  description?: string;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getAtPath(value: unknown, path: string[]): unknown {
  return path.reduce<unknown>((acc, segment) => {
    if (Array.isArray(acc)) {
      return acc[Number(segment)];
    }
    if (isRecord(acc)) {
      return acc[segment];
    }
    return undefined;
  }, value);
}

export function setAtPath(value: unknown, path: string[], nextValue: unknown): unknown {
  if (path.length === 0) {
    return nextValue;
  }
  const [head, ...tail] = path;
  if (Array.isArray(value)) {
    const copy = [...value];
    copy[Number(head)] = setAtPath(copy[Number(head)], tail, nextValue);
    return copy;
  }
  const source = isRecord(value) ? value : {};
  return {
    ...source,
    [head]: setAtPath(source[head], tail, nextValue),
  };
}

export function humanizeLabel(label: string, path: string[] = []): string {
  const joined = [...path, label].join(".");
  const dictionary: Record<string, string> = {
    title: "Titre",
    subtitle: "Sous-titre",
    description: "Description",
    content: "Contenu",
    text: "Texte",
    label: "Libellé",
    value: "Valeur",
    image: "Image",
    imageAlt: "Texte alternatif",
    imageUrl: "Image",
    badge: "Badge",
    heading: "Titre de section",
    headingLine1: "Première ligne du titre",
    headingHighlight: "Texte mis en avant",
    titleLine1: "Première ligne du titre",
    titleHighlight: "Texte mis en avant",
    primaryButtonLabel: "Texte du bouton principal",
    secondaryButtonLabel: "Texte du bouton secondaire",
    ctaLabel: "Texte du bouton",
    ctaWhatsappMessage: "Message WhatsApp",
    primaryWhatsappMessage: "Message WhatsApp principal",
    secondaryWhatsappMessage: "Message WhatsApp secondaire",
    cardCtaLabel: "Texte du lien des cartes",
    cardWhatsappTemplate: "Message WhatsApp des cartes",
    floatingBadge: "Badge flottant",
    subjectsTitle: "Titre des matières",
    pricingTitle: "Titre des tarifs",
    name: "Nom",
    role: "Rôle",
    bio: "Biographie",
    href: "Lien",
    url: "Lien",
    icon: "Icône",
    items: "Éléments",
    members: "Membres",
    services: "Services",
    details: "Détails",
    redirectByServiceId: "Liens des services",
  };
  const last = label.replace(/\[(\d+)\]/g, "$1");
  if (dictionary[joined]) return dictionary[joined];
  if (dictionary[last]) return dictionary[last];
  return last
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_.]/g, " ")
    .trim()
    .replace(/^./, (char) => char.toUpperCase());
}

export function getItemTitle(value: unknown, fallback: string): string {
  if (isRecord(value)) {
    for (const key of ["title", "name", "label", "heading", "role", "id"]) {
      const found = value[key];
      if (typeof found === "string" && found.trim()) {
        return found.trim();
      }
    }
  }
  if (typeof value === "string" && value.trim()) {
    return value.trim().slice(0, 60);
  }
  return fallback;
}

export function looksLikeImage(path: string[], value?: unknown): boolean {
  const joined = path.join(".").toLowerCase();
  return /(image|images|logo|photo|thumbnail|cover|avatar|background|banner|src)$/i.test(joined) ||
    (typeof value === "string" && (/^https?:\/\//i.test(value) || value.startsWith("/") || /\.(png|jpe?g|webp|gif|avif|svg)$/i.test(value)));
}

export function looksLikeUrl(path: string[]): boolean {
  return /(url|href|link|email|phone|whatsapp)/i.test(path.join("."));
}

export function sectionIconFor(section: EditorSection) {
  const text = `${section.key} ${section.label}`.toLowerCase();
  if (/hero|accueil/.test(text)) return Megaphone;
  if (/service/.test(text)) return BriefcaseBusiness;
  if (/direction|team|équipe|membre|acteur/.test(text)) return Users;
  if (/image|gallery|galerie|production/.test(text)) return ImageIcon;
  if (/langue|cours|support/.test(text)) return BookOpen;
  if (/content|page/.test(text)) return FileText;
  if (/canvas|preview/.test(text)) return Monitor;
  if (/section/.test(text)) return Layers3;
  if (/select/.test(text)) return MousePointer2;
  return CircleDot;
}
