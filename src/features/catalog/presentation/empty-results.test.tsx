import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyResults } from "@/features/catalog/presentation/empty-results";

describe("EmptyResults", () => {
  it("shows empty state message and category links", () => {
    render(
      <EmptyResults
        categories={[
          {
            slug: "mobile-accessories",
            name: "Mobile Accessories",
            url: "https://dummyjson.com/products/category/mobile-accessories",
          },
          {
            slug: "smartphones",
            name: "Smartphones",
            url: "https://dummyjson.com/products/category/smartphones",
          },
        ]}
      />,
    );

    expect(
      screen.getByText("No se encontro ningun producto. Te recomendamos buscar estas categorias."),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Mobile Accessories" })).toHaveAttribute(
      "href",
      "/search?s=mobile-accessories",
    );
    expect(screen.getByRole("link", { name: "Smartphones" })).toHaveAttribute(
      "href",
      "/search?s=smartphones",
    );
  });
});
