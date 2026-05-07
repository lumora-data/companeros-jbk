import { PARTNERS } from "@/src/constants";
import { PAGE_SEO } from "@/src/content/page-seo";
import { SITE_CONTENT } from "@/src/content/site-content";

export const metadata = PAGE_SEO.partners;

export default function Page() {
  const { badge, title } = SITE_CONTENT.pages.partenaires;

  return (
    <section className="min-h-screen bg-noir-deep px-6 pb-24 pt-36 md:pt-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-3xl">
          <p className="mb-5 inline-block rounded-full bg-gold px-5 py-1.5 text-[10px] font-black uppercase tracking-widest text-noir-deep">
            {badge}
          </p>
          <h1 className="font-display text-4xl font-black uppercase leading-tight tracking-tighter text-white md:text-7xl">
            {title}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {PARTNERS.map((partner) => (
            <div
              key={partner.id}
              className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/5 bg-noir-card p-6"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-24 w-full object-contain transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
