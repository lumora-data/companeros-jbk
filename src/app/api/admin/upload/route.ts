import { NextResponse } from "next/server";
import { AdminAuthError, requireAdminApiAuth } from "@/src/lib/admin/guards";
import { getMediaEnv } from "@/src/lib/env/server";
import { uploadMedia } from "@/src/lib/storage";

export const runtime = "nodejs";

function normalizeFileName(fileName: string): string {
  return fileName
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

export async function POST(request: Request) {
  try {
    requireAdminApiAuth(request);
    const mediaEnv = getMediaEnv();

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json({ ok: false, error: "Aucun fichier reçu." }, { status: 400 });
    }

    if (!mediaEnv.allowedTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { ok: false, error: `Type non autorisé. Autorisés: ${mediaEnv.allowedTypes.join(", ")}` },
        { status: 415 },
      );
    }

    const maxBytes = mediaEnv.maxUploadMb * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { ok: false, error: `Fichier trop volumineux (max ${mediaEnv.maxUploadMb} Mo).` },
        { status: 413 },
      );
    }

    const uploaded = await uploadMedia({
      file,
      fileName: normalizeFileName(file.name || "upload"),
    });

    return NextResponse.json({
      ok: true,
      url: uploaded.url,
      width: uploaded.width,
      height: uploaded.height,
      bytes: uploaded.bytes,
      format: uploaded.format,
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
    }
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Échec upload." },
      { status: 500 },
    );
  }
}
