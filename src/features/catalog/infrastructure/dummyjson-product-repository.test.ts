import { describe, expect, it, vi } from "vitest";

import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { getDummyJson } from "@/features/catalog/infrastructure/dummyjson-client";

vi.mock("@/features/catalog/infrastructure/dummyjson-client", () => ({
  getDummyJson: vi.fn(),
}));

const mockedGetDummyJson = vi.mocked(getDummyJson);

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
