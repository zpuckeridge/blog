import Age from "@/components/age";
import BooksSection from "@/components/sections/books-section";
import MusicTracking from "@/components/sections/music-section";
import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
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

        <div className="py-10 max-w-md mx-auto flex gap-2  items-center">
          <div className="w-full relative">
            <Image
              src="/roadtrip/P1011152_t1mdns.avif"
              width={1000}
              height={1000}
              priority
              alt="Somewhere in the middle of the United States"
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="w-full relative">
            <Image
              src="/roadtrip/P1011435_hgzmov.avif"
              width={1000}
              height={1000}
              priority
              alt="Picture of rock formations in Arizona"
              className="w-full aspect-square object-cover"
            />
          </div>
        </div>

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

        <div className="py-10 max-w-md mx-auto flex gap-2  items-center">
          <div className="w-full">
            <Image
              src="/roadtrip/P1011186_qkrix9.avif"
              width={1000}
              height={1000}
              priority
              alt="Somewhere in Colorado"
              className="w-full aspect-square object-cover"
            />
          </div>
          <div className="w-full">
            <Image
              src="/roadtrip/P1011212_xh4oep.avif"
              width={1000}
              height={1000}
              priority
              alt="Picture of rock formations in Arizona"
              className="w-full aspect-square object-cover"
            />
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
      </div>

      <MusicTracking />
      <div className="flex flex-col w-full gap-2 text-sm">
        <p className="text-muted-foreground text-sm">Recommended reads</p>

        <BooksSection />
      </div>

      <div className="border-l-2 border-muted text-sm space-y-2">
        <p className="ml-4">
          &quot;Have nothing to do with irreverent, silly myths. Rather train
          yourself for godliness; for while bodily training is of some value,
          godliness is of value in every way, as it holds promise for the
          present life and also for the life to come. The saying is trustworthy
          and deserving of full acceptance. For to this end we toil and strive,
          because we have our hope set on the living God, who is the Savior of
          all people, especially of those who believe.&quot;
        </p>
        <p className="text-sm italic ml-4">1 Timothy 4:6-11</p>
      </div>
    </div>
  );
}
