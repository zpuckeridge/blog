import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Tweet } from "react-tweet";

import AfterQuote from "@/components/after-quote";
import Definition from "@/components/definition";
import FootnotesNavigation from "@/components/footnotes-navigation";
import LinkWithIcon from "@/components/link-with-icon";
import Player from "@/components/player";
import SideNote from "@/components/side-note";
import { ImageZoom } from "@/components/zoom-image";

const components: MDXComponents = {
  AfterQuote: ({
    text,
    subtext,
    link,
  }: {
    text: string;
    subtext?: string;
    link?: string;
  }) => <AfterQuote link={link} subtext={subtext} text={text} />,
  Definition: ({
    word,
    meaning,
    type,
  }: {
    word: string;
    meaning: string;
    type?: string | undefined;
  }) => <Definition meaning={meaning} type={type} word={word} />,
  Overflow: ({ children }: { children: React.ReactNode }) => (
    <div className="w-full">
      <div style={{ width: "800px" }}>
        <div className="flex w-full gap-2 pb-4">{children}</div>
      </div>
    </div>
  ),
  Player: ({ src }: { title: string; src: string }) => <Player src={src} />,
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
  Tweet: ({ id }: { id: string }) => <Tweet id={id} />,
  // Map custom HTML tags to components
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
  afterQuote: ({
    text,
    subtext,
    link,
  }: {
    text: string;
    subtext?: string;
    link?: string;
  }) => <AfterQuote link={link} subtext={subtext} text={text} />,
  definition: ({
    word,
    meaning,
    type,
  }: {
    word: string;
    meaning: string;
    type?: string;
  }) => <Definition meaning={meaning} type={type} word={word} />,
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
  h1: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replaceAll(/[^\w\s-]/g, "")
          .replaceAll(/\s+/g, "-")
      : "";
    return <h1 id={id}>{children}</h1>;
  },
  h2: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replaceAll(/[^\w\s-]/g, "")
          .replaceAll(/\s+/g, "-")
      : "";
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replaceAll(/[^\w\s-]/g, "")
          .replaceAll(/\s+/g, "-")
      : "";
    return <h3 id={id}>{children}</h3>;
  },
  img: (props: { src: string; alt: string; title?: string }) => (
    <ImageZoom>
      <Image
        height={720}
        sizes="100vw"
        style={{ height: "auto", width: "100%" }}
        width={1280}
        {...props}
      />
    </ImageZoom>
  ),
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="overflow-auto rounded-xl border bg-neutral-50 p-6 font-mono text-black text-sm dark:bg-neutral-900 dark:text-neutral-300"
    >
      {children}
    </pre>
  ),
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
} satisfies MDXComponents;

export const useMDXComponents = (): MDXComponents => components;
export { components };
