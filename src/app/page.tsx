import { PaginationControls } from "@/components/pagination-controls";
import { PageShell } from "@/components/page-shell";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
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

  const categories = await dummyJsonProductRepository.getCategories();
  const matchedCategory = categories.find(
    (category) => category.slug.toLowerCase() === selectedCategoryQuery,
  );

  const paginatedProducts = matchedCategory
    ? await dummyJsonProductRepository.getProductsByCategoryPage(
        matchedCategory.slug,
        PRODUCTS_LIMIT,
        currentPage,
      )
    : await dummyJsonProductRepository.getInitialProductsPage(PRODUCTS_LIMIT, currentPage);

  return (
    <PageShell containerClassName="space-y-4">
      <CategoryDropdown categories={categories} selectedCategorySlug={matchedCategory?.slug} />
      <p className="text-sm text-slate-700">
        {matchedCategory
          ? `Categoria: ${matchedCategory.name}. Mostrando ${paginatedProducts.items.length} de ${paginatedProducts.total} productos`
          : `Mostrando ${paginatedProducts.items.length} de ${paginatedProducts.total} productos`}
      </p>
      <ProductGrid products={paginatedProducts.items} />
      <PaginationControls
        currentPage={paginatedProducts.currentPage}
        totalPages={paginatedProducts.totalPages}
        basePath="/"
        query={matchedCategory ? { category: matchedCategory.slug } : undefined}
      />
    </PageShell>
  );
}
