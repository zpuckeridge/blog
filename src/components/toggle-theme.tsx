"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

const STORAGE_KEY = "theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";
type ThemeMode = "dark" | "light";

const themeListeners = new Set<() => void>();

const emitThemeChange = (): void => {
  for (const listener of themeListeners) {
    listener();
  }
};

const readThemeFromStorage = (): ThemeMode | null => {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Ignore (e.g. privacy mode)
  }
  return null;
};

const mqMatchesDark = (): boolean => window.matchMedia(DARK_MODE_QUERY).matches;

const getThemeSnapshot = (): ThemeMode =>
  readThemeFromStorage() ?? (mqMatchesDark() ? "dark" : "light");

const subscribeTheme = (onStoreChange: () => void) => {
  const mq = window.matchMedia(DARK_MODE_QUERY);

  const onSystemChange = () => onStoreChange();

  mq.addEventListener("change", onSystemChange);
  themeListeners.add(onStoreChange);

  return () => {
    mq.removeEventListener("change", onSystemChange);
    themeListeners.delete(onStoreChange);
  };
};

const getServerSnapshot = (): ThemeMode => "light";

const ToggleThemeButton = () => {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Ignore
    }

    document.documentElement.classList.toggle("dark", nextTheme === "dark");
    document.documentElement.style.colorScheme = nextTheme;

    emitThemeChange();
  }, [theme]);

  return (
    <button
      aria-label="Toggle Theme"
      className="text-muted-foreground transition-all duration-200 ease-in-out hover:text-blue-400 dark:hover:text-blue-600"
      onClick={toggleTheme}
      suppressHydrationWarning
      title="Toggle Theme"
      type="button"
    >
      {theme === "dark" ? (
        <RxSun className="size-3.5" />
      ) : (
        <RxMoon className="size-3.5" />
      )}
    </button>
  );
};

export const ToggleTheme = () => <ToggleThemeButton />;
