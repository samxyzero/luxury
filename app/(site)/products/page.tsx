import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsGrid from "@/components/ProductsGrid";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import { getSiteSettings, getProducts } from "@/lib/content";
import { pageMetadata, itemListJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const products = await getProducts();
  const categories = Array.from(new Set(products.map((p) => p.category)));

  return pageMetadata({
    title: "Products",
    description: `Browse our full range of home and hotel furnishings — ${categories
      .slice(0, 5)
      .join(", ")} and more. Premium mattresses, linens, curtains, carpets and towels in Pokhara, Nepal.`,
    path: "/products",
    image: products[0]?.image,
    keywords: [
      "furnishing products Pokhara",
      "mattresses Nepal",
      "hotel linens Nepal",
      "curtains carpets Pokhara",
      ...categories,
    ],
  });
}

export default async function ProductsPage() {
  const [site, products] = await Promise.all([getSiteSettings(), getProducts()]);

  return (
    <PageShell trail={[{ name: "Products", path: "/products" }]}>
      <JsonLd
        data={itemListJsonLd(
          products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
          `${site.businessName} Products`
        )}
      />
      {/* ProductsGrid reads ?category= via useSearchParams, which needs a
          Suspense boundary for this page to stay statically pre-rendered. */}
      <Suspense fallback={null}>
        <ProductsGrid
          products={products}
          as="h1"
          eyebrow="Our Catalogue"
          heading="Furnishings for Every Room and Every Guest"
          intro="Every category below is curated for both family homes and working hospitality spaces — built to look considered on day one and hold up years later."
        />
      </Suspense>
    </PageShell>
  );
}
