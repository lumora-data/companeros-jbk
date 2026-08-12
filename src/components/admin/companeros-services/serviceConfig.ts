export type ServiceCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string[];
};

export type ServiceConfig = {
  id: string;
  pageKey: string;
  label: string;
  publicPath: string;
};

export const SERVICE_CONFIGS: ServiceConfig[] = [
  { id: "voyage", pageKey: "pages.companerosOrientation", label: "Suivis de voyages", publicPath: "/companeros/orientation" },
  { id: "culture", pageKey: "pages.companerosFlamenco", label: "Flamenco", publicPath: "/companeros/flamenco" },
  { id: "concours", pageKey: "pages.companerosConcours", label: "Préparation concours", publicPath: "/companeros/preparation-concours" },
  { id: "langues", pageKey: "pages.companerosLangues", label: "Cours de langues", publicPath: "/companeros/cours-de-langues" },
  { id: "langues-en-ligne", pageKey: "pages.companerosLanguesEnLigne", label: "Cours de langue en ligne", publicPath: "/companeros/cours-de-langue-en-ligne" },
  { id: "traduction", pageKey: "pages.companerosTraduction", label: "Traduction & interprétation", publicPath: "/companeros/traduction-interpretation" },
  { id: "soutien", pageKey: "pages.companerosSoutien", label: "Soutien scolaire", publicPath: "/companeros/cours-de-soutien" },
];

export const SERVICE_CARD_SECTION_KEY = "constants.companerosServices";

export function configForService(id: string): ServiceConfig | undefined {
  return SERVICE_CONFIGS.find((config) => config.id === id);
}

export function createServiceFromTemplate(index: number): ServiceCard {
  return {
    id: `service-${Date.now()}`,
    title: `Nouveau service ${index + 1}`,
    description: "Résumé du service à afficher sur la carte.",
    icon: "Globe",
    details: ["Premier point fort", "Deuxième point fort"],
  };
}
