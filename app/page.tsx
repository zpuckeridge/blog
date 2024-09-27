import CallToFaith from "@/components/call-to-faith";
import LinkWithIcon from "@/components/link-with-icon";
import BlurFade from "@/components/magicui/blur-fade";

export default function Home() {
  return (
    <div className="max-w-lg lg:mx-auto flex flex-col gap-20 pb-20">
      <BlurFade delay={0.1} inView>
        <div className="text-sm flex flex-col gap-2">
          <p className="font-serif text-2xl italic">
            Christian IT Administrator working for Rising Sun Pictures. Building
            better artist experiences by day, designing epic web experiences by
            night.
          </p>

          <div className="flex justify-between gap-2">
            <p className="text-xs text-nowrap text-muted-foreground">
              &copy; {new Date().getFullYear()} Zacchary Puckeridge
            </p>
            <hr className="w-full border-muted my-auto" />
          </div>
        </div>
      </BlurFade>

      <div className="text-sm flex flex-col gap-4">
        <BlurFade delay={0.2} inView>
          <p className="leading-relaxed">
            I am the lead web designer for the{" "}
            <LinkWithIcon href="https://61oaksgroup.com.au?ref=zacchary.me">
              61 Oaks Group
            </LinkWithIcon>
            , a cohort of companies that participates in moving forward God’s
            work within the marketplace. We created the{" "}
            <LinkWithIcon href="https://haddoninstitute.org?ref=zacchary.me">
              Haddon Institute
            </LinkWithIcon>
            , a seminary known for its Spurgeonic and missional mindset. We've
            also built{" "}
            <LinkWithIcon href="https://thearmourybookshop.com.au?ref=zacchary.me">
              The Armoury Bookshop
            </LinkWithIcon>
            , a Reformed Christian bookstore and{" "}
            <LinkWithIcon href="https://starcompass.com.au?ref=zacchary.me">
              Star Compass
            </LinkWithIcon>
            , a disability support service operating in Brisbane Australia.
          </p>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="leading-relaxed">
            I also work as an IT Administrator for{" "}
            <LinkWithIcon href="https://rsp.com.au?ref=zacchary.me">
              Rising Sun Pictures
            </LinkWithIcon>{" "}
            during the day. I deal with a variety of issues and ensure the
            lights stay on!
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <p className="leading-relaxed">
            I have limited availability, but I am open to hearing about your
            project! If you're looking for a web designer, please feel free to
            reach out via{" "}
            <LinkWithIcon href="mailto:hi@zacchary.me">email</LinkWithIcon> or{" "}
            <LinkWithIcon href="https://cal.com/zpuckeridge?ref=zacchary.me">
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
