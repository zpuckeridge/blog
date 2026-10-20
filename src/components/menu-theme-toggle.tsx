import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx";


type Theme = "dark" | "light";

const STORAGE_KEY = "theme";
const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

const getAppliedTheme = (): Theme => {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.add("theme-transition-lock");
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  void root.offsetHeight;
  root.classList.remove("theme-transition-lock");
};

const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");

const THEME_EVENT = "theme-change";

/** Switch to the opposite of the applied theme and save it. */
export const toggleResolvedTheme = () => {
  const next: Theme = getAppliedTheme() === "dark" ? "light" : "dark";
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage unavailable
  }
  applyTheme(next);
  window.dispatchEvent(new Event(THEME_EVENT));
};

export const isThemeShortcut = (event: {
  altKey: boolean;
  ctrlKey: boolean;
  key: string;
  metaKey: boolean;
  repeat: boolean;
  target: EventTarget | null;
}) =>
  !event.repeat &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  event.key.toLowerCase() === "t" &&
  !isEditableTarget(event.target);

interface MenuThemeToggleProps {
  children?: ReactNode;
  className?: string;
  iconClassName?: string;
  /** Listen for T globally (mobile drawer, which has no key handler). Pass true only while open. */
  shortcutActive?: boolean;
}

/** Light / dark / system switch shared by the menu dropdown and mobile drawer. */
const MenuThemeToggle = ({
  children,
  className,
  iconClassName,
  shortcutActive = false,
}: MenuThemeToggleProps) => {
  const [theme, setTheme] = useState<Theme>(getAppliedTheme);

  useEffect(() => {
    const sync = () => setTheme(getAppliedTheme());
    const media = window.matchMedia(DARK_MODE_QUERY);
    const onSystemChange = () => {
      try {
        if (window.localStorage.getItem(STORAGE_KEY)) {
          return;
        }
      } catch {
        // Storage unavailable
      }
      applyTheme(media.matches ? "dark" : "light");
      sync();
    };
    window.addEventListener(THEME_EVENT, sync);
    media.addEventListener("change", onSystemChange);
    return () => {
      window.removeEventListener(THEME_EVENT, sync);
      media.removeEventListener("change", onSystemChange);
    };
  }, []);

  useEffect(() => {
    if (!shortcutActive) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isThemeShortcut(event)) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();
      toggleResolvedTheme();
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [shortcutActive]);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const Icon = theme === "dark" ? RxMoon : RxSun;

  return (
    <button
      aria-keyshortcuts="t"
      aria-label={children ? undefined : `Switch to ${nextTheme} theme`}
      className={
        className ?? "inline-flex size-6 items-center justify-center outline-hidden"
      }
      onClick={toggleResolvedTheme}
      title={`Switch to ${nextTheme} theme`}
      type="button"
    >
      {children}
      <Icon
        aria-hidden="true"
        className={iconClassName ?? "size-3 shrink-0 self-center"}
      />
    </button>
  );
};

export default MenuThemeToggle;
