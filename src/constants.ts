export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  details?: string[];
}

export interface Stat {
  label: string;
  value: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface Production {
  id: string;
  title: string;
  image: string;
}

export const COMPANEROS_SERVICES: Service[] = [
  {
    id: "voyage",
    title: "Suivis de voyages",
    description: "Un accompagnement complet pour vos projets de mobilité internationale.",
    icon: "Plane",
    details: [
      "Études (Assistance admission & visa)",
      "Travail & Immigration professionnelle",
      "Tourisme & Visites familiales",
      "Sport & Volontariat international",
      "Bourses d'études & Prise en charge",
      "Préparation aux entretiens consulaires"
    ]
  },
  {
    id: "concours",
    title: "Préparation concours",
    description: "Réussissez vos examens d'entrée avec une méthodologie éprouvée.",
    icon: "FileText",
    details: [
      "Concours de la Gendarmerie & Police",
      "Douanes & Administration pénitentiaire",
      "ENS & ENSET (Enseignement)",
      "Infirmiers Diplômés d'État (IDE)",
      "Simulations d'épreuves orales",
      "Supports de cours & examens blancs"
    ]
  },
  {
    id: "langues",
    title: "Cours de langues",
    description: "Maîtrisez une nouvelle langue pour vos études ou votre culture.",
    icon: "Globe",
    details: [
      "Langues internationales (A1 à C2)",
      "Préparation aux tests (TOEFL, IELTS, DELE)",
      "Langues nationales (Patrimoine culturel)",
      "Cours intensifs pour voyageurs",
      "Clubs de conversation",
      "Français langue étrangère"
    ]
  },
  {
    id: "traduction",
    title: "Traduction & interprétation",
    description: "Des services linguistiques professionnels pour vos documents et événements.",
    icon: "Languages",
    details: [
      "Traduction assermentée de documents officiels",
      "Traduction technique & commerciale",
      "Interprétariat de conférence",
      "Révision & correction de textes",
      "Demandes express de traduction",
      "Sous-titrage de contenus vidéo"
    ]
  },
  {
    id: "soutien",
    title: "Soutien scolaire",
    description: "Évitez l'échec scolaire avec un encadrement personnalisé.",
    icon: "BookOpen",
    details: [
      "Matières scientifiques (Maths, PC, SVT)",
      "Matières littéraires & Langues",
      "Préparation au BEPC, Probatoire & BAC",
      "Suivi universitaire par UE spécifique",
      "Méthodologie d'apprentissage",
      "Remise à niveau pendant les vacances"
    ]
  },
  {
    id: "culture",
    title: "Activités culturelles",
    description: "Développez vos talents artistiques dans un cadre stimulant.",
    icon: "Music",
    details: [
      "Cours d'instruments (Piano, Guitare)",
      "Chant & Chorale",
      "Activités d'éveil pour enfants",
      "Camps de vacances culturels",
      "Ateliers de théâtre & art oratoire",
      "Danse traditionnelle & moderne"
    ]
  },
];

export const JBK_SERVICES: Service[] = [
  { id: "graphisme", title: "Graphisme & Impression", description: "Design de logos, flyers, affiches et impressions tous supports.", icon: "Palette" },
  { id: "evenement", title: "Événementiel", description: "Couverture vidéo et photo complète de vos événements (mariages, concerts).", icon: "Camera" },
  { id: "web", title: "Création Web", description: "Développement de sites vitrines et plateformes e-commerce modernes.", icon: "Layout" },
  { id: "doublage", title: "Doublage & Sous-titrage", description: "Adaptation linguistique de vos films et contenus audiovisuels.", icon: "Type" },
  { id: "voix", title: "Voix Off", description: "Enregistrement de voix professionnelles pour publicités et documentaires.", icon: "Mic" },
  { id: "drone", title: "Prises de vue Drone", description: "Images aériennes spectaculaires en haute définition (4K).", icon: "Wind" },
  { id: "vente", title: "Vente de Matériel", description: "Équipements audiovisuels professionnels neufs et d'occasion.", icon: "Smartphone" },
  { id: "pub", title: "Publicité TV & Web", description: "Conception et réalisation de spots publicitaires impactants.", icon: "Tv" },
  { id: "com", title: "Communication Digitale", description: "Stratégie de présence en ligne et gestion des réseaux sociaux.", icon: "Globe" },
  { id: "formation", title: "Formation Pro", description: "Apprentissage des métiers de l'audiovisuel et du graphisme.", icon: "GraduationCap" },
];

export const PRODUCTIONS: Production[] = [
  { title: "Affaire Poulet", id: "1", image: "/organized-content/jbk/images/long-metrage-01.jpg" },
  { title: "Métamorphose à outrance", id: "2", image: "/organized-content/jbk/images/long-metrage-02.jpg" },
  { title: "Le partage", id: "3", image: "/organized-content/jbk/images/long-metrage-03.jpg" },
  { title: "Suprématie artificielle", id: "4", image: "/organized-content/jbk/images/long-metrage-04.jpg" },
  { title: "Empoisonnement", id: "5", image: "/organized-content/jbk/images/long-metrage-05.jpg" },
  { title: "Le photographe", id: "6", image: "/organized-content/jbk/images/long-metrage-06.jpg" },
  { title: "Brenda", id: "7", image: "/organized-content/jbk/images/long-metrage-07.jpg" },
  { title: "Halte!", id: "8", image: "/organized-content/jbk/images/long-metrage-09.jpg" },
  { title: "Mirando Pa' Cuenca", id: "9", image: "/organized-content/jbk/images/long-metrage-10.jpg" },
  { title: "Par elles pour elles", id: "10", image: "/organized-content/jbk/images/long-metrage-11.jpg" },
  { title: "20.000 Cedis", id: "11", image: "/organized-content/jbk/images/long-metrage-12.jpg" },
  { title: "Potion de séduction", id: "12", image: "/organized-content/jbk/images/long-metrage-15.jpg" },
  { title: "Pfff", id: "13", image: "/organized-content/jbk/images/long-metrage-16.jpg" },
  { title: "Nouveau Stock", id: "14", image: "/organized-content/jbk/images/long-metrage-17.jpg" },
];

export const PARTNERS: Partner[] = [
  { id: "1", name: "Partenaire 1", logo: "/organized-content/partenaires/images/05-800-6871fa35c21f7-9a847c35.jpg" },
  { id: "2", name: "Partenaire 2", logo: "/organized-content/partenaires/images/06-800-6871fc6566bb1-3bcf15e0.png" },
  { id: "3", name: "Partenaire 3", logo: "/organized-content/partenaires/images/07-800-6874cd31445df-d22893f4.jpg" },
  { id: "4", name: "Partenaire 4", logo: "/organized-content/partenaires/images/08-800-6874cd6354a02-bec0579b.png" },
  { id: "5", name: "Partenaire 5", logo: "/organized-content/partenaires/images/09-800-686553125c61f-3cd75252.jpg" },
  { id: "6", name: "Partenaire 6", logo: "/organized-content/partenaires/images/10-800-filter-nobg-6870b9b2be84d-314f399c.png" },
  { id: "7", name: "Partenaire 7", logo: "/organized-content/partenaires/images/11-800-filter-nobg-6879f85ec9d07-6c462dd9.png" },
  { id: "8", name: "Partenaire 8", logo: "/organized-content/partenaires/images/12-800-filter-nobg-694698079d5a2-c89913a7.png" },
  { id: "9", name: "Partenaire 9", logo: "/organized-content/partenaires/images/13-800-6874ce44adb07-6e0dee31.jpg" },
  { id: "10", name: "Partenaire 10", logo: "/organized-content/partenaires/images/14-800-filter-nobg-6879f8d7dbd7b-c9ba2cbc.png" },
];

export const STATS: Stat[] = [
  { label: "Expertise", value: "2013" },
  { label: "Projets d'impact", value: "500" },
  { label: "Followers", value: "12000" },
  { label: "Engagement", value: "100" },
];
