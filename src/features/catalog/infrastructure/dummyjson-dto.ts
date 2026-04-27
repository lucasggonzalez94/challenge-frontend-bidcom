export type DummyJsonProductDto = {
  id: number;
  sku: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  thumbnail: string;
  images: string[];
};

export type DummyJsonProductsResponseDto = {
  products: DummyJsonProductDto[];
  total: number;
  skip: number;
  limit: number;
};

export type DummyJsonCategoryDto = {
  slug: string;
  name: string;
  url: string;
};
