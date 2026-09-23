import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
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

const headingIdFromChildren = (children: ReactNode): string =>
  children
    ? children
        .toString()
        .toLowerCase()
        .replaceAll(/[^\w\s-]/gu, "")
        .replaceAll(/\s+/gu, "-")
    : "";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Heading = ({
  children,
  tag: Tag,
}: {
  children?: ReactNode;
  tag: HeadingTag;
}) => {
  const id = headingIdFromChildren(children);
  return <Tag id={id}>{children}</Tag>;
};

const H1 = ({ children }: { children?: ReactNode }) => (
  <Heading tag="h1">{children}</Heading>
);
const H2 = ({ children }: { children?: ReactNode }) => (
  <Heading tag="h2">{children}</Heading>
);
const H3 = ({ children }: { children?: ReactNode }) => (
  <Heading tag="h3">{children}</Heading>
);
const H4 = ({ children }: { children?: ReactNode }) => (
  <Heading tag="h4">{children}</Heading>
);
const H5 = ({ children }: { children?: ReactNode }) => (
  <Heading tag="h5">{children}</Heading>
);
const H6 = ({ children }: { children?: ReactNode }) => (
  <Heading tag="h6">{children}</Heading>
);

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
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
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
      className="overflow-x-auto whitespace-pre border bg-neutral-50 p-6 font-mono text-black text-sm dark:bg-neutral-900 dark:text-neutral-300 [&_code]:whitespace-pre [&_code]:break-normal [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-inherit"
    >
      {children}
    </pre>
  ),
  sideNote: SideNote,
} satisfies MDXComponents;

export { components };
