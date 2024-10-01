"use client";

import { ArrowLeftIcon, ChevronLeftIcon } from "@radix-ui/react-icons"; // {{ edit_1 }}
import Link from "next/link";
import { usePathname } from "next/navigation"; // {{ edit_1 }}

export default function ReturnToIndex() {
  const pathname = usePathname(); // {{ edit_2 }}

  return (
    <div className="flex flex-col lg:w-1/3 max-w-sm lg:sticky top-0">
      <div className="lg:sticky top-8 space-y-6">
        <div className="space-y-2">
          <div className="flex gap-2 justify-between text-sm whitespace-nowrap">
            {pathname !== "/" ? ( // {{ edit_3 }}
              <Link
                href="/"
                className="text-muted-foreground hover:text-blue-400 italic font-serif flex items-center gap-1 group transition-all duration-300 ease-in-out"
              >
                <div className="relative w-4 h-4">
                  <ChevronLeftIcon className="absolute inset-0 w-4 h-4 transition-opacity duration-300 opacity-100 group-hover:opacity-0 -translate-x-0.5 ease-in-out" />
                  <ArrowLeftIcon className="absolute inset-0 w-4 h-4 transition-all duration-300 opacity-0 group-hover:opacity-100 ease-in-out" />
                </div>
                <span className="transition-all duration-300">Index</span>
              </Link>
            ) : (
              <Link
                href="/"
                className="text-muted-foreground hover:text-blue-400 transition-all duration-300 ease-in-out italic font-serif"
              >
                Zacchary Puckeridge
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
