import { Github, Mail, Rss, Twitter } from "lucide-react";
import { FaDiscord, FaSpotify } from "react-icons/fa6";
import { Button, buttonVariants } from "./ui/button";
import NowPlaying from "./now-playing";
import { Separator } from "./ui/separator";
import Link from "next/link";
import Time from "./time";

export default function Footer() {
  return (
    <footer className="max-w-4xl mx-auto w-full space-y-4 font-mono">
      <NowPlaying />
      <Separator />
      <div className="flex flex-col items-center space-y-4 md:space-y-0 md:flex-row md:justify-between">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Zacchary Puckeridge
        </Link>

        <Time />

        <div className="flex my-auto">
          <Button variant="ghost" size="sm">
            <Rss className="w-4 h-4" />
          </Button>
          <a
            href="mailto:hi@zacchary.me"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://twitter.com/zpuckeridge"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="Twitter"
          >
            <Twitter className="w-4 h-4" />
          </a>
          <a
            href="https://discordapp.com/users/181324210876973056"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="Discord"
          >
            <FaDiscord className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/zpuckeridge"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
            aria-label="Spotify"
          >
            <FaSpotify className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
