import LinkWithIcon from "@/components/link-with-icon";
import BlurFade from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";

export default function Colophon() {
  return (
    <>
      <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Colophon</p>
        </BlurFade>
        <div className="text-sm leading-relaxed flex flex-col gap-2">
          <BlurFade delay={0.2}>
            <p>
              A comprehensive overview of the technologies and inspiration used
              to build this website.
            </p>
          </BlurFade>

          <BlurFade delay={0.3}>
            <div className="flex gap-2">
              <div className="py-10 flex flex-col w-full gap-2">
                <p className="text-muted-foreground">Typography</p>

                <p>
                  <LinkWithIcon href="https://fonts.google.com/specimen/Inter">
                    Inter
                  </LinkWithIcon>{" "}
                  as body text,{" "}
                  <LinkWithIcon href="https://vercel.com/font">
                    Geist Mono
                  </LinkWithIcon>{" "}
                  for code and{" "}
                  <LinkWithIcon href="https://fonts.google.com/specimen/Nanum+Myeongjo">
                    Nanum Myeongjo
                  </LinkWithIcon>{" "}
                  for headings and flair.
                </p>
              </div>

              <div className="py-10 flex flex-col w-full gap-2">
                <p className="text-muted-foreground">Technical</p>

                <p>
                  Built with{" "}
                  <LinkWithIcon href="https://nextjs.org?ref=zacchary.me">
                    Next.js
                  </LinkWithIcon>
                  ,{" "}
                  <LinkWithIcon href="https://pagescms.org?ref=zacchary.me">
                    PagesCMS
                  </LinkWithIcon>
                  ,{" "}
                  <LinkWithIcon href="https://tailwindcss.com?ref=zacchary.me">
                    Tailwind
                  </LinkWithIcon>
                  ,{" "}
                  <LinkWithIcon href="https://ui.shadcn.com?ref=zacchary.me">
                    shadcn
                  </LinkWithIcon>
                  ,{" "}
                  <LinkWithIcon href="https://www.prisma.io?ref=zacchary.me">
                    Prisma
                  </LinkWithIcon>
                  ,{" "}
                  <LinkWithIcon href="https://www.framer.com/motion?ref=zacchary.me">
                    Framer Motion
                  </LinkWithIcon>{" "}
                  and{" "}
                  <LinkWithIcon href="https://www.mux.com?ref=zacchary.me">
                    Mux
                  </LinkWithIcon>
                  .
                </p>

                <p>
                  Deployed and hosted on{" "}
                  <LinkWithIcon href="https://vercel.com?ref=zacchary.me">
                    Vercel
                  </LinkWithIcon>
                  . Analytics provided by{" "}
                  <LinkWithIcon href="https://umami.is?ref=zacchary.me">
                    Umami
                  </LinkWithIcon>
                  .
                </p>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.4}>
            <div className="flex gap-2 ">
              <div className="py-10 flex flex-col w-full gap-2">
                <p className="text-muted-foreground">Inspiration</p>
                <div className="flex flex-col gap-2">
                  <LinkWithIcon href="https://linusrogge.com?ref=zacchary.me">
                    linusrogge.com
                  </LinkWithIcon>
                  <LinkWithIcon href="https://sdrn.co?ref=zacchary.me">
                    sdrn.co
                  </LinkWithIcon>
                  <LinkWithIcon href="https://alexcarpenter.me?ref=zacchary.me">
                    alexcarpenter.me
                  </LinkWithIcon>
                  <LinkWithIcon href="https://leerob.io?ref=zacchary.me">
                    leerob.io
                  </LinkWithIcon>
                  <LinkWithIcon href="https://joshwcomeau.com?ref=zacchary.me">
                    joshwcomeau.com
                  </LinkWithIcon>
                  <LinkWithIcon href="https://wesbos.com?ref=zacchary.me">
                    wesbos.com
                  </LinkWithIcon>
                  <LinkWithIcon href="https://carlbarenbrug.com?ref=zacchary.me">
                    carlbarenbrug.com
                  </LinkWithIcon>
                  <LinkWithIcon href="https://paco.me?ref=zacchary.me">
                    paco.me
                  </LinkWithIcon>
                  <LinkWithIcon href="https://benji.org?ref=zacchary.me">
                    benji.org
                  </LinkWithIcon>
                  <LinkWithIcon href="https://tomorrow-happens.studio?ref=zacchary.me">
                    tomorrow-happens.studio
                  </LinkWithIcon>
                  <LinkWithIcon href="https://loganliffick.com?ref=zacchary.me">
                    loganliffick.com
                  </LinkWithIcon>
                </div>{" "}
              </div>

              <div className="py-10 flex flex-col w-full gap-2">
                <p className="text-muted-foreground">Influences</p>

                <div className="flex flex-col gap-2">
                  <LinkWithIcon href="https://61oaksgroup.com.au?ref=zacchary.me">
                    Keith Sanga
                  </LinkWithIcon>
                  <LinkWithIcon href="https://x.com/foord_tom?ref=zacchary.me">
                    Tom Foord
                  </LinkWithIcon>
                  <LinkWithIcon href="https://x.com/craigcireland?ref=zacchary.me">
                    Craig Ireland
                  </LinkWithIcon>
                  <LinkWithIcon href="https://dougwils.com?ref=zacchary.me">
                    Douglas Wilson
                  </LinkWithIcon>
                  <LinkWithIcon href="https://www.ligonier.org?ref=zacchary.me">
                    R.C. Sproul
                  </LinkWithIcon>
                  <LinkWithIcon href="https://x.com/thisisfoster?ref=zacchary.me">
                    Michael Foster
                  </LinkWithIcon>
                  <LinkWithIcon href="https://x.com/jaitaiwan?ref=zacchary.me">
                    Daniel Holmes
                  </LinkWithIcon>
                  <LinkWithIcon href="https://www.facebook.com/jd.holmes.52?ref=zacchary.me">
                    Jaydan Holmes
                  </LinkWithIcon>
                  <LinkWithIcon href="https://drevan.me?ref=zacchary.me">
                    André van Tonder
                  </LinkWithIcon>
                  <LinkWithIcon href="https://www.facebook.com/declan.ballantine?ref=zacchary.me">
                    Declan Ballantine
                  </LinkWithIcon>
                </div>
              </div>
            </div>
          </BlurFade>

          <BlurFade delay={0.5}>
            <div className="py-10 flex flex-col w-full gap-2">
              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">Name</div>

                <div className="w-4/6">Zacchary Puckeridge</div>
              </div>

              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">Location</div>

                <div className="w-4/6">Brisbane, QLD</div>
              </div>

              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">Work</div>

                <div className="w-4/6">
                  IT Administrator at{" "}
                  <LinkWithIcon href="https://rsp.com.au?ref=zacchary.me">
                    Rising Sun Pictures
                  </LinkWithIcon>
                </div>
              </div>

              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">Version</div>

                <div className="w-4/6">5.0.0</div>
              </div>

              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">View source</div>

                <div className="w-4/6">
                  <LinkWithIcon href="https://github.com/zpuckeridge/blog?ref=zacchary.me">
                    zpuckeridge/blog
                  </LinkWithIcon>
                </div>
              </div>

              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">
                  Carbon footprint
                </div>

                <div className="w-4/6 text-sm">
                  <LinkWithIcon href="https://www.websitecarbon.com/website/zacchary-me?ref=zacchary.me">
                    0.18g of CO
                    <span className="align-super text-xs">2</span>/view
                  </LinkWithIcon>
                </div>
              </div>

              <div className="flex w-full border-b border-muted pb-2">
                <div className="w-2/6 text-muted-foreground">
                  Speed insights
                </div>

                <div className="w-4/6">
                  <Badge className="text-xs rounded-none hover:bg-muted hover:text-blue-400 dark:hover:text-blue-600 py-0 px-2 bg-muted text-muted-foreground">
                    WIP
                  </Badge>
                </div>
              </div>
            </div>
          </BlurFade>
        </div>
      </div>
    </>
  );
}
