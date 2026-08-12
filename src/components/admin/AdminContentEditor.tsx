"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import ServicesManager from "@/src/components/admin/companeros-services/ServicesManager";
import VisualEditor from "@/src/components/admin/editor/VisualEditor";

type SectionDefinition = {
  key: string;
  label: string;
  description?: string;
};

type ContentApiResponse = {
  ok: boolean;
  error?: string;
  title?: string;
  definitions?: SectionDefinition[];
  sections?: Record<string, unknown>;
  commit?: {
    commitSha: string;
    commitUrl: string;
  };
};

type AdminContentEditorProps = {
  type: "companeros" | "jbk";
};

export default function AdminContentEditor({ type }: AdminContentEditorProps) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [definitions, setDefinitions] = useState<SectionDefinition[]>([]);
  const [sections, setSections] = useState<Record<string, unknown>>({});
  const [initialSections, setInitialSections] = useState<Record<string, unknown>>({});
  const [lastCommitUrl, setLastCommitUrl] = useState<string | null>(null);

  async function fetchContent() {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`/api/admin/content/${type}`, { method: "GET" });
      const payload = (await response.json()) as ContentApiResponse;
      if (!response.ok || !payload.ok || !payload.sections || !payload.definitions || !payload.title) {
        throw new Error(payload.error || "Impossible de charger ce contenu.");
      }

      const cloned = structuredClone(payload.sections);
      setTitle(payload.title);
      setDefinitions(payload.definitions);
      setSections(cloned);
      setInitialSections(cloned);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de charger ce contenu.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  async function uploadFile(file: File): Promise<string> {
    const data = new FormData();
    data.append("file", file);
    const response = await fetch("/api/admin/upload", {
      method: "POST",
      body: data,
    });
    const payload = (await response.json()) as { ok: boolean; error?: string; url?: string };
    if (!response.ok || !payload.ok || !payload.url) {
      throw new Error(payload.error || "Échec upload image.");
    }
    return payload.url;
  }

  async function saveContent() {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await fetch(`/api/admin/content/${type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      const payload = (await response.json()) as ContentApiResponse;
      if (!response.ok || !payload.ok || !payload.sections) {
        throw new Error(payload.error || "Échec sauvegarde.");
      }

      const cloned = structuredClone(payload.sections);
      setSections(cloned);
      setInitialSections(cloned);
      setLastCommitUrl(payload.commit?.commitUrl || null);
      setSuccess("Contenu enregistré. Un nouveau déploiement GitHub/Vercel peut être en cours.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Échec sauvegarde.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-2xl border border-black/10 bg-white">
        <Loader2 className="h-7 w-7 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <>
      {error ? <p className="mb-5 rounded-lg border border-red-500/40 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {type !== "companeros" && success ? (
        <div className="mb-5 rounded-lg border border-emerald-500/40 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>{success}</span>
          </div>
          {lastCommitUrl ? (
            <a
              href={lastCommitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-bold underline underline-offset-4"
            >
              Voir le commit GitHub
            </a>
          ) : null}
        </div>
      ) : null}
      {type === "companeros" ? (
        <ServicesManager
          title={title}
          sections={sections}
          initialSections={initialSections}
          saving={saving}
          success={success}
          lastCommitUrl={lastCommitUrl}
          onSectionsChange={setSections}
          onSave={() => void saveContent()}
          onReload={() => void fetchContent()}
          onUpload={uploadFile}
        />
      ) : (
        <VisualEditor
          type={type}
          title={title}
          sections={sections}
          initialSections={initialSections}
          definitions={definitions}
          saving={saving}
          onSectionsChange={setSections}
          onSave={() => void saveContent()}
          onReload={() => void fetchContent()}
          onUpload={uploadFile}
        />
      )}
    </>
  );
}
