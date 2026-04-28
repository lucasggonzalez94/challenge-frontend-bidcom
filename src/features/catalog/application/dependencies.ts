import type { CatalogListingRepository } from "@/features/catalog/domain/catalog-listing-repository";
import type { CategoryRepository } from "@/features/catalog/domain/category-repository";
import type { ProductDetailRepository } from "@/features/catalog/domain/product-detail-repository";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";

export type CatalogDependencies = {
  listingRepository: CatalogListingRepository;
  categoryRepository: CategoryRepository;
  detailRepository: ProductDetailRepository;
};

export function getCatalogDependencies(): CatalogDependencies {
  return {
    listingRepository: dummyJsonProductRepository,
    categoryRepository: dummyJsonProductRepository,
    detailRepository: dummyJsonProductRepository,
  };
}
