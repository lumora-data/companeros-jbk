import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import Jbk from "@/src/pages/Jbk";

export const metadata = PAGE_SEO.jbk;

export default function Page() {
  return (
    <PageTransition>
      <Jbk />
    </PageTransition>
  );
}
