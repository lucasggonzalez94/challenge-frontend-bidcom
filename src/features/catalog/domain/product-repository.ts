import type { Category } from "./category";
import type { Product } from "./product";

export interface ProductRepository {
  getInitialProducts(limit: number): Promise<Product[]>;
  searchProducts(term: string, limit: number): Promise<Product[]>;
  getProductsByCategory(slug: string, limit: number): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getRecommendedCategories(limit: number): Promise<Category[]>;
  getProductBySku(sku: string): Promise<Product | null>;
}
