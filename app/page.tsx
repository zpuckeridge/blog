import CallToFaith from "@/components/call-to-faith";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-md lg:mx-auto flex flex-col gap-20 pb-20">
      <div className="text-sm flex flex-col gap-2">
        <p className="font-serif text-2xl italic ">
          Christian IT Administrator working for Rising Sun Pictures. Building
          better artist experiences by day, designing epic web experiences by
          night.
        </p>

        <div className="flex justify-between gap-2">
          <p className="text-xs text-nowrap">
            &copy; {new Date().getFullYear()} Zacchary Puckeridge
          </p>
          <hr className="w-full border-muted my-auto" />
        </div>
      </div>

      <div className="text-sm flex flex-col gap-2">
        <p>
          I currently lead web development with the{" "}
          <a
            href="https://61oaksgroup.com.au?ref=zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            61 Oaks Group
          </a>{" "}
          team for a seminary known as the{" "}
          <a
            href="https://haddoninstitute.org?ref=zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Haddon Institute
          </a>
          ,{" "}
          <a
            href="https://thearmourybookshop.com.au?ref=zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            The Armoury Bookshop
          </a>
          , and{" "}
          <a
            href="https://starcompass.com.au?ref=zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Star Compass
          </a>
          , a disability support service for the Brisbane area.
        </p>

        <p>
          During the day, I work as an IT Administrator for{" "}
          <a
            href="https://rsp.com.au?ref=zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Rising Sun Pictures
          </a>{" "}
          dealing with a variety of issues and ensuring the lights stay on.
        </p>

        <p>
          I have limited availability but am open to hearing about your project.
          If you're looking for a web developer, please feel free to reach out
          via{" "}
          <a
            href="mailto:hi@zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            email
          </a>{" "}
          or book a{" "}
          <a
            href="https://cal.com/zpuckeridge?ref=zacchary.me"
            target="_blank"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            call
          </a>
          .
        </p>

        <p>
          <Link
            href="/about"
            className="underline hover:text-muted-foreground hover:no-underline decoration-dotted underline-offset-2"
          >
            Read more about me
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

      {/*<div className="text-sm flex flex-col gap-2">
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

      <Image
        src="/media/haddon-institute-gang.avif"
        alt="Haddon Institute Gang"
        width={500}
        height={500}
      /> */}

      <CallToFaith />
      {/* <Tweet id="1810556043329683955" /> */}
    </div>
  );
}
