import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Contact" }];
}

function ContactPage() {
  return (
    <section>
      <h2 className="header-2">📬 Contact Me</h2>
    </section>
  );
}
export default ContactPage;
