import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { dummyJsonProductRepository } from "@/features/catalog/infrastructure/dummyjson-product-repository";
import { ProductDetail } from "@/features/catalog/presentation/product-detail";

export const dynamic = "force-dynamic";

type ProductDetailPageProps = {
  params: Promise<{
    sku: string;
  }>;
};

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = await params;
  const sku = decodeURIComponent(resolvedParams.sku).trim();

  if (!sku) {
    notFound();
  }

  const product = await dummyJsonProductRepository.getProductBySku(sku);

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <ProductDetail product={product} />
    </PageShell>
  );
}
