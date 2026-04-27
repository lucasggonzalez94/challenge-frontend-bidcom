import { PaginationControls } from "@/components/pagination-controls";
import { PageShell } from "@/components/page-shell";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { ProductGrid } from "@/features/catalog/presentation/product-grid";
import { normalizePageParam } from "@/lib/normalize";

const PRODUCTS_LIMIT = 20;

export const dynamic = "force-dynamic";

type HomePageProps = {
  searchParams?: Promise<{
    page?: string | string[];
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = normalizePageParam(resolvedSearchParams?.page);

  const paginatedProducts = await dummyJsonProductRepository.getInitialProductsPage(
    PRODUCTS_LIMIT,
    currentPage,
  );

  return (
    <PageShell containerClassName="space-y-4">
      <p className="text-sm text-slate-700">
        Mostrando {paginatedProducts.items.length} de {paginatedProducts.total} productos
      </p>
      <ProductGrid products={paginatedProducts.items} />
      <PaginationControls
        currentPage={paginatedProducts.currentPage}
        totalPages={paginatedProducts.totalPages}
        basePath="/"
      />
    </PageShell>
  );
}
