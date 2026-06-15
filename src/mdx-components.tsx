import type { MDXComponents } from "mdx/types";
import { Tweet } from "react-tweet";

import "@/styles/code-fonts.css";

import AfterQuote from "@/components/after-quote";
import Definition from "@/components/definition";
import FootnotesNavigation from "@/components/footnotes-navigation";
import LinkWithIcon from "@/components/link-with-icon";
import MdxOverflow from "@/components/mdx-overflow";
import MdxPlayer from "@/components/player";
import SideNote from "@/components/side-note";
import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";

const components: MDXComponents = {
  AfterQuote,
  Definition,
  Overflow: MdxOverflow,
  Player: (props) => <MdxPlayer {...props} className="my-[2em]" />,
  SideNote,
  Tweet,
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
  afterQuote: AfterQuote,
  definition: Definition,
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
          .replaceAll(/[^\w\s-]/gu, "")
          .replaceAll(/\s+/gu, "-")
      : "";
    return <h1 id={id}>{children}</h1>;
  },
  h2: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replaceAll(/[^\w\s-]/gu, "")
          .replaceAll(/\s+/gu, "-")
      : "";
    return <h2 id={id}>{children}</h2>;
  },
  h3: ({ children }) => {
    const id = children
      ? children
          .toString()
          .toLowerCase()
          .replaceAll(/[^\w\s-]/gu, "")
          .replaceAll(/\s+/gu, "-")
      : "";
    return <h3 id={id}>{children}</h3>;
  },
  img: (props: { src: string; alt: string; title?: string }) => (
    <ImageZoom wrapElement="span">
      <SiteImage
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
      className="overflow-auto border bg-neutral-50 p-6 font-mono text-black text-sm dark:bg-neutral-900 dark:text-neutral-300"
    >
      {children}
    </pre>
  ),
  sideNote: SideNote,
} satisfies MDXComponents;

export { components };
