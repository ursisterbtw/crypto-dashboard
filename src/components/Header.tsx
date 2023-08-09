import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedIcon from "@/utils/AnimatedIcon";
import QuickLinks from "./QuickLinks";

const HeaderContainer: React.FC = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-4 bg-transparent text-white overflow-hidden">
        <AnimatedIcon
          href="https://twitter.com/ursisterbtw"
          imgSrc="/twitter-icon.png"
          alt="Twitter"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          style={{ cursor: "pointer" }}
          onClick={handleToggle}
        >
          ursister's dashboard
        </motion.h1>
        <AnimatedIcon
          href="https://github.com/ursisterbtw"
          imgSrc="/github-icon.png"
          alt="GitHub"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </header>
      {isToggled && <QuickLinks />}
    </div>
  );
};

export default HeaderContainer;
