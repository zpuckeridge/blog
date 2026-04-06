"use client";

import { useEffect, useState } from "react";

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour12: true,
  timeStyle: "short",
  timeZone: "Australia/Brisbane",
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "Australia/Brisbane",
  year: "numeric",
});

export const BrisbaneDateTime = () => {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className="flex flex-row gap-2 text-muted-foreground text-xs"
      suppressHydrationWarning
    >
      <p suppressHydrationWarning>{timeFormatter.format(now)}</p>
      <p>•</p>
      <p suppressHydrationWarning>{dateFormatter.format(now)}</p>
    </div>
  );
};
