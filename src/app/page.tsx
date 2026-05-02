import PageTransition from "@/src/components/PageTransition";
import Home from "@/src/pages/Home";

export default function Page() {
  return (
    <PageTransition>
      <Home />
    </PageTransition>
  );
}
