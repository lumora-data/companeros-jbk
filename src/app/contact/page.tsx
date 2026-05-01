import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Hero, SectionIntro } from "@/components/Blocks";
import { contact, getContentPage, publicImagePath } from "@/lib/content";

export default function ContactPage() {
  const page = getContentPage("06-contact");
  const hero = page.images[0] ? publicImagePath("06-contact", page.images[0]) : "";

  return (
    <main>
      <Hero
        image={hero}
        eyebrow="Contact"
        title="Parlons de votre projet"
        lead="Voyage, formation, traduction, production audiovisuelle, événementiel ou partenariat : contactez l'équipe Compañeros-JBK Empire."
      >
        <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
        <a className="button light" href={`mailto:${contact.email}`}>Envoyer un email</a>
      </Hero>

      <section className="section">
        <div className="container split">
          <div>
            <SectionIntro eyebrow="Coordonnées" title="Informations pratiques" />
            <div className="grid">
              <article className="card">
                <Phone size={28} color="var(--blue)" />
                <h3>Téléphone / WhatsApp</h3>
                <p>{contact.phones.join(" / ")}</p>
              </article>
              <article className="card">
                <Mail size={28} color="var(--blue)" />
                <h3>Email</h3>
                <p>{contact.email}</p>
              </article>
              <article className="card">
                <MapPin size={28} color="var(--blue)" />
                <h3>Adresse</h3>
                <p>{contact.address}</p>
                <p>{contact.hours}</p>
              </article>
            </div>
          </div>

          <form className="card" action={`mailto:${contact.email}`} method="post" encType="text/plain">
            <Send size={32} color="var(--red)" />
            <h2>Formulaire de contact</h2>
            <label>
              Nom complet
              <input name="Nom" required />
            </label>
            <label>
              Téléphone
              <input name="Téléphone" required />
            </label>
            <label>
              Email
              <input type="email" name="Email" />
            </label>
            <label>
              Service demandé
              <select name="Service">
                <option>Compañeros - Voyage</option>
                <option>Compañeros - Cours de langues</option>
                <option>Compañeros - Concours</option>
                <option>Compañeros - Traduction</option>
                <option>Compañeros - Cours de soutien</option>
                <option>JBK - Audiovisuel</option>
                <option>JBK - Événementiel</option>
                <option>JBK - Services créatifs</option>
                <option>Partenariat</option>
                <option>Autre</option>
              </select>
            </label>
            <label>
              Message
              <textarea name="Message" rows={6} required />
            </label>
            <button className="button primary" type="submit">Envoyer le message</button>
          </form>
        </div>
      </section>
    </main>
  );
}
