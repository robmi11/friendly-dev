import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Blog" }];
}

export default function BlogPage() {
  return (
    <>
      <h2 className="header-2">📝 Blog Posts</h2>
    </>
  );
}
