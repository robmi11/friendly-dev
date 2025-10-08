import Hero from "~/components/Hero";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom app development" },
  ];
}

export default function Home() {
  return (
    <section>
      <Hero />
    </section>
  );
}
