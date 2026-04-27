"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoChevronDownOutline, IoGridOutline } from "react-icons/io5";

import type { Category } from "@/features/catalog/domain/category";

type CategoryDropdownProps = {
  categories: Category[];
  selectedCategorySlug?: string;
};

function toCategoryHref(slug?: string): string {
  if (!slug) {
    return "/";
  }

  return `/?category=${encodeURIComponent(slug)}`;
}

function itemClasses(active: boolean): string {
  if (active) {
    return "flex items-center justify-between rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700";
  }

  return "flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-800 transition-all hover:bg-slate-100 hover:text-blue-700";
}

export function CategoryDropdown({ categories, selectedCategorySlug }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current) {
        return;
      }

      if (!containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <section aria-label="Categorias" className="relative" ref={containerRef}>
      <div className="relative inline-block">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex cursor-pointer items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
        >
          Categorias
          <IoChevronDownOutline
            className={`h-4 w-4 text-slate-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isOpen ? (
          <div className="absolute left-0 top-full z-20 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
            <nav
              className="max-h-[60vh] space-y-1 overflow-y-auto pr-1"
              role="menu"
              aria-label="Listado de categorias"
            >
              <Link
                href={toCategoryHref()}
                className={itemClasses(!selectedCategorySlug)}
                onClick={() => setIsOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <IoGridOutline className="h-4 w-4" />
                  Todas las categorias
                </span>
              </Link>

              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={toCategoryHref(category.slug)}
                  className={itemClasses(selectedCategorySlug === category.slug)}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="truncate">{category.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        ) : null}
      </div>
    </section>
  );
}
