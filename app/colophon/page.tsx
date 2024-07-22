import Link from "next/link";

export default function Colophon() {
  return (
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
      <div className="text-sm flex flex-col gap-2">
        <p>
          This blog is built using the power of Next.js, a React framework that
          allows for building fast and user-friendly static and server-rendered
          applications.
        </p>
        <p>
          The styling is provided by a combination of Tailwind CSS, which allows
          for rapid building of custom designs, and custom CSS for unique
          stylings.
        </p>
        <p>
          Content is written in Markdown and enhanced with MDX to mix JavaScript
          and Markdown content, offering the flexibility to embed interactive
          components like Tweets, videos, and more.
        </p>
        <p>
          All code for this blog is hosted on{" "}
          <a
            href="https://github.com"
            target="_blank"
            className="underline hover:no-underline decoration-dotted underline-offset-2"
          >
            GitHub
          </a>
          , making it easy to manage versions and collaborate with others.
        </p>
        <p>
          Want to get in touch?{" "}
          <Link
            href="/contact"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Contact me
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
