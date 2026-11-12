export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEME_CHANGE_EVENT = "theme-change";
export const THEME_TRANSITION_LOCK_CLASS = "theme-transition-lock";
export const DARK_MODE_QUERY = "(prefers-color-scheme: dark)";

export const readStoredTheme = (): Theme | null => {
  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "light" || storedTheme === "dark") {
      return storedTheme;
    }
  } catch {
    // Privacy mode.
  }

  return null;
};

export const resolveTheme = (): Theme =>
  readStoredTheme() ??
  (window.matchMedia(DARK_MODE_QUERY).matches ? "dark" : "light");

const syncThemeToggle = (button: HTMLButtonElement, theme: Theme): void => {
  const nextTheme = theme === "dark" ? "light" : "dark";
  button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  button.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  button.setAttribute("title", `Switch to ${nextTheme} theme`);
};

export const applyTheme = (theme: Theme): void => {
  const root = document.documentElement;
  root.classList.add(THEME_TRANSITION_LOCK_CLASS);
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  void root.offsetHeight;
  root.classList.remove(THEME_TRANSITION_LOCK_CLASS);

  for (const button of document.querySelectorAll("[data-theme-toggle]")) {
    if (button instanceof HTMLButtonElement) {
      syncThemeToggle(button, theme);
    }
  }

  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
};

export const persistTheme = (theme: Theme): void => {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Privacy mode.
  }

  applyTheme(theme);
};

export const isEditableTarget = (target: EventTarget | null): boolean =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT");
