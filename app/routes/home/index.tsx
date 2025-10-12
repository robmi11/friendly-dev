import type { Route } from "./+types/index";
import Hero from "~/components/Hero";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "The Friendly Dev | Welcome" },
    { name: "description", content: "Custom app development" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <h1 className="mt-4">This is a Home Page of the site.</h1>
    </>
  );
}
