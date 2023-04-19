import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "./ui/Button";
import Link from "next/link";

export default function Projects() {
  return (
    <>
      <div>
        <p className="text-center">Some of my projects</p>
        <div className="text-sm">
          <div className="my-2">
            <a
              href="https://simplyphotos.info"
              target="_blank"
              className="font-semibold"
            >
              <div className="flex justify-between">
                <p className="hover:underline">Simply Photos</p>
                <p className="hover:underline">simplyphotos.info</p>
              </div>
            </a>
            <p>A small photography business in Brisbane.</p>
          </div>
          <div className="my-2">
            <a
              href="https://sdelta.xyz"
              target="_blank"
              className="font-semibold"
            >
              <div className="flex justify-between">
                <p className="hover:underline">Livestream</p>
                <p className="hover:underline">sdelta.xyz</p>
              </div>
            </a>
            <p>
              A neat place to upload personal gaming videos and livestreams.
            </p>
          </div>
        </div>
        <Link href="/projects">
          <Button className="w-full">
            <ArrowUpRightIcon size={18} /> View all projects
          </Button>
        </Link>
      </div>
    </>
  );
}
