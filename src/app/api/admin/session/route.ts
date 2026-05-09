import { NextResponse } from "next/server";
import { requireAdminApiAuth, AdminAuthError } from "@/src/lib/admin/guards";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const session = requireAdminApiAuth(request);
    return NextResponse.json({ ok: true, authenticated: true, username: session.username });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ ok: true, authenticated: false }, { status: 401 });
    }
    return NextResponse.json({ ok: false, error: "Erreur de session." }, { status: 500 });
  }
}
