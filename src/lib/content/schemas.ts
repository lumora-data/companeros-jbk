import "server-only";

import { allowedSectionKeysFor } from "@/src/lib/content/registry";
import type { AdminContentType, EditableSectionsPayload } from "@/src/lib/content/types";
import { normalizeEditableValue } from "@/src/lib/content/json";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === "[object Object]";
}

function isValidJsonValue(value: unknown): boolean {
  if (value === null) {
    return true;
  }
  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return true;
  }
  if (Array.isArray(value)) {
    return value.every(isValidJsonValue);
  }
  if (isPlainObject(value)) {
    return Object.values(value).every(isValidJsonValue);
  }
  return false;
}

export function validateSectionsPayload(type: AdminContentType, input: unknown): EditableSectionsPayload {
  if (!isPlainObject(input)) {
    throw new Error("Invalid payload: expected object.");
  }

  const allowed = new Set(allowedSectionKeysFor(type));
  const normalized: EditableSectionsPayload = {};

  for (const [key, value] of Object.entries(input)) {
    if (!allowed.has(key)) {
      throw new Error(`Invalid section key: ${key}`);
    }
    if (!isValidJsonValue(value)) {
      throw new Error(`Invalid JSON value for section: ${key}`);
    }
    normalized[key] = normalizeEditableValue(value, key.split("."));
  }

  return normalized;
}
