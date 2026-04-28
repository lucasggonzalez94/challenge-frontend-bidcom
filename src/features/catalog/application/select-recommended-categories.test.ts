import { describe, expect, it } from "vitest";

import { selectRecommendedCategories } from "@/features/catalog/application/select-recommended-categories";

describe("selectRecommendedCategories", () => {
  const categories = [
    { slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/smartphones" },
    { slug: "laptops", name: "Laptops", url: "https://dummyjson.com/laptops" },
    { slug: "tablets", name: "Tablets", url: "https://dummyjson.com/tablets" },
    { slug: "accessories", name: "Accessories", url: "https://dummyjson.com/accessories" },
  ];

  it("returns limited number of categories", () => {
    const result = selectRecommendedCategories(categories, 2);

    expect(result).toHaveLength(2);
    expect(result).toEqual(categories.slice(0, 2));
  });

  it("returns all categories when limit exceeds array length", () => {
    const result = selectRecommendedCategories(categories, 10);

    expect(result).toHaveLength(4);
    expect(result).toEqual(categories);
  });

  it("returns empty array when input is empty", () => {
    const result = selectRecommendedCategories([], 3);

    expect(result).toHaveLength(0);
  });

  it("returns all categories when limit equals array length", () => {
    const result = selectRecommendedCategories(categories, 4);

    expect(result).toHaveLength(4);
    expect(result).toEqual(categories);
  });
});