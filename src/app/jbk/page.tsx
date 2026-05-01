import Link from "next/link";
import { Camera, Film, LayoutGrid, Mic, Monitor, Radio, Scissors, Sparkles, Star, Users, Video } from "lucide-react";
import { Hero, SectionIntro } from "@/components/Blocks";
import { contact, getJbkPageData } from "@/lib/content";

export default function JbkPage() {
  const data = getJbkPageData();
  const hero = "/organized-content/03-jbk-services/images/hero.jpg";
  const [direction, , , talents, productions] = data.sections;
  const icons = [LayoutGrid, Camera, Monitor, Scissors, Mic, Radio, Star, Video, Film, Users];
  const productionsList = [
    ["Affaire Poulet", "long-metrage-01.jpg"],
    ["Métamorphose à outrance", "long-metrage-02.jpg"],
    ["Le partage", "long-metrage-03.jpg"],
    ["Suprématie artificielle", "long-metrage-04.jpg"],
    ["Empoisonnement", "long-metrage-05.jpg"],
    ["Le Photographe", "long-metrage-06.jpg"],
    ["Brenda", "long-metrage-07.jpg"],
    ["Halte !", "long-metrage-09.jpg"],
    ["Mirando Pa'a Cuenca", "long-metrage-10.jpg"],
    ["Par Elles Pour Elles", "long-metrage-11.jpg"],
    ["20.000 Cedis", "long-metrage-12.jpg"],
    ["Potion de séduction", "long-metrage-15.jpg"],
    ["PFFF", "long-metrage-16.jpg"],
    ["Nouveau Stock", "long-metrage-17.jpg"],
  ].map(([title, file]) => ({
    title,
    image: `/organized-content/03-jbk-services/images/${file}`,
  }));
  const actorImages = Array.from({ length: 28 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `/organized-content/03-jbk-services/images/acteur-${number}.jpg`;
  });

  return (
    <main className="jbk-page">
      <Hero
        image={hero}
        eyebrow="JBK & SERVICES"
        title="Films, événementiel, communication et services créatifs"
        lead="JBK Films réunit une maison de production, une équipe technique, une agence d'acteurs et des services créatifs."
      >
        <Link className="button red" href="/contact">Demander un service</Link>
        <a className="button light" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
      </Hero>

      <section className="section jbk-intro">
        <div className="container narrow-center">
          <SectionIntro
            eyebrow="À propos de JBK Films"
            title="Une maison de production et un écosystème créatif"
            lead={direction.body[0] ?? "JBK Films réunit une maison de production, une équipe technique, une agence d'acteurs et des services créatifs."}
            light
          />
        </div>
      </section>

      <section className="section dark-band">
        <div className="container">
          <SectionIntro
            eyebrow="Expertises"
            title="Des services pour filmer, communiquer et organiser"
            lead="JBK accompagne les projets depuis l'idée jusqu'à la production, la diffusion, l'événement ou la commande."
            light
          />
          <div className="grid four">
            {data.serviceCards.map((service, index) => {
              const Icon = icons[index % icons.length];
              return (
              <article className="jbk-icon-card reveal-card" key={service.title}>
                <div className="jbk-icon-orbit">
                  <Icon size={34} />
                </div>
                <div>
                  <h3>{service.title}</h3>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section productions-section">
        <div className="container">
          <SectionIntro
            eyebrow="Productions"
            title="Courts métrages et longs métrages"
            lead={productions.body[0] ?? "JBK développe des productions audiovisuelles portées par une équipe de réalisation, de production et d'acteurs."}
            light
          />
          <div className="poster-grid">
            {productionsList.map((production) => (
              <article className="production-card reveal-card" key={production.image}>
                <img src={production.image} alt="" loading="lazy" />
                <div>
                  <h3>{production.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section actors-section">
        <div className="container">
          <SectionIntro
            eyebrow="Équipe des acteurs"
            title="CEO, réalisateur et talents JBK"
            lead={talents.body[0] ?? "JBK réunit des acteurs, actrices, réalisateurs, techniciens et talents créatifs pour porter ses productions."}
            light
          />
          <div className="actor-feature">
            <img src="/organized-content/03-jbk-services/images/Banderas-Kouam-CEO.jpg" alt="" loading="lazy" />
            <div>
              <span>CEO / Réalisateur / Producteur / Acteur</span>
              <h3>Banderas Kouam</h3>
              <p>
                Fondateur de JBK, il supervise la vision créative, la production et le développement des projets audiovisuels.
              </p>
            </div>
          </div>
          <div className="actors-grid">
            {actorImages.map((image, index) => (
              <article className="actor-card reveal-card" key={image}>
                <img src={image} alt="" loading="lazy" />
                <div>
                  <h3>{`Acteur ${index + 1}`}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container grid two">
          <article className="card">
            <Users size={34} color="var(--red)" />
            <h3>Agence d'acteurs</h3>
            <p>{talents.body[0] ?? "Formation cinématographique, préparation des talents et placement sur des projets audiovisuels au Cameroun et à l'international."}</p>
          </article>
          <article className="card">
            <Film size={34} color="var(--red)" />
            <h3>Productions JBK Films</h3>
            <p>Courts métrages et longs métrages portés par l'équipe de production et les talents JBK.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container card" style={{ textAlign: "center" }}>
          <Sparkles size={42} color="var(--red)" style={{ marginInline: "auto" }} />
          <h2 className="title">Une idée à produire ou un événement à préparer ?</h2>
          <p className="lead" style={{ maxWidth: 760, marginInline: "auto" }}>
            JBK peut vous accompagner pour une vidéo, une publicité, un shooting, un événement ou une formation.
          </p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 24 }}>
            <Link className="button red" href="/contact">Démarrer un projet</Link>
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Écrire sur WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
