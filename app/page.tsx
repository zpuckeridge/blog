import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarIcon,
  HandMetal,
  HardHat,
  MoveRight,
  Newspaper,
} from "lucide-react";
import Call from "@/components/call";
import Image from "next/image";
import { CardHover } from "@/components/card-hover";

export default async function Home() {
  const posts = await prisma.posts.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <main>
      <div className="mx-auto max-w-2xl space-y-8 my-10">
        <div className="flex justify-between">
          <h1 className="text-4xl font-bold flex gap-2 my-auto">
            G&apos;day
            <HandMetal className="w-8 h-8 my-auto" />
          </h1>
          <Image
            src="/avatar.jpg"
            width={200}
            height={200}
            alt="Zacchary Puckeridge"
            className="w-14 h-14 rounded-full border-4 border-muted my-auto"
          />
        </div>
        <div>
          <div className="space-y-4">
            <p className="dark:text-muted-foreground text-black">
              I&apos;m Zacchary, a Christian IT Administrator working for{" "}
              <span className="underline hover:no-underline cursor-pointer">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a
                      href="https://www.rsp.com.au/"
                      target="_blank"
                      aria-label="Rising Sun Pictures Website"
                      className="text-black dark:text-white"
                    >
                      Rising Sun Pictures
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage src="https://www.rsp.com.au/wp-content/uploads/2023/02/logo-white.svg" />
                        <AvatarFallback>RSP</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          Rising Sun Pictures
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Over the past two decades, Rising Sun Pictures (RSP)
                          has been delighting and inspiring audiences worldwide,
                          by creating some of Hollywood’s most memorable screen
                          moments.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-xs">
                            Working @ RSP since 2022
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </span>
              . Building better artist experiences by day, Web Developer by
              night.
            </p>
            <p className="dark:text-muted-foreground text-black">
              Currently building a Christian Reformed bookstore called{" "}
              <span className="underline hover:no-underline cursor-pointer">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a
                      href="https://thearmourybookshop.com.au/"
                      target="_blank"
                      className="text-black dark:text-white"
                    >
                      The Armoury Bookshop
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          className="bg-white"
                          src="https://thearmourybookshop.com.au/_next/image?url=%2Fthe-armoury-bookshop-logo.png&w=48&q=75"
                        />
                        <AvatarFallback>TAB</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          The Armoury Bookshop
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          A Christian Reformed bookshop based in Brisbane,
                          Australia. Providing good quality Christian books.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-xs">
                            Building @ TAB since 2023
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </span>{" "}
              and an education platform known as the{" "}
              <span className="underline hover:no-underline cursor-pointer">
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <a
                      href="https://haddoninstitute.org/"
                      target="_blank"
                      className="text-black dark:text-white"
                    >
                      Haddon Institute
                    </a>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarImage
                          className="bg-white"
                          src="https://haddoninstitute.org/_next/image?url=%2Flogos%2F3.png&w=750&q=75"
                        />
                        <AvatarFallback>HI</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">
                          Haddon Institute
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Our mission at the Haddon institute is to provide a
                          Christ-centered education grounded in Reformed
                          theology.
                        </p>
                        <div className="flex items-center pt-2">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span className="text-xs">
                            Building @ Haddon since 2023
                          </span>
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </span>
              .
            </p>
          </div>
        </div>

        <div className="flex justify-between my-auto border-b py-1">
          <p className="font-semibold text-lg flex gap-2 my-auto">
            <HardHat width={20} height={20} className="my-auto" />
            Projects
          </p>
          <Link
            href="/projects"
            className={`flex gap-2 ${buttonVariants({
              variant: "ghost",
            })}`}
            aria-label="All projects"
          >
            All projects
            <MoveRight className="w-5 h-5" />
          </Link>
        </div>
        <div>
          <CardHover />
        </div>

        <div className="flex justify-between my-auto border-b py-1">
          <p className="my-auto font-semibold text-lg flex gap-2 ">
            <Newspaper width={20} height={20} className="my-auto" /> Articles
          </p>
          <Link
            href="/articles"
            className={`flex gap-2 ${buttonVariants({
              variant: "ghost",
            })}`}
            aria-label="All articles"
          >
            All articles
            <MoveRight className="w-5 h-5" />
          </Link>
        </div>
        <div>
          <ul className="">
            {posts.map((post: any) => (
              <li
                key={post.id}
                className="rounded-lg p-2 hover:bg-muted hover:shadow-2xl transition-all duration-300"
              >
                <Link
                  href={`/article/${encodeURIComponent(post.slug)}`}
                  prefetch={false}
                  aria-label={post.title}
                >
                  <div className="sm:flex justify-between gap-2 space-y-1 sm:space-y-0">
                    <p className="truncate">{post.title}</p>

                    <div className="flex gap-2 text-sm dark:text-muted-foreground text-black my-auto">
                      <p className="whitespace-nowrap">{post.views} views</p>/
                      <Badge variant="secondary" className="font-mono">
                        {post.tag}
                      </Badge>
                      /
                      <p className="whitespace-nowrap">
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Call />
      </div>
    </main>
  );
}
