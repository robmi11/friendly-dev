import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import type { Route } from "./+types/index";
import type { Project } from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom app development" },
  ];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ projects: Project[] }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/projects?featured=true`
  );

  if (!response.ok) throw new Response("No featured projects", { status: 500 });

  const data = await response.json();

  return { projects: data };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects } = loaderData;
  return (
    <>
      <FeaturedProjects featuredProjects={projects} />
      <AboutPreview />
    </>
  );
}
