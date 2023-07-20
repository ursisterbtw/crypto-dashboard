import React from "react";
import { motion } from "framer-motion";

const AnimatedButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={props.className}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </motion.button>
  );
};

export default AnimatedButton;
