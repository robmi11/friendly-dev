import type { FeaturedProjectsProps } from "~/types/types";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects({
  featuredProjects,
  count = 2,
}: FeaturedProjectsProps) {
  if (featuredProjects.length === 0) return null;
  return (
    <section>
      <h2 className="header-2">🌟 Featured Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {featuredProjects.slice(0, count).map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </section>
  );
}
