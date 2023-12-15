"use client";

import { useLanyardWS } from "use-lanyard";
import Age from "./age";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Lanyard() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);

  let statusText;
  let dotColor;

  if (!data || !data.discord_status) {
    statusText = "Loading..."; // Default status while data is being fetched
    dotColor = "bg-gray-400"; // Default color for loading
  } else {
    const discordStatus = data.discord_status;

    // Check different status types and set the text and dot color accordingly
    if (discordStatus === "idle") {
      statusText = "Idle";
      dotColor = "bg-yellow-300";
    } else if (discordStatus === "online") {
      statusText = "Online";
      dotColor = "bg-green-500";
    } else if (discordStatus === "dnd") {
      statusText = "Do Not Disturb";
      dotColor = "bg-red-500";
    } else {
      statusText = "Unknown Status";
      dotColor = "bg-gray-400";
    }
  }

  const [brisbaneTime, setBrisbaneTime] = useState("0:00:00 ?? GMT+10"); // State to hold Brisbane time

  useEffect(() => {
    // Function to get current time in Brisbane
    const getCurrentTimeInBrisbane = () => {
      const brisbaneTimezone = "Australia/Brisbane"; // Brisbane's timezone
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: brisbaneTimezone,
        timeStyle: "long", // You can change this to "short" or "long" as needed
        hour12: true, // Set to true for 12-hour format, false for 24-hour format
      });
      const currentTime = formatter.format(new Date());
      setBrisbaneTime(currentTime);
    };

    // Update Brisbane time every second
    const interval = setInterval(getCurrentTimeInBrisbane, 1000);

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  const largeImage = data?.activities[0]?.assets?.large_image;
  const largeImageSplit = largeImage?.split("/https/")[1];

  const smallImage = data?.activities[0]?.assets?.small_image;
  const smallImageSplit = smallImage?.split("/https/")[1];

  return (
    <div className="font-mono md:flex space-y-4 md:space-y-0 justify-between">
      <div className="text-muted-foreground text-sm">
        <div className="flex gap-2">
          <div
            className={`w-3 h-3 animate-pulse rounded-full my-auto ${dotColor}`}
          />
          <p className="my-auto">{statusText}</p>
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
            return (
              <div
                key={activity.id}
                className="text-sm text-muted-foreground flex gap-4"
              >
                <div className="aspect-square relative w-[60px] h-[60px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://${largeImageSplit}` || ""}
                    width={60}
                    height={60}
                    className="w-[60px] h-[60px] aspect-square rounded-lg border-2"
                    alt="Activity Large Image"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
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
        })}
      </div>
    </div>
  );
}
