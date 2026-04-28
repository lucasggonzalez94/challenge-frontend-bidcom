import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { CategoryDropdown } from "@/features/catalog/presentation/category-dropdown";

vi.mock("next/link", () => ({
  default: ({ href, children, className, onClick }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe("CategoryDropdown", () => {
  const categories = [
    { slug: "smartphones", name: "Smartphones", url: "https://dummyjson.com/smartphones" },
    { slug: "laptops", name: "Laptops", url: "https://dummyjson.com/laptops" },
    { slug: "tablets", name: "Tablets", url: "https://dummyjson.com/tablets" },
  ];

  it("renders Categories button", () => {
    render(<CategoryDropdown categories={categories} />);

    expect(screen.getByRole("button", { name: "Categorias" })).toBeInTheDocument();
  });

  it("opens dropdown when button is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryDropdown categories={categories} />);

    await user.click(screen.getByRole("button", { name: "Categorias" }));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });
    expect(screen.getByRole("link", { name: "Todas las categorias" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Smartphones" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Laptops" })).toBeInTheDocument();
  });

  it("renders all category links in dropdown", async () => {
    const user = userEvent.setup();
    render(<CategoryDropdown categories={categories} />);

    await user.click(screen.getByRole("button", { name: "Categorias" }));

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Smartphones" })).toHaveAttribute(
        "href",
        "/?category=smartphones",
      );
    });
    expect(screen.getByRole("link", { name: "Laptops" })).toHaveAttribute(
      "href",
      "/?category=laptops",
    );
    expect(screen.getByRole("link", { name: "Tablets" })).toHaveAttribute(
      "href",
      "/?category=tablets",
    );
  });

  it("highlights selected category", async () => {
    const user = userEvent.setup();
    render(<CategoryDropdown categories={categories} selectedCategorySlug="laptops" />);

    await user.click(screen.getByRole("button", { name: "Categorias" }));

    await waitFor(() => {
      const link = screen.getByRole("link", { name: "Laptops" });
      expect(link).toHaveClass("bg-blue-50", "text-blue-700");
    });
  });

  it("closes dropdown on Escape key", async () => {
    const user = userEvent.setup();
    render(<CategoryDropdown categories={categories} />);

    await user.click(screen.getByRole("button", { name: "Categorias" }));

    await waitFor(() => {
      expect(screen.getByRole("menu")).toBeInTheDocument();
    });

    await user.keyboard("{Escape}");

    await waitFor(() => {
      expect(screen.queryByRole("menu")).not.toBeInTheDocument();
    });
  });
});