import {
  ArrowDownIcon,
  ArrowTopRightIcon,
  DrawingPinFilledIcon,
} from "@radix-ui/react-icons";
import Image from "next/image";

export default function ShowcaseSection() {
  return (
    <div className="space-y-28">
      <div className="md:flex space-y-4 md:space-y-0 gap-12">
        <div className="md:w-1/2 space-y-2">
          <div className="max-h-[450px] overflow-y-auto border-2 rounded-lg scrollbar-hide relative">
            <Image
              src="/showcase/haddon-institute.png"
              width={1000}
              height={1000}
              priority
              quality={100}
              alt="Haddon Institute Showcase"
            />
            <div className="absolute bottom-2 right-2 ">
              <div className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm relative">
                Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
                <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-mono uppercase">
            <DrawingPinFilledIcon className="inline-block w-4 h-4" /> Mount
            Gravatt, Brisbane
          </p>
        </div>
        <div className="space-y-6 md:w-1/2 my-auto">
          <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            Haddon Institute
          </h1>
          <p className="text-lg">
            The Haddon Institute is phase one of a much loftier project to
            create a seminary. This website lays the ground work for the future
            of the seminary.
          </p>
          <div className="p-4 bg-neutral-900 border-2 rounded-lg">
            <ul className="grid grid-cols-1 md:grid-cols-3">
              <li>Next.JS</li>
              <li>Framer Motion</li>
              <li>Mux</li>
              <li>Blocknotes</li>
              <li>Radix UI</li>
              <li>shadcn/ui</li>
              <li>Tailwind CSS</li>
              <li>Clerk</li>
              <li>Stripe</li>
              <li>Prisma</li>
            </ul>
          </div>
          <div>
            <a
              href="https://haddoninstitute.org"
              target="_blank"
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm"
            >
              View Website{" "}
              <ArrowTopRightIcon className="inline-block w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="md:flex space-y-4 md:space-y-0 gap-12">
        <div className="space-y-6 md:w-1/2 my-auto">
          <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            <div>Star</div>
            <div>Compass</div>
          </h1>
          <p className="text-lg">
            Star Compass is a missional South-East Queensland based disability
            support work organisation providing services to its local community.
          </p>
          <div className="p-4 bg-neutral-900 border-2 rounded-lg">
            <ul className="grid grid-cols-1 md:grid-cols-3">
              <li>Next.JS</li>
              <li>Framer Motion</li>
              <li>Radix UI</li>
              <li>shadcn/ui</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <a
              href="https://starcompass.com.au"
              target="_blank"
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm"
            >
              View Website{" "}
              <ArrowTopRightIcon className="inline-block w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 space-y-2">
          <div className="max-h-[450px] overflow-y-auto border-2 rounded-lg scrollbar-hide relative">
            <Image
              src="/showcase/star-compass.png"
              width={1000}
              height={1000}
              priority
              quality={100}
              alt="Star Compass Showcase"
            />
            <div className="absolute bottom-2 right-2 ">
              <div className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm relative">
                Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
                <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-mono uppercase">
            <DrawingPinFilledIcon className="inline-block w-4 h-4" /> Mount
            Gravatt, Brisbane
          </p>
        </div>
      </div>

      <div className="md:flex space-y-4 md:space-y-0 gap-12">
        <div className="md:w-1/2 space-y-2">
          <div className="max-h-[450px] overflow-y-auto border-2 rounded-lg scrollbar-hide relative">
            <Image
              src="/showcase/the-armoury-bookshop.png"
              width={1000}
              height={1000}
              priority
              quality={100}
              alt="The Armoury Bookshop Showcase"
            />
            <div className="absolute bottom-2 right-2 ">
              <div className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm relative">
                Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
                <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-mono uppercase">
            <DrawingPinFilledIcon className="inline-block w-4 h-4" /> Mount
            Gravatt, Brisbane
          </p>
        </div>
        <div className="space-y-6 md:w-1/2 my-auto">
          <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            Armoury Bookshop
          </h1>
          <p className="text-lg">
            The Armoury Bookshop is a Christian Reformed Bookshop based in
            Brisbane, Australia. Specialising in rare and out-of-print titles.
          </p>
          <div className="p-4 bg-neutral-900 border-2 rounded-lg">
            <ul className="grid grid-cols-1 md:grid-cols-3">
              <li>Next.JS</li>
              <li>Shopify</li>
              <li>Radix UI</li>
              <li>shadcn/ui</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <a
              href="https://thearmourybookshop.com.au"
              target="_blank"
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm"
            >
              View Website{" "}
              <ArrowTopRightIcon className="inline-block w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="md:flex space-y-4 md:space-y-0 gap-12">
        <div className="space-y-6 md:w-1/2 my-auto">
          <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            <div>61 Oaks Group</div>
          </h1>
          <p className="text-lg">
            61 Oaks Group is a cohort of companies that participate in God’s
            work in the marketplace. The downstream impacts of the gospel
            include an experiential understanding and application of our
            theology of business and therefore the interaction with each other
            in the economy of products and services.
          </p>
          <div className="p-4 bg-neutral-900 border-2 rounded-lg">
            <ul className="grid grid-cols-1 md:grid-cols-3">
              <li>Next.JS</li>
              <li>Framer Motion</li>
              <li>Radix UI</li>
              <li>shadcn/ui</li>
              <li>Tailwind CSS</li>
              <li>Ghost</li>
              <li>Clerk</li>
            </ul>
          </div>
          <div>
            <a
              href="https://61oaksgroup.com.au"
              target="_blank"
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm"
            >
              View Website{" "}
              <ArrowTopRightIcon className="inline-block w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 space-y-2">
          <div className="max-h-[450px] overflow-y-auto border-2 rounded-lg scrollbar-hide relative">
            <Image
              src="/showcase/61-oaks-group.png"
              width={1000}
              height={1000}
              priority
              quality={100}
              alt="61 Oaks Group Showcase"
            />
            <div className="absolute bottom-2 right-2 ">
              <div className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm relative">
                Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
                <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-mono uppercase">
            <DrawingPinFilledIcon className="inline-block w-4 h-4" /> Mount
            Gravatt, Brisbane
          </p>
        </div>
      </div>

      <div className="md:flex space-y-4 md:space-y-0 gap-12">
        <div className="md:w-1/2 space-y-2">
          <div className="max-h-[450px] overflow-y-auto border-2 rounded-lg scrollbar-hide relative">
            <Image
              src="/showcase/livestream.png"
              width={1000}
              height={1000}
              priority
              quality={100}
              alt="Clip Sharing Platform Showcase"
            />
            <div className="absolute bottom-2 right-2 ">
              <div className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm relative">
                Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
                <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-mono uppercase">
            <DrawingPinFilledIcon className="inline-block w-4 h-4" /> Brisbane
          </p>
        </div>
        <div className="space-y-6 md:w-1/2 my-auto">
          <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            <div>Clip Sharing</div>
            <div>Platform</div>
          </h1>
          <p className="text-lg">
            A video sharing site built with Next.JS, Planetscale, Prisma, Mux,
            and Tailwind CSS hosted on Vercel.
          </p>
          <div className="p-4 bg-neutral-900 border-2 rounded-lg">
            <ul className="grid grid-cols-1 md:grid-cols-3">
              <li>Next.JS</li>
              <li>Planetscale</li>
              <li>Prisma</li>
              <li>Radix UI</li>
              <li>shadcn/ui</li>
              <li>Tailwind CSS</li>
              <li>Mux</li>
              <li>Clerk</li>
            </ul>
          </div>
          <div>
            <a
              href="https://sdelta.xyz"
              target="_blank"
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm"
            >
              View Website{" "}
              <ArrowTopRightIcon className="inline-block w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="md:flex space-y-4 md:space-y-0 gap-12">
        <div className="space-y-6 md:w-1/2 my-auto">
          <h1 className="md:text-7xl sm:text-6xl text-5xl uppercase font-bold leading-none tracking-tight text-black dark:text-transparent bg-clip-text bg-gradient-to-b dark:from-[#ffffff] from-10% dark:to-muted">
            <div>Simply</div>
            <div>Photos</div>
          </h1>
          <p className="text-lg">
            Simply Photos is a Brisbane based photography company that
            specialises in capturing premium photos for their clients every
            need.
          </p>
          <div className="p-4 bg-neutral-900 border-2 rounded-lg">
            <ul className="grid grid-cols-1 md:grid-cols-3">
              <li>Next.JS</li>
              <li>Tailwind CSS</li>
            </ul>
          </div>
          <div>
            <a
              href="https://simplyphotos.info"
              target="_blank"
              className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm"
            >
              View Website{" "}
              <ArrowTopRightIcon className="inline-block w-4 h-4" />
            </a>
          </div>
        </div>
        <div className="md:w-1/2 space-y-2">
          <div className="max-h-[450px] overflow-y-auto border-2 rounded-lg scrollbar-hide relative">
            <Image
              src="/showcase/simply-photos.png"
              width={1000}
              priority
              quality={100}
              height={1000}
              alt="Simply Photos Showcase"
            />
            <div className="absolute bottom-2 right-2 ">
              <div className="px-2 py-1 bg-neutral-900 hover:bg-neutral-800 transition-all duration-200 border-2 text-white font-mono uppercase tracking-tight leading-none text-sm relative">
                Scroll Down <ArrowDownIcon className="inline-block w-4 h-4" />
                <div className="h-2 w-2 rounded-full bg-white animate-ping absolute -top-1 -right-1"></div>
              </div>
            </div>
          </div>
          <p className="text-xs font-mono uppercase">
            <DrawingPinFilledIcon className="inline-block w-4 h-4" /> Toowong,
            Brisbane
          </p>
        </div>
      </div>
    </div>
  );
}
