"use client";

import { useLanyardWS } from "use-lanyard";
import Age from "./age";
import { useEffect, useState } from "react";

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
              <div key={activity.id} className="text-sm text-muted-foreground">
                <p>{activity.name}</p>
                <p>
                  {activity.assets?.large_text} in {activity.assets?.small_text}
                </p>
                <p>{activity.state}</p>
                <p>{activity.details}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
