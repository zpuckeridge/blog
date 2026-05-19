"use client";

import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";

import { scheduleIdleOrFallback } from "@/lib/defer-after-idle";

const LiveLanyard = () => {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    if (data?.discord_status) {
      setIsFullyLoaded(true);
    }
  }, [data]);

  const getStatusTextAndColor = () => {
    // Show offline status until fully loaded
    if (!(isFullyLoaded && data && data.discord_status)) {
      return { dotColor: "bg-gray-400", statusText: "Offline" };
    }

    const discordStatus = data.discord_status;
    let text: string;
    let color: string;

    switch (discordStatus) {
      case "idle": {
        text = "Idle";
        color = "bg-yellow-300";
        break;
      }
      case "online": {
        text = "Online";
        color = "bg-green-500";
        break;
      }
      case "dnd": {
        text = "Do Not Disturb";
        color = "bg-red-500";
        break;
      }
      default: {
        text = "Offline";
        color = "bg-gray-400";
        break;
      }
    }

    return { dotColor: color, statusText: text };
  };

  const { statusText, dotColor } = getStatusTextAndColor();

  return (
    <div className="fade-in flex animate-in gap-2 duration-200">
      <div
        className={`h-2 w-2 ${isFullyLoaded ? "animate-pulse" : ""} my-auto rounded-full ${dotColor}`}
      />
      <p className="my-auto text-muted-foreground text-xs">{statusText}</p>
    </div>
  );
};

export default function Lanyard() {
  const [deferPhase, setDeferPhase] = useState<0 | 1>(0);

  useEffect(() => {
    const deferred = scheduleIdleOrFallback(() => setDeferPhase(1), 1500);
    return () => deferred.cancel();
  }, []);

  return deferPhase === 0 ? null : <LiveLanyard />;
}
