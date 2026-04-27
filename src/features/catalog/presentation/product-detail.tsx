import Image from "next/image";

import type { Product } from "@/features/catalog/domain/product";
import { formatPrice } from "@/lib/formatters";

type ProductDetailProps = {
  product: Product;
};

export function ProductDetail({ product }: ProductDetailProps) {
  const gallery = product.images.length > 0 ? product.images : [product.thumbnail];

  return (
    <article className="grid gap-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-2 md:p-6">
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {gallery.slice(0, 4).map((image, index) => (
            <div
              key={`${product.id}-${index}`}
              className="relative aspect-square overflow-hidden rounded-md border border-slate-200 bg-slate-100"
            >
              <Image
                src={image}
                alt={`${product.title} vista ${index + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          SKU: {product.sku}
        </p>
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{product.title}</h1>
        <p className="text-3xl font-bold text-slate-950">{formatPrice(product.price)}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
            Categoria: {product.category}
          </span>
          {product.brand ? (
            <span className="rounded-full bg-slate-100 px-3 py-1 text-slate-700">
              Marca: {product.brand}
            </span>
          ) : null}
        </div>
        <p className="text-sm leading-6 text-slate-700">{product.description}</p>
      </div>
    </article>
  );
}
