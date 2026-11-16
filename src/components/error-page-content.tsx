import type { ReactNode } from "react";
import { RxArrowLeft } from "react-icons/rx";

import SiteImage from "@/components/site-image";

interface ErrorPageContentProps {
  code: string;
  message: string;
  title: string;
  extra?: ReactNode;
}

const ErrorPageContent = ({
  code,
  extra,
  message,
  title,
}: ErrorPageContentProps) => (
  <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-6 lg:pb-20">
    <div className="flex flex-col gap-y-20 text-sm">
      <div className="space-y-10">
        <div className="space-y-2">
          <h1 className="font-redaction text-black text-xl dark:text-white">
            {title} ({code})
          </h1>
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>

        <SiteImage
          alt="Max Goof sighing and putting his head in his hands"
          className=""
          height={500}
          priority
          quality={100}
          src="/media/404.webp"
          unoptimized
          width={500}
        />
        {extra}
      </div>

      <a
        aria-label="Back to home"
        className="text-muted-foreground text-sm transition hover:text-blue-400 dark:hover:text-blue-600"
        href="/"
      >
        <RxArrowLeft className="inline-flex" /> /
      </a>
    </div>
  </div>
);

export default ErrorPageContent;
