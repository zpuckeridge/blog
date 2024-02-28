import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const runtime = "edge";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 space-y-20 max-w-7xl mx-auto">
      <div className="text-center space-y-8">
        <div>
          <h1 className="xl:text-[40rem] lg:text-[30rem] text-[10rem] font-bold leading-none tracking-tight uppercase text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            404
          </h1>
          <h2 className="text-7xl font-bold leading-none tracking-tight uppercase text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            Page could not be found
          </h2>
        </div>
        <div className="flex justify-center">
          <Link
            href="/"
            className={`flex gap-2 ${buttonVariants({
              variant: "outline",
              size: "lg",
            })}`}
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
