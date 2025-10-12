export type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: "Fullstack" | "Frontend" | "Mobile";
  featured: boolean;
};

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export type HeroProps = {
  name?: string;
  text?: string;
};