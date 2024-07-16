import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-2">
        <p>
          A Christian IT Administrator working for Rising Sun Pictures. Building
          better artist experiences by day, designing epic Web Experiences by
          night.
        </p>

        <p>
          Building a confessionally Reformed bookstore called The Armoury
          Bookshop and seminary known as the Haddon Institute.
        </p>

        <p>
          <Link
            href="/about"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Read about me
          </Link>{" "}
          or{" "}
          <Link
            href="/work"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            view my work
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
