import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project } from "~/types/types";
import Pagination from "~/components/Pagination";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Projects" }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const response = await fetch("http:/localhost:5000/projects");

  if (!response.ok)
    throw new Response("Could not load the projects", { status: 500 });

  const data: Project[] = await response.json();
  return { projects: data };
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { projects } = loaderData as { projects: Project[] };
  const projectsPerPage = 10;

  // Calculate total number of pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexofFirst = indexOfLast - projectsPerPage;
  const currentProjects = projects.slice(indexofFirst, indexOfLast);

  return (
    <>
      <h2 className="header-2">🚀 Projects Display</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {currentProjects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
