import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Tweet } from "react-tweet";
import AfterQuote from "@/components/after-quote";
import Definition from "@/components/definition";
import FootnotesNavigation from "@/components/footnotes-navigation";
import LinkWithIcon from "@/components/link-with-icon";
import SideNote from "@/components/side-note";
import VidstackPlayer from "@/components/vidstack-player";
import { ImageZoom } from "@/components/zoom-image";

const components: MDXComponents = {
	Overflow: ({ children }: { children: React.ReactNode }) => (
		<div className="w-full">
			<div style={{ width: "800px" }}>
				<div className="flex w-full gap-2 pb-4">{children}</div>
			</div>
		</div>
	),
	Player: ({ title, src }: { title: string; src: string }) => (
		<VidstackPlayer src={src} title={title} />
	),
	Tweet: ({ id }: { id: string }) => <Tweet id={id} />,
	Definition: ({
		word,
		meaning,
		type,
	}: {
		word: string;
		meaning: string;
		type?: string | undefined;
	}) => <Definition meaning={meaning} type={type} word={word} />,
	AfterQuote: ({ text, subtext, link }: { text: string; subtext?: string; link?: string }) => (
		<AfterQuote link={link} subtext={subtext} text={text} />
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
		<SideNote note={note} position={position as "left" | "right"}>
			{children}
		</SideNote>
	),
	// Map custom HTML tags to components
	sideNote: ({
		children,
		note,
		position,
	}: {
		children: React.ReactNode;
		note: string;
		position?: string;
	}) => (
		<SideNote note={note} position={position as "left" | "right"}>
			{children}
		</SideNote>
	),
	definition: ({ word, meaning, type }: { word: string; meaning: string; type?: string }) => (
		<Definition meaning={meaning} type={type} word={word} />
	),
	afterQuote: ({ text, subtext, link }: { text: string; subtext?: string; link?: string }) => (
		<AfterQuote link={link} subtext={subtext} text={text} />
	),
	// Custom component parser for HTML-like tags
	div: ({ className, children, ...props }) => {
		// Check if this is a custom component
		if (className?.includes("custom-component")) {
			return (
				<div className={className} {...props}>
					{children}
				</div>
			);
		}
		return (
			<div className={className} {...props}>
				{children}
			</div>
		);
	},
	a: ({ href = "", children, ...props }) => {
		if (href.startsWith("#user-content") || href.startsWith("#fnref-")) {
			return (
				<FootnotesNavigation href={href} {...props}>
					{children}
				</FootnotesNavigation>
			);
		}
		return <LinkWithIcon href={href}>{children}</LinkWithIcon>;
	},
	h1: ({ children }) => {
		const id = children
			? children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
			: "";
		return <h1 id={id}>{children}</h1>;
	},
	h2: ({ children }) => {
		const id = children
			? children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
			: "";
		return <h2 id={id}>{children}</h2>;
	},
	h3: ({ children }) => {
		const id = children
			? children
					.toString()
					.toLowerCase()
					.replace(/[^\w\s-]/g, "")
					.replace(/\s+/g, "-")
			: "";
		return <h3 id={id}>{children}</h3>;
	},
	pre: ({ children, ...props }) => (
		<pre
			{...props}
			className="overflow-auto rounded-xl border bg-neutral-50 p-6 font-mono text-black text-sm dark:bg-neutral-900 dark:text-neutral-300"
		>
			{children}
		</pre>
	),
	// Allows customizing built-in components, e.g. to add styling.
	img: (props: { src: string; alt: string; title?: string }) => (
		<ImageZoom>
			<Image
				height={720}
				sizes="100vw"
				style={{ width: "100%", height: "auto" }}
				width={1280}
				{...props}
			/>
		</ImageZoom>
	),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}
