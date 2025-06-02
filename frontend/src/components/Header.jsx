import React from "react";
import { motion } from "framer-motion";

const headerVariants = {
  initial: { opacity: 0, y: -50 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: "easeInOut" 
    } 
  },
};

const Header = () => {
  return (
    <motion.header
      className="bg-gray-800 text-white p-4 text-center shadow-md"
      initial="initial"
      animate="animate"
      variants={headerVariants}
    >
      <h1 className="text-3xl font-bold tracking-wide">
        <span className="text-yellow-400">Dynamic</span>
        <span className="text-red-500 ml-2">Buzz</span>
        <span className="text-yellow-400"> - KOL Analyzer</span>
      </h1>
    </motion.header>
  );
};

export default Header;