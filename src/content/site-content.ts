import siteContent from "./site-content.json";

function normalizeNWithTilde(value: unknown): unknown {
  if (typeof value === "string") {
    return value.replace(/ń/g, "ñ").replace(/Ń/g, "Ñ");
  }

  if (Array.isArray(value)) {
    return value.map(normalizeNWithTilde);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, normalizeNWithTilde(nestedValue)]),
    );
  }

  return value;
}

export const SITE_CONTENT = normalizeNWithTilde(siteContent) as typeof siteContent;
