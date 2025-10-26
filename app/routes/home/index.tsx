import FeaturedProjects from "~/components/FeaturedProjects";
import AboutPreview from "~/components/AboutPreview";
import LatestPosts from "~/components/LatestPosts";
import type { Route } from "./+types/index";
import type {
  Project,
  StrapiResponse,
  StrapiProject,
  Post,
  StrapiPost,
} from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom app development" },
  ];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ projects: Project[]; posts: Post[] }> {
  const [projectsRes, postsRes] = await Promise.all([
    fetch(
      `${import.meta.env.VITE_API_URL}/projects?filters[featured][$eq]=true&populate=*`
    ),
    fetch(`${import.meta.env.VITE_API_URL}/posts?sort[0]=date:desc&populate=*`),
  ]);

  if (!projectsRes.ok || !postsRes.ok)
    throw new Error("Failed to fetch projects or posts");

  const postsJson: StrapiResponse<StrapiPost> = await postsRes.json();

  const projectJson: StrapiResponse<StrapiProject> = await projectsRes.json();

  const projects = projectJson.data.map((item) => ({
    id: item.id,
    documentId: item.documentId,
    title: item.title,
    description: item.description,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    url: item.url,
    category: item.category,
    date: item.date,
    featured: item.featured,
  }));

  const posts = postsJson.data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    image: item.image?.url ? `${item.image.url}` : "/images/no-image.png",
    body: item.body,
    excerpt: item.excerpt,
    date: item.date,
  }));

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
