import React from "react";
import { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/fonts.css";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col min-h-screen text-center lowercase">
      <Header />
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <Footer />
    </div>
  );
};

export default MyApp;
