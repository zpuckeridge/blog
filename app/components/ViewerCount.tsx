"use client";

import { useEffect, useState } from "react";

export default function ViewerCount() {
  const [viewerCount, setViewerCount] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new WebSocket(`wss://${window.location.host}/api/ws`);

    socket.onopen = () => {
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "viewerCount") {
        setViewerCount(data.count);
      }
    };

    socket.onclose = () => {
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <div
        className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
      />
      <span>
        {viewerCount} {viewerCount === 1 ? "viewer" : "viewers"} online
      </span>
    </div>
  );
}
