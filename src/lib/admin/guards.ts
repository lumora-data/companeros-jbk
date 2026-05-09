import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE_NAME } from "@/src/lib/admin/constants";
import {
  parseCookieHeader,
  verifyAdminSessionToken,
} from "@/src/lib/admin/session";
import { getAdminAuthEnv } from "@/src/lib/env/server";

export class AdminAuthError extends Error {
  constructor(message = "Unauthorized admin request.") {
    super(message);
    this.name = "AdminAuthError";
  }
}

export function getAdminSessionFromHeader(cookieHeader: string | null): { username: string } | null {
  const { sessionSecret } = getAdminAuthEnv();
  const cookieMap = parseCookieHeader(cookieHeader);
  const token = cookieMap[ADMIN_SESSION_COOKIE_NAME];
  const payload = verifyAdminSessionToken(token, sessionSecret);
  if (!payload) {
    return null;
  }
  return { username: payload.u };
}

export function requireAdminApiAuth(request: Request): { username: string } {
  const session = getAdminSessionFromHeader(request.headers.get("cookie"));
  if (!session) {
    throw new AdminAuthError();
  }
  return session;
}

export async function getAdminPageSession(): Promise<{ username: string } | null> {
  try {
    const { sessionSecret } = getAdminAuthEnv();
    const cookieStore = await cookies();
    const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value;
    const payload = verifyAdminSessionToken(token, sessionSecret);
    return payload ? { username: payload.u } : null;
  } catch {
    return null;
  }
}

export async function requireAdminPageSession(): Promise<{ username: string }> {
  const session = await getAdminPageSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}
