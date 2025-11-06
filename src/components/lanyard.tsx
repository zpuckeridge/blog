"use client";

import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";

export default function Lanyard() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isFullyLoaded, setIsFullyLoaded] = useState(false);

  useEffect(() => {
    // Set initialized after a brief delay to prevent flash
    const initTimer = setTimeout(() => setHasInitialized(true), 100);

    return () => clearTimeout(initTimer);
  }, []);

  useEffect(() => {
    if (!hasInitialized) {
      return;
    }

    if (data?.discord_status) {
      // Data is available, mark as fully loaded
      setIsFullyLoaded(true);
    }
  }, [data, hasInitialized]);

  const getStatusTextAndColor = () => {
    // Show offline status until fully loaded
    if (!(isFullyLoaded && data && data.discord_status)) {
      return { statusText: "Offline", dotColor: "bg-gray-400" };
    }

    const discordStatus = data.discord_status;
    let text: string;
    let color: string;

    switch (discordStatus) {
      case "idle":
        text = "Idle";
        color = "bg-yellow-300";
        break;
      case "online":
        text = "Online";
        color = "bg-green-500";
        break;
      case "dnd":
        text = "Do Not Disturb";
        color = "bg-red-500";
        break;
      default:
        text = "Offline";
        color = "bg-gray-400";
        break;
    }

    return { statusText: text, dotColor: color };
  };

  const { statusText, dotColor } = getStatusTextAndColor();

  // Don't render anything initially or before initialization
  if (!hasInitialized) {
    return null;
  }

  return (
    <div className="fade-in flex animate-in gap-2 duration-200">
      <div
        className={`h-2 w-2 ${isFullyLoaded ? "animate-pulse" : ""} my-auto rounded-full ${dotColor}`}
      />
      <p className="my-auto text-muted-foreground text-xs">{statusText}</p>
    </div>
  );
}
