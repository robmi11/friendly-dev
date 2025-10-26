import { Link } from "react-router";
import type { LatestProjectsProps, Post } from "~/types/types";

export default function LatestPosts({ posts, limit = 3 }: LatestProjectsProps) {
  const latestPost = [...posts]
    .sort((a: Post, b: Post) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl text-center font-bold text-white mb-6">
        🆕 Latest Posts
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latestPost.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block p-4 border border-gray-700 rounded-lg bg-gray-800 transition hover:shadow-md">
            <h3 className="text-lg font-semibold text-blue-400 mb-1">
              {post.title}
            </h3>
            <p className="text-sm text-gray-300">{post.excerpt}</p>
            <span className="block text-xs text-gray-400 mt-3">
              {new Date(post.date).toLocaleDateString()}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
