"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Film, Home, LogOut, Loader2, PanelLeft, ShieldCheck } from "lucide-react";
import { useState } from "react";

type AdminShellProps = {
  username: string;
  children: ReactNode;
};

const NAV_ITEMS = [
  { href: "/admin/companeros", label: "Compañeros", icon: Building2 },
  { href: "/admin/jbk", label: "JBK", icon: Film },
] as const;

export default function AdminShell({ username, children }: AdminShellProps) {
  const pathname = usePathname();
  const [logoutBusy, setLogoutBusy] = useState(false);

  async function handleLogout() {
    setLogoutBusy(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.href = "/admin/login";
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f2ea] text-[#17130b]">
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-4 px-4 pb-10 pt-4 md:px-6 lg:flex-row lg:gap-6 lg:pt-6">
        <aside className="w-full rounded-2xl border border-black/10 bg-white p-4 shadow-sm lg:sticky lg:top-6 lg:h-fit lg:w-72 lg:p-5">
          <div className="mb-5 border-b border-black/10 pb-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17130b] text-gold">
                <PanelLeft className="h-5 w-5" />
              </span>
              <div>
                <h1 className="text-lg font-black tracking-tight text-[#17130b]">Panel admin</h1>
                <p className="text-xs font-semibold text-[#756b57]">Modification du site</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#f5f2ea] px-3 py-2 text-xs font-semibold text-[#5c5343]">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              Connecté : {username}
            </div>
          </div>

          <p className="mb-2 px-1 text-[11px] font-black uppercase tracking-wide text-[#8a806b]">Contenu à modifier</p>
          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition ${
                    active
                      ? "bg-gold text-[#17130b] shadow-sm"
                      : "bg-[#f5f2ea] text-[#4f4739] hover:bg-[#ece5d6] hover:text-[#17130b]"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/"
            target="_blank"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-3 py-3 text-sm font-bold text-[#17130b] transition hover:border-gold/70"
          >
            <Home className="h-4 w-4" />
            Voir le site
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutBusy}
            className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 bg-[#17130b] px-3 py-3 text-sm font-bold text-white transition hover:bg-black disabled:opacity-70"
          >
            {logoutBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
            Déconnexion
          </button>
        </aside>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
