import { Suspense } from "react";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import AdminLoginForm from "@/src/components/admin/AdminLoginForm";
import { getAdminPageSession } from "@/src/lib/admin/guards";

export const metadata: Metadata = {
  title: "Connexion Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getAdminPageSession();
  if (session) {
    redirect("/admin/home");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-noir-deep px-4 py-12">
      <Suspense fallback={<div className="text-sm text-text-soft">Chargement...</div>}>
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
