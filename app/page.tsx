import CallToFaith from "@/components/call-to-faith";
import LinkWithIcon from "@/components/link-with-icon";
import BlurFade from "@/components/magicui/blur-fade";

export default async function Home() {
  const visitors = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}/api/visitors`,
    { cache: "no-store" },
  ).then((res) => res.json());

  return (
    <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20" role="main">
      <BlurFade delay={0.1} inView>
        <div className="text-sm flex flex-col gap-2">
          <p
            className="font-serif text-2xl italic"
            role="heading"
            aria-level={1}
            aria-label="Christian IT Administrator working for Rising Sun Pictures. Building
            better artist experiences by day, designing epic web experiences by
            night."
          >
            Christian IT Administrator working for Rising Sun Pictures. Building
            better artist experiences by day, designing epic web experiences by
            night.
          </p>

          <div className="flex justify-between gap-2" role="contentinfo">
            <p
              className="text-xs text-nowrap text-muted-foreground"
              aria-label="Copyright information"
            >
              &copy; {new Date().getFullYear()} Zacchary Puckeridge
            </p>

            <hr className="w-full border-muted my-auto" />

            <div className="flex gap-2 my-auto">
              <div className="w-2 h-2 animate-pulse rounded-full my-auto bg-green-500" />

              <p className="text-xs text-nowrap text-muted-foreground">
                {visitors.visitors === 0 ? 1 : visitors.visitors} active{" "}
                {visitors.visitors > 1 ? "visitors" : "visitor (that's you!)"}
              </p>
            </div>
          </div>
        </div>
      </BlurFade>

      <div className="text-sm flex flex-col gap-4">
        <BlurFade delay={0.2} inView>
          <p className="leading-relaxed" role="article">
            I am the lead web designer for the{" "}
            <LinkWithIcon
              href="https://61oaksgroup.com.au?ref=zacchary.me"
              aria-label="61 Oaks Group website"
            >
              61 Oaks Group
            </LinkWithIcon>
            , a cohort of companies that participates in moving forward
            God&apos;s work within the marketplace. We created the{" "}
            <LinkWithIcon
              href="https://haddoninstitute.org?ref=zacchary.me"
              aria-label="Haddon Institute website"
            >
              Haddon Institute
            </LinkWithIcon>
            , a seminary known for its Spurgeonic and missional mindset.
            We&apos;ve also built{" "}
            <LinkWithIcon
              href="https://thearmourybookshop.com.au?ref=zacchary.me"
              aria-label="The Armoury Bookshop website"
            >
              The Armoury Bookshop
            </LinkWithIcon>
            , a Reformed Christian bookstore and{" "}
            <LinkWithIcon
              href="https://starcompass.com.au?ref=zacchary.me"
              aria-label="Star Compass website"
            >
              Star Compass
            </LinkWithIcon>
            , a disability support service operating in Brisbane Australia.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="leading-relaxed" role="article">
            I also work as an IT Administrator for{" "}
            <LinkWithIcon
              href="https://rsp.com.au?ref=zacchary.me"
              aria-label="Rising Sun Pictures website"
            >
              Rising Sun Pictures
            </LinkWithIcon>{" "}
            during the day. I deal with a variety of issues and ensure the
            lights stay on!
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="leading-relaxed" role="article">
            I have limited availability, but I am open to hearing about your
            project! If you&apos;re looking for a web designer, please feel free
            to reach out via{" "}
            <LinkWithIcon
              href="mailto:hi@zacchary.me"
              aria-label="Email Zacchary Puckeridge"
            >
              email
            </LinkWithIcon>{" "}
            or{" "}
            <LinkWithIcon
              href="https://cal.com/zpuckeridge?ref=zacchary.me"
              aria-label="Schedule a call with Zacchary Puckeridge"
            >
              schedule a call
            </LinkWithIcon>
            .
          </p>
        </BlurFade>
      </div>

      <BlurFade delay={0.5} inView>
        <CallToFaith />
      </BlurFade>
    </div>
  );
}
