"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import Back from "./back";

export default function Navigation() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="flex justify-between my-4 max-w-2xl mx-auto">
      <div>
        {isHomePage ? (
          <>
            <p>zpuckeridge</p>
            <p className="text-xs">
              Zacchary /ˈzækəri/ - ˈthe Lord has rememberedˈ
            </p>
          </>
        ) : (
          <Back />
        )}
      </div>
      <ModeToggle />
    </div>
  );
}
