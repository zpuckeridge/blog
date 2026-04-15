import { RxArrowLeft } from "react-icons/rx";

import SiteImage from "@/components/site-image";

export default function NotFoundContent() {
  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 py-6 lg:py-20">
      <div className="flex flex-col space-y-20 text-sm">
        <div>
          <p>Error — 404</p>
          <p className="text-muted-foreground text-xs">
            Page could not be found.
          </p>
        </div>

        <SiteImage
          alt="Max Goof sighing and putting his head in his hands"
          className="rounded-xl"
          height={500}
          priority
          quality={100}
          src="/media/404.webp"
          unoptimized
          width={500}
        />

        <a
          className="text-muted-foreground text-xs transition hover:text-blue-400 dark:hover:text-blue-600"
          href="/"
        >
          <RxArrowLeft className="inline-flex" /> /
        </a>
      </div>
    </div>
  );
}
