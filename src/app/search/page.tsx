import { PaginationControls } from "@/components/pagination-controls";
import { PageShell } from "@/components/page-shell";
import { getCatalogDependencies } from "@/features/catalog/application/dependencies";
import { getSearchCatalogViewModel } from "@/features/catalog/application/get-search-catalog-view-model";
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

  const dependencies = getCatalogDependencies();
  const searchViewModel = await getSearchCatalogViewModel(
    {
      searchTerm,
      page: currentPage,
      productsLimit: PRODUCTS_LIMIT,
      recommendedCategoriesLimit: RECOMMENDED_CATEGORIES_LIMIT,
    },
    dependencies,
  );

  return (
    <PageShell searchTerm={searchTerm} containerClassName="space-y-4">
      <p className="text-sm text-slate-700">
        {searchTerm
          ? `Resultados para "${searchTerm}" (${searchViewModel.paginatedProducts.total})`
          : `Mostrando ${searchViewModel.paginatedProducts.items.length} de ${searchViewModel.paginatedProducts.total} productos`}
      </p>

      {!searchViewModel.shouldShowEmptyState ? (
        <>
          <ProductGrid products={searchViewModel.paginatedProducts.items} />
          <PaginationControls
            currentPage={searchViewModel.paginatedProducts.currentPage}
            totalPages={searchViewModel.paginatedProducts.totalPages}
            basePath="/search"
            query={searchTerm ? { s: searchTerm } : undefined}
          />
        </>
      ) : (
        <EmptyResults categories={searchViewModel.recommendedCategories} />
      )}
    </PageShell>
  );
}
