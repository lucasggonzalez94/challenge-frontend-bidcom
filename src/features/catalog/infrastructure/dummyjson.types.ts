export interface DummyJsonProductDto {
  id: number;
  sku: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand?: string;
  thumbnail: string;
  images: string[];
}

export interface DummyJsonProductsResponseDto {
  products: DummyJsonProductDto[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyJsonCategoryDto {
  slug: string;
  name: string;
  url: string;
}
