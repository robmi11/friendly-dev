import type { PaginationProps } from "~/types/types";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-8">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          className={`cursor-pointer px-3 py-1 rounded ${currentPage === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"} `}
          onClick={() => onPageChange(idx + 1)}>
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
