import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosFlamenco from "@/src/pages/CompanerosFlamenco";

export const metadata = PAGE_SEO.companerosFlamenco;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosFlamenco />
    </PageTransition>
  );
}
