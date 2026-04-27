import { describe, expect, it } from "vitest";

import { formatPrice } from "@/lib/formatters";

describe("formatPrice", () => {
  it("formats number into ARS currency", () => {
    const value = formatPrice(1999.5);

    expect(value).toContain("$");
    expect(value).toContain("1.999,5");
  });
});
