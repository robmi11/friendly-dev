import type { Route } from "./+types/index";
import { Form } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | Contact" }];
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();

  const errors: Record<string, string> = {};

  if (!formData.get("name")) errors.name = "Name is required";
  if (!formData.get("subject")) errors.subject = "Subject is required";
  if (!formData.get("message")) errors.message = "Message is required";

  if (!formData.get("email")) {
    errors.email = "E-mail address is required";
  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\+@s]+$/.test(formData.get("email") as string)
  ) {
    errors.email = "Invalid e-mail addess format";
  }

  if (Object.keys(errors).length > 0) return { errors };

  const message = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  return { message };
}

function ContactPage({ actionData }: Route.ComponentProps) {
  return (
    <div className="max-w-3xl mx-auto mt-12 px-6 py-8 bg-gray-900 rounded-lg">
      <h2 className="header-2">📬 Contact Me</h2>
      {actionData?.message && (
        <p className="w-full bg-green-900 text-green-300 text-center py-3 mb-6 rounded-lg">
          Message successfuly sent
        </p>
      )}
      <Form
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
          <p className="text-red-400 text-sm mt-1">
            {actionData?.errors?.name}
          </p>
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
          <p className="text-red-400 text-sm mt-1">
            {actionData?.errors?.email}
          </p>
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
          <p className="text-red-400 text-sm mt-1">
            {actionData?.errors?.subject}
          </p>
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
          <p className="text-red-400 text-sm mt-1">
            {actionData?.errors?.message}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 transition hover:bg-blue-700 rounded-lg cursor-pointer">
          Send Message
        </button>
      </Form>
      {actionData && <p>{actionData.name}</p>}
    </div>
  );
}
export default ContactPage;
