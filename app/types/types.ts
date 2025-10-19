export type Project = {
  id: string;
  documentId: string;
  title: string;
  description: string;
  image: string;
  url: string;
  date: string;
  category: "Fullstack" | "Frontend" | "Mobile" | "Backend";
  featured: boolean;
};

export type PostMeta = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
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

export type FeaturedProjectsProps = {
  featuredProjects: Project[];
  count?: number;
};

export type PostsFilterProps = {
  searchQuery: string;
  onSearchChange: (searchQuery: string) => void;
};

export type LatestProjectsProps = {
  posts: PostMeta[];
  limit?: number;
};

export type StrapiResponse<T> = {
  data: T[];
};

export type StrapiProject = Project & { image?: { url: string; formats?: { thumbnail?: { url: string; }; small?: { url: string; }; medium?: { url: string; }; tlarge?: { url: string; }; }; }; };