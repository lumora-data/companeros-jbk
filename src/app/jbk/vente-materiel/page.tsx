import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import JbkVenteMateriel from "@/src/pages/JbkVenteMateriel";

export const metadata = PAGE_SEO.jbkVenteMateriel;

export default function Page() {
  return (
    <PageTransition>
      <JbkVenteMateriel />
    </PageTransition>
  );
}
