"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Film, LogOut, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-noir-deep text-text-main">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-5 px-4 pb-10 pt-5 md:px-6 lg:flex-row lg:gap-8 lg:pt-8">
        <aside className="w-full rounded-2xl border border-white/10 bg-noir-card p-4 lg:sticky lg:top-6 lg:h-fit lg:w-72 lg:rounded-3xl lg:p-6">
          <div className="mb-4 border-b border-white/10 pb-4">
            <h1 className="text-xl font-black uppercase tracking-tight text-gold">CMS Interne</h1>
            <p className="mt-2 text-xs font-bold uppercase tracking-wider text-text-soft">{username}</p>
          </div>

          <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                    active
                      ? "bg-gold text-noir-deep"
                      : "bg-noir-deep text-text-para hover:border-gold/40 hover:text-text-main"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            disabled={logoutBusy}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-noir-deep px-3 py-3 text-sm font-bold text-text-main transition hover:border-gold/50 disabled:opacity-70"
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
