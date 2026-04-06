"use client";

import { useCallback, useEffect, useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

import { useMounted } from "@/hooks/use-mounted";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type ResolvedTheme = "dark" | "light";

const STORAGE_KEY = "theme";

const getPreferredTheme = (): ResolvedTheme => {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "dark" || storedTheme === "light") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const applyTheme = (theme: ResolvedTheme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(STORAGE_KEY, theme);
};

export const ToggleTheme = () => {
  const mounted = useMounted();
  const [theme, setTheme] = useState<ResolvedTheme>("dark");

  useEffect(() => {
    if (!mounted) {
      return;
    }

    setTheme(getPreferredTheme());
  }, [mounted]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    setTheme(nextTheme);
  }, [theme]);

  if (!mounted) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            aria-label="Toggle Theme"
            className="text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
            suppressHydrationWarning
          >
            <RxMoon className="h-3.5 w-3.5" />
          </TooltipTrigger>
          <TooltipContent
            className="bg-muted/60 text-black text-xs backdrop-blur-sm dark:bg-neutral-900/60 dark:text-muted-foreground"
            side="bottom"
          >
            Toggle Theme
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          aria-label="Toggle Theme"
          className="text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
          onClick={toggleTheme}
          suppressHydrationWarning
        >
          {theme === "dark" ? (
            <RxSun className="h-3.5 w-3.5" />
          ) : (
            <RxMoon className="h-3.5 w-3.5" />
          )}
        </TooltipTrigger>
        <TooltipContent
          className="bg-muted/60 text-black text-xs backdrop-blur-sm dark:bg-neutral-900/60 dark:text-muted-foreground"
          side="bottom"
        >
          Toggle Theme
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
