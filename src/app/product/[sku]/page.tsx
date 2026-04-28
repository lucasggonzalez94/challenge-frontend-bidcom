import { notFound } from "next/navigation";

import { PageShell } from "@/components/page-shell";
import { getCatalogDependencies } from "@/features/catalog/application/dependencies";
import { getProductDetailViewModel } from "@/features/catalog/application/get-product-detail-view-model";
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

  const dependencies = getCatalogDependencies();
  const product = await getProductDetailViewModel(sku, dependencies);

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <ProductDetail product={product} />
    </PageShell>
  );
}
