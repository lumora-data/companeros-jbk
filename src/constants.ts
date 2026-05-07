import { SITE_CONTENT } from "@/src/content/site-content";

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
  url?: string;
}

export interface Production {
  id: string;
  title: string;
  image: string;
}

export const COMPANEROS_SERVICES: Service[] =
  SITE_CONTENT.constants.companerosServices as Service[];

export const JBK_SERVICES: Service[] =
  SITE_CONTENT.constants.jbkServices as Service[];

export const PRODUCTIONS: Production[] =
  SITE_CONTENT.constants.productions as Production[];

export const PARTNERS: Partner[] =
  SITE_CONTENT.constants.partners as Partner[];

export const STATS: Stat[] = SITE_CONTENT.constants.stats as Stat[];
