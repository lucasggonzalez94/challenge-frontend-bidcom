import "server-only";

const DUMMYJSON_BASE_URL = "https://dummyjson.com";
const DEFAULT_REVALIDATE_SECONDS = 300;

type NextFetchInit = RequestInit & {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
};

export async function getDummyJson<T>(
  path: string,
  init?: NextFetchInit,
): Promise<T> {
  const response = await fetch(`${DUMMYJSON_BASE_URL}${path}`, {
    ...init,
    next: {
      revalidate: DEFAULT_REVALIDATE_SECONDS,
      ...init?.next,
    },
  });

  if (!response.ok) {
    throw new Error(
      `DummyJSON request failed (${response.status} ${response.statusText}) for ${path}`,
    );
  }

  return (await response.json()) as T;
}
