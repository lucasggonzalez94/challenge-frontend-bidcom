import { PageShell } from "@/components/page-shell";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { EmptyResults } from "@/features/catalog/presentation/empty-results";
import { ProductGrid } from "@/features/catalog/presentation/product-grid";
import { normalizeSearchTerm } from "@/lib/normalize";

const PRODUCTS_LIMIT = 20;
const RECOMMENDED_CATEGORIES_LIMIT = 5;

type SearchPageProps = {
  searchParams?:
    | Promise<{
        s?: string | string[];
      }>
    | {
        s?: string | string[];
      };
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const searchTerm = normalizeSearchTerm(resolvedSearchParams?.s);

  const categories = await dummyJsonProductRepository.getCategories();
  const recommendedCategories = categories.slice(0, RECOMMENDED_CATEGORIES_LIMIT);

  const matchedCategory = categories.find(
    (category) => category.slug.toLowerCase() === searchTerm,
  );

  const products = !searchTerm
    ? []
    : matchedCategory
      ? await dummyJsonProductRepository.getProductsByCategory(
          matchedCategory.slug,
          PRODUCTS_LIMIT,
        )
      : await dummyJsonProductRepository.searchProducts(searchTerm, PRODUCTS_LIMIT);

  return (
    <PageShell searchTerm={searchTerm} containerClassName="space-y-4">
      <p className="text-sm text-slate-700">
        {searchTerm
          ? `Resultados para "${searchTerm}" (${products.length})`
          : "Ingresa un termino para buscar productos."}
      </p>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <EmptyResults categories={recommendedCategories} />
      )}
    </PageShell>
  );
}
