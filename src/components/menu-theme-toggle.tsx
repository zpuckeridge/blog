import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { RxDesktop, RxMoon, RxSun } from "react-icons/rx";

import { cn } from "@/lib/utils";

type ThemeChoice = "dark" | "light" | "system";

const STORAGE_KEY = "theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

const options: { icon: IconType; label: string; value: ThemeChoice }[] = [
  { icon: RxSun, label: "Light", value: "light" },
  { icon: RxMoon, label: "Dark", value: "dark" },
  { icon: RxDesktop, label: "System", value: "system" },
];

const readChoice = (): ThemeChoice => {
  if (typeof window === "undefined") {
    return "system";
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "light" || stored === "dark") {
      return stored;
    }
  } catch {
    // Storage unavailable (e.g. privacy mode)
  }
  return "system";
};

const applyChoice = (choice: ThemeChoice) => {
  const prefersDark = window.matchMedia(DARK_MODE_QUERY).matches;
  const systemTheme = prefersDark ? "dark" : "light";
  const theme = choice === "system" ? systemTheme : choice;
  const root = document.documentElement;
  root.classList.add("theme-transition-lock");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  void root.offsetHeight;
  root.classList.remove("theme-transition-lock");
};

interface MenuThemeToggleProps {
  className?: string;
}

/** Light / dark / system switch shared by the menu dropdown and mobile drawer. */
const MenuThemeToggle = ({ className }: MenuThemeToggleProps) => {
  const [choice, setChoice] = useState<ThemeChoice>(readChoice);

  useEffect(() => {
    const media = window.matchMedia(DARK_MODE_QUERY);
    const onChange = () => {
      if (readChoice() === "system") {
        applyChoice("system");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const select = (next: ThemeChoice) => {
    try {
      if (next === "system") {
        window.localStorage.removeItem(STORAGE_KEY);
      } else {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
    } catch {
      // Storage unavailable
    }
    applyChoice(next);
    setChoice(next);
  };

  return (
    <fieldset
      className={cn(
        "m-0 flex min-w-0 items-center gap-1 border-0 p-0",
        className
      )}
    >
      <legend className="sr-only">Theme</legend>
      {options.map(({ icon: Icon, label, value }) => (
        <button
          aria-pressed={choice === value}
          aria-label={label}
          className={cn(
            "inline-flex size-6 items-center justify-center text-muted-foreground outline-hidden transition-colors hover:text-foreground focus-visible:text-foreground",
            choice === value && "bg-background text-foreground"
          )}
          key={value}
          onClick={() => select(value)}
          title={`${label} theme`}
          type="button"
        >
          <Icon aria-hidden="true" className="size-3.5" />
        </button>
      ))}
    </fieldset>
  );
};

export default MenuThemeToggle;
