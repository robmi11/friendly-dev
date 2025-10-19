import { useState } from "react";
import ProjectCard from "~/components/ProjectCard";
import type { Route } from "./+types/index";
import type { Project, StrapiProject, StrapiResponse } from "~/types/types";
import Pagination from "~/components/Pagination";
import { AnimatePresence, motion } from "framer-motion";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Projects" }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?populate=*`
  );

  if (!response.ok)
    throw new Response("Could not load the projects", { status: 500 });

  const json: StrapiResponse<StrapiProject> = await response.json();

  const projects = json.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url
      ? `${import.meta.env.VITE_STRAPI_URL}${item.image.url}`
      : "/images/no-image.png",
    url: item.url,
    category: item.category,
    date: item.date,
    featured: item.featured,
  }));

  return { projects };
}

export default function ProjectsPage({ loaderData }: Route.ComponentProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 10;

  const { projects } = loaderData;

  // Get unique categories
  const categories: string[] = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects by selectedCategory
  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Get current pages projects
  const indexOfLast = currentPage * projectsPerPage;
  const indexofFirst = indexOfLast - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexofFirst, indexOfLast);

  return (
    <>
      <h2 className="header-2">🚀 Projects Display</h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            className={`cursor-pointer px-4 py-2 rounded text-sm ${category === selectedCategory ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"}`}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            key={category}>
            {category}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid gap-6 sm:grid-cols-2">
          {currentProjects.map((project: Project) => (
            <motion.div
              key={project.id}
              layout>
              <ProjectCard
                key={project.id}
                project={project}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
