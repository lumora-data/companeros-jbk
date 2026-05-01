import Link from "next/link";
import { Handshake, Network, Users } from "lucide-react";
import { Hero, PartnerMarquee, SectionIntro } from "@/components/Blocks";
import { contact, getContentPage, publicImagePath } from "@/lib/content";

export default function PartnersPage() {
  const page = getContentPage("07-partenaires-1");
  const hero = page.images[0] ? publicImagePath("07-partenaires-1", page.images[0]) : "";
  const images = page.images.map((image) => publicImagePath("07-partenaires-1", image));

  return (
    <main>
      <Hero
        image={hero}
        eyebrow="Partenaires"
        title="Un réseau pour apprendre, créer et collaborer"
        lead="Compañeros-JBK Empire développe des collaborations avec des structures éducatives, culturelles, créatives et commerciales."
      >
        <Link className="button primary" href="/contact">Devenir partenaire</Link>
        <a className="button light" href={contact.whatsapp} target="_blank" rel="noreferrer">Proposer une collaboration</a>
      </Hero>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Collaborations"
            title="Des partenaires qui renforcent notre impact"
            lead="Chaque collaboration ouvre de nouvelles possibilités pour la formation, la culture, la création et les services aux communautés."
          />
          <PartnerMarquee images={images} />
        </div>
      </section>

      <section className="section band">
        <div className="container grid three">
          <article className="card">
            <Handshake size={34} color="var(--blue)" />
            <h3>Partenariats éducatifs</h3>
            <p>Collaborations autour des langues, concours, voyages, formations et activités culturelles.</p>
          </article>
          <article className="card">
            <Network size={34} color="var(--blue)" />
            <h3>Partenariats créatifs</h3>
            <p>Projets audiovisuels, événementiels, communication, contenus et productions.</p>
          </article>
          <article className="card">
            <Users size={34} color="var(--blue)" />
            <h3>Devenir partenaire</h3>
            <p>Écoles, entreprises, associations, artistes et institutions peuvent proposer une collaboration.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container card" style={{ textAlign: "center" }}>
          <h2>Construisons une collaboration utile</h2>
          <p className="lead" style={{ maxWidth: 720, marginInline: "auto" }}>
            Présentez votre structure, votre idée ou votre besoin. L'équipe vous répondra avec les possibilités de partenariat.
          </p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 24 }}>
            <Link className="button primary" href="/contact">Nous contacter</Link>
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
