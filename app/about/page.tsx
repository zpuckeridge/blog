import Age from "@/components/age";
import MusicTracking from "@/components/sections/music-section";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-2">
        <p>
          I'm a <Age /> year old{" "}
          <a
            href="https://1689londonbaptistconfession.com/"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Reformed Baptist
          </a>{" "}
          born and raised in{" "}
          <a
            href="https://maps.app.goo.gl/BikC7wpFxkio2f7A8"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Australia
          </a>
          . Since childhood, I've had a natural affinity for computers, diving
          deep into video games, tinkering and taking apart old computers. After
          graduating high school, I spent about 9 months studying a dual degree
          of Psychology and Criminology.
        </p>

        <p>
          I dropped out of university and travelled to the{" "}
          <a
            href="https://maps.app.goo.gl/7c5H8i3cnLwPFmKq9"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            United States
          </a>{" "}
          for about 3 months, working at a{" "}
          <a
            href="https://www.camphighroad.org/"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Methodist Summer Camp
          </a>{" "}
          with my mate, Jaydan Holmes. We met many wonderful people along the
          way (he ended up marrying one of them)! We ended our trip with a road
          trip across the country from{" "}
          <a
            href="https://maps.app.goo.gl/hSzzFMENPnHd4AXv6"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Loudown County Virginia
          </a>{" "}
          to{" "}
          <a
            href="https://maps.app.goo.gl/NM2AVWxE4wpJswuw5"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Los Angeles California
          </a>
          .
        </p>

        <div className="lg:flex lg:space-y-0 space-y-4 justify-center py-14 px-8">
          <div className="lg:-mr-64 lg:mt-40 lg:rotate-[2deg]">
            <Image
              src="/roadtrip/Friendsville.avif"
              width={1000}
              height={1000}
              priority
              alt="Group photo in front of a sign that reads FRIENDSVILLE in Friendsville, Virginia"
              className="w-full lg:w-48 rounded-lg border-2 border-muted  z-10 shadow-2xl mx-auto lg:mx-0"
            />
            <p className="text-xs text-muted-foreground text-right py-1">
              Friendsville, Virginia
            </p>
          </div>
          <div className="lg:-mr-6 lg:mt-20 lg:-rotate-[10deg]">
            <Image
              src="/roadtrip/P1011186_qkrix9.avif"
              width={1000}
              height={1000}
              priority
              alt="Somewhere in Colorado"
              className="w-full lg:w-60 rounded-lg border-2 border-muted  z-30 shadow-2xl mx-auto lg:mx-0"
            />
            <p className="text-xs text-muted-foreground py-1">Colorado</p>
          </div>
          <div>
            <Image
              src="/roadtrip/P1011435_hgzmov.avif"
              width={1000}
              height={1000}
              priority
              alt="Somewhere in the Grand Canyon"
              className="w-full lg:w-96 rounded-lg border-2 border-muted z-20 shadow-2xl mx-auto lg:mx-0"
            />
            <p className="text-xs text-muted-foreground text-center py-1">
              Grand Canyon
            </p>
          </div>
          <div className="lg:-ml-4 lg:mt-20 lg:rotate-[7deg]">
            <Image
              src="/roadtrip/P1011152_t1mdns.avif"
              width={1000}
              height={1000}
              priority
              alt="Somewhere in the middle of the United States"
              className="w-full lg:w-72 rounded-lg border-2 border-muted  z-30 shadow-2xl mx-auto lg:mx-0"
            />
            <p className="text-xs text-muted-foreground text-right py-1">
              somewhere? 👀
            </p>
          </div>
          <div className="lg:-ml-[18rem] lg:pt-40 lg:-rotate-[3deg]">
            <Image
              src="/roadtrip/P1011212_xh4oep.avif"
              width={1000}
              height={1000}
              priority
              alt="Picture of rock formations in Arizona"
              className="w-full lg:w-48 rounded-lg border-2 border-muted  z-40 shadow-2xl mx-auto lg:mx-0"
            />
            <p className="text-xs text-muted-foreground text-right py-1">
              Arizona
            </p>
          </div>
        </div>

        <p>
          After coming back from the United States, I landed a job supporting a
          small web hosting company called{" "}
          <a
            href="https://conetix.com.au/"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Conetix
          </a>
          . All thanks to Jaydan's brother Dan for that! It was there that my
          enthusiasm for web development and self-hosting really began to take
          off.
        </p>

        <p>
          I've explored Proxmox, Docker, Kubernetes, and more, finding
          satisfaction in using open-source software to build and host
          applications. Nowadays, I'm all about web development, that software
          being - JavaScript, NextJS, and TailwindCSS.
        </p>

        <MusicTracking />
      </div>
    </div>
  );
}
