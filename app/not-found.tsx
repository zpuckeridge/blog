import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-between px-4 space-y-20 max-w-7xl mx-auto">
      <div>
        <h1 className="text-center text-[40rem] font-bold leading-none tracking-tight uppercase text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
          404
        </h1>
        <h2 className=" text-center text-7xl font-bold leading-none tracking-tight uppercase text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
          Page could not be found
        </h2>
        <div className="flex justify-center">
          <Link
            href="/"
            className={`flex my-10 gap-2 ${buttonVariants({
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
