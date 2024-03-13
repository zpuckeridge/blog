"use client";

import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";
import Age from "./age";

export default function Lanyard() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);

  const getStatusTextAndColor = () => {
    if (!data || !data.discord_status) {
      return { statusText: "Loading...", dotColor: "bg-gray-400" };
    }

    const discordStatus = data.discord_status;
    let statusText, dotColor;

    switch (discordStatus) {
      case "idle":
        statusText = "Idle";
        dotColor = "bg-yellow-300";
        break;
      case "online":
        statusText = "Online";
        dotColor = "bg-green-500";
        break;
      case "dnd":
        statusText = "Do Not Disturb";
        dotColor = "bg-red-500";
        break;
      default:
        statusText = "Unknown Status";
        dotColor = "bg-gray-400";
        break;
    }

    return { statusText, dotColor };
  };

  const [brisbaneTime, setBrisbaneTime] = useState("0:00:00 ?? GMT+10");

  useEffect(() => {
    const getCurrentTimeInBrisbane = () => {
      const brisbaneTimezone = "Australia/Brisbane";
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: brisbaneTimezone,
        timeStyle: "long",
        hour12: true,
      });
      const currentTime = formatter.format(new Date());
      setBrisbaneTime(currentTime);
    };

    const interval = setInterval(getCurrentTimeInBrisbane, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono md:flex space-y-4 md:space-y-0 justify-between">
      <div className="text-muted-foreground text-sm">
        <div className="flex gap-2">
          <div
            className={`w-3 h-3 animate-pulse rounded-full my-auto ${
              getStatusTextAndColor().dotColor
            }`}
          />
          <p className="my-auto">{getStatusTextAndColor().statusText}</p>
        </div>
        <p>
          <Age /> y/o Web Developer
        </p>
        <p>{brisbaneTime}</p>
        <p>27.4705° S, 153.0260° E</p>
      </div>
      <div className="my-auto">
        {data?.activities?.map((activity) => {
          if (activity.name !== "Spotify") {
            const largeImageSplit =
              activity?.assets?.large_image?.split("/https/")[1];
            const smallImageSplit =
              activity?.assets?.small_image?.split("/https/")[1];

            return (
              <div
                key={activity.id}
                className="text-sm text-muted-foreground flex gap-4"
              >
                <div className="aspect-square relative w-[60px] h-[60px]">
                  <img
                    src={`https://${largeImageSplit}` || ""}
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px] aspect-square rounded-lg border-2"
                    alt="Activity Large Image"
                  />
                  <img
                    src={`https://${smallImageSplit}` || ""}
                    width={30}
                    height={30}
                    className="w-[30px] h-[30px] aspect-square absolute -bottom-2 -right-2 rounded-full border-2 border-black"
                    alt="Activity Large Image"
                  />
                </div>
                <div className="my-auto">
                  <p className="text-ellipsis overflow-hidden line-clamp-1">
                    {activity.name}
                  </p>
                  <p className="text-ellipsis overflow-hidden line-clamp-1">
                    {activity.details}
                  </p>
                  <p className="text-ellipsis overflow-hidden line-clamp-1">
                    {activity.state}
                  </p>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
