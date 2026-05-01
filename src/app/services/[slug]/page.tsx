import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Hero, SectionIntro } from "@/components/Blocks";
import { contact, getServiceRoute, publicImagePath, publicParagraphs, serviceRoutes } from "@/lib/content";
import { cleanPageTitle } from "@/lib/utils";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ctas: Record<string, string> = {
  "suivis-de-voyages": "Lancer mon dossier",
  "preparation-concours": "Demander le programme",
  "cours-de-langues": "Choisir une langue",
  "traduction-interpretation": "Demander un devis",
  "cours-de-soutien": "Inscrire un élève",
};

export function generateStaticParams() {
  return Object.keys(serviceRoutes).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const result = getServiceRoute(slug);
  if (!result) return {};
  return {
    title: `${cleanPageTitle(result.page.title)} | Compañeros & Services`,
    description: result.page.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const result = getServiceRoute(slug);
  if (!result) notFound();

  const { folder, page } = result;
  const hero = page.images[0] ? publicImagePath(folder, page.images[0]) : "";
  const paragraphs = publicParagraphs(page);
  const lead = page.description || paragraphs[0] || "Un service Compañeros pour avancer avec méthode.";
  const keyPoints = paragraphs.filter((text) => text.startsWith("*") || text.startsWith("-")).slice(0, 12);
  const title = cleanPageTitle(page.title);
  const narrative = paragraphs.filter((text) => !text.startsWith("*") && !text.startsWith("-") && text !== title);

  return (
    <main>
      <Hero image={hero} eyebrow="Compañeros & Services" title={title} lead={lead}>
        <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">{ctas[slug] ?? "Contacter Compañeros"}</a>
        <Link className="button light" href="/companeros">Tous les services</Link>
      </Hero>

      <section className="section">
        <div className="container split">
          <div>
            <Link className="button light" href="/companeros">
              <ArrowLeft size={18} />
              Retour à Compañeros
            </Link>
            <div style={{ marginTop: 30 }}>
              <SectionIntro eyebrow="Service" title="Ce que Compañeros propose" />
            </div>
            {narrative.slice(0, 8).map((paragraph, index) => (
              <p className="lead" key={`${paragraph.slice(0, 30)}-${index}`}>{paragraph}</p>
            ))}
          </div>
          <div className="grid two">
            {page.images.slice(0, 4).map((image, index) => (
              <article className="card media-card reveal-card" key={image.file}>
                <img src={publicImagePath(folder, image)} alt="" loading="lazy" />
                <div className="card-body">
                  <h3>{["Accompagnement", "Préparation", "Suivi", "Résultat"][index % 4]}</h3>
                  <p>Un aperçu concret du service et de l'environnement proposé par Compañeros.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {keyPoints.length ? (
        <section className="section band">
          <div className="container">
            <SectionIntro eyebrow="À retenir" title="Points importants" />
            <div className="grid three">
              {keyPoints.map((point, index) => (
                <article className="card" key={`${point}-${index}`}>
                  <CheckCircle2 size={28} color="var(--green)" />
                  <p>{point.replace(/^[-*]\s*/, "")}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <SectionIntro eyebrow="En images" title="Le service en pratique" />
          <div className="grid three">
            {page.images.slice(4).map((image, index) => (
              <article className="card media-card reveal-card" key={image.file}>
                <img src={publicImagePath(folder, image)} alt="" loading="lazy" />
                <div className="card-body">
                  <h3>{["Conseil", "Formation", "Dossier", "Orientation", "Projet"][index % 5]}</h3>
                  <p>Une image liée à ce service pour mieux comprendre l'offre et ses usages.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container card" style={{ textAlign: "center" }}>
          <h2>Besoin de ce service ?</h2>
          <p className="lead" style={{ maxWidth: 720, marginInline: "auto" }}>
            Contactez l'équipe pour confirmer les disponibilités, les tarifs, les documents à fournir et les prochaines étapes.
          </p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 24 }}>
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Écrire sur WhatsApp</a>
            <Link className="button primary" href="/contact">Formulaire de contact</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
