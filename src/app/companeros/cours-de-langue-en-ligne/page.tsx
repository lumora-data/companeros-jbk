import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosLanguesEnLigne from "@/src/pages/CompanerosLanguesEnLigne";

export const metadata = PAGE_SEO.companerosLanguesEnLigne;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosLanguesEnLigne />
    </PageTransition>
  );
}
