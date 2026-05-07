import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosTraduction from "@/src/pages/CompanerosTraduction";

export const metadata = PAGE_SEO.companerosTraduction;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosTraduction />
    </PageTransition>
  );
}
