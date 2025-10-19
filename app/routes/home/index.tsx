import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type { Route } from "./+types/index";
import type { Project, StrapiResponse, StrapiProject } from "~/types/types";
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
    fetch(`${import.meta.env.VITE_API_URL}/projects?featured=true&populate=*`),
    fetch(new URL("posts-meta.json", url)),
  ]);

  if (!projectsRes.ok || !postsRes.ok)
    throw new Error("Failed to fetch projects or posts");

  const [projData, postsData] = await Promise.all([
    projectsRes.json(),
    postsRes.json(),
  ]);

  const projects = projData.data.map((item) => ({
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

  return { projects, posts: postsData };
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
