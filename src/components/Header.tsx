import React from "react";
import { motion } from "framer-motion";
import AnimatedIcon from "@/utils/AnimatedIcon";

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black text-white overflow-hidden">
      <AnimatedIcon
        href="https://twitter.com/ursisterbtw"
        imgSrc="/twitter-icon.png"
        alt="Twitter"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        ursister's dashboard
      </motion.h1>
      <AnimatedIcon
        href="https://github.com/ursisterbtw"
        imgSrc="/github-icon.png"
        alt="GitHub"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      />
    </header>
  );
};

export default Header;
