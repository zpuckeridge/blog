import { ArrowUpRightIcon, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Contact() {
  return (
    <>
      <p className="text-center mb-4">Where you can find me 👇</p>
      <div className="grid grid-cols-2 gap-2">
        <a href="https://github.com/zpuckeridge">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> GitHub
          </Button>
        </a>
        <a href="https://open.spotify.com/user/oid25p8bf0jm4zfezkf765o03?si=f67b4f43e7fa4620">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> Spotify
          </Button>
        </a>
        <a href="https://www.linkedin.com/in/zpuckeridge">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> LinkedIn
          </Button>
        </a>
        <a href="https://discordapp.com/users/181324210876973056">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> Discord
          </Button>
        </a>
        <a href="https://steamcommunity.com/id/sdelta_/">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> Steam
          </Button>
        </a>
        <a href="https://twitter.com/zpuckeridge/">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> Twitter
          </Button>
        </a>
        <a className="col-span-full">
          <Button className="w-full">
            <Mail size={18} className="mr-1" /> Email
          </Button>
        </a>
      </div>
    </>
  );
}
