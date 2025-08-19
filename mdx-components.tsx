import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Tweet } from "react-tweet";
import AfterQuote from "@/src/components/after-quote";
import Definition from "@/src/components/definition";
import FootnotesNavigation from "@/src/components/footnotes-navigation";
import LinkWithIcon from "@/src/components/link-with-icon";
import SideNote from "@/src/components/side-note";
import VidstackPlayer from "@/src/components/vidstack-player";

const components: MDXComponents = {
	Overflow: ({ children }: { children: React.ReactNode }) => (
		<div className="w-full ">
			<div style={{ width: "800px" }}>
				<div className="flex gap-2 pb-4 w-full">{children}</div>
			</div>
		</div>
	),
	Player: ({ title, src }: { title: string; src: string }) => (
		<VidstackPlayer title={title} src={src} />
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
		<SideNote note={note} position={position as "left" | "right"}>
			{children}
		</SideNote>
	),
	// Map custom HTML tags to components
	sideNote: ({ children, note, position }: any) => (
		<SideNote note={note} position={position as "left" | "right"}>
			{children}
		</SideNote>
	),
	definition: ({ word, meaning, type }: any) => (
		<Definition word={word} meaning={meaning} type={type} />
	),
	afterQuote: ({ text, subtext, link }: any) => (
		<AfterQuote text={text} subtext={subtext} link={link} />
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
			className="overflow-auto bg-neutral-50 dark:bg-neutral-900 border rounded-xl p-6 font-mono text-black dark:text-neutral-300 text-sm"
		>
			{children}
		</pre>
	),
	// Allows customizing built-in components, e.g. to add styling.
	img: (props) => (
		<Image
			sizes="100vw"
			width={1280}
			height={720}
			style={{ width: "100%", height: "auto" }}
			{...(props as any)}
		/>
	),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
	return components;
}
