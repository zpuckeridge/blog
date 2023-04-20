import Image from "next/image";
import { Button } from "@/components/ui/Button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function Media() {
  return (
    <>
      <div className="bg-white shadow-lg dark:shadow-none dark:bg-[#1f1f1f] w-full p-4 rounded-lg h-72">
        <p className="text-center">Recently watched 🎬</p>
        <div className="relative h-full w-full">
          <div className="w-full h-full flex items-center justify-center">
            <div className="mr-[120px] absolute z-30 mt-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/mandalorian.jpg"
                      width={125}
                      height={125}
                      alt="Hit Monkey"
                      className="-rotate-[10deg] rounded-lg shadow-2xl"
                    />
                  </TooltipTrigger>
                  <TooltipContent align="start">
                    <p className="font-semibold">Mandalorian</p>
                    <p className="text-[#888888]">Disney</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="absolute z-40">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/hit-monkey.jpg"
                      width={125}
                      height={125}
                      alt="Hit Monkey"
                      className="rounded-lg shadow-2xl"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="font-semibold">Hit Monkey</p>
                    <p className="text-[#888888]">Marvel</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="ml-[120px] absolute z-30 mt-4">
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger>
                    <Image
                      src="/bobs-burgers.jpg"
                      width={125}
                      height={125}
                      alt="Hit Monkey"
                      className="rotate-[10deg] rounded-lg shadow-2xl"
                    />
                  </TooltipTrigger>
                  <TooltipContent align="end">
                    <p className="font-semibold">Bob{"'"}s Burgers</p>
                    <p className="text-[#888888]">Adult Swim</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
