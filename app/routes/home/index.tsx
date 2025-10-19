import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type { Route } from "./+types/index";
import type { Project } from "~/types/types";
import type { PostMeta } from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom app development" },
  ];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: PostMeta[] }> {
  const url = new URL(request.url);

  const [projectsRes, postsRes] = await Promise.all([
    fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true`),
    fetch(new URL("posts-meta.json", url)),
  ]);

  if (!projectsRes.ok || !postsRes.ok)
    throw new Error("Failed to fetch projects or posts");

  const [projects, posts] = await Promise.all([
    projectsRes.json(),
    postsRes.json(),
  ]);

  return { projects, posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { projects, posts } = loaderData;
  return (
    <>
      <FeaturedProjects featuredProjects={projects} />
      <AboutPreview />
      <LatestPosts posts={posts} />
    </>
  );
}
