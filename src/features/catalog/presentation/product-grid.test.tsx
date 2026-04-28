import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProductGrid } from "@/features/catalog/presentation/product-grid";

describe("ProductGrid", () => {
  it("renders product cards for each product", () => {
    const products = [
      {
        id: 1,
        sku: "iphone-15",
        title: "iPhone 15",
        description: "Latest iPhone",
        price: 999,
        category: "smartphones",
        brand: "Apple",
        thumbnail: "https://example.com/iphone.jpg",
        images: ["https://example.com/iphone.jpg"],
      },
      {
        id: 2,
        sku: "galaxy-s24",
        title: "Galaxy S24",
        description: "Latest Samsung",
        price: 899,
        category: "smartphones",
        brand: "Samsung",
        thumbnail: "https://example.com/galaxy.jpg",
        images: ["https://example.com/galaxy.jpg"],
      },
    ];

    render(<ProductGrid products={products} />);

    expect(screen.getByText("iPhone 15")).toBeInTheDocument();
    expect(screen.getByText("Galaxy S24")).toBeInTheDocument();
  });

  it("renders empty grid when no products", () => {
    render(<ProductGrid products={[]} />);

    const section = document.querySelector("section");
    expect(section).toBeEmptyDOMElement();
  });
});