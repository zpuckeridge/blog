"use client";

import CallToFaith from "@/components/call-to-faith";
import LinkWithIcon from "@/components/link-with-icon";
import { BlurFade } from "@/components/magicui/blur-fade";

export default function Home() {
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20" role="main">
      <BlurFade delay={0.1} inView>
        <div className="text-sm flex flex-col gap-2">
          <p
            className="font-serif text-2xl italic"
            role="heading"
            aria-level={1}
            aria-label="Chief Technical Officer working for 61 Oaks Group.
            Building better participant experiences by day, designing epic web
            experiences by night."
          >
            Waging war on weak culture—building digital strongholds, sharpening
            minds, and advancing the Kingdom of God.
          </p>

          <div className="flex justify-between gap-2" role="contentinfo">
            <p
              className="text-xs text-nowrap text-muted-foreground"
              aria-label="Copyright information"
            >
              &copy; {new Date().getFullYear()} Zacchary Puckeridge
            </p>

            <hr className="w-full border-muted my-auto" />
          </div>
        </div>
      </BlurFade>

      <div className="text-sm flex flex-col gap-4">
        <BlurFade delay={0.2} inView>
          <p className="leading-relaxed" role="article">
            Working for{" "}
            <LinkWithIcon
              href="https://starcompass.com.au?ref=zacchary.me"
              aria-label="Star Compass website"
            >
              Star Compass
            </LinkWithIcon>
            , a disability support service operating in Brisbane Australia and{" "}
            <LinkWithIcon
              href="https://haddoninstitute.org?ref=zacchary.me"
              aria-label="Haddon Institute website"
            >
              Haddon Institute
            </LinkWithIcon>
            , a distinctly Reformed seminary seeking for the Australian Church
            to fear and behold the majesty of our creator King. My goal is to
            advance the Kingdom of God through companies that participate in the
            global marketplace.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="leading-relaxed" role="article">
            I also run a web design studio known as{" "}
            <LinkWithIcon
              href="https://obambulo.studio?ref=zacchary.me"
              aria-label="obambulo studio website"
            >
              obambulo studio
            </LinkWithIcon>
            . I have limited availability, but I am open to hearing about your
            project! If you&apos;re looking for a web designer, please feel free
            to reach out via{" "}
            <LinkWithIcon
              href="mailto:zacc@obambulo.studio"
              aria-label="Email Zacchary Puckeridge"
            >
              email
            </LinkWithIcon>
            .
          </p>
        </BlurFade>
      </div>

      <BlurFade delay={0.4} inView>
        <CallToFaith />
      </BlurFade>
    </div>
  );
}
