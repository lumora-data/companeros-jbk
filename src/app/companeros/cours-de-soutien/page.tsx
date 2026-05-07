import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosSoutien from "@/src/pages/CompanerosSoutien";

export const metadata = PAGE_SEO.companerosSoutien;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosSoutien />
    </PageTransition>
  );
}
