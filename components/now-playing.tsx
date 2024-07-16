"use client";

import Image from "next/image";
import { useLanyardWS } from "use-lanyard";

export default function NowPlaying() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);

  return (
    data?.listening_to_spotify && (
      <a
        href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
        target="_blank"
        className="flex gap-2 tracking-tight leading-snug hover:text-white text-muted-foreground transition-all duration-200"
      >
        <Image
          src={data.spotify?.album_art_url || "/avatar.jpg"}
          alt={`${data.spotify?.artist} - ${data.spotify?.song}`}
          width={250}
          height={250}
          className="h-8 w-8 my-auto"
        />

        <div className="my-auto max-w-[200px]">
          <p className="text-xs truncate">{data.spotify?.song}</p>
          <p className="text-xs text-muted-foreground">
            {data.spotify?.artist}
          </p>
        </div>
      </a>
    )
  );
}
