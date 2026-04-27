"use client";

import { useCallback, useEffect, useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

const STORAGE_KEY = "theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

const getPreferredTheme = () => {
  const storedTheme = window.localStorage.getItem(STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia(DARK_MODE_QUERY).matches ? "dark" : "light";
};

const ToggleThemeButton = () => {
  const [theme, setThemeState] = useState<"dark" | "light">("light");

  useEffect(() => {
    setThemeState(getPreferredTheme());
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    window.localStorage.setItem(STORAGE_KEY, nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;
    setThemeState(nextTheme);
  }, [theme]);

  return (
    <button
      aria-label="Toggle Theme"
      className="text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
      onClick={toggleTheme}
      title="Toggle Theme"
      type="button"
    >
      {theme === "dark" ? (
        <RxSun className="h-3.5 w-3.5" />
      ) : (
        <RxMoon className="h-3.5 w-3.5" />
      )}
    </button>
  );
};

export const ToggleTheme = () => <ToggleThemeButton />;
