import type { Category } from "@/features/catalog/domain/category";

export type SearchMode =
  | { type: "empty" }
  | { type: "category"; category: Category }
  | { type: "term"; term: string };

export function resolveSearchMode(
  searchTerm: string,
  categories: Category[],
): SearchMode {
  const normalizedTerm = searchTerm.trim();

  if (!normalizedTerm) {
    return { type: "empty" };
  }

  const matchedCategory = categories.find(
    (category) => category.slug.toLowerCase() === normalizedTerm.toLowerCase(),
  );

  if (matchedCategory) {
    return { type: "category", category: matchedCategory };
  }

  return { type: "term", term: normalizedTerm };
}
