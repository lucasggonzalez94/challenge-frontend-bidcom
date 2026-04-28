import { beforeEach, describe, expect, it, vi } from "vitest";

import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { getDummyJson } from "@/features/catalog/infrastructure/dummyjson-client";

vi.mock("@/features/catalog/infrastructure/dummyjson-client", () => ({
  getDummyJson: vi.fn(),
}));

const mockedGetDummyJson = vi.mocked(getDummyJson);

beforeEach(() => {
  mockedGetDummyJson.mockReset();
});

describe("dummyJsonProductRepository listing methods", () => {
  it("returns paginated initial products", async () => {
    mockedGetDummyJson.mockResolvedValueOnce({
      products: [
        {
          id: 10,
          sku: "AAA-010",
          title: "Speaker",
          description: "Bluetooth speaker",
          price: 99,
          category: "audio",
          brand: "Brand",
          thumbnail: "https://cdn.dummyjson.com/p10.webp",
          images: ["https://cdn.dummyjson.com/p10.webp"],
        },
      ],
      total: 40,
      skip: 20,
      limit: 20,
    });

    const result = await dummyJsonProductRepository.getInitialProductsPage(20, 2);

    expect(result.items).toHaveLength(1);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(2);
  });

  it("clamps currentPage metadata when API skip is out of range", async () => {
    mockedGetDummyJson.mockResolvedValueOnce({
      products: [],
      total: 10,
      skip: 999,
      limit: 5,
    });

    const result = await dummyJsonProductRepository.searchProductsPage("phone", 5, 300);

    expect(result.totalPages).toBe(2);
    expect(result.currentPage).toBe(2);
  });

  it("returns category page data", async () => {
    mockedGetDummyJson.mockResolvedValueOnce({
      products: [
        {
          id: 20,
          sku: "BBB-020",
          title: "Phone",
          description: "Smartphone",
          price: 300,
          category: "smartphones",
          brand: "Brand",
          thumbnail: "https://cdn.dummyjson.com/p20.webp",
          images: ["https://cdn.dummyjson.com/p20.webp"],
        },
      ],
      total: 21,
      skip: 0,
      limit: 20,
    });

    const result = await dummyJsonProductRepository.getProductsByCategoryPage(
      "smartphones",
      20,
      1,
    );

    expect(result.items[0].category).toBe("smartphones");
    expect(result.totalPages).toBe(2);
  });
});

describe("dummyJsonProductRepository.getProductBySku", () => {
  it("returns product by SKU using case-insensitive match", async () => {
    mockedGetDummyJson
      .mockResolvedValueOnce({
        products: [
          {
            id: 1,
            sku: "SKU-001",
            title: "Phone",
            description: "Phone description",
            price: 200,
            category: "smartphones",
            brand: "Brand",
            thumbnail: "https://cdn.dummyjson.com/p1.webp",
            images: ["https://cdn.dummyjson.com/p1.webp"],
          },
        ],
        total: 2,
        skip: 0,
        limit: 1,
      })
      .mockResolvedValueOnce({
        products: [
          {
            id: 1,
            sku: "SKU-001",
            title: "Phone",
            description: "Phone description",
            price: 200,
            category: "smartphones",
            brand: "Brand",
            thumbnail: "https://cdn.dummyjson.com/p1.webp",
            images: ["https://cdn.dummyjson.com/p1.webp"],
          },
          {
            id: 2,
            sku: "SKU-ABC",
            title: "Laptop",
            description: "Laptop description",
            price: 350,
            category: "laptops",
            brand: "Brand",
            thumbnail: "https://cdn.dummyjson.com/p2.webp",
            images: ["https://cdn.dummyjson.com/p2.webp"],
          },
        ],
        total: 2,
        skip: 0,
        limit: 2,
      });

    const product = await dummyJsonProductRepository.getProductBySku("sku-abc");

    expect(product?.id).toBe(2);
    expect(mockedGetDummyJson).toHaveBeenCalledTimes(2);
  });

  it("returns null when SKU does not exist", async () => {
    mockedGetDummyJson
      .mockResolvedValueOnce({
        products: [
          {
            id: 1,
            sku: "SKU-001",
            title: "Phone",
            description: "Phone description",
            price: 200,
            category: "smartphones",
            brand: "Brand",
            thumbnail: "https://cdn.dummyjson.com/p1.webp",
            images: ["https://cdn.dummyjson.com/p1.webp"],
          },
        ],
        total: 1,
        skip: 0,
        limit: 1,
      });

    const product = await dummyJsonProductRepository.getProductBySku("NOT-FOUND");

    expect(product).toBeNull();
    expect(mockedGetDummyJson).toHaveBeenCalledTimes(1);
  });
});
