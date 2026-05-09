import "server-only";

import { createHash, timingSafeEqual } from "node:crypto";
import { getAdminAuthEnv } from "@/src/lib/env/server";

function sha256Hex(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function safeEqual(left: string, right: string): boolean {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function verifyAdminCredentials(username: string, password: string): Promise<boolean> {
  const env = getAdminAuthEnv();
  if (!safeEqual(username, env.username)) {
    return false;
  }

  if (env.passwordHash) {
    const rawHash = env.passwordHash.includes(":") ? env.passwordHash.split(":").pop() || "" : env.passwordHash;
    const computed = sha256Hex(password);
    return safeEqual(computed, rawHash.toLowerCase());
  }

  if (env.password) {
    return safeEqual(password, env.password);
  }

  return false;
}
