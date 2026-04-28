import type { Product } from "./product";

export interface ProductDetailRepository {
  getProductBySku(sku: string): Promise<Product | null>;
}
