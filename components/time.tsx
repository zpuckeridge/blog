"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function Time() {
  const timezone = "Australia/Brisbane";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update the current time every second
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <div className="flex gap-2 text-muted-foreground text-sm my-auto">
      <p>Brisbane, QLD</p>—
      <p>{format(utcToZonedTime(currentTime, timezone), "MMM d, h:mm:ss a")}</p>
    </div>
  );
}
