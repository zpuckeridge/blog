import { Github, Mail, Rss, Twitter } from "lucide-react";
import { Separator } from "./ui/separator";
import { siteConfig } from "@/config/site";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto w-full">
      <Separator />
      <div className="flex justify-between my-2">
        <p>{siteConfig.name}</p>
        <div className="flex space-x-2">
          <Rss className="w-4 h-4" />
          <Mail className="w-4 h-4" />
          <Github className="w-4 h-4" />
          <Twitter className="w-4 h-4" />
        </div>
      </div>
    </footer>
  );
}
