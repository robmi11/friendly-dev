import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | About" }];
}

export default function AboutPage() {
  return (
    <>
      <h2 className="header-2">Hi I'm Robert 👋</h2>
    </>
  );
}
