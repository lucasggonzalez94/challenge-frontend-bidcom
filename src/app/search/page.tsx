import { PaginationControls } from "@/components/pagination-controls";
import { PageShell } from "@/components/page-shell";
import { resolveSearchMode } from "@/features/catalog/application/resolve-search-mode";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { EmptyResults } from "@/features/catalog/presentation/empty-results";
import { ProductGrid } from "@/features/catalog/presentation/product-grid";
import { normalizePageParam, normalizeSearchTerm } from "@/lib/normalize";

const PRODUCTS_LIMIT = 20;
const RECOMMENDED_CATEGORIES_LIMIT = 5;

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams?: Promise<{
    s?: string | string[];
    page?: string | string[];
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = normalizeSearchTerm(resolvedSearchParams?.s);
  const currentPage = normalizePageParam(resolvedSearchParams?.page);

  const categories = await dummyJsonProductRepository.getCategories();
  const recommendedCategories = categories.slice(0, RECOMMENDED_CATEGORIES_LIMIT);
  const searchMode = resolveSearchMode(searchTerm, categories);

  const paginatedProducts =
    searchMode.type === "empty"
      ? await dummyJsonProductRepository.getInitialProductsPage(PRODUCTS_LIMIT, currentPage)
      : searchMode.type === "category"
        ? await dummyJsonProductRepository.getProductsByCategoryPage(
            searchMode.category.slug,
            PRODUCTS_LIMIT,
            currentPage,
          )
        : await dummyJsonProductRepository.searchProductsPage(
            searchMode.term,
            PRODUCTS_LIMIT,
            currentPage,
          );

  return (
    <PageShell searchTerm={searchTerm} containerClassName="space-y-4">
      <p className="text-sm text-slate-700">
        {searchTerm
          ? `Resultados para "${searchTerm}" (${paginatedProducts.total})`
          : `Mostrando ${paginatedProducts.items.length} de ${paginatedProducts.total} productos`}
      </p>

      {paginatedProducts.items.length > 0 ? (
        <>
          <ProductGrid products={paginatedProducts.items} />
          <PaginationControls
            currentPage={paginatedProducts.currentPage}
            totalPages={paginatedProducts.totalPages}
            basePath="/search"
            query={searchTerm ? { s: searchTerm } : undefined}
          />
        </>
      ) : (
        <EmptyResults categories={recommendedCategories} />
      )}
    </PageShell>
  );
}
