import type { AppProps } from "next/app";
import { LanguageProvider } from "@/src/components/i18n/LanguageProvider";

export default function LegacyPagesApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
