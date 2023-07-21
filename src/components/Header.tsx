import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white overflow-hidden">
      <motion.a
        target="_blank"
        href="https://twitter.com/ursisterbtw"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/twitter-icon.png"
          alt="Twitter"
          style={{ height: 25, width: 25, filter: "brightness(0) invert(1)" }}
        />
      </motion.a>
      <h1>ursister's dashboard</h1>
      <motion.a
        target="_blank"
        href="https://github.com/ursisterbtw"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/github-icon.png"
          alt="GitHub"
          style={{ height: 25, width: 25, filter: "brightness(0) invert(1)" }}
        />
      </motion.a>
    </header>
  );
};

export default Header;
