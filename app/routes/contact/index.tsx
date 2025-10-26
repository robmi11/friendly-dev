import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Contact" }];
}

export default function ContactPage({ actionData }: Route.ComponentProps) {
  const clearForm = () => {
    window.onbeforeunload = () => {
      for (const form of document.getElementsByTagName("form")) {
        form.reset();
      }
    };
  };
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 rounded-lg">
      <h2 className="header-2">📬 Contact Me</h2>

      <form
        action="https://formspree.io/f/mvgvojqw"
        method="post"
        className="space-y-6">
        {/* NAME */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 outline-0"
          />
        </div>

        {/* EMAIL */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 outline-0"
          />
        </div>

        {/* SUBJECT */}
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-300">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 outline-0"
          />
        </div>

        {/* MESSAGE */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            className="w-full mt-1 px-4 py-2 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 outline-0"></textarea>
        </div>

        <button
          onClick={clearForm}
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 transition hover:bg-blue-700 rounded-lg cursor-pointer">
          Send Message
        </button>
      </form>
    </div>
  );
}
