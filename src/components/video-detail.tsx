import { RxDotsHorizontal } from "react-icons/rx";

import BackLink from "@/components/back-link";
import CopyLink from "@/components/copy-link";
import Player from "@/components/player";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Video } from "@/interfaces/content-item";
import {
  formatPublishedFullWeekday,
  formatPublishedMonthYear,
} from "@/lib/format-in-brisbane";

interface VideoDetailProps {
  video: Video;
}

export default function VideoDetail({ video }: VideoDetailProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <div className="space-y-10">
          <div className="space-y-2">
            <h1 className="font-redaction text-black text-xl dark:text-white">
              {video.title}
            </h1>

            <div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
              <div className="w-full text-muted-foreground text-sm">
                {formatPublishedMonthYear(video.date_created)}
              </div>
              <div className="flex items-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600">
                      <RxDotsHorizontal />
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-muted text-foreground dark:bg-neutral-900 dark:text-muted-foreground"
                      side="bottom"
                    >
                      {formatPublishedFullWeekday(video.date_created)} ·{" "}
                      {video.tags.join(", ")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CopyLink />
              </div>
            </div>
          </div>

          <Player src={video.playback_id} />
        </div>

        <BackLink href="/videos">../videos</BackLink>
      </div>
    </div>
  );
}
