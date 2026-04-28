import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PageShell } from "@/components/page-shell";

describe("PageShell", () => {
  it("renders Header and children", () => {
    render(
      <PageShell>
        <span>Main content</span>
      </PageShell>,
    );

    expect(screen.getByLabelText("Ir a la pagina principal")).toBeInTheDocument();
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("passes searchTerm to Header", () => {
    render(
      <PageShell searchTerm="phone">
        <span>Content</span>
      </PageShell>,
    );

    const input = screen.getByRole("searchbox");
    expect(input).toHaveValue("phone");
  });

  it("applies mainClassName to main element", () => {
    render(
      <PageShell mainClassName="custom-main">
        <span>Content</span>
      </PageShell>,
    );

    const main = document.querySelector("main");
    expect(main).toHaveClass("custom-main");
  });

  it("applies containerClassName to Container", () => {
    render(
      <PageShell containerClassName="custom-container">
        <span>Content</span>
      </PageShell>,
    );

    const container = document.querySelector(".custom-container");
    expect(container).toBeInTheDocument();
  });
});