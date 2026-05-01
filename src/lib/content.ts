import fs from "node:fs";
import path from "node:path";
import { contact } from "./contact";

export { contact };

export type ContentImage = {
  file: string;
  originalUrl: string;
  alt?: string;
};

export type ContentLink = {
  text: string;
  href: string;
};

export type ContentHeading = {
  level: number;
  text: string;
};

export type ContentPage = {
  url: string;
  slug: string;
  title: string;
  description: string;
  headings: ContentHeading[];
  paragraphs: string[];
  links: ContentLink[];
  images: ContentImage[];
};

export type ContentSummary = {
  folder: string;
  title: string;
  slug: string;
  url: string;
  textBlocks: number;
  images: number;
};

export const contentRoot = path.join(process.cwd(), "organized-content");

export function getContentSummaries(): ContentSummary[] {
  const indexPath = path.join(contentRoot, "index.json");
  const index = JSON.parse(fs.readFileSync(indexPath, "utf8")) as { pages: ContentSummary[] };
  return index.pages;
}

export function getContentPage(folder: string): ContentPage {
  const pagePath = path.join(contentRoot, folder, "content.json");
  return JSON.parse(fs.readFileSync(pagePath, "utf8")) as ContentPage;
}

export function getAllContentPages(): Array<ContentPage & { folder: string }> {
  return getContentSummaries().map((summary) => ({
    ...getContentPage(summary.folder),
    folder: summary.folder,
  }));
}

export function publicImagePath(folder: string, image: ContentImage): string {
  return `/organized-content/${folder}/${image.file}`;
}

export function publicImagePaths(folder: string, images: ContentImage[]): string[] {
  return images.map((image) => publicImagePath(folder, image));
}

export function findPageByFolder(folder: string) {
  const summary = getContentSummaries().find((item) => item.folder === folder);
  if (!summary) return null;
  return {
    summary,
    page: getContentPage(folder),
  };
}

export const companerosServices = [
  {
    title: "Suivis de voyages",
    detail: "Études, travail, tourisme, immigration, sport, volontariat, assistance visa et assistance bourse.",
    slug: "suivis-de-voyages",
    folder: "11-services-companeros-suivis-de-voyages",
  },
  {
    title: "Préparation concours",
    detail: "ENS, Gendarmerie, Police, Douane, IDE et autres concours.",
    slug: "preparation-concours",
    folder: "09-services-companeros-preparation-concours",
  },
  {
    title: "Cours de langues nationales et internationales",
    detail: "Langues nationales camerounaises, anglais, espagnol, chinois, français, russe, portugais et italien.",
    slug: "cours-de-langues",
    folder: "10-services-companeros-cours-de-langues-nationales-internationales",
  },
  {
    title: "Traduction & interprétation",
    detail: "Traduction simple, traduction assermentée, interprétation et demandes express.",
    slug: "traduction-interpretation",
    folder: "08-services-companeros-service-de-traduction-interpretation",
  },
  {
    title: "Cours de soutien",
    detail: "Renforcement scolaire et universitaire pour classes d'examen et étudiants.",
    slug: "cours-de-soutien",
    folder: "12-services-companeros-cours-de-soutien",
  },
  {
    title: "Danse, guitare, piano et activités culturelles",
    detail: "Activités culturelles, camps de vacances et apprentissages artistiques.",
    slug: "activites-culturelles",
    folder: "02-companeros-services",
  },
];

export const jbkServices = [
  "Services graphiques, impressions et agrandissements photos",
  "Couverture d'événements",
  "Création de sites internet",
  "Doublage films et sous-titrages",
  "Voix off",
  "Pilotage de drones",
  "Vente de matériels audio-visuels",
  "Conception et réalisation de publicités",
  "Communication web",
  "Formation audio-visuelle",
];

export const jbkEvents = [
  "Décoration",
  "Musique personnalisée",
  "Surprise events",
  "Make up",
  "Wedding planner",
  "Shooting photos",
];

