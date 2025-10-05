import { NavLink, Link } from "react-router";
import { FaLaptopCode } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300">
          <FaLaptopCode className="text-xl text-blue-400" />
          <span>The Friendly Developer</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          <div className="space-x-6 text-sm text-gray-300">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "base")}>
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "base")}
              to="projects">
              Projects
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "base")}
              to="blog">
              Blog
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "base")}
              to="about">
              About
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "base")}
              to="contact">
              Contact
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
