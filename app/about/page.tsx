import Age from "@/components/age-calculator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Statistics from "@/components/statistics";

export default async function About() {
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
        <Statistics />
      </div>
    </main>
  );
}
