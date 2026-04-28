import { afterEach, describe, expect, it, vi } from "vitest";

import { getDummyJson } from "@/features/catalog/infrastructure/dummyjson-client";

describe("getDummyJson", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("requests DummyJSON with default revalidate", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ hello: "world" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const result = await getDummyJson<{ hello: string }>("/products");

    expect(result).toEqual({ hello: "world" });
    expect(fetchMock).toHaveBeenCalledWith("https://dummyjson.com/products", {
      next: {
        revalidate: 300,
      },
    });
  });

  it("throws a descriptive error when request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
      statusText: "Too Many Requests",
    });

    vi.stubGlobal("fetch", fetchMock);

    await expect(getDummyJson("/products")).rejects.toThrow(
      "DummyJSON request failed (429 Too Many Requests) for /products",
    );
  });
});
