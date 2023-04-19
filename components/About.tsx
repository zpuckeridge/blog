import Image from "next/image";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/HoverCard";
import Age from "@/components/Age";

export default function About() {
  return (
    <div className="max-w-2xl sm:flex px-6 py-4 bg-gray-200 dark:bg-[#1f1f1f] rounded-lg mx-auto">
      <Image
        src="/profile-pic.webp"
        width={80}
        height={80}
        className="rounded-full mx-auto sm:mr-6 w-24 mb-2 sm:mb-0"
        alt="Zacchary Puckeridge"
      />
      <div className="text-center sm:text-left my-auto">
        <p className="text-lg">
          Hey, I{"'"}m <span className="font-semibold">Zacchary</span> 👋
        </p>
        <div className="mt-2 sm:mt-0 text-sm">
          A <Age /> year old Christian IT Administrator based out of Brisbane,
          Australia working for{" "}
          <HoverCard>
            <HoverCardTrigger asChild>
              <a
                href="https://rsp.com.au"
                target="_blank"
                className="hover:underline font-semibold"
              >
                Rising Sun Pictures.
              </a>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="text-left">
                <h4 className="text-sm font-semibold">Rising Sun Pictures</h4>
                <p className="text-sm">
                  Over the past two decades, Rising Sun Pictures (RSP) has been
                  delighting and inspiring audiences worldwide, by creating some
                  of Hollywood’s most memorable screen moments.
                </p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
