import { getAccessToken } from "@/lib/spotify";
import Age from "@/components/age-calculator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getCurrentTopTracks() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    return {
      data: false,
    };
  }
}

async function getRecentTopTracks() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    return {
      data: false,
    };
  }
}

async function getAllTimeTopTracks() {
  try {
    const { access_token } = await getAccessToken();

    const res = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching top tracks data:", error);
    return {
      data: false,
    };
  }
}

export default async function About() {
  const currentTopTracks = await getCurrentTopTracks();
  const recentTopTracks = await getRecentTopTracks();
  const allTimeTopTracks = await getAllTimeTopTracks();

  const generateTooltip = (url: any, name: any) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <a
              href={url}
              className="underline hover:no-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {name}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{url}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <main className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-4xl font-bold">About</h1>
      <div className="space-y-4">
        <p>
          Hey there! I am Zacc, a <Age /> year old Web Developer based in
          Brisbane. I currently work as an IT Administrator at the Rising Sun
          Pictures Brisbane studio.
        </p>
        <p>
          My favourite stack right now is{" "}
          {generateTooltip("https://react.dev/", "React")},{" "}
          {generateTooltip("https://nextjs.org/", "Next.js")},{" "}
          {generateTooltip("https://tailwindcss.com/", "TailwindCSS")} with{" "}
          {generateTooltip("https://ui.shadcn.com/", "shadcn/ui")},{" "}
          {generateTooltip("https://clerk.com/", "Clerk")} for authentication
          and {generateTooltip("https://www.prisma.io/", "Prisma")} with{" "}
          {generateTooltip("https://planetscale.com/", "PlanetScale")}. I also
          have experience working with platforms such as{" "}
          {generateTooltip("https://squareup.com/", "Square")},{" "}
          {generateTooltip("https://www.shopify.com/", "Shopify")},{" "}
          {generateTooltip("https://cloudinary.com/", "Cloudinary")},{" "}
          {generateTooltip("https://www.mux.com/", "Mux")},{" "}
          {generateTooltip("https://www.plesk.com/", "Plesk")},{" "}
          {generateTooltip("https://wordpress.com/", "WordPress")}, and{" "}
          {generateTooltip("https://stripe.com/", "Stripe")}.
        </p>
        <p>
          I have also dabbled with{" "}
          {generateTooltip("https://cloud.google.com/", "Google Cloud")},{" "}
          {generateTooltip("https://www.linode.com/", "Linode")} and{" "}
          {generateTooltip("https://kubernetes.io/", "Kubernetes")} for dev ops
          related work. I love to self-host my own services and have a passion
          for privacy and security.
        </p>
        <p>
          If you are interested in what gear and software I use on the
          day-to-day, check out{" "}
          <Link href="/uses" className="underline hover:no-underline">
            /uses
          </Link>
          .
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between my-auto">
          <h2 className="text-2xl font-bold">Gallery</h2>
          <Link href="/gallery">
            <Button variant="ghost">
              All images
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <div className="row-span-2 col-span-2">
            <Image
              src="https://res.cloudinary.com/denivusi1/image/upload/blog/P1011152_t1mdns"
              width={500}
              height={500}
              alt="On the road"
              className="rounded-md"
            />
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/denivusi1/image/upload/blog/P1011111_tcaofb"
              width={500}
              height={500}
              alt="On the road"
              className="rounded-md"
            />
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/denivusi1/image/upload/blog/P1011186_qkrix9"
              width={500}
              height={500}
              alt="On the road"
              className="rounded-md"
            />
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/denivusi1/image/upload/blog/P1011173_xevzh7"
              width={500}
              height={500}
              alt="On the road"
              className="rounded-md hidden sm:flex"
            />
          </div>
          <div>
            <Image
              src="https://res.cloudinary.com/denivusi1/image/upload/blog/P1011348_ugskcv"
              width={500}
              height={500}
              alt="On the road"
              className="rounded-md hidden sm:flex"
            />
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Top Tracks</h2>
        <Tabs defaultValue="current" className="w-full max-w-2xl">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="all-time">All-Time</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <div className="grid grid-cols-1 gap-4 bg-muted p-4 rounded-md">
              {currentTopTracks.items.map((track: any, index: number) => (
                <div key={index}>
                  <div className="flex gap-4">
                    <div className="text-muted-foreground my-auto">
                      {index + 1}
                    </div>
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={300}
                      height={300}
                      className="rounded-md w-14 h-14"
                    />
                    <div>
                      <Link
                        href={track.external_urls.spotify}
                        className="hover:underline truncate"
                      >
                        {track.name}
                      </Link>{" "}
                      <div className="flex gap-1 text-xs text-muted-foreground">
                        <Link
                          href={track.album.external_urls.spotify}
                          className="hover:underline truncate"
                        >
                          {track.album.name}
                        </Link>
                        /
                        <Link
                          href={track.artists[0].external_urls.spotify}
                          className="hover:underline truncate"
                        >
                          {track.artists[0].name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="grid grid-cols-1 gap-4 bg-muted p-4 rounded-md">
              {recentTopTracks.items.map((track: any, index: number) => (
                <div key={index}>
                  <div className="flex gap-4">
                    <div className="text-muted-foreground my-auto">
                      {index + 1}
                    </div>
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={300}
                      height={300}
                      className="rounded-md w-14 h-14"
                    />
                    <div>
                      <Link
                        href={track.external_urls.spotify}
                        className="hover:underline truncate"
                      >
                        {track.name}
                      </Link>{" "}
                      <div className="flex gap-1 text-xs text-muted-foreground">
                        <Link
                          href={track.album.external_urls.spotify}
                          className="hover:underline truncate"
                        >
                          {track.album.name}
                        </Link>
                        /
                        <Link
                          href={track.artists[0].external_urls.spotify}
                          className="hover:underline truncate"
                        >
                          {track.artists[0].name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="all-time">
            <div className="grid grid-cols-1 gap-4 bg-muted p-4 rounded-md">
              {allTimeTopTracks.items.map((track: any, index: number) => (
                <div key={index}>
                  <div className="flex gap-4">
                    <div className="text-muted-foreground my-auto">
                      {index + 1}
                    </div>
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={300}
                      height={300}
                      className="rounded-md w-14 h-14"
                    />
                    <div>
                      <Link
                        href={track.external_urls.spotify}
                        className="hover:underline truncate"
                      >
                        {track.name}
                      </Link>{" "}
                      <div className="flex gap-1 text-xs text-muted-foreground">
                        <Link
                          href={track.album.external_urls.spotify}
                          className="hover:underline truncate"
                        >
                          {track.album.name}
                        </Link>
                        /
                        <Link
                          href={track.artists[0].external_urls.spotify}
                          className="hover:underline truncate"
                        >
                          {track.artists[0].name}
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
