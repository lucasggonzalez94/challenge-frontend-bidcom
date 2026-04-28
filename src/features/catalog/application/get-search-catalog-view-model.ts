import type { Category } from "@/features/catalog/domain/category";
import type { PaginatedProducts } from "@/features/catalog/domain/paginated-products";

import type { CatalogDependencies } from "./dependencies";
import { resolveSearchMode, type SearchMode } from "./resolve-search-mode";
import { selectRecommendedCategories } from "./select-recommended-categories";

type GetSearchCatalogViewModelInput = {
  searchTerm: string;
  page: number;
  productsLimit: number;
  recommendedCategoriesLimit: number;
};

export type SearchCatalogViewModel = {
  paginatedProducts: PaginatedProducts;
  recommendedCategories: Category[];
  shouldShowEmptyState: boolean;
};

type SearchHandlerContext = {
  input: GetSearchCatalogViewModelInput;
  dependencies: Pick<CatalogDependencies, "listingRepository">;
};

type SearchHandler<TMode extends SearchMode> = (
  context: SearchHandlerContext & {
    mode: TMode;
  },
) => Promise<PaginatedProducts>;

const searchHandlers: {
  empty: SearchHandler<Extract<SearchMode, { type: "empty" }>>;
  category: SearchHandler<Extract<SearchMode, { type: "category" }>>;
  term: SearchHandler<Extract<SearchMode, { type: "term" }>>;
} = {
  empty: ({ input, dependencies }) =>
    dependencies.listingRepository.getInitialProductsPage(input.productsLimit, input.page),
  category: ({ mode, input, dependencies }) =>
    dependencies.listingRepository.getProductsByCategoryPage(
      mode.category.slug,
      input.productsLimit,
      input.page,
    ),
  term: ({ mode, input, dependencies }) =>
    dependencies.listingRepository.searchProductsPage(
      mode.term,
      input.productsLimit,
      input.page,
    ),
};

function executeSearchMode(
  mode: SearchMode,
  context: SearchHandlerContext,
): Promise<PaginatedProducts> {
  if (mode.type === "empty") {
    return searchHandlers.empty({ ...context, mode });
  }

  if (mode.type === "category") {
    return searchHandlers.category({ ...context, mode });
  }

  return searchHandlers.term({ ...context, mode });
}

export async function getSearchCatalogViewModel(
  input: GetSearchCatalogViewModelInput,
  dependencies: Pick<CatalogDependencies, "listingRepository" | "categoryRepository">,
): Promise<SearchCatalogViewModel> {
  const categories = await dependencies.categoryRepository.getCategories();
  const recommendedCategories = selectRecommendedCategories(
    categories,
    input.recommendedCategoriesLimit,
  );

  const mode = resolveSearchMode(input.searchTerm, categories);
  const paginatedProducts = await executeSearchMode(mode, { input, dependencies });

  return {
    paginatedProducts,
    recommendedCategories,
    shouldShowEmptyState: paginatedProducts.items.length === 0,
  };
}
