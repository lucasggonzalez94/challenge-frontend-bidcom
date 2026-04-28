import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductCard } from "@/features/catalog/presentation/product-card";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string; fill?: boolean; sizes?: string; className?: string }) => {
    return <img src={props.src} alt={props.alt} className={props.className} />;
  },
}));

describe("ProductCard", () => {
  const product = {
    id: 1,
    sku: "iphone-15",
    title: "iPhone 15 Pro Max",
    description: "Latest iPhone with titanium design",
    price: 1199,
    category: "smartphones",
    brand: "Apple",
    thumbnail: "https://example.com/iphone.jpg",
    images: ["https://example.com/iphone.jpg", "https://example.com/iphone-2.jpg"],
  };

  it("renders product title and price", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("iPhone 15 Pro Max")).toBeInTheDocument();
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });

  it("renders link to product detail page", () => {
    render(<ProductCard product={product} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/product/iphone-15");
  });

  it("renders thumbnail image with alt text", () => {
    render(<ProductCard product={product} />);

    const image = screen.getByAltText("iPhone 15 Pro Max");
    expect(image).toHaveAttribute("src", "https://example.com/iphone.jpg");
  });
});