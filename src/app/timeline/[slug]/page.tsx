import { CalendarIcon, DotsHorizontalIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { FaFacebook, FaXTwitter } from "react-icons/fa6";
import remarkGfm from "remark-gfm";
import { useMDXComponents } from "@/mdx-components";
import AnimatedSignature from "@/src/components/animated-signature";
import CopyLink from "@/src/components/copy-link";
import CopyText from "@/src/components/copy-text";
import Subscribe from "@/src/components/subscribe";
import TableOfContents from "@/src/components/toc";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { getPostBySlug } from "@/src/lib/directus-content";

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	// Get MDX components first, before any conditional logic
	const mdxComponents = useMDXComponents();

	const { slug } = await params;

	const post = await getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	// Calculate reading time using the actual content
	const wordCount = post.content ? post.content.split(/\s+/).length : 200;
	const averageWordsPerMinute = 300;
	const readingTime = Math.ceil(wordCount / averageWordsPerMinute);

	return (
		<div className="max-w-lg mx-auto flex flex-col gap-4 pt-4 pb-20 px-6">
			<div className="text-sm flex flex-col space-y-20">
				<div className="space-y-4">
					<div>
						<h1 className="font-serif text-2xl font-semibold italic">{post.title}</h1>
						<div className="flex gap-3 justify-between text-muted-foreground text-sm w-full">
							<div className="w-full text-muted-foreground text-xs">
								{new Date(post.date_created).toLocaleDateString("en-US", {
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
											{new Date(post.date_created).toLocaleDateString("en-US", {
												weekday: "long",
												day: "2-digit",
												month: "long",
												year: "numeric",
											})}{" "}
											· {post.tags.join(", ")} · {readingTime} minute read
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
								<CopyLink />
							</div>
						</div>
					</div>

					{post.image && (
						<div className="flex flex-col gap-4 w=full h-full aspect-video">
							<Image
								src={`https://directus.obambulo.studio/assets/${post.image}`}
								width={1200}
								height={720}
								priority
								sizes="(max-width: 768px) 100vw, 800px"
								alt={post.title}
								className="object-cover w-full rounded-xl aspect-video"
							/>
							<p className="text-center text-xs text-muted-foreground">{post.image_alt}</p>
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
						<MDXRemote
							components={mdxComponents}
							source={post.content}
							options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
						/>
					</article>
					<div className="space-y-10">
						{post.signature && (
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
									href={`mailto:?subject=${post.title}&body=https%3A%2F%2Fzacchary.me/timeline/${slug}`}
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
								<CopyText text={post.content} />
								{post.date_updated && (
									<div className="flex gap-2">
										<CalendarIcon className="w-4 h-4 my-auto" />
										<p className="text-muted-foreground text-xs my-auto">
											Last modified on{" "}
											{new Date(post.date_updated).toLocaleDateString("en-US", {
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
					className="underline underline-offset-2 decoration-dotted hover:decoration-solid hover:underline-offset-4 transition inline-flex group ease-in-out text-xs text-muted-foreground w-fit"
				>
					../timeline
				</Link>
			</div>
		</div>
	);
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;

	const post = await getPostBySlug(slug);

	if (!post) {
		return notFound();
	}

	const title = post.title;
	const description = post.description;

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
					url: post.image || "/avatar.avif",
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
					url: post.image || "/avatar.avif",
					width: 1920,
					height: 1080,
					alt: title,
				},
			],
		},
	};
}
