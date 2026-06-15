import AnimatedGradientText from "@/components/animated-gradient-text";
import BackLink from "@/components/back-link";
import LinkWithIcon from "@/components/link-with-icon";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { Project } from "@/interfaces/content-item";
import { cn } from "@/lib/utils";

const sortProjects = (a: Project, b: Project): number => {
  if (a.status === "work_in_progress" && b.status !== "work_in_progress") {
    return -1;
  }
  if (a.status !== "work_in_progress" && b.status === "work_in_progress") {
    return 1;
  }
  if (a.status === "archived" && b.status !== "archived") {
    return 1;
  }
  if (a.status !== "archived" && b.status === "archived") {
    return -1;
  }

  if (a.year_completed && b.year_completed) {
    return b.year_completed - a.year_completed;
  }
  if (a.year_completed && !b.year_completed) {
    return -1;
  }
  if (!a.year_completed && b.year_completed) {
    return 1;
  }

  return (
    new Date(b.date_created).getTime() - new Date(a.date_created).getTime()
  );
};

interface ProjectsPageProps {
  projects: Project[];
}

export default function ProjectsPage({ projects }: ProjectsPageProps) {
  const sortedProjects = [...projects].toSorted(sortProjects);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4 px-6 pb-20">
      <div className="flex flex-col gap-y-20 text-sm">
        <div className="space-y-10">
          <div className="space-y-2">
            <p className="font-redaction text-black text-xl dark:text-white">
              Projects
            </p>

            <p>
              Here you&apos;ll find a list of projects I&apos;ve worked on. I
              eventually plan on having more detailed reports on each project.
            </p>
          </div>

          <div className="space-y-10">
            <hr className="border-dotted border-border" />

            <div className="w-full">
              {sortedProjects.length > 0 ? (
                <Table className="">
                  <TableBody>
                    {sortedProjects.map((project) => (
                      <TableRow
                        className={cn(
                          "group border-b border-dotted border-border hover:!bg-transparent dark:hover:!bg-transparent",
                          project.status === "archived" &&
                            "text-yellow-700 dark:text-yellow-600"
                        )}
                        key={project.id}
                      >
                        <TableCell>
                          <p className="whitespace-normal break-words text-sm opacity-100 transition-opacity group-hover:opacity-100">
                            {project.name}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          <p className="text-muted-foreground text-sm opacity-100 transition-opacity group-hover:opacity-100">
                            {project.status === "work_in_progress"
                              ? "Present"
                              : project.year_completed || "Present"}
                          </p>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-right">
                          {(() => {
                            if (project.status === "archived") {
                              return (
                                <span className="text-muted-foreground text-sm">
                                  Archived
                                </span>
                              );
                            }
                            if (project.status === "work_in_progress") {
                              return <AnimatedGradientText text="WIP" />;
                            }
                            if (project.link) {
                              return (
                                <LinkWithIcon
                                  className="text-muted-foreground"
                                  href={project.link}
                                  variant="default"
                                >
                                  View
                                </LinkWithIcon>
                              );
                            }
                            return null;
                          })()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">No projects found.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <BackLink href="/">../</BackLink>
      </div>
    </div>
  );
}
