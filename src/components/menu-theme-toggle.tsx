import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { RxMoon, RxSun } from "react-icons/rx";

import {
  applyTheme,
  DARK_MODE_QUERY,
  isEditableTarget,
  persistTheme,
  readStoredTheme,
  resolveTheme,
  THEME_CHANGE_EVENT,
} from "@/lib/theme";
import type { Theme } from "@/lib/theme";

const getAppliedTheme = (): Theme => {
  if (typeof document === "undefined") {
    return "light";
  }
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
};

export const toggleResolvedTheme = () => {
  persistTheme(getAppliedTheme() === "dark" ? "light" : "dark");
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
      if (readStoredTheme()) {
        return;
      }
      applyTheme(resolveTheme());
      sync();
    };
    window.addEventListener(THEME_CHANGE_EVENT, sync);
    media.addEventListener("change", onSystemChange);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, sync);
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
        className ??
        "inline-flex size-6 items-center justify-center outline-hidden"
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
