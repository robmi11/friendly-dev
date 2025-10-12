import type { Project } from "~/types/types";
import type { Route } from "./+types/details";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `The Friendly Dev | ${params.id}` }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<Project> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/projects/${params.id}`
  );

  if (!response.ok) throw new Response("Project not found", { status: 404 });

  const project: Project = await response.json();

  return project;
}

export default function ProjectDetailsPage({
  loaderData,
}: Route.ComponentProps) {
  const project: Project = loaderData;
  const navigate = useNavigate();

  return (
    <>
      <button
        className="flex items-center text-blue-400 mb-6 transition hover:text-blue-500 cursor-pointer"
        onClick={() => navigate(-1)}>
        <FaArrowLeft className="mr-2" /> Go Back
      </button>

      <div className="grid gap-8 items-start md:grid-cols-2">
        <div>
          <img
            src={project.image}
            alt={project.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
        <div>
          <h1 className="text-3xl text-blue-400 mb-4 font-bold">
            {project.title}
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            {new Date(project.date).toLocaleDateString()} + {project.category}
          </p>
          <p className="text-gray-200 mb-4">{project.description}</p>

          <a
            href={project.url}
            target="_blank"
            className="inline-block text-white bg-blue-600 transition hover:bg-blue-700 px-6 rounded py-2 ">
            View Live Site
          </a>
        </div>
      </div>
    </>
  );
}
