import { Container } from "@/components/container";
import { Header } from "@/components/header";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { ProductGrid } from "@/features/catalog/presentation/product-grid";

const PRODUCTS_LIMIT = 20;

export default async function Home() {
  const products = await dummyJsonProductRepository.getInitialProducts(PRODUCTS_LIMIT);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-6 sm:py-8">
        <Container>
          <ProductGrid products={products} />
        </Container>
      </main>
    </div>
  );
}
