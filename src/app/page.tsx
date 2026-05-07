import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import Home from "@/src/pages/Home";

export const metadata = PAGE_SEO.home;

export default function Page() {
  return (
    <PageTransition>
      <Home />
    </PageTransition>
  );
}
