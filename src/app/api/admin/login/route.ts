import { NextResponse } from "next/server";
import { verifyAdminCredentials } from "@/src/lib/admin/auth";
import { ADMIN_SESSION_COOKIE_NAME } from "@/src/lib/admin/constants";
import { createAdminSessionToken } from "@/src/lib/admin/session";
import { getAdminAuthEnv } from "@/src/lib/env/server";

export const runtime = "nodejs";

type LoginBody = {
  username?: string;
  password?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody;
    const username = body.username?.trim() || "";
    const password = body.password || "";

    if (!username || !password) {
      return NextResponse.json({ ok: false, error: "Nom d'utilisateur et mot de passe requis." }, { status: 400 });
    }

    const isValid = await verifyAdminCredentials(username, password);
    if (!isValid) {
      return NextResponse.json({ ok: false, error: "Identifiants invalides." }, { status: 401 });
    }

    const { sessionSecret } = getAdminAuthEnv();
    const token = createAdminSessionToken(username, sessionSecret);

    const response = NextResponse.json({ ok: true, username });
    response.cookies.set({
      name: ADMIN_SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Échec de connexion." },
      { status: 500 },
    );
  }
}
