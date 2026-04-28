import { describe, expect, it, vi } from "vitest";

import { getHomeCatalogViewModel } from "@/features/catalog/application/get-home-catalog-view-model";

describe("getHomeCatalogViewModel", () => {
  it("loads initial products when no category filter is selected", async () => {
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

    await getHomeCatalogViewModel(
      { page: 1, categoryQuery: "", productsLimit: 20 },
      dependencies,
    );

    expect(dependencies.listingRepository.getInitialProductsPage).toHaveBeenCalledWith(20, 1);
    expect(dependencies.listingRepository.getProductsByCategoryPage).not.toHaveBeenCalled();
  });
});
