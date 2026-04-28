import { describe, expect, it } from "vitest";

import { getProductDetailViewModel } from "@/features/catalog/application/get-product-detail-view-model";

describe("getProductDetailViewModel", () => {
  it("returns product when found by sku", async () => {
    const mockProduct = {
      id: 1,
      sku: "apple-ipad-pro",
      title: "Apple iPad Pro",
      description: "Professional tablet",
      price: 999,
      category: "tablets",
      brand: "Apple",
      thumbnail: "https://example.com/ipad.jpg",
      images: ["https://example.com/ipad.jpg"],
    };

    const dependencies = {
      detailRepository: {
        getProductBySku: async (sku: string) => {
          if (sku === "apple-ipad-pro") {
            return mockProduct;
          }
          return null;
        },
      },
    };

    const result = await getProductDetailViewModel("apple-ipad-pro", dependencies);

    expect(result).toEqual(mockProduct);
  });

  it("returns null when product not found", async () => {
    const dependencies = {
      detailRepository: {
        getProductBySku: async () => null,
      },
    };

    const result = await getProductDetailViewModel("non-existent", dependencies);

    expect(result).toBeNull();
  });
});