import { useState } from "react";
import type { Route } from "./+types/index";
import type { PostMeta } from "~/types/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";

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

  data.sort((a: PostMeta, b: PostMeta) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return { posts: data };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { posts } = loaderData;

  const postPerPage = 3;
  const totalPages = Math.ceil(posts.length / postPerPage);
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 rounded-lg">
        <h2 className="header-2">📝 Blog Posts</h2>
        {currentPosts.map((post) => (
          <PostCard
            key={post.slug}
            post={post}
          />
        ))}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>
    </>
  );
}
