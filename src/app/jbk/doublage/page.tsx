import PageTransition from "@/src/components/PageTransition";
import { PAGE_SEO } from "@/src/content/page-seo";
import JbkEvenements from "@/src/pages/JbkEvenements";

export const metadata = PAGE_SEO.jbkDoublage;

export default function Page() {
  return (
    <PageTransition>
      <JbkEvenements contentKey="jbkDoublage" />
    </PageTransition>
  );
}
