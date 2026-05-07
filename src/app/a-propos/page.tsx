import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import About from "@/src/pages/About";

export const metadata = PAGE_SEO.about;

export default function Page() {
  return (
    <PageTransition>
      <About />
    </PageTransition>
  );
}
