import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

const variants = {
  fadeIn: {
    y: 25,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  inactive: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
  fadeOut: {
    opacity: 0,
    y: -25,
    transition: {
      duration: 0.25,
      ease: "easeInOut",
    },
  },
};

const TransitionEffect = ({ children }: { children: any }) => {
  const { asPath } = useRouter();

  return (
    <div className="effect-2">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={asPath}
          variants={variants}
          initial="fadeIn"
          animate="inactive"
          exit="fadeOut"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TransitionEffect;
