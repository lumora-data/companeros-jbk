import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { getAdminAuthEnv } from "@/src/lib/env/server";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function normalizeSha256Hash(value: string): string {
  return value
    .trim()
    .replace(/^sha256:/i, "")
    .replace(/^<|>$/g, "")
    .replace(/['"]/g, "")
    .replace(/[^a-fA-F0-9]/g, "")
    .trim()
    .toLowerCase();
}

function normalizeUsername(value: string): string {
  return value.trim().normalize("NFC").toLowerCase();
}

function passwordCandidates(password: string): string[] {
  const variants = new Set<string>();
  variants.add(password);
  variants.add(password.normalize("NFC"));
  variants.add(password.normalize("NFD"));
  variants.add(password.trim());
  variants.add(password.trim().normalize("NFC"));
  variants.add(password.trim().normalize("NFD"));
  return [...variants];
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const env = getAdminAuthEnv();
  if (!safeEqual(normalizeUsername(username), normalizeUsername(env.username))) {
    return false;
  }

  if (env.passwordHash) {
    const rawHash = normalizeSha256Hash(env.passwordHash);
    if (rawHash.length === 64 && /^[a-f0-9]{64}$/i.test(rawHash)) {
      for (const candidate of passwordCandidates(password)) {
        const computed = sha256Hex(candidate);
        if (safeEqual(computed, rawHash)) {
          return true;
        }
      }
    }
  }

  if (env.password) {
    for (const candidate of passwordCandidates(password)) {
      if (safeEqual(candidate, env.password)) {
        return true;
      }
    }
  }

  return false;
}
