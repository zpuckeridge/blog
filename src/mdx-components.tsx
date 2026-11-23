import type { MDXComponents } from "mdx/types";
import { useContext } from "react";
import type {
  ComponentProps,
  CSSProperties,
  MouseEvent,
  ReactNode,
} from "react";
import { Tweet } from "react-tweet";
import { toast } from "sonner";

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
import MdxPlayer, {
  DeferredMuxFrame,
  ExternalIframe,
} from "@/components/player";
import SideNote from "@/components/side-note";
import SiteImage from "@/components/site-image";
import { ImageZoom } from "@/components/zoom-image";
import { imageMetaForSrc, resolveContentImageAlt } from "@/lib/content-image";
import {
  assetIdFromSrc,
  CONTENT_IMAGE_SIZES,
  directusContentSrcSet,
  toProxiedAssetSrc,
} from "@/lib/directus-asset";
import { isFootnoteHref } from "@/lib/footnotes";
import {
  headingIdFromText,
  headingShiftForDepth,
  shiftedHeadingDepth,
} from "@/lib/heading-shift";
import { cn } from "@/lib/utils";
import { describeMuxElement, describeMuxEmbed } from "@/lib/video-source";

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

const isPlainClick = (event: MouseEvent<HTMLAnchorElement>): boolean =>
  event.button === 0 &&
  !event.altKey &&
  !event.ctrlKey &&
  !event.metaKey &&
  !event.shiftKey;

const hasTextSelection = (): boolean => {
  const selection = window.getSelection();
  return Boolean(selection && !selection.isCollapsed && selection.toString());
};

const copyHeadingLink = async (id: string): Promise<void> => {
  const url = new URL(window.location.href);
  url.hash = id;
  const top = window.scrollY;
  window.history.replaceState(window.history.state, "", url);
  if (window.scrollY !== top) {
    window.scrollTo(0, top);
  }
  await navigator.clipboard.writeText(url.href);
};

const Heading = ({
  children,
  depth,
}: {
  children?: ReactNode;
  depth: number;
}) => {
  const firstHeadingDepth = useContext(HeadingShiftContext);
  const shift = headingShiftForDepth(depth, firstHeadingDepth);
  const level = shiftedHeadingDepth(depth, shift);
  const Tag = `h${level}` as HeadingTag;
  const id = headingIdFromText(textFromChildren(children));
  const preserveMarkdownDepth = shift !== 0;

  if (!id) {
    return (
      <Tag
        {...(preserveMarkdownDepth
          ? { "data-md-depth": String(depth) }
          : undefined)}
      >
        {children}
      </Tag>
    );
  }

  const onCopy = async () => {
    try {
      await copyHeadingLink(id);
      toast.success("URL Copied!");
    } catch {
      toast.error("Could not copy");
    }
  };

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!isPlainClick(event) || hasTextSelection()) {
      return;
    }

    event.preventDefault();
    void onCopy();
  };

  return (
    <Tag
      {...(preserveMarkdownDepth
        ? { "data-md-depth": String(depth) }
        : undefined)}
      id={id}
    >
      <a className="heading-link" href={`#${id}`} onClick={onClick}>
        {children}
      </a>
    </Tag>
  );
};

const heading = (depth: number) => {
  const HeadingLevel = ({ children }: { children?: ReactNode }) => (
    <Heading depth={depth}>{children}</Heading>
  );
  HeadingLevel.displayName = `H${depth}`;
  return HeadingLevel;
};

const H1 = heading(1);
const H2 = heading(2);
const H3 = heading(3);
const H4 = heading(4);
const H5 = heading(5);
const H6 = heading(6);

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
          sizes={CONTENT_IMAGE_SIZES}
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
      <ContentPicture
        alt={resolvedAlt}
        assetId={assetId}
        sizes={CONTENT_IMAGE_SIZES}
        srcSet={directusContentSrcSet(assetId, "webp")}
        title={title}
      />
    </ImageZoom>
  );
};

const stringProp = (value: unknown): string | null =>
  typeof value === "string" && value.trim() ? value : null;

const fillsParent = (
  className: string | undefined,
  style: CSSProperties | undefined
): boolean => {
  if (className?.includes("absolute") || className?.includes("inset-0")) {
    return true;
  }

  return style?.position === "absolute";
};

const MdxIframe = ({
  className,
  src,
  style,
  title,
  ...props
}: ComponentProps<"iframe">) => {
  const source = typeof src === "string" ? src : "";
  const embed = describeMuxEmbed(source);
  if (!embed) {
    return (
      <ExternalIframe
        className={className}
        src={src}
        style={style}
        title={title}
        {...props}
      />
    );
  }

  const titled = {
    ...embed,
    title: typeof title === "string" ? title : embed.title,
  };

  if (fillsParent(className, style)) {
    return (
      <div className={cn("bg-neutral-950", className)} style={style}>
        <DeferredMuxFrame
          className="absolute inset-0 size-full"
          embed={titled}
        />
      </div>
    );
  }

  return (
    <DeferredMuxFrame className={cn("my-[2em]", className)} embed={titled} />
  );
};

const MdxVideo = ({
  autoPlay,
  className,
  controls,
  loop,
  muted,
  poster,
  src,
  style,
  title,
  ...props
}: ComponentProps<"video">) => {
  const source = typeof src === "string" ? src : "";
  const embed = describeMuxElement({
    autoplay: autoPlay,
    controls,
    kind: "video",
    loop,
    muted,
    poster: typeof poster === "string" ? poster : null,
    src: source,
    style,
    title: typeof title === "string" ? title : null,
  });

  if (!embed) {
    return (
      // oxlint-disable-next-line jsx-a11y/media-has-caption -- existing MDX video, captions stay with the source
      <video
        autoPlay={autoPlay}
        className={className}
        controls={controls}
        loop={loop}
        muted={muted}
        poster={poster}
        src={src}
        style={style}
        title={title}
        {...props}
      />
    );
  }

  return (
    <DeferredMuxFrame className={cn("my-[2em]", className)} embed={embed} />
  );
};

const MdxMuxPlayer = (props: Record<string, unknown>) => {
  const { style } = props;
  const embed = describeMuxElement({
    autoplay: props.autoplay ?? props.autoPlay,
    controls: props.controls,
    kind: "mux-player",
    loop: props.loop,
    muted: props.muted,
    playbackId:
      stringProp(props["playback-id"]) ?? stringProp(props.playbackId),
    poster: stringProp(props.poster),
    src: stringProp(props.src),
    style,
    title: stringProp(props.title) ?? stringProp(props["metadata-video-title"]),
  });

  if (!embed) {
    return null;
  }

  return <DeferredMuxFrame className="my-[2em]" embed={embed} />;
};

const components = {
  AfterQuote,
  Definition,
  Overflow: MdxOverflow,
  Player: (props) => <MdxPlayer {...props} className="my-[2em]" deferMux />,
  iframe: MdxIframe,
  "mux-player": MdxMuxPlayer,
  SideNote,
  Tweet,
  a: ({ href = "", children, ...props }) => {
    if (isFootnoteHref(href)) {
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
  div: ({ className, children, ...props }) => (
    <div className={className} {...props}>
      {children}
    </div>
  ),
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  img: MdxImage,
  video: MdxVideo,
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
