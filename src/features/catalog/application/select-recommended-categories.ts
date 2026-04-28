import type { Category } from "@/features/catalog/domain/category";

export function selectRecommendedCategories(
  categories: Category[],
  limit: number,
): Category[] {
  return categories.slice(0, limit);
}
