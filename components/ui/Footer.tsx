import { Sword } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function Footer() {
  return (
    <div className="flex justify-between max-w-2xl mx-auto">
      <div className="text-[#888888] font-medium text-sm">
        Made with{" "}
        <a
          href="https://nextjs.org/"
          className="hover:text-white transition-all duration-100"
          target="_blank"
        >
          Next.JS
        </a>
        ,{" "}
        <a
          href="https://ghost.org/"
          className="hover:text-white transition-all duration-100"
          target="_blank"
        >
          Ghost
        </a>
        ,{" "}
        <a
          href="https://tailwindcss.com/"
          className="hover:text-white transition-all duration-100"
          target="_blank"
        >
          Tailwind CSS
        </a>{" "}
        and{" "}
        <a
          href="https://github.com/zpuckeridge/blog"
          className="hover:text-[#ff0000] transition-all duration-100"
          target="_blank"
        >
          ❤
        </a>
      </div>
      <div className="text-[#888888] text-sm">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Sword size={18} />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-72">
                {'"'}If you hate the truth than telling the truth is going to
                sound like hate.{'"'} -{" "}
                <a
                  href="https://dougwils.com/"
                  className="font-semibold hover:underline"
                  target="_blank"
                >
                  Doug Wilson
                </a>
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
