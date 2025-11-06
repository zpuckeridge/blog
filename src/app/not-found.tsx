import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 py-6 lg:py-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div>
          <p>Error — 404</p>
          <p className="text-muted-foreground text-xs">
            Page could not be found.
          </p>
        </div>

        <Image
          alt="Max Goof sighing and putting his head in his hands"
          className="rounded-xl"
          height={500}
          priority
          quality={100}
          src="/media/404.webp"
          unoptimized
          width={500}
        />

        <Link
          className="text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
          href="/"
        >
          <ArrowLeftIcon className="inline-flex" /> /
        </Link>
      </div>
    </div>
  );
}
