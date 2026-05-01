"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { contact } from "@/lib/contact";

const links = [
  ["Accueil", "/"],
  ["Compañeros", "/companeros"],
  ["JBK", "/jbk"],
  ["À propos", "/a-propos"],
  ["Partenaires", "/partenaires"],
  ["Contact", "/contact"],
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link className="brand" href="/" onClick={() => setOpen(false)}>
            <span className="brand-logo">
              <img src="/brand/companeros-empire-logo.png" alt="Compañeros-JBK Empire" />
            </span>
            <span>
              Compañeros<span className="brand-red">-</span>JBK
              <small>Empire</small>
            </span>
          </Link>
          <nav className="nav" aria-label="Navigation principale">
            {links.map(([label, href]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
            <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer">
              <MessageCircle size={18} />
              WhatsApp
            </a>
          </nav>
          <button className="menu-toggle" type="button" aria-label="Ouvrir le menu" onClick={() => setOpen((value) => !value)}>
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <nav className={open ? "mobile-nav open" : "mobile-nav"} aria-label="Navigation mobile">
          {links.map(([label, href]) => (
            <Link key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <a className="button whatsapp" href={contact.whatsapp} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
            <MessageCircle size={18} />
            Nous contacter
          </a>
        </nav>
      </div>
    </header>
  );
}
