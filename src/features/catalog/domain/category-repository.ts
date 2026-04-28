import type { Category } from "./category";

export interface CategoryRepository {
  getCategories(): Promise<Category[]>;
}
