import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PaginationControls } from "@/components/pagination-controls";

describe("PaginationControls", () => {
  it("returns null when totalPages is 1", () => {
    const { container } = render(
      <PaginationControls currentPage={1} totalPages={1} basePath="/search" />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("renders page info and navigation links", () => {
    render(
      <PaginationControls currentPage={2} totalPages={5} basePath="/search" />,
    );

    expect(screen.getByText("Pagina 2 de 5")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Anterior" })).toHaveAttribute(
      "href",
      "/search",
    );
    expect(screen.getByRole("link", { name: "Siguiente" })).toHaveAttribute(
      "href",
      "/search?page=3",
    );
  });

  it("disables previous button on first page", () => {
    render(
      <PaginationControls currentPage={1} totalPages={3} basePath="/search" />,
    );

    const anterior = screen.getByText("Anterior");
    expect(anterior.tagName).toBe("SPAN");
  });

  it("disables next button on last page", () => {
    render(
      <PaginationControls currentPage={3} totalPages={3} basePath="/search" />,
    );

    expect(screen.getByText("Siguiente")).not.toHaveAttribute("href");
  });

  it("includes query params in pagination links", () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        basePath="/search"
        query={{ s: "laptop" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Siguiente" })).toHaveAttribute(
      "href",
      "/search?s=laptop&page=2",
    );
  });

  it("does not include page param in query when on first page", () => {
    render(
      <PaginationControls
        currentPage={1}
        totalPages={5}
        basePath="/search"
        query={{ s: "phone", category: "smartphones" }}
      />,
    );

    expect(screen.getByRole("link", { name: "Siguiente" })).toHaveAttribute(
      "href",
      "/search?s=phone&category=smartphones&page=2",
    );
  });
});