"use client";

import Image from "next/image";
import { FaSpotify } from "react-icons/fa6";
import { useLanyardWS } from "use-lanyard";

export default function NowPlaying() {
  const DISCORD_ID = "181324210876973056";
  const data = useLanyardWS(DISCORD_ID);

  if (!data?.listening_to_spotify) {
    return (
      <a
        href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
        target="_blank"
        className="flex gap-2 tracking-tight leading-snug hover:text-white text-muted-foreground hover:underline underline-offset-4 transition-all duration-200"
      >
        <div className="w-10 h-10 flex items-center justify-center">
          <FaSpotify className="h-5 w-5 text-white" />
        </div>
        <div className="my-auto">
          <p className="text-sm">Not Playing</p>
        </div>
      </a>
    );
  }

  return (
    <a
      href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
      target="_blank"
      className="flex gap-2 tracking-tight leading-snug hover:text-white text-muted-foreground transition-all duration-200"
    >
      <Image
        src={data.spotify?.album_art_url || "/avatar.jpg"}
        alt={`${data.spotify?.artist} - ${data.spotify?.song}`}
        width={300}
        height={300}
        className="h-10 w-10 rounded-lg border-2 border-muted my-auto"
      />

      <div className="my-auto">
        <p className="text-sm">{data.spotify?.song}</p>
        <p className="text-xs text-muted-foreground">{data.spotify?.artist}</p>
      </div>
    </a>
  );
}
