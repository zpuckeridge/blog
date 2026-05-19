"use client";

import { useSyncExternalStore } from "react";
import { Toaster as Sonner } from "sonner";
import type { ToasterProps } from "sonner";

const subscribeColorScheme = (onStoreChange: () => void) => {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributeFilter: ["class", "style"],
    attributes: true,
  });

  return () => observer.disconnect();
};

const getColorSchemeSnapshot = (): "dark" | "light" =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

const getServerColorSchemeSnapshot = (): "dark" | "light" => "light";

const Toaster = ({ ...props }: ToasterProps) => {
  const theme = useSyncExternalStore(
    subscribeColorScheme,
    getColorSchemeSnapshot,
    getServerColorSchemeSnapshot
  );

  return (
    <Sonner
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-border": "var(--border)",
          "--normal-text": "var(--popover-foreground)",
        } as React.CSSProperties
      }
      theme={theme}
      {...props}
    />
  );
};

export { Toaster };
