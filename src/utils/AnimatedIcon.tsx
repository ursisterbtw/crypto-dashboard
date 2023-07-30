import React from "react";
import { motion } from "framer-motion";

type AnimatedIconProps = {
  href: string;
  imgSrc: string;
  alt: string;
  initial?: object;
  animate?: object;
  transition?: object;
};

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  href,
  imgSrc,
  alt,
  initial,
  animate,
  transition,
}) => {
  return (
    <motion.a
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.8 }}
      initial={initial}
      animate={animate}
      transition={transition}
      target="_blank"
      href={href}
    >
      <motion.img
        src={imgSrc}
        alt={alt}
        style={{ height: 25, width: 25, filter: "brightness(0) invert(1)" }}
      />
    </motion.a>
  );
};

export default AnimatedIcon;
