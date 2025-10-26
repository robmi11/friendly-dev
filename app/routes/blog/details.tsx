import { useNavigate } from "react-router";
import ReactMarkdown from "react-markdown";
import type { Route } from "./+types/details";
import type { Post, StrapiResponse, StrapiPost } from "~/types/types";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The friendly Dev | Blog" }];
}

export async function loader({
  request,
  params,
}: Route.LoaderArgs): Promise<{ post: Post }> {
  const { slug } = params;
  const res = await fetch(`posts?filters[slug][$eq]=${slug}&populate=image`);

  if (!res.ok) throw new Error("Failed to fetch meta");

  const json: StrapiResponse<StrapiPost> = await res.json();

  if (!json.data.length) throw new Response("Post not found", { status: 404 });

  const item = json.data[0];

  const post = {
    id: item.id,
    slug: item.slug,
    excerpt: item.excerpt,
    title: item.title,
    date: item.date,
    body: item.body,
    image: item?.image?.url ? `${item.image.url}` : "/images/no-image.png",
  };

  return { post };
}

export default function BlogPostDetails({ loaderData }: Route.ComponentProps) {
  const { post } = loaderData;
  const navigate = useNavigate();
  return (
    <div className="max-w-3xl mx-auto py-12 px-6 rounded bg-gray-900">
      <h1 className="text-3xl font-bold text-blue-400 mb-2">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">
        {new Date(post.date).toLocaleDateString()}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <div className="prose prose-invert max-w-none mb-12">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="inline-block px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer rounded-lg">
        &lt;- Go Back
      </button>
    </div>
  );
}
