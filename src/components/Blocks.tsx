import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentImage } from "@/lib/content";
import { publicImagePath } from "@/lib/content";
import type React from "react";

export function SectionIntro({
  eyebrow,
  title,
  lead,
  light = false,
  centered = false,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <div className={`${light ? "section-intro light" : "section-intro"}${centered ? " centered" : ""}`}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2 className="title">{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
      <div className="section-line" />
    </div>
  );
}

export function Hero({
  image,
  eyebrow,
  title,
  lead,
  children,
}: {
  image: string;
  eyebrow: string;
  title: string;
  lead: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero">
      <div className="hero-media">
        <img src={image} alt="" />
      </div>
      <div className="container hero-content">
        <div className="eyebrow" style={{ color: "#9ec5ff" }}>{eyebrow}</div>
        <h1>{title}</h1>
        <p>{lead}</p>
        {children ? <div className="button-row" style={{ marginTop: 28 }}>{children}</div> : null}
      </div>
    </section>
  );
}

export function ServiceCard({
  title,
  detail,
  href,
  tone = "blue",
  image,
}: {
  title: string;
  detail: string;
  href: string;
  tone?: "blue" | "red" | "dark";
  image?: string;
}) {
  return (
    <article className={image ? "card service-card visual-card reveal-card" : "card service-card reveal-card"}>
      {image ? (
        <div className="service-card-media">
          <img className="service-card-image" src={image} alt="" loading="lazy" />
          <span className={tone === "red" ? "service-badge red" : "service-badge"}>Service</span>
        </div>
      ) : null}
      <div className="service-card-body">
        <h3>{title}</h3>
        <p>{detail}</p>
      </div>
      <Link className={`service-link ${tone === "red" ? "red" : tone === "dark" ? "dark" : "primary"}`} href={href}>
        En savoir plus <ArrowRight size={18} />
      </Link>
    </article>
  );
}

export function ImageGrid({
  folder,
  images,
  max = 12,
}: {
  folder: string;
  images: ContentImage[];
  max?: number;
}) {
  const selected = images.slice(0, max);
  if (!selected.length) return null;

  return (
    <div className="image-grid">
      {selected.map((image) => (
        <img key={`${folder}-${image.file}`} src={publicImagePath(folder, image)} alt={image.alt || ""} loading="lazy" />
      ))}
    </div>
  );
}

export function ServiceLinkCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link className="card service-card" href={href}>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <span className="button light">
        Découvrir <ArrowRight size={18} />
      </span>
    </Link>
  );
}

export function MediaMosaic({ images }: { images: string[] }) {
  const selected = images.slice(0, 6);
  if (!selected.length) return null;

  return (
    <div className="media-mosaic">
      {selected.map((image, index) => (
        <img key={`${image}-${index}`} src={image} alt="" loading="lazy" />
      ))}
    </div>
  );
}

export function ImageStoryCards({
  title,
  images,
  labels,
}: {
  title: string;
  images: string[];
  labels?: string[];
}) {
  const selected = images.slice(0, 6);
  if (!selected.length) return null;

  return (
    <div className="story-image-cards">
      {selected.map((image, index) => (
        <figure className="story-image-card reveal-card" key={`${image}-${index}`}>
          <img src={image} alt="" loading="lazy" />
          <figcaption>{labels?.[index] ?? title}</figcaption>
        </figure>
      ))}
    </div>
  );
}

export function StorySection({
  title,
  body,
  bullets,
  images,
  cta,
  flip = false,
  dark = false,
}: {
  title: string;
  body: string[];
  bullets?: string[];
  images: string[];
  cta?: { label: string; href: string };
  flip?: boolean;
  dark?: boolean;
}) {
  const primary = images[0];
  const secondary = images.slice(1);
  return (
    <section className={dark ? "story-section dark" : "story-section"}>
      <div className={flip ? "story-inner flip" : "story-inner"}>
        <div className="story-copy">
          <h2>{title}</h2>
          {body.slice(0, 5).map((paragraph, index) => (
            <p key={`${title}-${index}`}>{paragraph}</p>
          ))}
          {bullets?.length ? (
            <div className="chips">
              {bullets.map((bullet) => (
                <span className="chip" key={bullet}>{bullet}</span>
              ))}
            </div>
          ) : null}
          {cta ? (
            <Link className={dark ? "button red" : "button primary"} href={cta.href}>
              {cta.label} <ArrowRight size={18} />
            </Link>
          ) : null}
        </div>
        <div className="story-media-panel reveal-card">
          {primary ? <img className="story-primary-image" src={primary} alt="" loading="lazy" /> : null}
          <ImageStoryCards title={title} images={secondary} labels={bullets} />
        </div>
      </div>
    </section>
  );
}

export function PartnerMarquee({ images }: { images: string[] }) {
  const loop = [...images, ...images];
  return (
    <div className="partner-marquee" aria-label="Partenaires">
      <div className="partner-track">
        {loop.map((image, index) => (
          <div className="partner-logo" key={`${image}-${index}`}>
            <img src={image} alt="Partenaire Compañeros-JBK Empire" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}
