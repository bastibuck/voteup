import { type AppType } from "next/app";

import { api } from "../utils/api";

import "../styles/globals.css";
import Footer from "../components/Footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className="prose-lg prose max-w-none">
      <div className="min-h-screen bg-base-200">
        <Component {...pageProps} />
      </div>

      <Footer />
    </div>
  );
};

export default api.withTRPC(MyApp);
