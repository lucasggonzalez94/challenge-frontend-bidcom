import "server-only";

import type { CatalogListingRepository } from "@/features/catalog/domain/catalog-listing-repository";
import type { Category } from "@/features/catalog/domain/category";
import type { CategoryRepository } from "@/features/catalog/domain/category-repository";
import type { PaginatedProducts } from "@/features/catalog/domain/paginated-products";
import type { Product } from "@/features/catalog/domain/product";
import type { ProductDetailRepository } from "@/features/catalog/domain/product-detail-repository";

import { getDummyJson } from "./dummyjson-client";
import type {
  DummyJsonCategoryDto,
  DummyJsonProductsResponseDto,
} from "./dummyjson-dto";
import {
  mapDummyJsonCategoriesToDomain,
  mapDummyJsonProductsResponseToDomain,
} from "./mappers";

const REVALIDATE_PRODUCTS_SECONDS = 300;
const REVALIDATE_CATEGORIES_SECONDS = 1800;

const CACHE_TAGS = {
  products: "catalog:products",
  categories: "catalog:categories",
} as const;

function toLimitedProductsPath(path: string, limit: number): string {
  return `${path}${path.includes("?") ? "&" : "?"}limit=${limit}`;
}

function toPaginatedProductsPath(path: string, limit: number, page: number): string {
  const currentPage = Math.max(page, 1);
  const skip = (currentPage - 1) * limit;
  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}limit=${limit}&skip=${skip}`;
}

function toPaginatedResult(response: DummyJsonProductsResponseDto): PaginatedProducts {
  const normalizedLimit = response.limit > 0 ? response.limit : 1;
  const totalPages = Math.max(Math.ceil(response.total / normalizedLimit), 1);
  const calculatedPage = Math.floor(response.skip / normalizedLimit) + 1;
  const currentPage = Math.min(Math.max(calculatedPage, 1), totalPages);

  return {
    items: mapDummyJsonProductsResponseToDomain(response),
    total: response.total,
    limit: normalizedLimit,
    skip: response.skip,
    currentPage,
    totalPages,
  };
}

class DummyJsonProductRepository
  implements CatalogListingRepository, CategoryRepository, ProductDetailRepository
{
  async getInitialProductsPage(limit: number, page: number): Promise<PaginatedProducts> {
    const response = await getDummyJson<DummyJsonProductsResponseDto>(
      toPaginatedProductsPath("/products", limit, page),
      {
        next: {
          revalidate: REVALIDATE_PRODUCTS_SECONDS,
          tags: [CACHE_TAGS.products],
        },
      },
    );

    return toPaginatedResult(response);
  }

  async searchProductsPage(
    term: string,
    limit: number,
    page: number,
  ): Promise<PaginatedProducts> {
    const response = await getDummyJson<DummyJsonProductsResponseDto>(
      toPaginatedProductsPath(
        `/products/search?q=${encodeURIComponent(term)}`,
        limit,
        page,
      ),
      {
        next: {
          revalidate: REVALIDATE_PRODUCTS_SECONDS,
          tags: [CACHE_TAGS.products, `catalog:search:${term.toLowerCase()}`],
        },
      },
    );

    return toPaginatedResult(response);
  }

  async getProductsByCategoryPage(
    slug: string,
    limit: number,
    page: number,
  ): Promise<PaginatedProducts> {
    const response = await getDummyJson<DummyJsonProductsResponseDto>(
      toPaginatedProductsPath(
        `/products/category/${encodeURIComponent(slug)}`,
        limit,
        page,
      ),
      {
        next: {
          revalidate: REVALIDATE_PRODUCTS_SECONDS,
          tags: [CACHE_TAGS.products, `catalog:category:${slug.toLowerCase()}`],
        },
      },
    );

    return toPaginatedResult(response);
  }

  async getCategories(): Promise<Category[]> {
    const categories = await getDummyJson<DummyJsonCategoryDto[]>(
      "/products/categories",
      {
        next: {
          revalidate: REVALIDATE_CATEGORIES_SECONDS,
          tags: [CACHE_TAGS.categories],
        },
      },
    );

    return mapDummyJsonCategoriesToDomain(categories);
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    const allProducts = await this.getAllProducts();
    const targetSku = sku.toLowerCase();

    return allProducts.find((product) => product.sku.toLowerCase() === targetSku) ?? null;
  }

  private async getAllProducts(): Promise<Product[]> {
    const firstPage = await getDummyJson<DummyJsonProductsResponseDto>(
      toLimitedProductsPath("/products", 1),
      {
        next: {
          revalidate: REVALIDATE_PRODUCTS_SECONDS,
          tags: [CACHE_TAGS.products],
        },
      },
    );

    if (firstPage.total <= 1) {
      return mapDummyJsonProductsResponseToDomain(firstPage);
    }

    const allProductsResponse = await getDummyJson<DummyJsonProductsResponseDto>(
      toLimitedProductsPath("/products", firstPage.total),
      {
        next: {
          revalidate: REVALIDATE_PRODUCTS_SECONDS,
          tags: [CACHE_TAGS.products],
        },
      },
    );

    return mapDummyJsonProductsResponseToDomain(allProductsResponse);
  }
}

export const dummyJsonProductRepository = new DummyJsonProductRepository();
