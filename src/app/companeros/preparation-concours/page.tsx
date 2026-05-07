import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import CompanerosConcours from "@/src/pages/CompanerosConcours";

export const metadata = PAGE_SEO.companerosConcours;

export default function Page() {
  return (
    <PageTransition>
      <CompanerosConcours />
    </PageTransition>
  );
}
