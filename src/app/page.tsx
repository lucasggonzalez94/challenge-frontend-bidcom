import { PaginationControls } from "@/components/pagination-controls";
import { PageShell } from "@/components/page-shell";
import { getCatalogDependencies } from "@/features/catalog/application/dependencies";
import { getHomeCatalogViewModel } from "@/features/catalog/application/get-home-catalog-view-model";
import { CategoryDropdown } from "@/features/catalog/presentation/category-dropdown";
import { ProductGrid } from "@/features/catalog/presentation/product-grid";
import { normalizePageParam, normalizeSearchTerm } from "@/lib/normalize";

const PRODUCTS_LIMIT = 20;

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams?: Promise<{
    page?: string | string[];
    category?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = normalizePageParam(resolvedSearchParams?.page);
  const selectedCategoryQuery = normalizeSearchTerm(resolvedSearchParams?.category);

  const dependencies = getCatalogDependencies();
  const homeViewModel = await getHomeCatalogViewModel(
    {
      page: currentPage,
      categoryQuery: selectedCategoryQuery,
      productsLimit: PRODUCTS_LIMIT,
    },
    dependencies,
  );

  return (
    <PageShell containerClassName="space-y-4">
      <CategoryDropdown
        categories={homeViewModel.categories}
        selectedCategorySlug={homeViewModel.selectedCategory?.slug}
      />
      <p className="text-sm text-slate-700">
        {homeViewModel.selectedCategory
          ? `Categoria: ${homeViewModel.selectedCategory.name}. Mostrando ${homeViewModel.paginatedProducts.items.length} de ${homeViewModel.paginatedProducts.total} productos`
          : `Mostrando ${homeViewModel.paginatedProducts.items.length} de ${homeViewModel.paginatedProducts.total} productos`}
      </p>
      <ProductGrid products={homeViewModel.paginatedProducts.items} />
      <PaginationControls
        currentPage={homeViewModel.paginatedProducts.currentPage}
        totalPages={homeViewModel.paginatedProducts.totalPages}
        basePath="/"
        query={
          homeViewModel.selectedCategory
            ? { category: homeViewModel.selectedCategory.slug }
            : undefined
        }
      />
    </PageShell>
  );
}
