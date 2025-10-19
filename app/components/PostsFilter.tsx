import type { PostsFilterProps } from "~/types/types";

export default function PostsFilter({
  searchQuery,
  onSearchChange,
}: PostsFilterProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:right-2 focus:ring-blue-500"
        placeholder="Search Posts..."
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </div>
  );
}
