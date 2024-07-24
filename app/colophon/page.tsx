import { Badge } from "@/components/ui/badge";

export default function Colophon() {
  return (
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
      <div className="text-sm flex flex-col gap-2">
        <p className="font-serif text-2xl italic ">Colophon</p>

        <p>
          A comprehensive overview of the technologies and inspiration used to
          build this website.
        </p>

        <div className="flex gap-2">
          <div className="py-10 flex flex-col w-full gap-2">
            <p className="text-muted-foreground">Typography</p>

            <p>
              <a
                href="https://fonts.google.com/specimen/Work+Sans"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Work Sans
              </a>{" "}
              as body text,{" "}
              <a
                href="https://vercel.com/font"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Geist Mono
              </a>{" "}
              for code and{" "}
              <a
                href="https://fonts.google.com/specimen/Nanum+Myeongjo"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Nanum Myeongjo
              </a>{" "}
              for headings and flair.
            </p>
          </div>

          <div className="py-10 flex flex-col w-full gap-2">
            <p className="text-muted-foreground">Technical</p>

            <p>
              Built with{" "}
              <a
                href="https://nextjs.org?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Next.js
              </a>
              ,{" "}
              <a
                href="https://pagescms.org?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                PagesCMS
              </a>
              ,{" "}
              <a
                href="https://tailwindcss.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Tailwind
              </a>
              ,{" "}
              <a
                href="https://ui.shadcn.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                shadcn
              </a>
              ,{" "}
              <a
                href="https://www.prisma.io?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Prisma
              </a>
              , and{" "}
              <a
                href="https://vidstack.io?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Vidstack
              </a>
              .
            </p>

            <p>
              Deployed and hosted on{" "}
              <a
                href="https://vercel.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Vercel
              </a>
              . Analytics provided by{" "}
              <a
                href="https://umami.is?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Umami
              </a>
              .
            </p>
          </div>
        </div>

        <div className="flex gap-2 ">
          <div className="py-10 flex flex-col w-full gap-2">
            <p className="text-muted-foreground">Inspiration</p>

            <div className="flex flex-col gap-2">
              <a
                href="https://linusrogge.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                linusrogge.com
              </a>
              <a
                href="https://sdrn.co?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                sdrn.co
              </a>
              <a
                href="https://alexcarpenter.me?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                alexcarpenter.me
              </a>
              <a
                href="https://leerob.io?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                leerob.io
              </a>
              <a
                href="https://joshwcomeau.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                joshwcomeau.com
              </a>
              <a
                href="https://wesbos.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                wesbos.com
              </a>
              <a
                href="https://carlbarenbrug.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                carlbarenbrug.com
              </a>
            </div>
          </div>

          <div className="py-10 flex flex-col w-full gap-2">
            <p className="text-muted-foreground">Influences</p>

            <div className="flex flex-col gap-2">
              <a
                href="https://61oaksgroup.com.au?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Keith Sanga
              </a>
              <a
                href="https://x.com/foord_tom?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Tom Foord
              </a>
              <a
                href="https://x.com/craigcireland?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Craig Ireland
              </a>
              <a
                href="https://dougwils.com?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Douglas Wilson
              </a>
              <a
                href="https://www.ligonier.org?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                R.C. Sproul
              </a>
              <a
                href="https://x.com/thisisfoster?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Michael Foster
              </a>
              <a
                href="https://x.com/jaitaiwan?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Daniel Holmes
              </a>
              <p className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2">
                Jaydan Holmes
              </p>
              <a
                href="https://drevan.me?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                André van Tonder
              </a>
              <p className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2">
                Declan Ballantine
              </p>
            </div>
          </div>
        </div>

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
              <a
                href="https://rsp.com.au?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                Rising Sun Pictures
              </a>
            </div>
          </div>

          <div className="flex w-full border-b border-muted pb-2">
            <div className="w-2/6 text-muted-foreground">Version</div>

            <div className="w-4/6">5.0.0</div>
          </div>

          <div className="flex w-full border-b border-muted pb-2">
            <div className="w-2/6 text-muted-foreground">View source</div>

            <div className="w-4/6">
              <a
                href="https://github.com/zpuckeridge/blog?ref=zacchary.me"
                target="_blank"
                className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
              >
                zpuckeridge/blog
              </a>
            </div>
          </div>

          <div className="flex w-full border-b border-muted pb-2">
            <div className="w-2/6 text-muted-foreground">Carbon footprint</div>

            <div className="w-4/6">
              <Badge className="text-xs rounded-none hover:bg-muted hover:text-muted-foreground py-0 px-2 bg-muted text-muted-foreground">
                WIP
              </Badge>
            </div>
          </div>

          <div className="flex w-full border-b border-muted pb-2">
            <div className="w-2/6 text-muted-foreground">Speed insights</div>

            <div className="w-4/6">
              <Badge className="text-xs rounded-none hover:bg-muted hover:text-muted-foreground py-0 px-2 bg-muted text-muted-foreground">
                WIP
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
