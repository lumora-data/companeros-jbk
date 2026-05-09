import PageTransition from "@/src/components/PageTransition";
import JbkServiceDetail from "@/src/components/JbkServiceDetail";
import { PAGE_SEO } from "@/src/content/page-seo";

export const metadata = PAGE_SEO.jbkSiteWeb;

export default function Page() {
  return (
    <PageTransition>
      <JbkServiceDetail contentKey="jbkSiteWeb" />
    </PageTransition>
  );
}
