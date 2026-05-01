import Link from "next/link";
import { HeartHandshake } from "lucide-react";
import { Hero, ImageGrid, SectionIntro } from "@/components/Blocks";
import { contact, getContentPage, publicImagePath } from "@/lib/content";

export default function AboutPage() {
  const about = getContentPage("04-a-propos");
  const home = getContentPage("01-accueil");
  const hero = about.images[0] ? publicImagePath("04-a-propos", about.images[0]) : publicImagePath("01-accueil", home.images[0]);

  return (
    <main>
      <Hero
        image={hero}
        eyebrow="À propos"
        title="Deux pôles complémentaires, une vision commune"
        lead="Compañeros-JBK Empire réunit l'accompagnement éducatif et voyage avec la production audiovisuelle, les services créatifs et l'événementiel."
      >
        <Link className="button primary" href="/companeros">Compañeros</Link>
        <Link className="button red" href="/jbk">JBK</Link>
      </Hero>

      <section className="section">
        <div className="container split">
          <div>
            <SectionIntro
              eyebrow="Histoire"
              title="Un groupe construit autour de l'accompagnement et de la création"
              lead="Compañeros couvre principalement l'assistance voyage, les cours de langues, les préparations aux concours et les services éducatifs. JBK couvre la production audiovisuelle, l'événementiel, le e-commerce et les services créatifs."
            />
            <p className="lead">
              L'ensemble est porté par Banderas Kouam, pédagogue, réalisateur, producteur et acteur. Cette vision relie l'accompagnement humain, la formation, la création et le service professionnel.
            </p>
          </div>
          <ImageGrid folder="04-a-propos" images={about.images} max={4} />
        </div>
      </section>

      <section className="section band">
        <div className="container">
          <SectionIntro eyebrow="Valeurs" title="Des principes simples, visibles dans chaque service" />
          <div className="grid five">
            {["Accompagnement", "Créativité", "Professionnalisme", "Innovation", "Proximité"].map((value) => (
              <article className="card" key={value}>
                <HeartHandshake size={30} color="var(--blue)" />
                <h3>{value}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container card">
          <h2>Contact direct</h2>
          <p className="lead">{contact.address}</p>
          <div className="button-row">
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Écrire sur WhatsApp</a>
            <Link className="button primary" href="/contact">Page contact</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
