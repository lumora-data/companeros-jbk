import type { Metadata } from "next";
import { SITE_CONTENT } from "@/src/content/site-content";

const FALLBACK_SITE_URL = "https://companeros-jbk.vercel.app";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || FALLBACK_SITE_URL;

export const SITE_NAME = SITE_CONTENT.common.brandName;
export const DEFAULT_OG_IMAGE = "/main/hero-acceuil.jpg";

const DEFAULT_KEYWORDS = [
  "Compañeros-JBK Empire",
  "Compañeros",
  "JBK Films",
  "voyage etudes",
  "traduction assermentee",
  "cours de langues",
  "cours de soutien",
  "flamenco cameroun",
  "production audiovisuelle",
  "evenementiel cameroun",
];

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
};

export function toAbsoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function createPageMetadata({
  title,
  description,
  path,
  keywords = [],
  image = DEFAULT_OG_IMAGE,
}: PageMetadataInput): Metadata {
  const canonical = path.startsWith("/") ? path : `/${path}`;
  const allKeywords = Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords]));

  return {
    title,
    description,
    keywords: allKeywords,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "fr_CM",
      title,
      description,
      url: canonical,
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
