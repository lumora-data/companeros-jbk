import Link from "next/link";
import { ArrowRight, Film, GraduationCap, Handshake, Plane, Sparkles, Users, Video } from "lucide-react";
import { Hero, PartnerMarquee, SectionIntro } from "@/components/Blocks";
import { contact, getContentPage, publicImagePath } from "@/lib/content";

export default function HomePage() {
  const home = getContentPage("01-accueil");
  const partners = getContentPage("07-partenaires-1");
  const heroImage = home.images[0] ? publicImagePath("01-accueil", home.images[0]) : "";
  const partnerImages = partners.images.map((image) => publicImagePath("07-partenaires-1", image));

  return (
    <main>
      <Hero
        image={heroImage}
        eyebrow="Compañeros-JBK Empire"
        title="Compañeros-JBK Empire"
        lead="Deux pôles complémentaires accompagnent vos projets : Compañeros pour la formation, les langues et les voyages ; JBK pour l'audiovisuel, l'événementiel et les services créatifs."
      >
        <Link className="button primary" href="/companeros">
          Compañeros & Services <ArrowRight size={18} />
        </Link>
        <Link className="button red" href="/jbk">
          JBK & Services <ArrowRight size={18} />
        </Link>
        <a className="button light" href={contact.whatsapp} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </Hero>

      <section className="container dual-grid" aria-label="Deux pôles">
        <article className="business-card blue">
          <GraduationCap size={44} />
          <div>
            <h2>COMPAÑEROS & SERVICES</h2>
            <p>Voyages, concours, langues, traduction, cours de soutien et activités culturelles.</p>
          </div>
          <Link className="button light" href="/companeros">
            Découvrir le centre <ArrowRight size={18} />
          </Link>
        </article>
        <article className="business-card red">
          <Film size={44} />
          <div>
            <h2>JBK & SERVICES</h2>
            <p>Production audiovisuelle, communication, événementiel, talents et services créatifs.</p>
          </div>
          <Link className="button light" href="/jbk">
            Découvrir JBK <ArrowRight size={18} />
          </Link>
        </article>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Qui sommes-nous ?"
            title="Une alliance stratégique au service de votre réussite et de votre créativité"
            lead="Compañeros-JBK Empire réunit des services utiles au quotidien : préparer un départ, apprendre une langue, réussir un concours, produire une vidéo ou organiser un événement."
            centered
          />
          <div className="grid three value-grid">
            {[
              { icon: GraduationCap, title: "Expertise", desc: "Depuis 2013, Compañeros accompagne les étudiants, familles et professionnels dans leurs projets de formation, voyage et langues." },
              { icon: Video, title: "Créativité", desc: "JBK Films porte les projets audiovisuels, événements, talents, contenus créatifs et services de communication." },
              { icon: Users, title: "Engagement", desc: "Un accompagnement humain, concret et orienté résultat pour avancer avec les bonnes étapes." },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <article className="value-card reveal-card" key={item.title}>
                  <Icon size={34} />
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Partenaires"
            title="Un réseau de collaborations"
            lead="Partenaires éducatifs, culturels et créatifs accompagnent le développement des deux pôles."
          />
          <PartnerMarquee images={partnerImages} />
          <div style={{ marginTop: 28 }}>
            <Link className="button primary" href="/partenaires">
              Voir les partenaires <Handshake size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container card" style={{ textAlign: "center" }}>
          <Sparkles size={42} color="var(--blue)" style={{ marginInline: "auto" }} />
          <h2 className="title">Besoin d'un accompagnement ?</h2>
          <p className="lead" style={{ maxWidth: 720, marginInline: "auto" }}>
            L'équipe vous oriente vers le bon service selon votre projet : voyage, cours, traduction, production ou événement.
          </p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 24 }}>
            <Link className="button primary" href="/contact">Nous contacter</Link>
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Écrire sur WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
