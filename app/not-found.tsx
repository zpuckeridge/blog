import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-20">
        <div>
          <p>Error - 404</p>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-white"
          >
            <ArrowLeftIcon className="inline-flex" /> /
          </Link>
        </div>
      </div>
    </div>
  );
}
