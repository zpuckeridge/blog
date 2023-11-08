import { Github, Mail, Rss, Twitter } from "lucide-react";
import { FaDiscord, FaSpotify } from "react-icons/fa6";
import { Button, buttonVariants } from "./ui/button";
import NowPlaying from "./now-playing";
import { Separator } from "./ui/separator";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto w-full space-y-4 font-mono">
      <NowPlaying />
      <Separator />
      <div className="flex justify-between">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          Zacchary Puckeridge
        </Link>

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
