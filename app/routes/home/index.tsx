import type { Route } from "../+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom app development" },
  ];
}

export default function Home() {
  return (
    <section>
      <h2 className="header-2">Welcome to The Friendly Dev!</h2>
    </section>
  );
}
