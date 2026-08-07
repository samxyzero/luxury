import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Building2, Check, Home, MapPin, Phone } from "lucide-react";
import CornerMarks from "@/components/CornerMarks";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import { getSiteSettings, getProducts, getProductBySlug } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { truncate } from "@/lib/format";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found", robots: { index: false, follow: true } };
  }

  return pageMetadata({
    title: product.name,
    description: truncate(product.shortDescription ?? product.description, 300),
    path: `/products/${product.slug}`,
    image: product.image,
    keywords: [
      product.name,
      product.category,
      `${product.name} Pokhara`,
      `${product.name} Nepal`,
      `hotel ${product.name.toLowerCase()} Nepal`,
      `${product.category} Nepal`,
    ],
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, site, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
    getProducts(),
  ]);

  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 3);

  const variants = product.variants ?? [];
  const highlights = product.highlights ?? [];
  const homesPoints = product.homesPoints ?? [];
  const hotelsPoints = product.hotelsPoints ?? [];
  const hasSplit = Boolean(product.homesSummary || product.hotelsSummary);

  const enquire = (context: string) =>
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      `Hi ${site.businessName}, I'd like a quote for ${product.name} (${context}).`
    )}`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription ?? product.description,
    image: product.image,
    category: product.category,
    url: `${siteUrl}/products/${product.slug}`,
    brand: { "@type": "Brand", name: site.businessName },
    ...(product.material ? { material: product.material } : {}),
    ...(variants.length > 0
      ? {
          hasVariant: variants.map((v) => ({
            "@type": "Product",
            name: `${product.name} — ${v.name}${v.size ? ` (${v.size})` : ""}`,
            ...(v.sku ? { sku: v.sku } : {}),
          })),
        }
      : {}),
    offers: {
      "@type": "Offer",
      availability:
        product.inStock === false
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      priceCurrency: product.currency ?? "NPR",
      seller: { "@type": "Organization", name: site.businessName },
      url: `${siteUrl}/products/${product.slug}`,
    },
  };

  return (
    <PageShell
      trail={[
        { name: "Products", path: "/products" },
        { name: product.name, path: `/products/${product.slug}` },
      ]}
    >
      <JsonLd data={productJsonLd} />

      <section className="bg-paper py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
                <CornerMarks tone="gold" inset={16} />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="label text-ink-muted">{product.category}</span>
              </div>

              <h1 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Badge tone="muted">{product.idealFor}</Badge>
                {product.inStock === false ? (
                  <Badge tone="muted" className="opacity-70">
                    Made to order
                  </Badge>
                ) : (
                  <Badge tone="gold">In stock</Badge>
                )}
              </div>

              <p className="mt-6 text-base leading-relaxed text-ink-muted sm:text-lg">
                {product.description}
              </p>

              {highlights.length > 0 && (
                <ul className="mt-8 space-y-3 border-t border-stone pt-6">
                  {highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-ink-muted">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href={enquire("general enquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label border border-navy px-7 py-4 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href={`tel:${site.phone}`}
                  className="group label inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-gold-dim"
                >
                  <Phone className="h-4 w-4" />
                  {site.phoneDisplay}
                </a>
              </div>

              <div className="mt-10 border-t border-stone pt-6">
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm text-ink-muted transition-colors duration-300 hover:text-gold-dim"
                >
                  <MapPin className="h-4 w-4 text-gold" />
                  See it in our {site.address.city} showroom
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* The household and trade ranges genuinely differ — spelling that out is
          the main job of this page for someone deciding which they need. */}
      {hasSplit && (
        <section className="bg-navy py-20 sm:py-24 lg:py-28">
          <Container>
            <Reveal className="max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-gold" />
                <span className="label text-paper/55">Two Ranges</span>
              </div>
              <h2 className="mt-6 font-display text-3xl font-medium leading-[1.1] tracking-tight text-paper sm:text-4xl">
                What We Stock for Homes, and What We Stock for Properties
              </h2>
            </Reveal>

            <div className="mt-12 grid gap-px overflow-hidden border border-stone-on-navy bg-stone-on-navy lg:grid-cols-2">
              {[
                {
                  key: "homes",
                  icon: Home,
                  label: "For Homes",
                  summary: product.homesSummary,
                  points: homesPoints,
                  cta: "Enquire for my home",
                  context: "for my home",
                },
                {
                  key: "hotels",
                  icon: Building2,
                  label: "For Hotels, Resorts & Apartments",
                  summary: product.hotelsSummary,
                  points: hotelsPoints,
                  cta: "Enquire for a property",
                  context: "for a property",
                },
              ]
                .filter((col) => col.summary)
                .map((col, i) => (
                  <Reveal key={col.key} delay={i * 0.1} className="bg-navy p-8 sm:p-10">
                    <div className="flex items-center gap-3">
                      <col.icon className="h-5 w-5 text-gold" />
                      <h3 className="label text-gold">{col.label}</h3>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-paper/75">{col.summary}</p>

                    {col.points.length > 0 && (
                      <ul className="mt-7 space-y-3 border-t border-stone-on-navy pt-6">
                        {col.points.map((point) => (
                          <li
                            key={point}
                            className="flex items-start gap-3 text-sm text-paper/60"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href={enquire(col.context)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group label mt-8 inline-flex items-center gap-2 border border-stone-on-navy px-5 py-3 text-paper transition-colors duration-300 hover:border-gold hover:text-gold"
                    >
                      {col.cta}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Reveal>
                ))}
            </div>
          </Container>
        </section>
      )}

      {(variants.length > 0 || product.material || product.care) && (
        <section className="border-t border-stone bg-paper-dim py-16 sm:py-20">
          <Container>
            <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
              Specifications
            </h2>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              {variants.length > 0 && (
                <div className="lg:col-span-7">
                  <h3 className="label text-ink-muted">Sizes &amp; Options</h3>
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[26rem] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-stone">
                          <th scope="col" className="label py-3 pr-4 font-semibold text-ink">
                            Option
                          </th>
                          <th scope="col" className="label py-3 pr-4 font-semibold text-ink">
                            Size
                          </th>
                          <th scope="col" className="label py-3 font-semibold text-ink">
                            Availability
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((variant) => (
                          <tr key={variant.id} className="border-b border-stone/60">
                            <td className="py-3 pr-4 font-medium text-ink">{variant.name}</td>
                            <td className="py-3 pr-4 text-ink-muted">{variant.size ?? "—"}</td>
                            <td className="py-3 text-ink-muted">
                              {variant.inStock ? "In stock" : "To order"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-sm text-ink-muted">
                    Custom sizes are available on most ranges — send us the measurements and
                    we&apos;ll confirm what&apos;s possible.
                  </p>
                </div>
              )}

              <div className="space-y-8 lg:col-span-5">
                {product.material && (
                  <div>
                    <h3 className="label text-ink-muted">Materials &amp; Quality</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                      {product.material}
                    </p>
                  </div>
                )}
                {product.care && (
                  <div className="border-t border-stone pt-8">
                    <h3 className="label text-ink-muted">Care</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-muted">{product.care}</p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="border-t border-stone bg-paper py-20 sm:py-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                More in {product.category}
              </h2>
              <Link
                href="/products"
                className="group label inline-flex items-center gap-2 text-ink transition-colors duration-300 hover:text-gold-dim"
              >
                All Products
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <CornerMarks
                      tone="paper"
                      inset={12}
                      className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-medium text-ink">{item.name}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                    {item.shortDescription ?? item.description}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </PageShell>
  );
}
