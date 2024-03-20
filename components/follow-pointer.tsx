"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

const Dot = () => {
  const positionX = useMotionValue(0);
  const positionY = useMotionValue(0);

  useEffect(() => {
    const onMouseMove = (e: { clientX: number; clientY: number }) => {
      positionX.set(e.clientX);
      positionY.set(e.clientY);
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, [positionX, positionY]);

  const dotSize = 12;

  const springConfig = {
    type: "spring",
    stiffness: 1000,
    damping: 100,
  };

  const springX = useSpring(positionX, springConfig);
  const springY = useSpring(positionY, springConfig);

  return (
    <motion.div
      style={{
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        borderRadius: "50%",
        backgroundColor: "white",
        position: "fixed",
        zIndex: 50,
        pointerEvents: "none",
        x: springX,
        y: springY,
        translateX: `-${dotSize / 2}px`,
        translateY: `-${dotSize / 2}px`,
      }}
      className="hidden md:block"
    />
  );
};

export default Dot;
