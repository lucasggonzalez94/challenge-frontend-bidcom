import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/features/catalog/domain/product";
import { formatPrice } from "@/lib/formatters";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.sku}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="relative aspect-square bg-slate-100">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="space-y-2 p-4">
        <h2 className="line-clamp-2 text-sm font-medium text-slate-900">{product.title}</h2>
        <p className="text-lg font-semibold text-slate-950">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