export const jbkShop = [
  "Survêtements",
  "Maillots",
  "Maillots professionnels",
  "Polos et t-shirts imprimables",
  "Godasses",
  "Matériels de sport",
];

export const team = [
  ["Banderas Kouam", "Président Directeur Général, fondateur de JBK"],
  ["Faddel Emvoutou", "Directeur Administratif"],
  ["Frank Verdugo", "Responsable Administratif"],
  ["N-KY", "Assistant de Direction"],
  ["M.D", "Assistante de Direction"],
  ["Gloriana Bintu", "Assistante de Direction"],
  ["Setchuis", "Assistante de Direction"],
];

const boilerplateFragments = [
  "SERVICES COMPAÑEROS",
  "Compañeros-Jbk Empire",
  "Vous pouvez également modifier",
  "Ceci est un article générique",
  "This is the Download App tool",
  "Propulsé par SITE123",
  "CE SITE A ÉTÉ CONSTRUIT",
  "Report Abuse",
  "https://www.google.com/search",
  contact.email,
  contact.address,
  contact.phones[0],
  "+237-678",
  "(Carrefour Cradat",
];

export function isPublicText(text: string): boolean {
  const clean = text.trim();
  if (!clean || clean.length < 3) return false;
  if (boilerplateFragments.some((fragment) => clean.includes(fragment))) return false;
  return true;
}

export function publicParagraphs(page: ContentPage): string[] {
  return page.paragraphs.filter(isPublicText);
}

export type ServiceSection = {
  title: string;
  body: string[];
  bullets?: string[];
  images: string[];
  cta?: {
    label: string;
    href: string;
  };
};

function pageImages(folder: string, page: ContentPage, start = 0, count = 4): string[] {
  return publicImagePaths(folder, page.images.slice(start, start + count));
}

export function getCompanerosPageData() {
  const overview = getContentPage("02-companeros-services");
  const travel = getContentPage("11-services-companeros-suivis-de-voyages");
  const languages = getContentPage("10-services-companeros-cours-de-langues-nationales-internationales");
  const translation = getContentPage("08-services-companeros-service-de-traduction-interpretation");
  const concours = getContentPage("09-services-companeros-preparation-concours");
  const tutoring = getContentPage("12-services-companeros-cours-de-soutien");
  const serviceImages: Record<string, string> = {
    "suivis-de-voyages": pageImages("11-services-companeros-suivis-de-voyages", travel, 0, 1)[0],
    "preparation-concours": pageImages("09-services-companeros-preparation-concours", concours, 0, 1)[0],
    "cours-de-langues": pageImages("10-services-companeros-cours-de-langues-nationales-internationales", languages, 0, 1)[0],
    "traduction-interpretation": pageImages("08-services-companeros-service-de-traduction-interpretation", translation, 0, 1)[0],
    "cours-de-soutien": pageImages("12-services-companeros-cours-de-soutien", tutoring, 0, 1)[0],
    "activites-culturelles": pageImages("02-companeros-services", overview, 0, 1)[0],
  };

  return {
    overview,
    serviceImages,
    sections: [
      {
        title: "Suivis de voyages",
        body: publicParagraphs(travel).slice(2, 10),
        bullets: [
          "Études, travail, tourisme, immigration et sport",
          "Assistance visa, bourse et volontariat",
          "Admission, inscription, légalisation et traduction",
          "Réservation, assurance et préparation consulaire",
        ],
        images: pageImages("11-services-companeros-suivis-de-voyages", travel, 0, 7),
        cta: { label: "Préparer un voyage", href: "/services/suivis-de-voyages" },
      },
      {
        title: "Préparation concours",
        body: publicParagraphs(concours).slice(1, 6),
        bullets: ["ENS", "Gendarmerie", "Police", "Douane", "IDE"],
        images: pageImages("09-services-companeros-preparation-concours", concours, 0, 6),
        cta: { label: "Voir la préparation", href: "/services/preparation-concours" },
      },
      {
        title: "Cours de langues nationales et internationales",
        body: publicParagraphs(languages).slice(2, 13),
        bullets: ["Anglais", "Espagnol", "Chinois", "Français", "Russe", "Portugais", "Italien"],
        images: pageImages("10-services-companeros-cours-de-langues-nationales-internationales", languages, 0, 11),
        cta: { label: "Choisir une langue", href: "/services/cours-de-langues" },
      },
      {
        title: "Traduction & interprétation",
        body: publicParagraphs(translation).slice(1, 4),
        bullets: ["Traduction simple", "Traduction assermentée", "Traduction express", "Interprétation"],
        images: pageImages("08-services-companeros-service-de-traduction-interpretation", translation, 0, 6),
        cta: { label: "Demander un devis", href: "/services/traduction-interpretation" },
      },
      {
        title: "Cours de soutien",
        body: publicParagraphs(tutoring).slice(2, 19),
        bullets: ["Mathématiques", "Physique-chimie", "Anglais", "Français", "Allemand", "Espagnol", "SVT"],
        images: pageImages("12-services-companeros-cours-de-soutien", tutoring, 0, 8),
        cta: { label: "Inscrire un élève", href: "/services/cours-de-soutien" },
      },
      {
        title: "Activités culturelles",
        body: publicParagraphs(overview).filter((text) => text.includes("danse") || text.includes("FLAMENCO")),
        bullets: ["Danse", "Flamenco", "Guitare", "Piano", "Camps de vacances"],
        images: pageImages("02-companeros-services", overview, 0, 8),
        cta: { label: "Découvrir les activités", href: "/companeros#activites" },
      },
    ] satisfies ServiceSection[],
  };
}

