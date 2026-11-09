import type { Project } from "@/interfaces/content-item";

export const compareProjects = (a: Project, b: Project): number => {
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
