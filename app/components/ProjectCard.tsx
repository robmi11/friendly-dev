import type { Project } from "~/types/types";
import { Link } from "react-router";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="block transform transition duration-300 hover:scale-[1.02]">
      <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-sm transition hover:shadow-md">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-5">
          <h3 className="text-blue-400 text-3xl font-semibold mb-1">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm mb-3">{project.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-400">
            <span>{project.category}</span>
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
