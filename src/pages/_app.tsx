import React from "react";
import { AppProps } from "next/app";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import "../styles/fonts.css";
import { motion } from "framer-motion";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="flex flex-col min-h-screen text-center lowercase">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        <Header />
      </motion.div>
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75 }}
      >
        <Footer />
      </motion.div>
    </div>
  );
};

export default MyApp;
