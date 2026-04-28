import type { Product } from "@/features/catalog/domain/product";

import type { CatalogDependencies } from "./dependencies";

export async function getProductDetailViewModel(
  sku: string,
  dependencies: Pick<CatalogDependencies, "detailRepository">,
): Promise<Product | null> {
  return dependencies.detailRepository.getProductBySku(sku);
}
