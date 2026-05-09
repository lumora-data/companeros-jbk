import "server-only";

type JsonPrimitive = string | number | boolean | null;
type JsonValue = JsonPrimitive | JsonValue[] | { [key: string]: JsonValue };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function deepGet(input: unknown, path: string): unknown {
  if (!path) {
    return input;
  }
  return path.split(".").reduce<unknown>((acc, segment) => {
    if (!isRecord(acc)) {
      return undefined;
    }
    return acc[segment];
  }, input);
}

export function deepSet(input: unknown, path: string, value: unknown): unknown {
  const segments = path.split(".");
  if (segments.length === 0) {
    return input;
  }

  const clone = structuredClone(input) as Record<string, unknown>;
  let cursor: Record<string, unknown> = clone;
  for (let index = 0; index < segments.length - 1; index += 1) {
    const segment = segments[index];
    const nextValue = cursor[segment];
    if (!isRecord(nextValue)) {
      cursor[segment] = {};
    }
    cursor = cursor[segment] as Record<string, unknown>;
  }
  cursor[segments[segments.length - 1]] = value;
  return clone;
}

function normalizeMediaUrl(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("http://")) {
    return `https://${trimmed.slice("http://".length)}`;
  }
  return trimmed;
}

function looksLikeMediaKey(path: string[]): boolean {
  const joined = path.join(".").toLowerCase();
  return /(image|images|logo|photo|thumbnail|cover|avatar|background|banner|src|url)/i.test(joined);
}

export function normalizeEditableValue(value: unknown, path: string[] = []): JsonValue {
  if (typeof value === "string") {
    return looksLikeMediaKey(path) ? normalizeMediaUrl(value) : value;
  }

  if (typeof value === "number" || typeof value === "boolean" || value === null) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => normalizeEditableValue(item, [...path, String(index)]));
  }

  if (isRecord(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([key, nested]) => [key, normalizeEditableValue(nested, [...path, key])]),
    ) as JsonValue;
  }

  return String(value);
}
