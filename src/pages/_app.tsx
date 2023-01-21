import { type AppType } from "next/app";
import Head from "next/head";

import { api } from "../utils/api";

import "../styles/globals.css";
import Footer from "../components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <div className="prose-lg prose max-w-none">
        <div className="min-h-screen bg-base-200">
          <Component {...pageProps} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default api.withTRPC(MyApp);
