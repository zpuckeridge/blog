import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import NowPlaying from "./now-playing";

export default function Footer() {
  return (
    <div className="py-1 border-t-2 w-full mt-10">
      <div className="flex justify-between px-4 max-w-7xl mx-auto">
        <NowPlaying />

        <div className="text-sm px-2 py-1 my-auto">
          <HoverCard>
            <HoverCardTrigger className="cursor-pointer tracking-tight leading-snug hover:text-blue-400 dark:hover:text-blue-600 transition text-muted-foreground hover:underline underline-offset-4">
              Soli Deo Gloria
            </HoverCardTrigger>
            <HoverCardContent className="text-center">
              All Glory be to God alone.
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
