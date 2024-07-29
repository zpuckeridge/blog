import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Work() {
  return (
    <div className="max-w-md lg:mx-auto">
      <div className="text-sm flex flex-col gap-20 pb-20">
        <div className="text-sm flex flex-col gap-2">
          <p className="font-serif text-2xl italic ">Work</p>

          <p>
            I've been a web developer for around 3 years now, creating unique
            marketing, e-commerce and web applications for clients. Below is a
            selection of my work from the last few years.
          </p>
        </div>

        <div>
          <Image
            src="/projects/haddon-institute.avif"
            width={1000}
            height={1000}
            priority
            alt="Haddon Institute Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Haddon Institute</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">Present</p>
          </div>
        </div>

        <div>
          <Image
            src="/projects/star-compass.avif"
            width={1000}
            height={1000}
            priority
            alt="Star Compass Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Star Compass</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">Present</p>
          </div>
        </div>

        <div>
          <Image
            src="/projects/61-oaks-group.avif"
            width={1000}
            height={1000}
            priority
            alt="61 Oaks Group Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">61 Oaks Group</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">Present</p>
          </div>
        </div>

        <div>
          <Image
            src="/projects/the-armoury-bookshop.avif"
            width={1000}
            height={1000}
            alt="The Armoury Bookshop Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">The Armoury Bookshop</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">Present</p>
          </div>
        </div>

        <div>
          {/* <Image
            src="/projects/stand-firm.avif"
            width={1000}
            height={1000}
            alt="Stand Firm Showcase"
            className="aspect-video border border-muted"
          /> */}

          <div className="aspect-video border border-muted">
            <div className="h-full flex place-items-center justify-center">
              <p className="text-center">Image coming soon</p>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Stand Firm</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2024</p>
          </div>
        </div>

        <div>
          {/* <Image
            src="/projects/brisket-and-briyani.avif"
            width={1000}
            height={1000}
            alt="Brisket and Briyani Showcase"
            className="aspect-video border border-muted"
          /> */}
          <div className="aspect-video border border-muted">
            <div className="h-full flex place-items-center justify-center">
              <p className="text-center">Image coming soon</p>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Brisket and Briyani</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2024</p>
          </div>
        </div>

        <div>
          {/* <Image
            src="/projects/labu-consulting.avif"
            width={1000}
            height={1000}
            alt="Labu Consulting Showcase"
            className="aspect-video border border-muted"
          /> */}
          <div className="aspect-video border border-muted">
            <div className="h-full flex place-items-center justify-center">
              <p className="text-center">Image coming soon</p>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Labu Consulting</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2024</p>
          </div>
        </div>

        <div>
          {/* <Image
            src="/projects/first-principles.avif"
            width={1000}
            height={1000}
            alt="First Principles Showcase"
            className="aspect-video border border-muted"
          /> */}
          <div className="aspect-video border border-muted">
            <div className="h-full flex place-items-center justify-center">
              <p className="text-center">Image coming soon</p>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">First Principles</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2024</p>
          </div>
        </div>

        <div>
          {/* <Image
            src="/projects/south-east-psychology.avif"
            width={1000}
            height={1000}
            alt="South East Psychology Showcase"
            className="aspect-video border border-muted"
          /> */}
          <div className="aspect-video border border-muted">
            <div className="h-full flex place-items-center justify-center">
              <p className="text-center">Image coming soon</p>
            </div>
          </div>
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">South East Psychology</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2024</p>
          </div>
        </div>

        <div>
          <Image
            src="/projects/zsu.avif"
            width={1000}
            height={1000}
            alt="ZSU Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">ZSU</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2023</p>
          </div>
        </div>

        <div>
          <Image
            src="/projects/simply-photos.avif"
            width={1000}
            height={1000}
            alt="Simply Photos Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Simply Photos</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2022</p>
          </div>
        </div>

        <div>
          <Image
            src="/projects/sdelta.avif"
            width={1000}
            height={1000}
            alt="sdelta Showcase"
            className="aspect-video border border-muted"
          />
          <div className="flex justify-between text-sm pt-2 gap-2">
            <p className="text-nowrap">Livestream</p>
            <hr className="w-full border-muted my-auto" />
            <p className="text-muted-foreground">2022</p>
          </div>
        </div>

        <Link
          href="/"
          className="text-xs text-muted-foreground hover:text-violet-400"
        >
          <ArrowLeftIcon className="inline-flex" /> /
        </Link>
      </div>
    </div>
  );
}
