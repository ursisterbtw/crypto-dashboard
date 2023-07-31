import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  return (
    <footer className="p-4 bg-black text-white">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      >
        &copy; {new Date().getFullYear()}
      </motion.p>
    </footer>
  );
};

export default Footer;
