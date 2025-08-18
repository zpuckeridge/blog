import Link from "next/link";

export default function Imprint() {
	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="flex flex-col space-y-8">
					<p className="font-serif text-2xl font-semibold italic">Imprint</p>

					<div className="flex flex-col w-full gap-2">
						<p className="text-muted-foreground text-xs">Contact Information</p>
						<p>
							<Link
								href="mailto:hi@zacchary.me"
								className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out"
							>
								hi@zacchary.me
							</Link>
						</p>
					</div>

					<div className="flex flex-col w-full gap-2">
						<p className="text-muted-foreground text-xs">Copyright</p>
						<p className="text-sm">
							The content of this website is protected by Australian copyright law. Unauthorised
							distrubution of content for commercial purposes (ie. screenshots, articles, videos and
							photos) without express prior consent is strictly prohibited. Otherwise, content is
							more than welcome to be referenced externally, as long as it is linked and done in a
							way that is not misleading.
						</p>
					</div>

					<div className="flex flex-col w-full gap-2">
						<p className="text-muted-foreground text-xs">Disclaimer</p>
						<p className="text-sm">
							While I strive to ensure the accuracy of information on this website, I make no
							representations or warranties of any kind, express or implied, about the completeness,
							accuracy, reliability, suitability or availability of the information, products,
							services, or related graphics contained on the website.
						</p>
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
