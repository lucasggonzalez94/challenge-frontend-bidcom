import Link from "next/link";

import type { Category } from "@/features/catalog/domain/category";

type CategoryFilterBarProps = {
  categories: Category[];
  selectedCategorySlug?: string;
};

function categoryHref(slug?: string): string {
  if (!slug) {
    return "/";
  }

  return `/?category=${encodeURIComponent(slug)}`;
}

function chipClasses(active: boolean): string {
  if (active) {
    return "rounded-full border border-blue-700 bg-blue-700 px-3 py-1.5 text-sm font-medium text-white";
  }

  return "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100";
}

export function CategoryFilterBar({
  categories,
  selectedCategorySlug,
}: CategoryFilterBarProps) {
  return (
    <section aria-label="Filtros por categoria" className="overflow-x-auto pb-1">
      <div className="flex min-w-max items-center gap-2">
        <Link href={categoryHref()} className={chipClasses(!selectedCategorySlug)}>
          Todas
        </Link>

        {categories.map((category) => (
          <Link
            key={category.slug}
            href={categoryHref(category.slug)}
            className={chipClasses(selectedCategorySlug === category.slug)}
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
