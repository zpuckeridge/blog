import CallToFaith from "@/components/call-to-faith";
import Lanyard from "@/components/lanyard";
import RetrieveIP from "@/components/retrieve-ip";
import SmoothScrollLink from "@/components/scroll-down";
import BackgroundSection from "@/components/sections/background-section";
import BooksSection from "@/components/sections/books-section";
import ExperienceSection from "@/components/sections/experience-section";
import MusicTracking from "@/components/sections/music-section";
import ShowcaseSection from "@/components/sections/showcase-section";
import UsesSection from "@/components/sections/uses-section";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowRightIcon,
  DiscordLogoIcon,
  DotFilledIcon,
  EnvelopeClosedIcon,
  FileTextIcon,
  GitHubLogoIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";
import { FaSpotify, FaXTwitter } from "react-icons/fa6";

export default function Home() {
  return (
    <main className="flex flex-col justify-between px-4 space-y-24 max-w-7xl mx-auto">
      <div className="relative">
        <div className="relative min-h-screen">
          <div className="absolute top-20 w-full space-y-4">
            <Lanyard />

            <RetrieveIP />
          </div>
          <div className="absolute bottom-4  left-0 right-0">
            <div className="flex gap-6">
              <div className="hidden xl:flex flex-col space-y-6 border-r-2 pr-6 my-auto">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://discordapp.com/users/181324210876973056"
                        target="_blank"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <DiscordLogoIcon className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>Discord Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://x.com/zpuckeridge"
                        target="_blank"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <FaXTwitter className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>X Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://sdelta.xyz"
                        target="_blank"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <VideoIcon className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>Livestream Website</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://github.com/zpuckeridge"
                        target="_blank"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <GitHubLogoIcon className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>GitHub Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
                        target="_blank"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <FaSpotify className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>Spotify Profile</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href="/blog"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <FileTextIcon className="w-5 h-5" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>Blog</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <a
                        href="mailto:hi@zacchary.me"
                        target="_blank"
                        className="hover:text-muted-foreground transition-all duration-200"
                      >
                        <EnvelopeClosedIcon className="w-5 h-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top" align="center" sideOffset={30}>
                      <p>Contact Email</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="pb-20 md:pb-0">
                <p className="xl:text-4xl lg:text-3xl text-2xl font-bold leading-none tracking-tight uppercase">
                  Web Developer
                </p>
                <h1 className="xl:text-9xl lg:text-8xl md:text-7xl sm:text-6xl text-5xl font-bold leading-none tracking-tight uppercase text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
                  <div>Zacchary</div>
                  <div>Puckeridge</div>
                </h1>
              </div>
            </div>

            <SmoothScrollLink />
          </div>
        </div>
      </div>

      <div className="pt-20" id="about">
        <div className="space-y-20">
          <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
            <DotFilledIcon className="w-4 h-4 animate-pulse my-auto" /> About
          </p>
          <p className="md:text-6xl sm:text-5xl text-4xl font-bold leading-none tracking-tight">
            A Christian IT Administrator working for{" "}
            <a
              href="https://www.rsp.com.au/"
              target="_blank"
              aria-label="Rising Sun Pictures Website"
              className="text-[#fff200] hover:text-[#fff200cb] transition-all duration-200"
            >
              Rising Sun Pictures
            </a>
            . Building better artist experiences by day, designing epic Web
            Experiences by night.
          </p>
        </div>
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className="w-4 h-4 animate-pulse my-auto" /> Background
        </p>

        <BackgroundSection />
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className="w-4 h-4 animate-pulse my-auto" /> Experience
        </p>

        <ExperienceSection />

        <div className="space-y-2">
          <p className="text-center text-lg">
            Idle hands are the devils workshop.
          </p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="cursor-default w-auto text-center text-muted-foreground hover:text-white transition-all duration-200">
                Proverbs 16:27-29
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col gap-2 justify-between tracking-normal font-normal">
                <p className="text-left">
                  <cite>
                    &quot;A worthless man plots evil, and his speech is like a
                    scorching fire. A dishonest man spreads strife, and a
                    whisperer separates close friends. A man of violence entices
                    his neighbor and leads him in a way that is not good.&quot;
                  </cite>
                </p>
                <p className="text-left text-xs text-muted-foreground">ESV</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className="w-4 h-4 animate-pulse my-auto" />{" "}
          Qualifications
        </p>
        <div className="md:flex justify-between space-y-4 md:space-y-0 max-w-6xl mx-auto gap-4">
          <div className="p-4 bg-neutral-900 rounded-lg border-2 w-full space-y-4">
            <p className="font-mono uppercase text-xs font-semibold">
              Haddon Institute
            </p>
            <p className="text-2xl font-bold leading-none tracking-tight">
              Systematic Theology
            </p>
            <p className="font-normal leading-none tracking-tight">
              Apr 2024
              <ArrowRightIcon className="inline-block w-4 h-4 my-auto" />
              Present
            </p>
          </div>
          <div className="p-4 bg-neutral-900 rounded-lg border-2 w-full space-y-4">
            <p className="font-mono uppercase text-xs font-semibold">
              Haddon Institute
            </p>
            <p className="text-2xl font-bold leading-none tracking-tight">
              Theology for Worldview
            </p>
            <p className="font-normal leading-none tracking-tight">
              Dec 2023{" "}
              <ArrowRightIcon className="inline-block w-4 h-4 my-auto" /> Feb
              2024
            </p>
          </div>
          <div className="p-4 bg-neutral-900 rounded-lg border-2 w-full space-y-4">
            <p className="font-mono uppercase text-xs font-semibold">
              TAFE QLD
            </p>
            <p className="text-2xl font-bold leading-none tracking-tight">
              Certificate III of Information Technology & Digital Media
            </p>
            <p className="font-normal leading-none tracking-tight">
              Jan 2019{" "}
              <ArrowRightIcon className="inline-block w-4 h-4 my-auto" /> June
              2020
            </p>
          </div>
          <div className="p-4 bg-neutral-900 rounded-lg border-2 w-full space-y-4">
            <p className="font-mono uppercase text-xs font-semibold">
              Parklands Christian College
            </p>
            <p className="text-2xl font-bold leading-none tracking-tight">
              High School Certificate
            </p>
            <p className="font-normal leading-none tracking-tight">
              Acquired in 2016
            </p>
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-center text-lg">
            Expertise isn't always tied to formal credentials.
          </p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="cursor-default w-auto text-center text-muted-foreground hover:text-white transition-all duration-200">
                1 Timothy 4:12
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col gap-2 justify-between tracking-normal font-normal">
                <p className="text-left">
                  <cite>
                    &quot;Let no one despise you for your youth, but set the
                    believers an example in speech, in conduct, in love, in
                    faith, in purity.&quot;
                  </cite>
                </p>
                <p className="text-left text-xs text-muted-foreground">ESV</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className=" w-4 h-4 animate-pulse my-auto" /> Showcase
        </p>

        <ShowcaseSection />

        <div className="space-y-2">
          <p className="text-center text-lg">
            Build something, so that you might have something to pass down to
            the next generation.
          </p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="cursor-default w-auto text-center text-muted-foreground hover:text-white transition-all duration-200">
                Philippians 3:14-16
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col gap-2 justify-between tracking-normal font-normal">
                <p className="text-left">
                  <cite>
                    &quot;I press on toward the goal for the prize of the upward
                    call of God in Christ Jesus. Let those of us who are mature
                    think this way, and if in anything you think otherwise, God
                    will reveal that also to you. Only let us hold true to what
                    we have attained.&quot;
                  </cite>
                </p>
                <p className="text-left text-xs text-muted-foreground">ESV</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className=" w-4 h-4 animate-pulse my-auto" /> Music
        </p>
        <div>
          <MusicTracking />
        </div>
        <div className="space-y-2">
          <p className="text-center text-lg">
            Your listening habits reveal a great deal about your character.
          </p>
          <HoverCard>
            <HoverCardTrigger asChild>
              <p className="cursor-default w-auto text-center text-muted-foreground hover:text-white transition-all duration-200">
                Proverbs 4:20-23
              </p>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex flex-col gap-2 justify-between tracking-normal font-normal">
                <p className="text-left">
                  <cite>
                    &quot;My son, pay attention to what I say; turn your ear to
                    my words. Do not let them out of your sight, keep them
                    within your heart; for they are life to those who find them
                    and health to one’s whole body. Above all else, guard your
                    heart, for everything you do flows from it.&quot;
                  </cite>
                </p>
                <p className="text-left text-xs text-muted-foreground">ESV</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className=" w-4 h-4 animate-pulse my-auto" />{" "}
          Recommended Books
        </p>

        <BooksSection />
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className="w-4 h-4 animate-pulse my-auto" /> Uses
        </p>

        <UsesSection />
      </div>

      <div className="space-y-20">
        <p className="font-mono uppercase text-sm font-semibold px-2 py-1 bg-neutral-900 border-2 flex gap-2">
          <DotFilledIcon className=" w-4 h-4 animate-pulse my-auto" /> Currently
        </p>
        <p className="md:text-6xl sm:text-5xl text-4xl font-bold leading-none tracking-tight">
          Building a confessionally Reformed bookstore called{" "}
          <a
            href="https://thearmourybookshop.com.au/"
            target="_blank"
            aria-label="The Armoury Bookshop Website"
            className="text-[#b93236] hover:text-[#b93236cb] transition-all duration-200"
          >
            The Armoury Bookshop
          </a>{" "}
          and seminary known as the{" "}
          <a
            href="https://haddoninstitute.org/"
            target="_blank"
            aria-label="Haddon Institute Website"
            className="text-[#b69c65] hover:text-[#b69c65cb] transition-all duration-200"
          >
            Haddon Institute
          </a>
          .
        </p>
      </div>

      <CallToFaith />
    </main>
  );
}
