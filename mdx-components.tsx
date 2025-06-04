import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Add custom components here
    img: (props) => (
      <Image
        {...props}
        alt={props.alt || ""}
        width={800}
        height={400}
        className="object-cover w-full rounded-xl aspect-video"
      />
    ),
    a: (props) => <Link {...props} />,
    ...components,
  };
}
