import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosLangues from "@/src/pages/CompanerosLangues";

export const metadata = PAGE_SEO.companerosLangues;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosLangues />
    </PageTransition>
  );
}
