import React from "react";
import Module1 from "../components/Module1";
import Module2 from "../components/Module2";
import Module3 from "../components/Module3";
import Module4 from "../components/Module4";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 text-center lowercase overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -100 }} // Slide down from the top
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }} // Ease out for a smoother transition
        className="col-span-2"
      >
        <Module3 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="mr-20"
      >
        <Module1 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        className="ml-20"
      >
        <Module2 />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 100 }} // Slide up from the bottom
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }} // Ease out for a smoother transition
        className="col-span-2"
      >
        <Module3 />
      </motion.div>{" "}
    </div>
  );
};

export default Home;
