import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Logo } from "@/components/logo";

vi.mock("next/image", () => ({
  default: (props: { src: string; alt: string; width: number; height: number; priority?: boolean }) => {
    return <img src={props.src} alt={props.alt} width={props.width} height={props.height} />;
  },
}));

describe("Logo", () => {
  it("renders link with default href", () => {
    render(<Logo />);

    const link = screen.getByLabelText("Ir a la pagina principal");
    expect(link).toHaveAttribute("href", "/");
  });

  it("renders link with custom href", () => {
    render(<Logo href="/custom" />);

    const link = screen.getByLabelText("Ir a la pagina principal");
    expect(link).toHaveAttribute("href", "/custom");
  });

  it("renders logo image", () => {
    render(<Logo />);

    const image = screen.getByAltText("Bidcom");
    expect(image).toHaveAttribute("src", "/logo_bidcom.svg");
  });
});