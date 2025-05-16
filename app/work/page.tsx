"use client";

import AnimatedGradientText from "@/components/animated-gradient-text";
import BlurFade from "@/components/magicui/blur-fade";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function Work() {
  const [isAnyProjectHovered, setIsAnyProjectHovered] = useState(false);

  const projects = [
    {
      name: "Finau Sanga Law & Consulting Group",
      image: null,
      year: "2025",
      link: "https://fslcg.com.sb",
    },
    {
      name: "Harbour of Hope",
      image: null,
      year: "2025",
      link: "https://hoh.starcompass.com.au",
    },
    {
      name: "Wayfinding Foundation",
      image: null,
      year: "2025",
      link: "https://wayfinding.foundation",
    },
    {
      name: "United Party",
      image: null,
      year: "2025",
      link: "https://unitedparty.com.sb",
    },
    {
      name: "Labu Consulting",
      image: null,
      year: "2025",
      link: "https://labuconsulting.org",
    },
    {
      name: "Haddon Institute",
      image: "/projects/haddon-institute.avif",
      year: "2025",
      link: "https://haddoninstitute.org",
    },
    {
      name: "Star Compass",
      image: "/projects/star-compass.avif",
      year: "2025",
      link: "https://starcompass.com.au",
    },

    {
      name: "61 Oaks Group",
      image: null,
      year: "2024",
      link: "https://61oaksgroup.org",
    },

    {
      name: "Canopy 72",
      image: null,
      year: "Present",
      status: "WIP",
    },
    {
      name: "Hope Reformed Baptist Church",
      image: null,
      year: "Present",
      status: "WIP",
    },
    {
      name: "Resurgence Church",
      image: null,
      year: "Present",
      status: "WIP",
    },
    { name: "First Principles", image: null, year: "Present", status: "WIP" },
    {
      name: "Stand Firm",
      image: null,
      year: "2023-2025",
      status: "Archived",
      link: "https://stand-firm.com.au",
    },
    {
      name: "The Armoury Bookshop",
      image: null,
      year: "2023",
      status: "Archived",
      link: "https://thearmourybookshop.com.au",
    },
    {
      name: "Brisket and Briyani",
      image: null,
      year: "2024",
      link: "https://brisketandbriyani.com.au",
    },
    {
      name: "South East Psychology",
      image: null,
      year: "2024",
      link: "https://southeastpsychology.com.au/",
    },
    {
      name: "ZSU ArmA Website",
      image: "/projects/zsu.avif",
      year: "2023",
      link: "https://arma.zsu.gg/",
    },
    {
      name: "Simply Photos",
      image: "/projects/simply-photos.avif",
      year: "2022",
      status: "Archived",
      link: "https://simplyphotos.com.au/",
    },
    {
      name: "Livestream",
      image: "/projects/sdelta.avif",
      year: "2022",
      status: "Archived",
    },
  ];

  const sortedProjects = [...projects].sort((a, b) => {
    // First sort by WIP status
    if (a.status === "WIP" && b.status !== "WIP") return -1;
    if (a.status !== "WIP" && b.status === "WIP") return 1;

    // Then sort by Archived status
    if (a.status === "Archived" && b.status !== "Archived") return 1;
    if (a.status !== "Archived" && b.status === "Archived") return -1;

    // Then sort by year
    if (a.year === "Present" && b.year !== "Present") return -1;
    if (a.year !== "Present" && b.year === "Present") return 1;

    // For non-Present years, sort numerically
    if (a.year !== "Present" && b.year !== "Present") {
      const yearA = parseInt(a.year.split("-")[0]);
      const yearB = parseInt(b.year.split("-")[0]);
      return yearB - yearA;
    }

    return 0;
  });

  return (
    <div className="max-w-lg mx-auto">
      <div className="text-sm flex flex-col gap-20 pb-20">
        <BlurFade delay={0.1}>
          <p className="font-serif text-2xl italic ">Work</p>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="text-sm leading-relaxed flex flex-col gap-2">
            <p>
              I&apos;ve been a web developer for around 5 years now, creating
              unique marketing, e-commerce and web applications for clients.
              Below is a selection of my work from the last few years.
            </p>
          </div>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="w-full">
            <Table>
              <TableBody>
                {sortedProjects.map((project, index) => (
                  <TableRow
                    key={project.name}
                    className={`group ${
                      project.status === "Archived"
                        ? "text-yellow-700 dark:text-yellow-600"
                        : ""
                    }`}
                    onMouseEnter={() => setIsAnyProjectHovered(true)}
                    onMouseLeave={() => setIsAnyProjectHovered(false)}
                  >
                    <TableCell>
                      <p
                        className={`text-sm transition-opacity whitespace-normal break-words ${
                          isAnyProjectHovered
                            ? "opacity-50 group-hover:opacity-100"
                            : "opacity-100"
                        }`}
                      >
                        {project.name}
                      </p>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      <p
                        className={`text-sm text-muted-foreground transition-opacity ${
                          isAnyProjectHovered
                            ? "opacity-50 group-hover:opacity-100"
                            : "opacity-100"
                        }`}
                      >
                        {project.year}
                      </p>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap">
                      {project.link && !project.status && (
                        <a
                          href={project.link}
                          target="_blank"
                          className="text-sm text-muted-foreground hover:text-blue-400 dark:hover:text-blue-600 transition"
                        >
                          Link
                        </a>
                      )}
                      {project.status && (
                        <span
                          className={`text-sm text-muted-foreground gap-1 ${
                            isAnyProjectHovered
                              ? "opacity-50 group-hover:opacity-100"
                              : "opacity-100"
                          }`}
                        >
                          {project.status === "WIP" ? (
                            <AnimatedGradientText text="WIP" />
                          ) : project.status === "Archived" && project.link ? (
                            <a
                              href={project.link}
                              target="_blank"
                              className="hover:text-blue-400 dark:hover:text-blue-600 transition"
                            >
                              Link
                            </a>
                          ) : (
                            "Archived"
                          )}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
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
