import { useState } from "react";
import type { Route } from "./+types/index";
import type { Post, StrapiPost, StrapiResponse } from "~/types/types";
import PostCard from "~/components/PostCard";
import Pagination from "~/components/Pagination";
import PostsFilter from "~/components/PostsFilter";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Blog" }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ posts: Post[] }> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/posts?populate=image&sort=date:desc`
  );

  if (!response.ok) throw new Error("No meta data found");

  const json: StrapiResponse<StrapiPost> = await response.json();

  const posts = json.data.map((post) => ({
    id: post.id,
    documentId: post.documentId,
    slug: post.slug,
    body: post.body,
    date: post.date,
    title: post.title,
    excerpt: post.excerpt,
    image: post.image?.url ? `${post.image.url}` : "/images/no-image.png",
  }));

  return { posts };
}

export default function BlogPage({ loaderData }: Route.ComponentProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { posts } = loaderData;

  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query)
    );
  });

  const postPerPage = 3;
  const totalPages = Math.ceil(filteredPosts.length / postPerPage);
  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  return (
    <>
      <div className="max-w-3xl mx-auto mt-10 px-6 py-6 bg-gray-900 rounded-lg">
        <h2 className="header-2">📝 Blog Posts</h2>
        <PostsFilter
          searchQuery={searchQuery}
          onSearchChange={(query) => {
            setSearchQuery(query);
            setCurrentPage(1);
          }}
        />
        <div className="space-y-8">
          {currentPosts.length === 0 ? (
            <p className="text-gray-400 text-center">No posts found</p>
          ) : (
            <>
              {currentPosts.map((post) => (
                <PostCard
                  key={post.slug}
                  post={post}
                />
              ))}
            </>
          )}
        </div>

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
