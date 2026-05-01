import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { contact } from "@/lib/content";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ color: "#fff" }}>
              <span className="brand-logo footer-logo">
                <img src="/brand/companeros-empire-logo.png" alt="Compañeros-JBK Empire" />
              </span>
              <span>Compañeros-JBK Empire</span>
            </div>
            <p style={{ lineHeight: 1.7, marginTop: 18 }}>
              Deux pôles complémentaires pour accompagner vos projets : formation, voyages, langues, traduction, production
              audiovisuelle, événementiel et services créatifs.
            </p>
          </div>
          <div>
            <h3>Navigation</h3>
            <p><Link href="/companeros">Compañeros & Services</Link></p>
            <p><Link href="/jbk">JBK & Services</Link></p>
            <p><Link href="/partenaires">Partenaires</Link></p>
            <p><Link href="/contact">Contact</Link></p>
          </div>
          <div>
            <h3>Coordonnées</h3>
            <p><Phone size={16} style={{ verticalAlign: "middle" }} /> {contact.phones.join(" / ")}</p>
            <p><Mail size={16} style={{ verticalAlign: "middle" }} /> {contact.email}</p>
            <p><MapPin size={16} style={{ verticalAlign: "middle" }} /> {contact.address}</p>
            <p>{contact.hours}</p>
          </div>
        </div>
        <div className="footer-bottom">© 2026 Compañeros-JBK Empire. Tous droits réservés.</div>
      </div>
    </footer>
  );
}
