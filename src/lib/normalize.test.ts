import { describe, expect, it } from "vitest";

import { normalizePageParam, normalizeSearchTerm } from "@/lib/normalize";

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

describe("normalizePageParam", () => {
  it("returns 1 when value is undefined", () => {
    expect(normalizePageParam(undefined)).toBe(1);
  });

  it("returns 1 for invalid values", () => {
    expect(normalizePageParam("abc")).toBe(1);
    expect(normalizePageParam("0")).toBe(1);
    expect(normalizePageParam("-2")).toBe(1);
  });

  it("parses a valid page number", () => {
    expect(normalizePageParam("3")).toBe(3);
  });
});
