import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import Contact from "@/src/pages/Contact";

export const metadata = PAGE_SEO.contact;

export default function Page() {
  return (
    <PageTransition>
      <Contact />
    </PageTransition>
  );
}
