import React from "react";
import Module1 from "../components/Module1";
import Module2 from "../components/Module2";
import Module3 from "../components/Module3";
import { motion } from "framer-motion";
import Module4 from "@/components/Module4";

const Home: React.FC = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 text-center lowercase overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75 }}
      >
        <Module1 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75 }}
      >
        <Module2 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="col-span-2"
      >
        <Module3 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="col-span-2"
      ></motion.div>
    </div>
  );
};

export default Home;
