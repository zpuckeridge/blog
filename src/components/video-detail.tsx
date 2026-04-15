import { RxDotsHorizontal } from "react-icons/rx";

import CopyLink from "@/components/copy-link";
import Player from "@/components/player";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Video } from "@/interfaces/content-item";

interface VideoDetailProps {
  video: Video;
}

export default function VideoDetail({ video }: VideoDetailProps) {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div className="space-y-4">
          <div>
            <h1 className="font-redaction text-black dark:text-white text-xl">
              {video.title}
            </h1>

            <div className="flex w-full justify-between gap-3 text-muted-foreground text-sm">
              <div className="w-full text-muted-foreground text-xs">
                {new Date(video.date_created).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="transition-all duration-200 hover:text-blue-400 dark:hover:text-blue-600">
                      <RxDotsHorizontal />
                    </TooltipTrigger>
                    <TooltipContent
                      className="bg-muted/60 text-black text-xs backdrop-blur-sm dark:bg-neutral-900/60 dark:text-muted-foreground"
                      side="bottom"
                    >
                      {new Date(video.date_created).toLocaleDateString(
                        "en-US",
                        {
                          day: "2-digit",
                          month: "long",
                          weekday: "long",
                          year: "numeric",
                        }
                      )}{" "}
                      · {video.tags.join(", ")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <CopyLink />
              </div>
            </div>
          </div>

          <Player src={video.playback_id} />
        </div>

        <a
          className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
          href="/videos"
        >
          ../videos
        </a>
      </div>
    </div>
  );
}
