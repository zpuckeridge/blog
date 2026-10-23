import type { MDXComponents } from "mdx/types";
import { useContext } from "react";
import type { ReactNode } from "react";
import { Tweet } from "react-tweet";

import AfterQuote from "@/components/after-quote";
import ContentPicture from "@/components/content-picture";
import Definition from "@/components/definition";
import FootnotesNavigation from "@/components/footnotes-navigation";
import LinkWithIcon from "@/components/link-with-icon";
import MdxOverflow from "@/components/mdx-overflow";
import {
  HeadingShiftContext,
  ImageMetaContext,
} from "@/components/mdx-render-context";
import MdxPlayer from "@/components/player";
import SideNote from "@/components/side-note";
import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";
import { imageMetaForSrc, resolveContentImageAlt } from "@/lib/content-image";
import { assetIdFromSrc, toProxiedAssetSrc } from "@/lib/directus-asset";
import { headingIdFromText, shiftedHeadingDepth } from "@/lib/heading-shift";

const textFromChildren = (children: ReactNode): string => {
  if (
    children === null ||
    children === undefined ||
    typeof children === "boolean"
  ) {
    return "";
  }
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map((child) => textFromChildren(child)).join("");
  }
  if (typeof children === "object" && "props" in children) {
    const props = children.props as { children?: ReactNode };
    return textFromChildren(props.children);
  }
  return "";
};

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

const Heading = ({
  children,
  depth,
}: {
  children?: ReactNode;
  depth: number;
}) => {
  const shift = useContext(HeadingShiftContext);
  const level = shiftedHeadingDepth(depth, shift);
  const Tag = `h${level}` as HeadingTag;
  const id = headingIdFromText(textFromChildren(children));
  return <Tag id={id}>{children}</Tag>;
};

const H1 = ({ children }: { children?: ReactNode }) => (
  <Heading depth={1}>{children}</Heading>
);
const H2 = ({ children }: { children?: ReactNode }) => (
  <Heading depth={2}>{children}</Heading>
);
const H3 = ({ children }: { children?: ReactNode }) => (
  <Heading depth={3}>{children}</Heading>
);
const H4 = ({ children }: { children?: ReactNode }) => (
  <Heading depth={4}>{children}</Heading>
);
const H5 = ({ children }: { children?: ReactNode }) => (
  <Heading depth={5}>{children}</Heading>
);
const H6 = ({ children }: { children?: ReactNode }) => (
  <Heading depth={6}>{children}</Heading>
);

const MdxImage = ({
  alt,
  src,
  title,
}: {
  alt?: string;
  src?: string;
  title?: string;
}) => {
  const metas = useContext(ImageMetaContext);
  const resolvedSrc = toProxiedAssetSrc(src ?? "");
  const meta =
    imageMetaForSrc(resolvedSrc, metas) ?? imageMetaForSrc(src ?? "", metas);
  const resolvedAlt = resolveContentImageAlt(alt, meta);
  const assetId = assetIdFromSrc(resolvedSrc);

  if (!assetId) {
    return (
      <ImageZoom wrapElement="span">
        <SiteImage
          alt={resolvedAlt}
          height={720}
          sizes="100vw"
          src={resolvedSrc}
          style={{ height: "auto", width: "100%" }}
          title={title}
          width={1280}
        />
      </ImageZoom>
    );
  }

  return (
    <ImageZoom wrapElement="span">
      <ContentPicture alt={resolvedAlt} assetId={assetId} title={title} />
    </ImageZoom>
  );
};

const components: MDXComponents = {
  AfterQuote,
  Definition,
  Overflow: MdxOverflow,
  Player: (props) => <MdxPlayer {...props} className="my-[2em]" />,
  SideNote,
  Tweet,
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
  img: MdxImage,
  pre: ({ children, ...props }) => (
    <pre
      {...props}
      className="overflow-x-auto whitespace-pre border bg-neutral-50 p-6 font-mono text-black text-sm leading-5 dark:bg-neutral-900 dark:text-neutral-300 [&_code]:whitespace-pre [&_code]:break-normal [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-sm [&_code]:leading-5 [&_code]:text-inherit"
    >
      {children}
    </pre>
  ),
  sideNote: SideNote,
} satisfies MDXComponents;

export { components };
