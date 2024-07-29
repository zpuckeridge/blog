import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-20">
        <div>
          <p>Error - 404</p>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-violet-400"
          >
            <ArrowLeftIcon className="inline-flex" /> /
          </Link>
        </div>

        <Image
          src="/media/404.webp"
          alt="Max Goof sighing and putting his head in his hands"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
}
