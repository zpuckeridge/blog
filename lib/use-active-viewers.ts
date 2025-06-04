"use client";

import { useEffect, useState } from "react";

interface ViewerResponse {
  viewers: number;
  viewerId?: string;
}

export function useActiveViewers() {
  const [viewers, setViewers] = useState(0);
  const [viewerId, setViewerId] = useState<string | null>(null);

  useEffect(() => {
    // Connect when component mounts
    const connect = async () => {
      const response = await fetch("/api/visitors?action=connect");
      const data = (await response.json()) as ViewerResponse;
      setViewers(data.viewers);
      setViewerId(data.viewerId ?? null);
    };

    connect();

    // Disconnect when component unmounts
    return () => {
      if (viewerId) {
        fetch(`/api/visitors?action=disconnect&viewerId=${viewerId}`);
      }
    };
  }, []);

  return viewers;
}
