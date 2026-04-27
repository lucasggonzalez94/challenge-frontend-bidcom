import type { Category } from "./category";
import type { Product } from "./product";
import type { PaginatedProducts } from "./paginated-products";

export interface ProductRepository {
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
  getCategories(): Promise<Category[]>;
  getRecommendedCategories(limit: number): Promise<Category[]>;
  getProductBySku(sku: string): Promise<Product | null>;
}
