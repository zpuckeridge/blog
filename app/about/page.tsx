import Age from "@/components/age";
import BooksSection from "@/components/books";
import ImageWithDetails from "@/components/image-with-details";
import LinkWithIcon from "@/components/link-with-icon";
import BlurFade from "@/components/magicui/blur-fade";
import MusicTracking from "@/components/music";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "I'm a 24 year old Reformed Baptist born and raised in Australia. Since childhood, I've had a natural affinity for computers, diving deep into video games, tinkering and taking apart old computers.",
};

export default function About() {
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20">
      <BlurFade delay={0.1}>
        <p className="font-serif text-2xl italic ">About</p>
      </BlurFade>
      <div className="text-sm flex flex-col gap-4">
        <BlurFade delay={0.2}>
          <p className="leading-relaxed">
            I&apos;m a <Age /> year old{" "}
            <LinkWithIcon href="https://1689londonbaptistconfession.com/">
              Reformed Baptist
            </LinkWithIcon>{" "}
            born and raised in{" "}
            <LinkWithIcon href="https://maps.app.goo.gl/BikC7wpFxkio2f7A8">
              Australia
            </LinkWithIcon>
            . Since childhood, I&apos;ve had a natural affinity for computers,
            diving deep into video games, tinkering and taking apart old
            computers. After graduating high school, I spent about 9 months
            studying a dual degree of Psychology and Criminology.
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="py-4 mx-auto flex gap-4">
            <ImageWithDetails
              src="/roadtrip/P1011152_t1mdns.avif"
              alt="Somewhere in the middle of the United States"
              name="Somewhere in the middle of the United States"
              location="Somewhere, USA"
              author="Zacchary Puckeridge"
            />

            <ImageWithDetails
              src="/roadtrip/P1011435_hgzmov.avif"
              alt="Somewhere in the middle of the United States"
              name="Grand Canyon Lookout"
              location="Arizona, USA"
              author="Zacchary Puckeridge"
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <p className="leading-relaxed">
            I dropped out of university and travelled to the{" "}
            <LinkWithIcon href="https://maps.app.goo.gl/7c5H8i3cnLwPFmKq9">
              United States
            </LinkWithIcon>{" "}
            for about 3 months, working at a{" "}
            <LinkWithIcon href="https://www.camphighroad.org/">
              Methodist Summer Camp
            </LinkWithIcon>{" "}
            with my mate, Jaydan Holmes. We met many wonderful people along the
            way (he ended up marrying one of them)! We ended our trip with a
            road trip across the country from{" "}
            <LinkWithIcon href="https://maps.app.goo.gl/hSzzFMENPnHd4AXv6">
              Loudown County Virginia
            </LinkWithIcon>{" "}
            to{" "}
            <LinkWithIcon href="https://maps.app.goo.gl/NM2AVWxE4wpJswuw5">
              Los Angeles California
            </LinkWithIcon>
            .
          </p>
        </BlurFade>

        <BlurFade delay={0.5}>
          <div className="py-4 mx-auto flex gap-4">
            <ImageWithDetails
              src="/roadtrip/P1011186_qkrix9.avif"
              alt="On the road in Colorado"
              name="On the road in Colorado"
              location="Colorado, USA"
              author="Zacchary Puckeridge"
            />

            <ImageWithDetails
              src="/roadtrip/P1011212_xh4oep.avif"
              alt="Utah Lookout"
              name="Utah Lookout"
              location="Utah, USA"
              author="Zacchary Puckeridge"
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <p className="leading-relaxed">
            After coming back from the United States, I landed a job supporting
            a small web hosting company called{" "}
            <LinkWithIcon href="https://conetix.com.au/">Conetix</LinkWithIcon>.
            All thanks to Jaydan&apos;s brother Dan for that! It was there that
            my enthusiasm for web development and self-hosting really began to
            take off.
          </p>
        </BlurFade>

        <BlurFade delay={0.7}>
          <p className="leading-relaxed">
            I&apos;ve explored Proxmox, Docker, Kubernetes, and more, finding
            satisfaction in using open-source software to build and host
            applications. Nowadays, I&apos;m all about web development, that
            software being - JavaScript, NextJS, and TailwindCSS.
          </p>
        </BlurFade>
      </div>

      <BlurFade delay={0.8}>
        <MusicTracking />
      </BlurFade>

      <BlurFade delay={0.9}>
        <div className="flex flex-col w-full gap-4 text-sm">
          <BooksSection />
          <p className="text-muted-foreground text-xs text-center">
            Recommended reads
          </p>
        </div>
      </BlurFade>

      <BlurFade delay={1.0}>
        <div className=" space-y-4">
          <p className="leading-relaxed max-w-sm mx-auto text-center text-sm">
            Have nothing to do with irreverent, silly myths. Rather train
            yourself for godliness; for while bodily training is of some value,
            godliness is of value in every way, as it holds promise for the
            present life and also for the life to come.
          </p>
          <p className="text-muted-foreground text-xs text-center">
            1 Timothy 4:6-11
          </p>
        </div>
      </BlurFade>
    </div>
  );
}
