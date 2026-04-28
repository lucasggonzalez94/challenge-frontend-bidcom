import type { Category } from "@/features/catalog/domain/category";
import type { PaginatedProducts } from "@/features/catalog/domain/paginated-products";

import type { CatalogDependencies } from "./dependencies";

type GetHomeCatalogViewModelInput = {
  page: number;
  categoryQuery: string;
  productsLimit: number;
};

export type HomeCatalogViewModel = {
  categories: Category[];
  selectedCategory: Category | null;
  paginatedProducts: PaginatedProducts;
};

export async function getHomeCatalogViewModel(
  input: GetHomeCatalogViewModelInput,
  dependencies: Pick<CatalogDependencies, "listingRepository" | "categoryRepository">,
): Promise<HomeCatalogViewModel> {
  const categories = await dependencies.categoryRepository.getCategories();
  const selectedCategory =
    categories.find((category) => category.slug.toLowerCase() === input.categoryQuery) ?? null;

  const paginatedProducts = selectedCategory
    ? await dependencies.listingRepository.getProductsByCategoryPage(
        selectedCategory.slug,
        input.productsLimit,
        input.page,
      )
    : await dependencies.listingRepository.getInitialProductsPage(
        input.productsLimit,
        input.page,
      );

  return {
    categories,
    selectedCategory,
    paginatedProducts,
  };
}
