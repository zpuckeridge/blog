"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

import { useMounted } from "@/hooks/use-mounted";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);
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
