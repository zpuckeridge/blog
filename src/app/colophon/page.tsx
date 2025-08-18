import Link from "next/link";
import LinkWithIcon from "@/src/components/link-with-icon";

export default function Colophon() {
	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="space-y-10">
					<div className="flex flex-col w-full gap-2">
						<p className="text-2xl font-semibold font-serif italic">Colophon</p>
						<p className="text-muted-foreground text-xs">Typography</p>

						<p>
							<LinkWithIcon href="https://fontshare.com/fonts/archivo">Archivo</LinkWithIcon> as
							body text, <LinkWithIcon href="https://vercel.com/font">Geist Mono</LinkWithIcon> for
							code and{" "}
							<LinkWithIcon href="https://fonts.google.com/specimen/Instrument+Serif">
								Instrument Serif
							</LinkWithIcon>{" "}
							for headings and flair.
						</p>
					</div>

					<hr className="border-dotted border-muted-foreground" />

					<div className="flex flex-col w-full gap-2">
						<p className="text-muted-foreground text-xs">Technical</p>

						<p>
							Built with{" "}
							<LinkWithIcon href="https://nextjs.org?ref=zacchary.me">Next.js</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://pagescms.org?ref=zacchary.me">PagesCMS</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://tailwindcss.com?ref=zacchary.me">Tailwind</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://ui.shadcn.com?ref=zacchary.me">shadcn</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://biomejs.dev?ref=zacchary.me">Biome</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://lanyard.rest?ref=zacchary.me">Lanyard</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://neon.tech?ref=zacchary.me">Neon</LinkWithIcon>,{" "}
							<LinkWithIcon href="https://www.framer.com/motion?ref=zacchary.me">
								Framer Motion
							</LinkWithIcon>{" "}
							and <LinkWithIcon href="https://www.mux.com?ref=zacchary.me">Mux</LinkWithIcon>.
							Deployed and hosted on{" "}
							<LinkWithIcon href="https://workers.dev?ref=zacchary.me">
								Cloudflare Workers
							</LinkWithIcon>
							. Analytics provided by{" "}
							<LinkWithIcon href="https://cloudflare.com?ref=zacchary.me">Cloudflare</LinkWithIcon>{" "}
							and{" "}
							<LinkWithIcon href="https://clarity.microsoft.com/projects?ref=zacchary.me">
								Microsoft Clarity
							</LinkWithIcon>
							.
						</p>
					</div>

					<hr className="border-dotted border-muted-foreground" />

					<div className="flex gap-4">
						<div className="flex flex-col w-full gap-2">
							<p className="text-muted-foreground text-xs">Inspiration</p>
							<div className="flex flex-col gap-2">
								<LinkWithIcon href="https://linusrogge.com?ref=zacchary.me">
									linusrogge.com
								</LinkWithIcon>
								<LinkWithIcon href="https://siddhartharun.com?ref=zacchary.me">
									siddhartharun.com
								</LinkWithIcon>
								<LinkWithIcon href="https://emilkowal.ski?ref=zacchary.me">
									emilkowal.ski
								</LinkWithIcon>
								<LinkWithIcon href="https://sdrn.co?ref=zacchary.me">sdrn.co</LinkWithIcon>
								<LinkWithIcon href="https://alexcarpenter.me?ref=zacchary.me">
									alexcarpenter.me
								</LinkWithIcon>
								<LinkWithIcon href="https://leerob.io?ref=zacchary.me">leerob.io</LinkWithIcon>
								<LinkWithIcon href="https://joshwcomeau.com?ref=zacchary.me">
									joshwcomeau.com
								</LinkWithIcon>
								<LinkWithIcon href="https://wesbos.com?ref=zacchary.me">wesbos.com</LinkWithIcon>
								<LinkWithIcon href="https://carlbarenbrug.com?ref=zacchary.me">
									carlbarenbrug.com
								</LinkWithIcon>
								<LinkWithIcon href="https://paco.me?ref=zacchary.me">paco.me</LinkWithIcon>
								<LinkWithIcon href="https://benji.org?ref=zacchary.me">benji.org</LinkWithIcon>
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

						<div className="flex flex-col w-full gap-2">
							<p className="text-muted-foreground text-xs">Influences</p>

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
								<LinkWithIcon href="https://www.gracechurch.org?ref=zacchary.me">
									John MacArthur
								</LinkWithIcon>
								<LinkWithIcon href="https://x.com/thisisfoster?ref=zacchary.me">
									Michael Foster
								</LinkWithIcon>
								<LinkWithIcon href="https://www.desiringgod.org?ref=zacchary.me">
									John Piper
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

					<hr className="border-dotted border-muted-foreground" />

					<div className="flex flex-col w-full gap-1">
						<div className="flex w-full justify-between ">
							<div className="text-muted-foreground text-xs">Version</div>

							<div className="w-fit">6.1.0</div>
						</div>

						<div className="flex w-full justify-between">
							<div className="text-muted-foreground text-xs">Source</div>

							<div>
								<LinkWithIcon href="https://github.com/zpuckeridge/blog?ref=zacchary.me">
									zpuckeridge/blog
								</LinkWithIcon>
							</div>
						</div>

						<div className="flex w-full justify-between">
							<div className="text-muted-foreground text-xs">Carbon</div>

							<div className="text-sm">
								<LinkWithIcon href="https://www.websitecarbon.com/website/zacchary-me?ref=zacchary.me">
									0.18g of CO
									<span className="align-super text-xs">2</span>/view
								</LinkWithIcon>
							</div>
						</div>
					</div>
				</div>

				<Link
					href="/"
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground w-fit"
				>
					../
				</Link>
			</div>
		</div>
	);
}
