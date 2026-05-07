import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import Companeros from "@/src/pages/Companeros";

export const metadata = PAGE_SEO.companeros;

export default function Page() {
  return (
    <PageTransition>
      <Companeros />
    </PageTransition>
  );
}
