import { compareDesc } from "date-fns";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

import PasswordProtection from "@/components/password-protection";
import Videos from "@/components/videos";
import { getVideos } from "@/lib/directus-content";
import {
  getVideoAccessErrorMessage,
  getVideoAuthCookieName,
  getVideoPassword,
  isVideoAuthTokenValid,
} from "@/lib/video-auth";

export const metadata: Metadata = {
  description: "A collection of videos I've created.",
  title: "Videos",
};

export default async function Clips(props: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const searchParams = await props.searchParams;
  const videoPassword = getVideoPassword();
  const isAuthenticated = await isVideoAuthTokenValid(
    cookieStore.get(getVideoAuthCookieName())?.value
  );

  if (!isAuthenticated) {
    return (
      <PasswordProtection
        description="A compilation of humorous, thrilling, and memorable moments from my life and some of the video games I regularly play."
        error={getVideoAccessErrorMessage(searchParams.error)}
        isConfigured={Boolean(videoPassword)}
        redirectTo="/videos"
        title="Videos"
      />
    );
  }

  const videos = await getVideos();

  const sortedVideos = videos.toSorted((a, b) =>
    compareDesc(new Date(a.date_created), new Date(b.date_created))
  );

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div className="flex flex-col gap-2 text-sm">
          <p className="font-redaction text-white text-xl">Videos</p>

          <p>
            A compilation of humorous, thrilling, and memorable moments from my
            life and some of the video games I regularly play.
          </p>
        </div>

        <Videos itemsPerPage={6} videos={sortedVideos} />

        <Link
          className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
          href="/"
        >
          ../
        </Link>
      </div>
    </div>
  );
}
