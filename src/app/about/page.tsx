import type { Metadata } from "next";
import Link from "next/link";
import Age from "@/src/components/age";
import BooksPreview from "@/src/components/books-preview";
import CreditsPreview from "@/src/components/credits-preview";
import ImageWithDetails from "@/src/components/image-with-details";
import LinkWithIcon from "@/src/components/link-with-icon";
import MoviesPreview from "@/src/components/movies-preview";
import { getBooks, getCredits, getMovies } from "@/src/lib/directus-content";

export const metadata: Metadata = {
	title: "About",
	description:
		"I'm a 25 year old Reformed Baptist born and raised in Australia. Since childhood, I've had a natural affinity for computers, diving deep into video games, tinkering and taking apart old computers.",
};

export default async function About() {
	const books = await getBooks();
	const movies = await getMovies();
	const credits = await getCredits();

	return (
		<div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pt-4 pb-20">
			<div className="flex flex-col space-y-20 text-sm">
				<div className="flex flex-col gap-2 text-sm">
					<p className="font-redaction text-white text-xl">About</p>

					<p>
						I&apos;m a <Age /> year old{" "}
						<LinkWithIcon href="https://1689londonbaptistconfession.com/">
							Reformed Baptist
						</LinkWithIcon>{" "}
						born and raised in{" "}
						<LinkWithIcon href="https://maps.app.goo.gl/BikC7wpFxkio2f7A8">Australia</LinkWithIcon>.
						Since childhood, I&apos;ve had a natural affinity for computers, diving deep into video
						games, tinkering and taking apart old computers. After graduating high school, I spent
						about 9 months studying a dual degree of Psychology and Criminology.
					</p>

					<div className="mx-auto flex gap-4 py-4">
						<ImageWithDetails
							alt="Somewhere in the middle of the United States"
							author="Zacchary Puckeridge"
							location="Somewhere, USA"
							name="Somewhere in the middle of the United States"
							src="/roadtrip/P1011152_t1mdns.avif"
						/>

						<ImageWithDetails
							alt="Somewhere in the middle of the United States"
							author="Zacchary Puckeridge"
							location="Arizona, USA"
							name="Grand Canyon Lookout"
							src="/roadtrip/P1011435_hgzmov.avif"
						/>
					</div>

					<p>
						I dropped out of university and travelled to the{" "}
						<LinkWithIcon href="https://maps.app.goo.gl/7c5H8i3cnLwPFmKq9">
							United States
						</LinkWithIcon>{" "}
						for about 3 months, working at a{" "}
						<LinkWithIcon href="https://www.camphighroad.org/">Methodist Summer Camp</LinkWithIcon>{" "}
						with my mate, Jaydan Holmes. We met many wonderful people along the way (he ended up
						marrying one of them)! We ended our trip with a road trip across the country from{" "}
						<LinkWithIcon href="https://maps.app.goo.gl/hSzzFMENPnHd4AXv6">
							Loudown County Virginia
						</LinkWithIcon>{" "}
						to{" "}
						<LinkWithIcon href="https://maps.app.goo.gl/NM2AVWxE4wpJswuw5">
							Los Angeles California
						</LinkWithIcon>
						.
					</p>
					<div className="mx-auto flex gap-4 py-4">
						<ImageWithDetails
							alt="On the road in Colorado"
							author="Zacchary Puckeridge"
							location="Colorado, USA"
							name="On the road in Colorado"
							src="/roadtrip/P1011186_qkrix9.avif"
						/>

						<ImageWithDetails
							alt="Utah Lookout"
							author="Zacchary Puckeridge"
							location="Utah, USA"
							name="Utah Lookout"
							src="/roadtrip/P1011212_xh4oep.avif"
						/>
					</div>
					<p>
						After coming back from the United States, I landed a job supporting a small web hosting
						company called <LinkWithIcon href="https://conetix.com.au/">Conetix</LinkWithIcon>. All
						thanks to Jaydan&apos;s brother Dan for that! It was there that my enthusiasm for web
						development and self-hosting really began to take off.
					</p>
					<p>
						I&apos;ve explored Proxmox, Docker, Kubernetes, and more, finding satisfaction in using
						open-source software to build and host applications. Nowadays, I&apos;m all about web
						development, that software being - JavaScript, NextJS, and TailwindCSS.
					</p>
				</div>

				<BooksPreview books={books} />

				<MoviesPreview movies={movies} />

				<CreditsPreview credits={credits} />
			</div>

			<Link
				className="group inline-flex w-fit text-muted-foreground text-xs underline decoration-dotted underline-offset-2 transition ease-in-out hover:decoration-solid hover:underline-offset-4"
				href="/"
			>
				../
			</Link>
		</div>
	);
}
