import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "@/components/container";

describe("Container", () => {
  it("renders children", () => {
    const { getByText } = render(
      <Container>
        <span>Child content</span>
      </Container>,
    );

    expect(getByText("Child content")).toBeInTheDocument();
  });

  it("applies default CSS classes", () => {
    const { container } = render(<Container>Content</Container>);

    const div = container.firstChild;
    expect(div).toHaveClass("mx-auto", "w-full", "max-w-7xl", "px-4", "sm:px-6", "lg:px-8");
  });

  it("applies custom className", () => {
    const { container } = render(<Container className="custom-class">Content</Container>);

    const div = container.firstChild;
    expect(div).toHaveClass("custom-class");
  });

  it("merges custom className with default classes", () => {
    const { container } = render(<Container className="custom-class">Content</Container>);

    const div = container.firstChild;
    expect(div).toHaveClass("mx-auto", "custom-class");
  });
});