import { Link } from "react-router";
import type { HeroProps } from "~/types/types";

export default function Hero({
  name = "Robert",
  text = "I'm a Frontend Developer passionate about turning ideas into responsive, accessible, and visually engaging web interfaces. I focus on clean code, seamless user experiences, and modern technologies to bring designs to life, with the MERN stack. Skilled in React and related technologies, with solid experience building and integrating backend services using Node.js and Express.",
}: HeroProps) {
  return (
    <header className="text-center py-20 px-4 bg-gray-900 text-white transition-colors duration-300 rounded-lg">
      <h2 className="text-4xl font-bold mb-4">Hi, I'm {name} 👋</h2>
      <p className="text-lg text-gray-500 mb-6 max-w-2xl mx-auto">{text}</p>
      <div className="flex justify-center gap-4">
        <Link
          to="projects"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Projects
        </Link>
        <Link
          to="contact"
          className="border border-blue-500 text-blue-400 px-6 py-2 rounded hover:bg-blue-600 hover:text-white transition">
          Contact Me
        </Link>
      </div>
    </header>
  );
}
