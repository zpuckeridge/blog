import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto flex flex-col gap-20 pb-20">
      <div className="text-sm flex flex-col gap-20">
        <div>
          <p>Error — 404</p>
          <p className="text-muted-foreground text-xs">
            Page could not be found.
          </p>
        </div>

        <Image
          src="/media/404.webp"
          alt="Max Goof sighing and putting his head in his hands"
          width={500}
          quality={100}
          priority
          unoptimized
          className="rounded-xl"
          height={500}
        />

        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
        >
          <ArrowLeftIcon className="inline-flex" /> /
        </Link>
      </div>
    </div>
  );
}
