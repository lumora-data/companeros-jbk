import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { getAdminAuthEnv } from "@/src/lib/env/server";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function extractSha256Hash(value: string): string | null {
  const cleaned = value.trim().replace(/^sha256:/i, "").replace(/^<|>$/g, "").replace(/['"]/g, "").trim();
  const match = cleaned.match(/[a-fA-F0-9]{64}/);
  return match ? match[0].toLowerCase() : null;
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
  if (env.strictUsername && !safeEqual(normalizeUsername(username), normalizeUsername(env.username))) {
    return false;
  }

  if (env.passwordHash) {
    const hash = extractSha256Hash(env.passwordHash);
    if (hash) {
      for (const candidate of passwordCandidates(password)) {
        const computed = sha256Hex(candidate);
        if (safeEqual(computed, hash)) {
          return true;
        }
        if (safeEqual(candidate.toLowerCase(), hash)) {
          return true;
        }
      }
    } else {
      for (const candidate of passwordCandidates(password)) {
        if (safeEqual(candidate, env.passwordHash)) {
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
