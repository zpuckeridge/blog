"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

export default function Time() {
  const timezone = "Australia/Brisbane";
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex gap-2 text-muted-foreground text-sm my-auto">
      <p>
        Brisbane, QLD —{" "}
        {format(utcToZonedTime(currentTime, timezone), "MMM d, h:mm:ss a")}
      </p>
    </div>
  );
}
