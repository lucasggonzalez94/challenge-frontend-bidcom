import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Header } from "@/components/header";

describe("Header", () => {
  it("renders Logo and SearchForm", () => {
    render(<Header />);

    expect(screen.getByLabelText("Ir a la pagina principal")).toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toBeInTheDocument();
  });

  it("passes searchTerm to SearchForm", () => {
    render(<Header searchTerm="laptop" />);

    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("laptop");
  });
});