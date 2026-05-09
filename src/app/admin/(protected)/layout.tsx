import type { ReactNode } from "react";
import type { Metadata } from "next";
import AdminShell from "@/src/components/admin/AdminShell";
import { requireAdminPageSession } from "@/src/lib/admin/guards";

export const metadata: Metadata = {
  title: "Admin CMS",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await requireAdminPageSession();
  return <AdminShell username={session.username}>{children}</AdminShell>;
}
