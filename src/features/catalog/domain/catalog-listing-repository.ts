import type { PaginatedProducts } from "./paginated-products";

export interface CatalogListingRepository {
  getInitialProductsPage(limit: number, page: number): Promise<PaginatedProducts>;
  searchProductsPage(
    term: string,
    limit: number,
    page: number,
  ): Promise<PaginatedProducts>;
  getProductsByCategoryPage(
    slug: string,
    limit: number,
    page: number,
  ): Promise<PaginatedProducts>;
}
