import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Projects" }];
}

export default function ProjectsPage() {
  return (
    <section>
      <h2 className="header-2">🚀 Projects Display</h2>
    </section>
  );
}
