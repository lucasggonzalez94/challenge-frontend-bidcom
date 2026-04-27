import { PageShell } from "@/components/page-shell";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { ProductGrid } from "@/features/catalog/presentation/product-grid";

const PRODUCTS_LIMIT = 20;

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await dummyJsonProductRepository.getInitialProducts(PRODUCTS_LIMIT);

  return (
    <PageShell>
      <ProductGrid products={products} />
    </PageShell>
  );
}
