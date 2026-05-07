import type { Metadata } from "next";
import type { ReactNode } from "react";
import "../index.css";
import SiteShell from "@/src/components/SiteShell";
import { SITE_CONTENT } from "@/src/content/site-content";
import { SITE_NAME, SITE_URL, toAbsoluteUrl } from "@/src/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_CONTENT.metadata.title,
    template: "%s | Compañeros-JBK Empire",
  },
  description: SITE_CONTENT.metadata.description,
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "fr_CM",
    title: SITE_CONTENT.metadata.title,
    description: SITE_CONTENT.metadata.description,
    images: [
      {
        url: "/main/hero-acceuil.jpg",
        alt: SITE_CONTENT.metadata.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONTENT.metadata.title,
    description: SITE_CONTENT.metadata.description,
    images: ["/main/hero-acceuil.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/main/logo.jpg" }],
    apple: [{ url: "/main/logo.jpg" }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: toAbsoluteUrl("/main/logo.jpg"),
      email: SITE_CONTENT.common.email,
      telephone: SITE_CONTENT.common.phones.split("/")[0]?.trim() || SITE_CONTENT.common.phones,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE_CONTENT.common.address,
        addressCountry: "CM",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      inLanguage: "fr",
    },
  ];

  return (
    <html lang="fr">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
