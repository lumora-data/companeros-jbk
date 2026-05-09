"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Loader2, RefreshCw, Save } from "lucide-react";
import JsonValueEditor from "@/src/components/admin/JsonValueEditor";

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
  type: "home" | "companeros" | "jbk" | "about";
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

  const hasChanges = useMemo(
    () => JSON.stringify(sections) !== JSON.stringify(initialSections),
    [sections, initialSections],
  );

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
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-white/10 bg-noir-card">
        <Loader2 className="h-7 w-7 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <section className="rounded-3xl border border-white/10 bg-noir-card p-4 md:p-6 lg:p-8">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white md:text-3xl">{title}</h1>
          <p className="mt-2 text-sm text-text-para">Modifiez textes, images et blocs puis publiez.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSections(structuredClone(initialSections))}
            disabled={!hasChanges || saving}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-noir-deep px-3 py-2 text-xs font-bold uppercase tracking-wide text-text-main transition hover:border-gold/40 disabled:opacity-50"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Réinitialiser
          </button>
          <button
            type="button"
            onClick={() => void saveContent()}
            disabled={!hasChanges || saving}
            className="inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-xs font-black uppercase tracking-wide text-noir-deep transition hover:brightness-110 disabled:opacity-70"
          >
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Enregistrer
          </button>
        </div>
      </div>

      {error ? <p className="mb-5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}
      {success ? (
        <div className="mb-5 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-200">
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

      <div className="space-y-6">
        {definitions.map((sectionDef) => (
          <article key={sectionDef.key} className="rounded-2xl border border-white/10 bg-noir-deep/30 p-3 md:p-4">
            <h2 className="text-sm font-black uppercase tracking-wide text-gold">{sectionDef.label}</h2>
            {sectionDef.description ? <p className="mt-1 text-xs text-text-soft">{sectionDef.description}</p> : null}
            <div className="mt-4">
              <JsonValueEditor
                label={sectionDef.label}
                path={sectionDef.key}
                value={sections[sectionDef.key]}
                onChange={(nextValue) => setSections((previous) => ({ ...previous, [sectionDef.key]: nextValue }))}
                onUpload={uploadFile}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
