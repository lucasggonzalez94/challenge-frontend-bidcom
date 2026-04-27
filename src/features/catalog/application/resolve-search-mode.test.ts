import { describe, expect, it } from "vitest";

import { resolveSearchMode } from "@/features/catalog/application/resolve-search-mode";

const categories = [
  { slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/smartphones" },
  { slug: "laptops", name: "Laptops", url: "https://dummyjson.com/laptops" },
];

describe("resolveSearchMode", () => {
  it("returns empty mode when term is empty", () => {
    expect(resolveSearchMode("   ", categories)).toEqual({ type: "empty" });
  });

  it("returns category mode when search term matches category slug", () => {
    const result = resolveSearchMode("SMARTPHONES", categories);

    expect(result).toEqual({ type: "category", category: categories[0] });
  });

  it("returns term mode for free-text search", () => {
    const result = resolveSearchMode("iphone", categories);

    expect(result).toEqual({ type: "term", term: "iphone" });
  });
});
