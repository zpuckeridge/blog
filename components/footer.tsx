import { Github, Mail, Rss, Twitter } from "lucide-react";
import { Separator } from "./ui/separator";
import { FaDiscord, FaSpotify } from "react-icons/fa6";
import { Button } from "./ui/button";
import NowPlaying from "./now-playing";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto w-full space-y-2">
      <NowPlaying />
      <Separator />
      <div className="flex justify-between my-auto">
        <p className="text-sm my-auto">Zacchary Puckeridge</p>

        <div className="flex my-auto">
          <Button variant="ghost" size="sm">
            <Rss className="w-4 h-4" />
          </Button>
          <a href="mailto:hi@zacchary.me">
            <Button variant="ghost" size="sm">
              <Mail className="w-4 h-4" />
            </Button>
          </a>
          <a href="https://twitter.com/zpuckeridge" target="_blank">
            <Button variant="ghost" size="sm">
              <Twitter className="w-4 h-4" />
            </Button>
          </a>
          <a
            href="https://discordapp.com/users/181324210876973056"
            target="_blank"
          >
            <Button variant="ghost" size="sm">
              <FaDiscord className="w-4 h-4" />
            </Button>
          </a>
          <a href="https://github.com/zpuckeridge" target="_blank">
            <Button variant="ghost" size="sm">
              <Github className="w-4 h-4" />
            </Button>
          </a>
          <a
            href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620"
            target="_blank"
          >
            <Button variant="ghost" size="sm">
              <FaSpotify className="w-4 h-4" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  );
}
