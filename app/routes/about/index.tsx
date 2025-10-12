import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
  return [{ title: "The Friendly Dev | About" }];
}

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-gray-900 rounded-lg">
      {/* Intro */}
      <div className="flex flex-col md:flex-row md:items-start items-center gap-10 mb-12">
        <img
          src="/images/profile.jpg"
          alt="profile"
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 shadow-md"
        />
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hey, I'm Robert 👋
          </h1>
          <p className="text-gray-300 text-lg">
            I'm a passionate web developer who loves building friendly digital
            experiences.
          </p>
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-white mb-4">My Mission</h2>
        <p className="text-gray-300 leading-relaxed">
          My goal as a Frontend Developer is to continuously learn, innovate,
          and build scalable solutions using modern technologies. I’m passionate
          about performance, accessibility, and clean code that brings designs
          to life.
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className="text-2xl font-semibold text-white mb-4">🚀 Tech I Use</h2>
      <ul className="flex flex-wrap gap-4 text-sm text-gray-300">
        {["React", "Node.js", "MongoDB", "Bootstrap", "Tailwind CSS"].map(
          (tech) => (
            <li
              key={tech}
              className="bg-gray-700 px-3 py-1 rounded-md">
              {tech}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
