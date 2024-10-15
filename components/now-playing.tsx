"use client";

import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanyardWS } from "use-lanyard";

export default function NowPlaying() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data !== undefined) {
      setLoading(false);
    }
  }, [data]);

  return (
    <div className="now-playing-container">
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        data?.listening_to_spotify && (
          <a
            href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
            target="_blank"
            className="flex gap-2 hover:text-blue-400 dark:hover:text-blue-600 transition"
          >
            <Image
              src={data.spotify?.album_art_url || "/avatar.avif"}
              alt={`${data.spotify?.artist} - ${data.spotify?.song}`}
              width={250}
              height={250}
              className="h-8 w-8 my-auto rounded"
            />

            <div className="my-auto max-w-[200px]">
              <p className="text-xs truncate">{data.spotify?.song}</p>
              <p className="text-xs text-muted-foreground">
                {data.spotify?.artist}
              </p>
            </div>
          </a>
        )
      )}
    </div>
  );
}
