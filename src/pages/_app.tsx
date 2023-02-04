import { useEffect } from "react";
import { useRouter } from "next/router";
import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "../utils/api";

import Footer from "../components/Footer";
import UserMenu from "../components/UserMenu";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    document.activeElement instanceof HTMLElement &&
      document.activeElement.blur();
  }, [router]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <div className="prose-lg prose max-w-none">
        <div className="bg-base-200">
          <UserMenu />
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
