import { Link, useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <h1 className="text-6xl font-extrabold text-blue-400 mb-2">404</h1>
      <h2 className="text-2xl text-gray-100 font-semibold mb-2">
        Page Not found
      </h2>
      <p className="text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition mt-5 cursor-pointer">
        Go Home
      </button>
    </div>
  );
}
