"use client";

import type { ReactNode } from "react";

import Navigation from "@/components/navigation";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  pathname: string;
}

export default function AppShell({ children, pathname }: AppShellProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      enableSystem
    >
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-20 bg-linear-to-t from-white dark:from-background" />

      <Navigation pathname={pathname} />

      <div className={cn("min-h-screen")}>{children}</div>

      <Toaster position="top-center" richColors />
    </ThemeProvider>
  );
}
