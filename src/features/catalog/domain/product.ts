export type Product = {
  id: number;
  sku: string;
  title: string;
  description: string;
  price: number;
  category: string;
  brand: string | null;
  thumbnail: string;
  images: string[];
};
