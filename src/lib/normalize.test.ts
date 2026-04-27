import { describe, expect, it } from "vitest";

import { normalizeSearchTerm } from "@/lib/normalize";

describe("normalizeSearchTerm", () => {
  it("returns empty string for undefined", () => {
    expect(normalizeSearchTerm(undefined)).toBe("");
  });

  it("trims a string value", () => {
    expect(normalizeSearchTerm("  phone  ")).toBe("phone");
  });

  it("converts to lowercase", () => {
    expect(normalizeSearchTerm("PHONE")).toBe("phone");
  });

  it("uses the first value when query param is array", () => {
    expect(normalizeSearchTerm(["  camera  ", "phone"])).toBe("camera");
  });
});
