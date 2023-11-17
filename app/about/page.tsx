import Age from "@/components/age-calculator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { ImageIcon, MoveRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Statistics from "@/components/statistics";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Zacchary.",
};

export default async function About() {
  const generateTooltip = (url: any, name: any) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <a
              href={url}
              className="underline hover:no-underline text-black dark:text-white"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
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
    <main className="mx-auto max-w-2xl space-y-8 my-10">
      <h1 className="text-4xl font-bold ">About</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="font-semibold">Background</h2>
          <p className="text-muted-foreground">
            I&apos;m a <Age /> year old Christian born and raised in Brisbane,
            Australia. From a young age, tinkering with computers quickly became
            second nature to me. Exploring self-hosted and custom built
            solutions has been a passion of mine for a while now.
          </p>
          <p className="text-muted-foreground">
            After graduating high school, I spent about 9 months studying a dual
            degree of Phsychology and Criminology. I quickly realised that
            wasn&apos;t the pathway for me. Shortly thereafter a close mate and
            I ended up in the United States for ~3 months working on a Summer
            Camp.
          </p>
          <p className="text-muted-foreground">
            Another mate of mine hooked me up with a job providing support for a
            web hosting company shortly after I got back. That&apos;s where I
            developed my passion for web development and self-hosting.
          </p>
        </div>
        <div className="space-y-2">
          <h2 className="font-semibold">Stack</h2>

          <p className="text-muted-foreground">
            My favourite stack right now is{" "}
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
        </div>
        <p className="text-muted-foreground">
          I have also dabbled with{" "}
          {generateTooltip("https://cloud.google.com/", "Google Cloud")},{" "}
          {generateTooltip("https://cloud.oracle.com/", "Oracle Cloud")},{" "}
          {generateTooltip("https://railway.app/", "Railway")},{" "}
          {generateTooltip("https://www.linode.com/", "Linode")} and{" "}
          {generateTooltip("https://kubernetes.io/", "Kubernetes")} for dev ops
          related work. If you are interested in what gear and software I use on
          the day-to-day, check out{" "}
          <Link
            href="/uses"
            className="underline hover:no-underline text-white"
            aria-label="Uses Page"
          >
            /uses
          </Link>
          .
        </p>
        <div className="space-y-2">
          <h2 className="font-semibold">Now</h2>
          <p className="text-muted-foreground">
            Now I&apos;m contributing to an intergenerational education platform
            and online bookshop to pass on the wisdom of those that paved the
            road before us. I&apos;m very proud to be working alongside some of
            the most ambitious and talented people I&apos;ve ever met.
          </p>
        </div>
        <p className="text-center font-semibold">
          <span className="underline hover:no-underline cursor-pointer">
            <HoverCard>
              <HoverCardTrigger asChild>
                <p className="text-black dark:text-white">Soli Deo Gloria</p>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <p className="text-sm text-black dark:text-transparent bg-clip-text bg-gradient-to-br dark:from-muted-foreground from-40% dark:to-muted">
                  Glory to God alone.
                </p>
              </HoverCardContent>
            </HoverCard>
          </span>
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex justify-between my-auto border-b py-1">
          <p className="font-semibold text-lg flex gap-2 my-auto">
            <ImageIcon width={20} height={20} className="my-auto" />
            Gallery
          </p>
          <Link
            href="/gallery"
            className={buttonVariants({ variant: "ghost" })}
            aria-label="All images"
          >
            All images
            <MoveRight className="w-4 h-4 ml-2" />
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
        <Statistics />
      </div>
    </main>
  );
}
