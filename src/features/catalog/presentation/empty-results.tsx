import Link from "next/link";

import type { Category } from "@/features/catalog/domain/category";

type EmptyResultsProps = {
  categories: Category[];
};

export function EmptyResults({ categories }: EmptyResultsProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-base font-medium text-slate-900">
        No se encontro ningun producto. Te recomendamos buscar estas categorias.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/search?s=${encodeURIComponent(category.slug)}`}
            className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-100"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
