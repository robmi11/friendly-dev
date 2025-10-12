import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Contact" }];
}

function ContactPage() {
  return (
    <>
      <h2 className="header-2">📬 Contact Me</h2>
    </>
  );
}
export default ContactPage;