export function getJbkPageData() {
  const page = getContentPage("03-jbk-services");
  const text = publicParagraphs(page);

  return {
    page,
    serviceCards: jbkServices.map((service, index) => ({
      title: service,
      detail: "Une prestation JBK pour les projets d'entreprise, d'artistes, de familles et d'organisations.",
      image: pageImages("03-jbk-services", page, index * 2, 1)[0],
    })),
    sections: [
      {
        title: "Direction JBK Films",
        body: text.slice(0, 14),
        images: pageImages("03-jbk-services", page, 0, 12),
      },
      {
        title: "Services graphiques et communication",
        body: text.slice(14, 26),
        bullets: jbkServices.slice(0, 10),
        images: pageImages("03-jbk-services", page, 12, 18),
      },
      {
        title: "Événementiel",
        body: text.slice(26, 39),
        bullets: jbkEvents,
        images: pageImages("03-jbk-services", page, 30, 18),
      },
      {
        title: "Équipe technique & agence d'acteurs",
        body: text.slice(39, 70),
        images: pageImages("03-jbk-services", page, 48, 24),
      },
      {
        title: "Productions JBK Films",
        body: text.slice(70, 78),
        bullets: ["Courts métrages", "Longs métrages", "Séries", "Top productions", "JBK Ciné Études"],
        images: pageImages("03-jbk-services", page, 72, 10),
      },
      {
        title: "JBK Shop",
        body: text.slice(78, 88),
        bullets: jbkShop,
        images: pageImages("03-jbk-services", page, 80, 8),
      },
    ] satisfies ServiceSection[],
  };
}

export const serviceRoutes: Record<string, string> = {
  "suivis-de-voyages": "11-services-companeros-suivis-de-voyages",
  "preparation-concours": "09-services-companeros-preparation-concours",
  "cours-de-langues": "10-services-companeros-cours-de-langues-nationales-internationales",
  "traduction-interpretation": "08-services-companeros-service-de-traduction-interpretation",
  "cours-de-soutien": "12-services-companeros-cours-de-soutien",
};

export function getServiceRoute(slug: string) {
  const folder = serviceRoutes[slug];
  if (!folder) return null;
  return {
    folder,
    page: getContentPage(folder),
  };
}
