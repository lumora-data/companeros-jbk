import { NextResponse } from "next/server";
import { AdminAuthError, requireAdminApiAuth } from "@/src/lib/admin/guards";
import { deepGet, deepSet } from "@/src/lib/content/json";
import {
  EDITABLE_CONTENT_REGISTRY,
  SITE_CONTENT_GITHUB_PATH,
  isAdminContentType,
} from "@/src/lib/content/registry";
import type { AdminContentType, EditableSectionsPayload } from "@/src/lib/content/types";
import { validateSectionsPayload } from "@/src/lib/content/schemas";
import { readJsonFromGitHub, updateJsonOnGitHub } from "@/src/lib/github/content";

export const runtime = "nodejs";

type RouteParams = {
  params: Promise<{
    type: string;
  }>;
};

function assertType(type: string): AdminContentType {
  if (!isAdminContentType(type)) {
    throw new Error("Invalid content type.");
  }
  return type;
}

function extractSections(data: unknown, type: AdminContentType): EditableSectionsPayload {
  const sections = EDITABLE_CONTENT_REGISTRY[type].sections;
  return Object.fromEntries(
    sections.map((section) => [section.key, deepGet(data, section.key)]),
  );
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    requireAdminApiAuth(request);
    const { type: rawType } = await params;
    const type = assertType(rawType);
    const { data } = await readJsonFromGitHub<Record<string, unknown>>(SITE_CONTENT_GITHUB_PATH);

    return NextResponse.json({
      ok: true,
      type,
      title: EDITABLE_CONTENT_REGISTRY[type].title,
      definitions: EDITABLE_CONTENT_REGISTRY[type].sections,
      sections: extractSections(data, type),
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
    }
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Échec lecture du contenu." },
      { status: 400 },
    );
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = requireAdminApiAuth(request);
    const { type: rawType } = await params;
    const type = assertType(rawType);
    const body = (await request.json()) as { sections?: unknown };
    const validatedSections = validateSectionsPayload(type, body.sections);

    const { data, sha } = await readJsonFromGitHub<Record<string, unknown>>(SITE_CONTENT_GITHUB_PATH);
    let nextData: unknown = data;
    for (const [key, value] of Object.entries(validatedSections)) {
      nextData = deepSet(nextData, key, value);
    }

    const commitMessage = `cms(${type}): update content by ${session.username}`;
    const commit = await updateJsonOnGitHub({
      path: SITE_CONTENT_GITHUB_PATH,
      data: nextData,
      sha,
      message: commitMessage,
    });

    return NextResponse.json({
      ok: true,
      type,
      commit,
      sections: extractSections(nextData, type),
    });
  } catch (error) {
    if (error instanceof AdminAuthError) {
      return NextResponse.json({ ok: false, error: "Non autorisé." }, { status: 401 });
    }
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Échec mise à jour du contenu." },
      { status: 400 },
    );
  }
}
