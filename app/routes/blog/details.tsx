import { Link } from "react-router";
import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { PostMeta } from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The friendly Dev | Blog" }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ post: PostMeta; markdown: string }> {
  const url = new URL("/posts-meta.json", request.url);
  const { slug } = params;
  const res = await fetch(url.href);

  if (!res.ok) throw new Error("Failed to fetch meta");
  const index = await res.json();

  const postMeta = index.find((post: PostMeta) => post.slug === slug);
  if (!postMeta) throw new Response("Not found", { status: 404 });

  // Get row markdown file for the slug
  const markdown = await import(`../../posts/${slug}.md?raw`);

  return { post: postMeta, markdown: markdown.default };
}

export default function BlogPostDetails({ loaderData }: Route.ComponentProps) {
  const { post, markdown } = loaderData;
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 rounded bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>
      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
      <Link
        to="/blog"
        className="inline-block px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer rounded-lg">
        &lt;- Back To Posts
      </Link>
    </div>
  );
}
