import Link from "next/link";
import { Tweet } from "react-tweet";

export default function Home() {
  return (
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
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

      <Tweet id="1810556043329683955" />

      <div className="text-sm flex flex-col gap-2">
        <div className="flex justify-between">
          <p className="text-cyan-800">Haddon Institute</p>
          <p className="text-cyan-800">#ad</p>
        </div>
        <p className="text-cyan-500">
          Our vision is to see the Australian Church fear and behold the majesty
          of the Lord Jesus Christ in all of His offices, through all of His
          means, to the end of His glory from generation to generation.
        </p>
        <p className="text-cyan-500">
          Check out the classes and sign up on{" "}
          <a
            href="https://haddoninstitute.org"
            target="_blank"
            className="underline hover:no-underline decoration-dotted underline-offset-2"
          >
            haddoninstitute.org
          </a>
          .
        </p>
      </div>
    </div>
  );
}
