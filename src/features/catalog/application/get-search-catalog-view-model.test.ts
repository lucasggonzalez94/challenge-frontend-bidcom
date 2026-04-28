import { describe, expect, it, vi } from "vitest";

import { getSearchCatalogViewModel } from "@/features/catalog/application/get-search-catalog-view-model";

describe("getSearchCatalogViewModel", () => {
  it("uses empty-mode strategy to fetch initial listing", async () => {
    const dependencies = {
      categoryRepository: {
        getCategories: vi.fn().mockResolvedValue([
          { slug: "smartphones", name: "Smartphones", url: "x" },
        ]),
      },
      listingRepository: {
        getInitialProductsPage: vi.fn().mockResolvedValue({
          items: [],
          total: 0,
          limit: 20,
          skip: 0,
          currentPage: 1,
          totalPages: 1,
        }),
        getProductsByCategoryPage: vi.fn(),
        searchProductsPage: vi.fn(),
      },
    };

    await getSearchCatalogViewModel(
      {
        searchTerm: "",
        page: 1,
        productsLimit: 20,
        recommendedCategoriesLimit: 5,
      },
      dependencies,
    );

    expect(dependencies.listingRepository.getInitialProductsPage).toHaveBeenCalledWith(20, 1);
    expect(dependencies.listingRepository.searchProductsPage).not.toHaveBeenCalled();
    expect(dependencies.listingRepository.getProductsByCategoryPage).not.toHaveBeenCalled();
  });
});
