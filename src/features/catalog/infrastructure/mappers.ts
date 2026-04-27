import type { Category } from "@/features/catalog/domain/category";
import type { Product } from "@/features/catalog/domain/product";

import type {
  DummyJsonCategoryDto,
  DummyJsonProductDto,
} from "./dummyjson.types";

export function mapDummyJsonProductToDomain(
  product: DummyJsonProductDto,
): Product {
  return {
    id: product.id,
    sku: product.sku,
    title: product.title,
    description: product.description,
    price: product.price,
    category: product.category,
    brand: product.brand ?? "",
    thumbnail: product.thumbnail,
    images: product.images,
  };
}

export function mapDummyJsonCategoryToDomain(
  category: DummyJsonCategoryDto,
): Category {
  return {
    slug: category.slug,
    name: category.name,
    url: category.url,
  };
}
