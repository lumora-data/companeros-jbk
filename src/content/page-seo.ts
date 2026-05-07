import type { Metadata } from "next";
import { createPageMetadata } from "@/src/lib/seo";

export const PAGE_SEO: Record<string, Metadata> = {
  home: createPageMetadata({
    title: "Compañeros-JBK Empire | Voyages, Langues, Audiovisuel",
    description:
      "Deux poles complementaires pour vos projets : Compañeros pour voyages, langues, traduction et formation; JBK Films pour audiovisuel, evenementiel et services creatifs.",
    path: "/",
    keywords: ["voyages internationaux", "services creatifs", "formation professionnelle"],
  }),
  companeros: createPageMetadata({
    title: "Compañeros & Services | Voyages, Concours, Langues",
    description:
      "Compañeros accompagne vos projets de mobilite, de formation et de reussite scolaire avec un suivi concret: voyages, concours, langues et traduction.",
    path: "/companeros",
    keywords: ["Compañeros services", "preparation concours", "suivi de voyage"],
  }),
  companerosOrientation: createPageMetadata({
    title: "Orientation Voyage | Compañeros",
    description:
      "Demandez une orientation voyage avec Compañeros: etudes, travail, tourisme, immigration, sport, volontariat et assistance visa.",
    path: "/companeros/orientation",
    keywords: ["orientation voyage", "assistance visa", "voyage etudes cameroun"],
  }),
  companerosConcours: createPageMetadata({
    title: "Preparation Concours | Compañeros",
    description:
      "Preparation continue aux concours ENS, Gendarmerie, Police, Douane et IDE avec accompagnement methodologique adapte.",
    path: "/companeros/preparation-concours",
    keywords: ["preparation concours", "ENS Cameroun", "cours concours"],
  }),
  companerosLangues: createPageMetadata({
    title: "Cours de Langues | Compañeros",
    description:
      "Cours de langues nationales et internationales, renforcement en traduction et interpretation, et camps de vacances linguistiques.",
    path: "/companeros/cours-de-langues",
    keywords: ["cours de langues", "langues nationales cameroun", "langues internationales"],
  }),
  companerosLanguesEnLigne: createPageMetadata({
    title: "Cours de Langue en Ligne | Compañeros",
    description:
      "Suivez directement nos cours de langue en ligne et prenez rendez-vous sur WhatsApp pour votre accompagnement personnalise.",
    path: "/companeros/cours-de-langue-en-ligne",
    keywords: ["cours de langue en ligne", "apprentissage en ligne", "Compañeros langues"],
  }),
  companerosTraduction: createPageMetadata({
    title: "Traduction & Interpretation | Compañeros",
    description:
      "Service de traduction simple et assermentee, interpretation et livraisons rapides pour documents officiels et professionnels.",
    path: "/companeros/traduction-interpretation",
    keywords: ["traduction assermentee", "interpretation", "traduction officielle"],
  }),
  companerosSoutien: createPageMetadata({
    title: "Cours de Soutien | Compañeros",
    description:
      "Cours de soutien pour classes d'examen et etudiants, avec renforcement cible par matiere ou unite d'enseignement.",
    path: "/companeros/cours-de-soutien",
    keywords: ["cours de soutien", "soutien scolaire cameroun", "renforcement academique"],
  }),
  companerosFlamenco: createPageMetadata({
    title: "Escuela de Flamenco de Andalucia | Compañeros",
    description:
      "Formation professionnelle en danse Flamenco avec Compañeros et la EFA, plus cours de musique et activites culturelles.",
    path: "/companeros/flamenco",
    keywords: ["flamenco cameroun", "EFA flamenco", "activites culturelles"],
  }),
  jbk: createPageMetadata({
    title: "JBK Films & Services | Audiovisuel et Evenementiel",
    description:
      "JBK Films regroupe production audiovisuelle, communication, evenementiel, talents artistiques et services creatifs.",
    path: "/jbk",
    keywords: ["JBK Films", "production audiovisuelle", "evenementiel cameroun"],
  }),
  jbkEvenements: createPageMetadata({
    title: "Couverture d'Evenements | JBK Films",
    description:
      "JBK Films assure la couverture video et photo de vos evenements au Cameroun et a l'international.",
    path: "/jbk/evenements",
    keywords: ["couverture evenement", "video evenement", "photo evenement"],
  }),
  jbkDoublage: createPageMetadata({
    title: "Doublage & Sous-titrage | JBK Films",
    description:
      "Decouvrez les services de doublage et sous-titrage proposes par JBK Films pour vos films et contenus audiovisuels.",
    path: "/jbk/doublage",
    keywords: ["doublage film", "sous-titrage video", "adaptation linguistique"],
  }),
  jbkVenteMateriel: createPageMetadata({
    title: "Vente de Materiel Audiovisuel | JBK Films",
    description:
      "Materiel audiovisuel neuf et seconde main, commandes internationales, drones Mavic et solutions camera Canon avec JBK Films.",
    path: "/jbk/vente-materiel",
    keywords: ["vente materiel audiovisuel", "drone mavic", "camera canon"],
  }),
  about: createPageMetadata({
    title: "A Propos | Compañeros-JBK Empire",
    description:
      "Decouvrez l'histoire, la vision et le parcours de Compañeros-JBK Empire et de son fondateur Banderas Kouam.",
    path: "/a-propos",
    keywords: ["a propos compagnons jbk", "Banderas Kouam", "histoire du groupe"],
  }),
  contact: createPageMetadata({
    title: "Contact | Compañeros-JBK Empire",
    description:
      "Contactez Compañeros-JBK Empire pour vos besoins en voyages, langues, traduction, audiovisuel, evenementiel et partenariats.",
    path: "/contact",
    keywords: ["contact companeros", "contact jbk films", "devis services"],
  }),
  partners: createPageMetadata({
    title: "Partenaires | Compañeros-JBK Empire",
    description:
      "Consultez les partenaires de Compañeros-JBK Empire dans les domaines education, voyage, audiovisuel et services.",
    path: "/partenaires",
    keywords: ["partenaires", "reseau professionnel", "collaborations"],
  }),
};
