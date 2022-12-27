import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "react-feather";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <button
        aria-label="Toggle Dark Mode"
        type="button"
        className="p-2 bg-white dark:bg-white/5 border border-zinc-800/50 rounded-lg flex items-center justify-center hover:ring-2 ring-gray-300 transition-all"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        {mounted && (
          <>
            {theme === "light" ? (
              <Sun strokeWidth={2} />
            ) : (
              <Moon strokeWidth={2} />
            )}
          </>
        )}
      </button>
    </>
  );
}
