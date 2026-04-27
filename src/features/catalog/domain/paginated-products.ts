import type { Product } from "./product";

export type PaginatedProducts = {
  items: Product[];
  total: number;
  limit: number;
  skip: number;
  currentPage: number;
  totalPages: number;
};
