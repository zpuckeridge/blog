"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import type { MotionProps, UseInViewOptions, Variants } from "motion/react";
import { useRef } from "react";

type MarginType = UseInViewOptions["margin"];

interface BlurFadeProps extends MotionProps {
  blur?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  inView?: boolean;
  inViewMargin?: MarginType;
  offset?: number;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
}

export const BlurFade = ({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  offset = 6,
  direction = "down",
  inView = false,
  inViewMargin = "-50px",
  blur = "6px",
  ...props
}: BlurFadeProps) => {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { margin: inViewMargin, once: true });
  const isInView = !inView || inViewResult;
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const defaultVariants: Variants = {
    hidden: {
      [axis]: direction === "right" || direction === "down" ? -offset : offset,
      filter: `blur(${blur})`,
      opacity: 0,
    },
    visible: {
      [axis]: 0,
      filter: "blur(0px)",
      opacity: 1,
    },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <AnimatePresence>
      <motion.div
        animate={isInView ? "visible" : "hidden"}
        className={className}
        exit="hidden"
        initial="hidden"
        ref={ref}
        transition={{
          delay: 0.04 + delay,
          duration,
          ease: "easeOut",
        }}
        variants={combinedVariants}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
