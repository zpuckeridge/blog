import { CalendarIcon, DotsHorizontalIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import { Tweet } from "react-tweet";
import type { MDXModule } from "@/_content";
import * as mdxIndex from "@/_content";
import AfterQuote from "@/src/components/after-quote";
import AnimatedSignature from "@/src/components/animated-signature";
import CopyLink from "@/src/components/copy-link";
import CopyText from "@/src/components/copy-text";
import Definition from "@/src/components/definition";
import FootnotesNavigation from "@/src/components/footnotes-navigation";
import LinkWithIcon from "@/src/components/link-with-icon";
import SideNote from "@/src/components/side-note";
import Subscribe from "@/src/components/subscribe";
import TableOfContents from "@/src/components/toc";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/ui/tooltip";
import type { Post } from "@/src/interfaces/content-item";

const mdxComponents = {
	Tweet: ({ id }: { id: string }) => <Tweet id={id} />,
	Definition: ({
		word,
		meaning,
		type,
	}: {
		word: string;
		meaning: string;
		type?: string | undefined;
	}) => <Definition word={word} meaning={meaning} type={type} />,
	AfterQuote: ({ text, subtext, link }: { text: string; subtext?: string; link?: string }) => (
		<AfterQuote text={text} subtext={subtext} link={link} />
	),
	SideNote: ({
		children,
		note,
		position,
	}: {
		children: React.ReactNode;
		note: string;
		position?: string;
	}) => (
		<SideNote note={note} position={position as "left" | "right" | undefined}>
			{children}
		</SideNote>
	),
	a: ({
		href = "",
		children,
		...props
	}: {
		href?: string;
		children: React.ReactNode;
		// biome-ignore lint/suspicious/noExplicitAny: to be reviewed
		[key: string]: any;
	}) => {
		if (href.startsWith("#user-content") || href.startsWith("#fnref-")) {
			return (
				<FootnotesNavigation href={href} {...props}>
					{children}
				</FootnotesNavigation>
			);
		}
		return <LinkWithIcon href={href}>{children}</LinkWithIcon>;
	},
	h1: ({ children }: { children: React.ReactNode }) => {
		const id = children
			? children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
			: "";
		return <h1 id={id}>{children}</h1>;
	},
	h2: ({ children }: { children: React.ReactNode }) => {
		const id = children
			? children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
			: "";
		return <h2 id={id}>{children}</h2>;
	},
	h3: ({ children }: { children: React.ReactNode }) => {
		const id = children
			? children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
			: "";
		return <h3 id={id}>{children}</h3>;
	},
	// biome-ignore lint/suspicious/noExplicitAny: to be reviewed
	pre: ({ children, ...props }: { children: React.ReactNode; [key: string]: any }) => (
		<pre
			{...props}
			className="overflow-auto bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6 font-mono text-black dark:text-neutral-300 text-sm"
		>
			{children}
		</pre>
	),
};

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	// biome-ignore lint/suspicious/noExplicitAny: to be reviewed
	let MDXContent: any, frontmatter: Post, content: string;

	try {
		// Find the MDX module for this slug
		const mdxModule = Object.entries(mdxIndex)
			.filter(([key]) => key.startsWith("_mdx_"))
			.map(([_, module]) => module as MDXModule)
			.find((module) => module.frontmatter.slug === slug && module.frontmatter.type === "Post");

		if (!mdxModule) {
			return notFound();
		}

		// Dynamically import the MDX file for the slug
		const post = await import(`@/_content/posts/${slug}.mdx`);
		MDXContent = post.default;
		frontmatter = mdxModule.frontmatter as Post;
		content = mdxModule.content;
	} catch {
		return notFound();
	}

	// Calculate reading time using the actual content
	const wordCount = content ? content.split(/\s+/).length : 200;
	const averageWordsPerMinute = 300;
	const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="space-y-4">
					<div>
						<h1 className="font-serif text-2xl font-semibold italic">{frontmatter.title}</h1>
						<div className="flex gap-3 justify-between text-muted-foreground text-sm w-full">
							<div className="w-full text-muted-foreground text-xs">
								{new Date(frontmatter.date).toLocaleDateString("en-US", {
									month: "long",
									year: "numeric",
								})}
							</div>
							<div className="flex items-center gap-3">
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger
											asChild
											className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
										>
											<DotsHorizontalIcon />
										</TooltipTrigger>
										<TooltipContent
											side="bottom"
											className="text-xs bg-muted/60 dark:bg-neutral-900/60 backdrop-blur-sm text-black dark:text-muted-foreground"
										>
											{new Date(frontmatter.date).toLocaleDateString("en-US", {
												weekday: "long",
												day: "2-digit",
												month: "long",
												year: "numeric",
											})}{" "}
											· {frontmatter.tag} · {readingTime} minute read
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<CopyLink />
							</div>
						</div>
					</div>

					{frontmatter.image && (
						<div className="flex flex-col gap-4 w=full h-full aspect-video">
							<Image
								src={`/${frontmatter.image}`}
								width={1200}
								height={720}
								priority
								sizes="(max-width: 768px) 100vw, 800px"
								alt={frontmatter.title}
								className="object-cover w-full rounded-xl aspect-video"
							/>
							<p className="text-center text-xs text-muted-foreground">{frontmatter.imageAlt}</p>
						</div>
					)}

					<TableOfContents />
				</div>

				<div className="space-y-4 flex flex-col gap-4">
					<article
						className={`
								w-full max-w-prose mx-auto 
								prose
								prose-blockquote:not-italic prose-blockquote:border-none prose-blockquote:text-black dark:prose-blockquote:text-neutral-300 prose-blockquote:pl-0 prose-blockquote:font-serif [&_blockquote_p]:text-2xl
								prose-headings:text-xl prose-heading:font-semibold prose-headings:font-serif prose-headings:text-black dark:prose-headings:text-neutral-300
								prose-a:font-normal prose-a:underline prose-a:underline-offset-2 prose-a:decoration-dotted prose-a:hover:decoration-solid prose-a:hover:underline-offset-4 dark:prose-a:text-neutral-300 prose-a:text-black
								prose-p:text-sm prose-p:text-black dark:prose-p:text-neutral-300 prose-p:leading-relaxed


								prose-img:rounded-xl prose-img:mx-auto
								prose-ul:text-black dark:prose-ul:text-neutral-300
								prose-ol:text-black dark:prose-ol:text-neutral-300 prose-ol:marker:text-black dark:prose-ol:marker:text-neutral-300
								prose-li:text-black dark:prose-li:text-neutral-300 prose-li:text-sm prose-li:font-normal prose-li:marker:text-muted-foreground prose-li:marker:font-normal prose-li:marker:text-xs
								prose-hr:border-muted-foreground prose-hr:border-dotted
								dark:prose-invert
							`}
					>
						<MDXContent components={mdxComponents} />
					</article>
					<div className="space-y-10">
						{frontmatter.signature && (
							<div className="flex flex-col gap-2">
								<AnimatedSignature />
								<div>
									<p className="text-sm">Zacchary Puckeridge</p>
									<p className="text-xs text-muted-foreground">Web Developer & Designer</p>
								</div>
							</div>
						)}
						<div className="space-y-3">
							<h2 className="text-sm ">Share Article</h2>
							<div className="flex gap-3 text-muted-foreground">
								<a
									href={`https://x.com/intent/tweet?text=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
									className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
								>
									<FaXTwitter className="w-4 h-4" />
								</a>
								<a
									href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
									className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
								>
									<FaFacebook className="w-4 h-4" />
								</a>
								<a
									href={`mailto:?subject=${frontmatter.title}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
									className="hover:text-blue-400 dark:hover:text-blue-600 transition-all duration-300"
								>
									<EnvelopeClosedIcon className="w-4 h-4" />
								</a>
								<CopyLink />
							</div>
						</div>
						<div className="space-y-3">
							<h2 className="text-sm ">Resources</h2>
							<div className="flex flex-col gap-3 text-muted-foreground text-xs">
								<CopyText text={content} />
								{frontmatter.lastModified && (
									<div className="flex gap-2">
										<CalendarIcon className="w-4 h-4 my-auto" />
										<p className="text-muted-foreground text-xs my-auto">
											Last modified on{" "}
											{new Date(frontmatter.lastModified).toLocaleDateString("en-US", {
												day: "numeric",
												month: "long",
												year: "numeric",
											})}
										</p>
									</div>
								)}
							</div>
						</div>
						<Subscribe />
					</div>
				</div>

				<Link
					href="/timeline"
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground"
				>
					../timeline
				</Link>
			</div>
		</div>
	);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	let frontmatter: Post;

	try {
		// Find the MDX module for this slug
		const mdxModule = Object.entries(mdxIndex)
			.filter(([key]) => key.startsWith("_mdx_"))
			.map(([_, module]) => module as MDXModule)
			.find((module) => module.frontmatter.slug === slug && module.frontmatter.type === "Post");

		if (!mdxModule) {
			return notFound();
		}

		frontmatter = mdxModule.frontmatter as Post;
	} catch {
		return notFound();
	}

	const title = frontmatter.title;
	const description = frontmatter.description;

	return {
		title: title,
		description: description,
		openGraph: {
			type: "article",
			title: title,
			description: description,
			siteName: "zacchary.me",
			images: [
				{
					url: frontmatter.image || "/avatar.avif",
					width: 1920,
					height: 1080,
					alt: title,
				},
			],
			url: `${process.env.NEXT_PUBLIC_VERCEL_URL}/timeline/${slug}`,
		},
		twitter: {
			card: "summary_large_image",
			title: title,
			description: description,
			images: [
				{
					url: frontmatter.image || "/avatar.avif",
					width: 1920,
					height: 1080,
					alt: title,
				},
			],
		},
	};
}
