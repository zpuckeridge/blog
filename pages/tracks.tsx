import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FaSpotify } from "react-icons/fa";
import { useState } from "react";
import NowPlaying from "../components/NowPlaying";

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.PAGE_URL}/api/tracks`);
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
}

export default function Tracks({ data }: { data: any }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <>
      <Head>
        <title>Tracks | Zacchary Puckeridge</title>
        <meta name="description" content="Find out what I'm jamming out to!" />
      </Head>
      <div className="my-20 max-w-4xl">
        <div className="md:flex justify-between">
          <div>
            <h1 className="font-bold text-5xl tracking-tight text-white">
              Top 10 Tracks
            </h1>
            <p className="mt-1 text-white">
              Check out my top 10 most played tracks over the last 4 weeks!
            </p>
          </div>
          <a
            href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03"
            className="hover:text-[#888888] text-white transition-all duration-200 md:mt-10"
            title="Spotify Profile">
            <NowPlaying />
          </a>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-4">
          {data.tracks.map((song: any) => (
            <div key={song}>
              <div className="text-white hover:text-[#888888] transform hover:scale-[1.05] transition-all duration-200 flex">
                <Link href={song.url}>
                  <Image
                    src={song.image}
                    alt={song.title}
                    width={200}
                    height={200}
                    className={cn(
                      "duration-700 ease-in-out rounded-lg shadow-2xl",
                      isLoading
                        ? "grayscale blur-2xl scale-110"
                        : "grayscale-0 blur-0 scale-100"
                    )}
                    onLoadingComplete={() => setLoading(false)}
                    priority={true}
                  />
                  <p className="mt-2 font-semibold">{song.title}</p>
                  <p className="text-sm -mt-1 text-[#888888]">{song.artist}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
