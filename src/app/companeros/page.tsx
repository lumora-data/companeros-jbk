import Link from "next/link";
import { BookOpen, CheckCircle2, Languages, Plane } from "lucide-react";
import { Hero, SectionIntro, ServiceCard } from "@/components/Blocks";
import { companerosServices, contact, getCompanerosPageData, publicImagePath } from "@/lib/content";

export default function CompanerosPage() {
  const data = getCompanerosPageData();
  const hero = data.overview.images[0] ? publicImagePath("02-companeros-services", data.overview.images[0]) : "";
  const [travel, , languages, , tutoring] = data.sections;
  const languageGroups = [
    {
      title: "Langues internationales",
      text: "Programmes pour apprendre ou renforcer une langue utile aux études, aux voyages et au travail.",
      items: ["Anglais", "Espagnol", "Chinois", "Français", "Russe", "Portugais", "Italien"],
      image: languages.images[2] ?? languages.images[0],
      icon: BookOpen,
    },
    {
      title: "Langues nationales",
      text: "Cours oraux et écrits pour transmettre et pratiquer les langues nationales du Cameroun avec méthode.",
      items: ["Héritage culturel", "Expression orale", "Cours encadrés", "Pratique progressive"],
      image: languages.images[1] ?? languages.images[0],
      icon: Languages,
    },
  ];

  return (
    <main>
      <Hero
        image={hero}
        eyebrow="COMPAÑEROS & SERVICES"
        title="Voyages, langues, concours et accompagnement éducatif"
        lead="Depuis 2013, Compañeros accompagne les projets de mobilité, de formation et de réussite scolaire avec des services concrets et un suivi humain."
      >
        <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Prendre rendez-vous</a>
        <Link className="button light" href="/contact">Demander une orientation</Link>
      </Hero>

      <section className="section language-learning-section">
        <div className="container">
          <SectionIntro
            eyebrow="Services"
            title="Un centre pour préparer, apprendre et avancer"
            lead="Chaque service répond à un besoin clair : préparer un départ, réussir un concours, apprendre une langue, traduire un document ou renforcer son niveau."
          />
          <div className="grid three">
            {companerosServices.map((service) => (
              <ServiceCard
                key={service.title}
                title={service.title}
                detail={service.detail}
                href={service.slug === "activites-culturelles" ? "/contact" : `/services/${service.slug}`}
                image={data.serviceImages[service.slug]}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container feature-layout">
          <div className="feature-copy">
            <SectionIntro
              eyebrow="Suivis de voyages"
              title="Un dossier préparé étape par étape"
              lead={travel.body[0] ?? "Un voyage réussi commence par une préparation claire, des documents vérifiés et un suivi sérieux."}
            />
            <div className="check-grid">
              {travel.bullets?.map((item) => (
                <div className="mini-check" key={item}>
                  <CheckCircle2 size={18} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="button-row" style={{ marginTop: 28 }}>
              <Link className="button primary" href="/services/suivis-de-voyages">Préparer un voyage</Link>
              <a className="button light" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <div className="showcase-card blue">
            {travel.images[0] ? <img src={travel.images[0]} alt="" loading="lazy" /> : null}
            <div className="showcase-body">
              <Plane size={34} />
              <h3>Études, travail, tourisme, immigration, sport et volontariat</h3>
              <p>Admission, inscription, légalisation, traduction, assurance, réservation et préparation consulaire.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionIntro
            eyebrow="Langues"
            title="Apprendre une langue avec un objectif clair"
            lead={languages.body[0] ?? "Compañeros propose des cours de langues nationales et internationales adaptés aux projets d'études, de voyage et de carrière."}
          />
          <div className="grid two">
            {languageGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article className="language-card reveal-card" key={group.title}>
                  {group.image ? <img src={group.image} alt="" loading="lazy" /> : null}
                  <div>
                    <Icon size={34} />
                    <h3>{group.title}</h3>
                    <p>{group.text}</p>
                    <div className="chips">
                      {group.items.map((item) => <span className="chip" key={item}>{item}</span>)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section dark-band">
        <div className="container feature-layout">
          <div>
            <SectionIntro
              eyebrow="Cours de soutien"
              title="Renforcement scolaire et universitaire"
              lead={tutoring.body[0] ?? "Des cours de soutien pour les classes d'examen, les élèves et les étudiants qui veulent progresser avec un cadre."}
              light
            />
            <div className="chips">
              {tutoring.bullets?.map((item) => <span className="chip" key={item}>{item}</span>)}
            </div>
            <div className="grid two compact-grid" style={{ marginTop: 28 }}>
              <article className="glass-card">
                <h3>Primaire / Secondaire</h3>
                <p>10.000 F CFA par mois et par matière. Forfait de 3 matières : 25.000 F CFA.</p>
              </article>
              <article className="glass-card">
                <h3>Université</h3>
                <p>3.000 F CFA par mois et par UE. Forfait de 3 UE : 10.000 F CFA.</p>
              </article>
            </div>
          </div>
          <div className="showcase-card dark">
            {tutoring.images[0] ? <img src={tutoring.images[0]} alt="" loading="lazy" /> : null}
            <div className="showcase-body">
              <BookOpen size={34} />
              <h3>Un suivi pour progresser sans attendre la dernière minute</h3>
              <p>Mathématiques, physique-chimie, langues, SVT et accompagnement selon le niveau.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container feature-layout">
          <div>
            <SectionIntro
              eyebrow="Rendez-vous"
              title="Consultation, suivi de dossier et inscription"
              lead="Vous pouvez prendre rendez-vous pour une consultation, le suivi d'un dossier de voyage ou une inscription aux cours. L'équipe confirme les horaires et les documents nécessaires."
            />
            <div className="button-row">
              <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp direct</a>
              <Link className="button primary" href="/contact">Remplir le formulaire</Link>
            </div>
          </div>
          <div className="card appointment-card">
            {[
              "Rendez-vous de consultation",
              "Suivi du dossier de voyage",
              "Inscription aux cours",
              "Informations sur les tarifs et programmes",
            ].map((item) => (
              <p key={item} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <CheckCircle2 size={19} color="var(--green)" /> {item}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section band">
        <div className="container card" style={{ textAlign: "center" }}>
          <Plane size={40} color="var(--blue)" style={{ marginInline: "auto" }} />
          <h2 className="title">Un projet à préparer ?</h2>
          <p className="lead" style={{ maxWidth: 760, marginInline: "auto" }}>
            L'équipe Compañeros peut vous orienter vers le bon service et vous indiquer les prochaines étapes.
          </p>
          <div className="button-row" style={{ justifyContent: "center", marginTop: 24 }}>
            <Link className="button primary" href="/contact">Demander un rendez-vous</Link>
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">Écrire sur WhatsApp</a>
          </div>
        </div>
      </section>
    </main>
  );
}
