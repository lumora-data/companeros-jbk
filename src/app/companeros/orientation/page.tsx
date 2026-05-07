import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosOrientation from "@/src/pages/CompanerosOrientation";

export const metadata = PAGE_SEO.companerosOrientation;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosOrientation />
    </PageTransition>
  );
}
