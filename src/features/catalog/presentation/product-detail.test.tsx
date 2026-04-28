import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ProductDetail } from "@/features/catalog/presentation/product-detail";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string; fill?: boolean; priority?: boolean; sizes?: string; className?: string }) => {
    return <img src={props.src} alt={props.alt} className={props.className} />;
  },
}));

describe("ProductDetail", () => {
  const product = {
    id: 1,
    sku: "iphone-15-pro",
    title: "iPhone 15 Pro Max",
    description: "The most powerful iPhone ever with titanium design and A17 Pro chip.",
    price: 1199,
    category: "smartphones",
    brand: "Apple",
    thumbnail: "https://example.com/iphone-main.jpg",
    images: [
      "https://example.com/iphone-1.jpg",
      "https://example.com/iphone-2.jpg",
      "https://example.com/iphone-3.jpg",
      "https://example.com/iphone-4.jpg",
    ],
  };

  it("renders product title and price", () => {
    render(<ProductDetail product={product} />);

    expect(screen.getByText("iPhone 15 Pro Max")).toBeInTheDocument();
    expect(screen.getByText(/\$/)).toBeInTheDocument();
  });

  it("renders SKU and category", () => {
    render(<ProductDetail product={product} />);

    expect(screen.getByText(/SKU: iphone-15-pro/)).toBeInTheDocument();
    expect(screen.getByText(/Categoria: smartphones/)).toBeInTheDocument();
  });

  it("renders brand when present", () => {
    render(<ProductDetail product={product} />);

    expect(screen.getByText(/Marca: Apple/)).toBeInTheDocument();
  });

  it("renders product description", () => {
    render(<ProductDetail product={product} />);

    expect(
      screen.getByText("The most powerful iPhone ever with titanium design and A17 Pro chip."),
    ).toBeInTheDocument();
  });

  it("renders thumbnail image", () => {
    render(<ProductDetail product={product} />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("alt", "iPhone 15 Pro Max");
  });

  it("renders gallery thumbnails", () => {
    render(<ProductDetail product={product} />);

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(5);
    expect(images[1]).toHaveAttribute("alt", "iPhone 15 Pro Max vista 1");
  });

  it("renders fallback thumbnail when no images array", () => {
    const productNoImages = {
      ...product,
      images: [],
    };

    render(<ProductDetail product={productNoImages} />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("alt", "iPhone 15 Pro Max");
  });
});