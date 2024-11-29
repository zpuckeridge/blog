import BlurFade from "@/components/magicui/blur-fade";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export default function Work() {
  const projects = [
    {
      name: "Haddon Institute",
      image: "/projects/haddon-institute.avif",
      year: "Present",
    },
    {
      name: "Star Compass",
      image: "/projects/star-compass.avif",
      year: "Present",
    },
    {
      name: "61 Oaks Group",
      image: "/projects/61-oaks-group.avif",
      year: "Present",
    },
    {
      name: "The Armoury Bookshop",
      image: "/projects/the-armoury-bookshop.avif",
      year: "Present",
    },
    { name: "Stand Firm", image: null, year: "2024" },
    { name: "Brisket and Briyani", image: null, year: "2024" },
    { name: "Labu Consulting", image: null, year: "2024" },
    { name: "First Principles", image: null, year: "2024" },
    { name: "South East Psychology", image: null, year: "2024" },
    { name: "ZSU", image: "/projects/zsu.avif", year: "2023" },
    {
      name: "Simply Photos",
      image: "/projects/simply-photos.avif",
      year: "2022",
    },
    { name: "Livestream", image: "/projects/sdelta.avif", year: "2022" },
  ];

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-sm flex flex-col gap-20 pb-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Work</p>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="text-sm leading-relaxed flex flex-col gap-2">
            <p>
              I&apos;ve been a web developer for around 3 years now, creating
              unique marketing, e-commerce and web applications for clients.
              Below is a selection of my work from the last few years.
            </p>
          </div>
        </BlurFade>

        {projects.map((project, index) => (
          <BlurFade key={project.name} delay={0.1 * (index + 3)}>
            <div>
              {project.image ? (
                <Image
                  src={project.image}
                  width={1000}
                  height={1000}
                  priority={index < 4}
                  alt={`${project.name} Showcase`}
                  className="aspect-video border border-muted rounded-xl"
                />
              ) : (
                <div className="aspect-video border border-muted rounded-xl">
                  <div className="h-full flex place-items-center justify-center">
                    <p className="text-center">Image coming soon</p>
                  </div>
                </div>
              )}
              <div className="flex justify-between text-sm pt-2 gap-2">
                <p className="text-nowrap">{project.name}</p>
                <hr className="w-full border-muted my-auto" />
                <p className="text-muted-foreground">{project.year}</p>
              </div>
            </div>
          </BlurFade>
        ))}

        <BlurFade delay={0.1 * (projects.length + 3)}>
          <Link
            href="/"
            className="text-xs text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
          >
            <ArrowLeftIcon className="inline-flex" /> /
          </Link>
        </BlurFade>
      </div>
    </div>
  );
}
