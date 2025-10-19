import type { Route } from "./+types/index";
import type { PostMeta } from "~/types/types";
import { Link } from "react-router";
import PostCard from "~/components/PostCard";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Blog" }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ posts: PostMeta[] }> {
  const url = new URL("/posts-meta.json", request.url);
  const response = await fetch(url.href);
  if (!response.ok) throw new Error("No meta data found");

  const data = await response.json();

  return { posts: data };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData;
  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 rounded-lg">
        <h2 className="header-2">📝 Blog Posts</h2>
        {posts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
          />
        ))}
      </div>
    </>
  );
}
