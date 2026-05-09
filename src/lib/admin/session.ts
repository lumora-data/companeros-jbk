import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";

type SessionPayload = {
  u: string;
  exp: number;
};

function base64UrlEncode(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  const neededPadding = (4 - (padded.length % 4)) % 4;
  return Buffer.from(`${padded}${"=".repeat(neededPadding)}`, "base64").toString("utf8");
}

function sign(input: string, secret: string): string {
  return createHmac("sha256", secret).update(input).digest("base64url");
}

export function createAdminSessionToken(username: string, secret: string, maxAgeSeconds = 60 * 60 * 8): string {
  const payload: SessionPayload = {
    u: username,
    exp: Date.now() + maxAgeSeconds * 1000,
  };
  const encoded = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encoded, secret);
  return `${encoded}.${signature}`;
}

export function verifyAdminSessionToken(token: string | undefined, secret: string): SessionPayload | null {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) {
    return null;
  }

  const expected = sign(encodedPayload, secret);
  const left = Buffer.from(signature);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;
    if (!payload?.u || typeof payload.exp !== "number") {
      return null;
    }
    if (Date.now() > payload.exp) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader
    .split(";")
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const divider = part.indexOf("=");
      if (divider <= 0) {
        return acc;
      }
      const key = part.slice(0, divider).trim();
      const value = decodeURIComponent(part.slice(divider + 1).trim());
      acc[key] = value;
      return acc;
    }, {});
}
