import type { MetadataRoute } from "next";
import { SITE_URL } from "@/src/lib/seo";

type SitemapItemConfig = {
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const ROUTES: SitemapItemConfig[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/companeros", changeFrequency: "weekly", priority: 0.95 },
  { path: "/jbk", changeFrequency: "weekly", priority: 0.95 },
  { path: "/a-propos", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.75 },
  { path: "/partenaires", changeFrequency: "monthly", priority: 0.65 },
  { path: "/companeros/orientation", changeFrequency: "weekly", priority: 0.9 },
  { path: "/companeros/preparation-concours", changeFrequency: "weekly", priority: 0.85 },
  { path: "/companeros/cours-de-langues", changeFrequency: "weekly", priority: 0.88 },
  { path: "/companeros/cours-de-langue-en-ligne", changeFrequency: "weekly", priority: 0.84 },
  { path: "/companeros/traduction-interpretation", changeFrequency: "weekly", priority: 0.88 },
  { path: "/companeros/cours-de-soutien", changeFrequency: "weekly", priority: 0.86 },
  { path: "/companeros/flamenco", changeFrequency: "weekly", priority: 0.82 },
  { path: "/jbk/evenements", changeFrequency: "weekly", priority: 0.86 },
  { path: "/jbk/doublage", changeFrequency: "weekly", priority: 0.83 },
  { path: "/jbk/vente-materiel", changeFrequency: "weekly", priority: 0.84 },
  { path: "/jbk/site-web", changeFrequency: "weekly", priority: 0.84 },
  { path: "/jbk/graphisme-impression", changeFrequency: "weekly", priority: 0.83 },
  { path: "/jbk/voix-off", changeFrequency: "weekly", priority: 0.82 },
  { path: "/jbk/drone", changeFrequency: "weekly", priority: 0.82 },
  { path: "/jbk/publicite-tv-web", changeFrequency: "weekly", priority: 0.83 },
  { path: "/jbk/communication-digitale", changeFrequency: "weekly", priority: 0.82 },
  { path: "/jbk/formation-pro", changeFrequency: "weekly", priority: 0.82 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
