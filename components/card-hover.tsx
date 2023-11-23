"use client";

import { siteConfig } from "@/config/site";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { createElement, useState } from "react";

export const CardHover = () => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="max-w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {siteConfig.projects.map((project, idx) => (
          <a
            href={project.url}
            target="_blank"
            key={project.name}
            className="relative group  block p-2 h-full w-full "
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-muted block rounded-lg"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <div className="hover:shadow-2xl dark:hover:shadow-none transition-all duration-300 rounded-lg h-full w-full p-2 overflow-hidden group-hover:border-accent relative z-40">
              <div className="relative z-40">
                <div className="p-2 space-y-2">
                  <Image
                    src={project.icon}
                    height={250}
                    width={250}
                    alt={project.name}
                    className="w-10 aspect-auto"
                  />
                  <h2 className="font-semibold">{project.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
