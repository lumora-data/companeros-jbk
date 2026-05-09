import PageTransition from "@/src/components/PageTransition";
import JbkServiceDetail from "@/src/pages/JbkServiceDetail";
import { PAGE_SEO } from "@/src/content/page-seo";

export const metadata = PAGE_SEO.jbkPublicite;

export default function Page() {
  return (
    <PageTransition>
      <JbkServiceDetail contentKey="jbkPublicite" />
    </PageTransition>
  );
}
