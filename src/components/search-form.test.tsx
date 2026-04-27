import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchForm } from "@/components/search-form";

describe("SearchForm", () => {
  it("renders with GET action and default value", () => {
    render(<SearchForm defaultValue="laptop" />);

    const input = screen.getByRole("searchbox");
    const form = input.closest("form");

    expect(input).toHaveValue("laptop");
    expect(form).toHaveAttribute("action", "/search");
    expect(form).toHaveAttribute("method", "get");
  });

  it("submits when clicking search icon button", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: Event) => event.preventDefault());

    render(<SearchForm />);
    const input = screen.getByRole("searchbox");
    const form = input.closest("form");

    if (!form) {
      throw new Error("Search form was not rendered");
    }

    form.addEventListener("submit", onSubmit);
    await user.click(screen.getByRole("button", { name: "Buscar" }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });
});
