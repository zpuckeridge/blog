import BackLink from "@/components/back-link";
import LinkWithIcon from "@/components/link-with-icon";

export default function ColophonPage() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <div className="space-y-10">
          <div className="space-y-2">
            <p className="font-redaction text-black text-xl dark:text-white">
              Colophon
            </p>
            <p className="text-muted-foreground text-sm">Typography</p>

            <p>
              <LinkWithIcon href="https://fontshare.com/fonts/archivo">
                Archivo
              </LinkWithIcon>{" "}
              for body text,{" "}
              <LinkWithIcon href="https://vercel.com/font">
                Geist Mono
              </LinkWithIcon>{" "}
              for code, and{" "}
              <LinkWithIcon href="https://www.mckltype.com/typefaces/redaction">
                Redaction
              </LinkWithIcon>{" "}
              for headings, blockquotes, and flair.
            </p>
          </div>

          <hr className="border-dotted border-border" />

          <div className="flex w-full flex-col gap-2">
            <p className="text-muted-foreground text-sm">Technical</p>

            <p>
              Built with{" "}
              <LinkWithIcon href="https://astro.build?ref=zacchary.me">
                Astro
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://react.dev?ref=zacchary.me">
                React
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://vite.dev?ref=zacchary.me">
                Vite
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://directus.io?ref=zacchary.me">
                Directus
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://tailwindcss.com?ref=zacchary.me">
                Tailwind
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://base-ui.com?ref=zacchary.me">
                Base UI
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://github.com/hmans/safe-mdx?ref=zacchary.me">
                safe-mdx
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://oxc.rs?ref=zacchary.me">
                Oxc
              </LinkWithIcon>
              ,{" "}
              <LinkWithIcon href="https://lanyard.rest?ref=zacchary.me">
                Lanyard
              </LinkWithIcon>{" "}
              and{" "}
              <LinkWithIcon href="https://www.mux.com?ref=zacchary.me">
                Mux
              </LinkWithIcon>
              . Deployed and hosted on{" "}
              <LinkWithIcon href="https://workers.dev?ref=zacchary.me">
                Cloudflare Workers
              </LinkWithIcon>
              . Analytics provided by{" "}
              <LinkWithIcon href="https://cloudflare.com?ref=zacchary.me">
                Cloudflare
              </LinkWithIcon>{" "}
              and{" "}
              <LinkWithIcon href="https://posthog.com?ref=zacchary.me">
                PostHog
              </LinkWithIcon>
              . Newsletter signups handled by{" "}
              <LinkWithIcon href="https://loops.so?ref=zacchary.me">
                Loops
              </LinkWithIcon>
              .
            </p>
          </div>

          <hr className="border-dotted border-border" />

          <div className="flex gap-4">
            <div className="flex w-full flex-col gap-2">
              <p className="text-muted-foreground text-sm">Inspiration</p>
              <div className="flex flex-col items-start gap-2">
                <LinkWithIcon href="https://linusrogge.com?ref=zacchary.me">
                  linusrogge.com
                </LinkWithIcon>
                <LinkWithIcon href="https://siddhartharun.com?ref=zacchary.me">
                  siddhartharun.com
                </LinkWithIcon>
                <LinkWithIcon href="https://emilkowal.ski?ref=zacchary.me">
                  emilkowal.ski
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
                <LinkWithIcon href="https://davidreina.com?ref=zacchary.me">
                  davidreina.com
                </LinkWithIcon>
                <LinkWithIcon href="https://henribredt.de?ref=zacchary.me">
                  henribredt.de
                </LinkWithIcon>
                <LinkWithIcon href="https://1of1studio.com?ref=zacchary.me">
                  1of1studio.com
                </LinkWithIcon>
                <LinkWithIcon href="https://minimal.gallery?ref=zacchary.me">
                  minimal.gallery
                </LinkWithIcon>
                <LinkWithIcon href="https://minimalism.com?ref=zacchary.me">
                  minimalism.com
                </LinkWithIcon>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <p className="text-muted-foreground text-sm">Influences</p>

              <div className="flex flex-col items-start gap-2">
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
                <LinkWithIcon href="https://www.cslewis.com/us?ref=zacchary.me">
                  C.S. Lewis
                </LinkWithIcon>
                <LinkWithIcon href="https://youtu.be/2zcBO3EsZBY?ref=zacchary.me">
                  Elisabeth Elliot
                </LinkWithIcon>
                <LinkWithIcon href="https://www.ligonier.org?ref=zacchary.me">
                  R.C. Sproul
                </LinkWithIcon>
                <LinkWithIcon href="https://www.gracechurch.org?ref=zacchary.me">
                  John MacArthur
                </LinkWithIcon>
                <LinkWithIcon href="https://x.com/thisisfoster?ref=zacchary.me">
                  Michael Foster
                </LinkWithIcon>
                <LinkWithIcon href="https://x.com/charliekirk11?ref=zacchary.me">
                  Charlie Kirk
                </LinkWithIcon>
                <LinkWithIcon href="https://www.desiringgod.org?ref=zacchary.me">
                  John Piper
                </LinkWithIcon>
              </div>
            </div>
          </div>

          <hr className="border-dotted border-border" />

          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full justify-between">
              <div className="text-muted-foreground text-sm">Version</div>

              <div className="w-fit">7.0.0</div>
            </div>

            <div className="flex w-full justify-between">
              <div className="text-muted-foreground text-sm">Source</div>

              <div>
                <LinkWithIcon href="https://github.com/zpuckeridge/blog?ref=zacchary.me">
                  zpuckeridge/blog
                </LinkWithIcon>
              </div>
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="text-muted-foreground text-sm">Carbon</div>

              <div className="carbon-badge-mount">
                <div className="carbonbadge" id="wcb" />
              </div>
            </div>
          </div>
        </div>

        <BackLink href="/">../</BackLink>
      </div>
    </div>
  );
}
