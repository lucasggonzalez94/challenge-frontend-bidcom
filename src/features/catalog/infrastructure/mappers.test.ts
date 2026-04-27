import { describe, expect, it } from "vitest";

import {
  mapDummyJsonCategoriesToDomain,
  mapDummyJsonProductToDomain,
  mapDummyJsonProductsResponseToDomain,
} from "@/features/catalog/infrastructure/mappers";

describe("catalog mappers", () => {
  it("maps product dto to domain and normalizes optional brand", () => {
    const product = mapDummyJsonProductToDomain({
      id: 1,
      sku: "ABC-123",
      title: "Mouse",
      description: "Wireless",
      price: 99.99,
      category: "electronics",
      thumbnail: "https://cdn.dummyjson.com/a.webp",
      images: ["https://cdn.dummyjson.com/a.webp"],
    });

    expect(product.brand).toBeNull();
    expect(product.sku).toBe("ABC-123");
  });

  it("maps products response to domain list", () => {
    const products = mapDummyJsonProductsResponseToDomain({
      products: [
        {
          id: 2,
          sku: "DEF-001",
          title: "Keyboard",
          description: "Mechanical",
          price: 120,
          category: "electronics",
          brand: "KeyPro",
          thumbnail: "https://cdn.dummyjson.com/b.webp",
          images: ["https://cdn.dummyjson.com/b.webp"],
        },
      ],
      total: 1,
      skip: 0,
      limit: 20,
    });

    expect(products).toHaveLength(1);
    expect(products[0].brand).toBe("KeyPro");
  });

  it("maps category dtos to domain list", () => {
    const categories = mapDummyJsonCategoriesToDomain([
      { slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/a" },
      { slug: "laptops", name: "Laptops", url: "https://dummyjson.com/b" },
    ]);

    expect(categories).toEqual([
      { slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/a" },
      { slug: "laptops", name: "Laptops", url: "https://dummyjson.com/b" },
    ]);
  });
});
