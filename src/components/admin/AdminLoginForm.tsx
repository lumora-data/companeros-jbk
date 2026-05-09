"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, LogIn } from "lucide-react";

export default function AdminLoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const payload = (await response.json()) as { ok: boolean; error?: string };
      if (!response.ok || !payload.ok) {
        setError(payload.error || "Connexion impossible.");
        return;
      }

      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Connexion impossible.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md rounded-3xl border border-white/10 bg-noir-card p-8 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-white">Espace Admin</h1>
        <p className="mt-3 text-sm text-text-para">Connexion sécurisée pour gérer le contenu du site.</p>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-text-soft">Identifiant</span>
          <input
            type="text"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-noir-deep px-4 py-3 text-text-main outline-none transition focus:border-gold/70"
            placeholder="Nom admin"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider text-text-soft">Mot de passe</span>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-noir-deep px-4 py-3 text-text-main outline-none transition focus:border-gold/70"
            placeholder="••••••••"
          />
        </label>
      </div>

      {error ? <p className="mt-5 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-4 py-3 font-black uppercase tracking-wide text-noir-deep transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        Se connecter
      </button>
    </form>
  );
}
