"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
};

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit" // Use the exit variant
      transition={{ duration: 0.25 }}
    >
      {children}
    </motion.main>
  );
}
