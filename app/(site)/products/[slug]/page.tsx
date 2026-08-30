import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Building2, Check, Home, MapPin, Phone } from "lucide-react";
import PageShell from "@/components/PageShell";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/fx/RevealText";
import Parallax from "@/components/fx/Parallax";
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

      <section className="bg-void py-16 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* The arch again, at product scale — the same frame the hero uses,
                so a range reads as part of the same collection. */}
            <Reveal className="lg:col-span-6">
              <Parallax distance={50} className="arch aspect-[4/5] w-full">
                <div className="relative -top-[6%] h-[112%] w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="(min-width: 1024px) 48vw, 100vw"
                  />
                </div>
              </Parallax>
            </Reveal>

            <div className="lg:col-span-6 lg:pt-8">
              <Eyebrow>{product.category}</Eyebrow>

              <RevealText
                as="h1"
                text={product.name}
                className="lead-tight font-display mt-6 text-[clamp(2.5rem,5.5vw,4.5rem)] font-medium"
              />

              <Reveal delay={0.12}>
                <div className="mt-6 flex flex-wrap items-center gap-2.5">
                  <Badge tone="outline">{product.idealFor}</Badge>
                  {product.inStock === false ? (
                    <Badge tone="outline">Made to order</Badge>
                  ) : (
                    <Badge tone="saffron">In stock</Badge>
                  )}
                </div>

                <p className="text-ash mt-7 text-lg leading-relaxed text-pretty">
                  {product.description}
                </p>

                {highlights.length > 0 && (
                  <ul className="border-smoke mt-8 space-y-3 border-t pt-6">
                    {highlights.map((item) => (
                      <li key={item} className="text-ash flex items-start gap-3 text-sm">
                        <Check className="text-saffron mt-0.5 h-4 w-4 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a
                    href={enquire("general enquiry")}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="Chat"
                    className="mono-label bg-saffron text-void hover:bg-bone inline-flex items-center gap-2 rounded-full px-7 py-4 transition-colors duration-500"
                  >
                    Enquire on WhatsApp
                  </a>
                  <a
                    href={`tel:${site.phone}`}
                    className="mono-label border-smoke text-bone hover:border-bone inline-flex items-center gap-2 rounded-full border px-7 py-4 transition-colors duration-500"
                  >
                    <Phone className="h-4 w-4" />
                    {site.phoneDisplay}
                  </a>
                </div>

                <div className="border-smoke mt-10 border-t pt-6">
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-ash hover:text-saffron inline-flex items-center gap-2 text-sm transition-colors duration-300"
                  >
                    <MapPin className="text-saffron h-4 w-4" />
                    See it in our {site.address.city} showroom
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* The household and trade ranges genuinely differ — spelling that out is
          the main job of this page for someone deciding which they need. */}
      {hasSplit && (
        <section className="bg-char border-smoke border-y py-20 sm:py-28">
          <Container>
            <div className="max-w-2xl">
              <Eyebrow>Two Ranges</Eyebrow>
              <RevealText
                as="h2"
                text="What we stock for homes, and what we stock for properties"
                accent={["properties"]}
                className="lead-tight font-display mt-6 text-[clamp(1.9rem,4vw,3rem)] font-medium text-balance"
              />
            </div>

            <div className="bg-smoke mt-12 grid gap-px lg:grid-cols-2">
              {[
                {
                  key: "homes",
                  icon: Home,
                  label: "For Homes",
                  accent: "text-saffron",
                  summary: product.homesSummary,
                  points: homesPoints,
                  cta: "Enquire for my home",
                  context: "for my home",
                },
                {
                  key: "hotels",
                  icon: Building2,
                  label: "For Hotels, Resorts & Apartments",
                  accent: "text-ember",
                  summary: product.hotelsSummary,
                  points: hotelsPoints,
                  cta: "Enquire for a property",
                  context: "for a property",
                },
              ]
                .filter((col) => col.summary)
                .map((col, i) => (
                  <Reveal key={col.key} delay={i * 0.1} className="bg-char p-8 sm:p-10">
                    <div className="flex items-center gap-3">
                      <col.icon className={`h-5 w-5 ${col.accent}`} />
                      <h3 className={`mono-label ${col.accent}`}>{col.label}</h3>
                    </div>

                    <p className="text-bone/75 mt-5 leading-relaxed">{col.summary}</p>

                    {col.points.length > 0 && (
                      <ul className="border-smoke mt-7 space-y-3 border-t pt-6">
                        {col.points.map((point) => (
                          <li key={point} className="text-ash flex items-start gap-3 text-sm">
                            <Check className="text-saffron mt-0.5 h-4 w-4 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    <a
                      href={enquire(col.context)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mono-label border-smoke text-bone hover:border-saffron hover:text-saffron mt-8 inline-flex items-center gap-2 rounded-full border px-5 py-3 transition-colors duration-500"
                    >
                      {col.cta}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </Reveal>
                ))}
            </div>
          </Container>
        </section>
      )}

      {/* Specifications sit on bone: this is the reference part of the page, and
          it should read like a printed spec sheet rather than more showroom. */}
      {(variants.length > 0 || product.material || product.care) && (
        <section className="bg-bone text-void py-16 sm:py-24">
          <Container>
            <Eyebrow tone="void">Specifications</Eyebrow>

            <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
              {variants.length > 0 && (
                <div className="lg:col-span-7">
                  <h2 className="font-display text-3xl font-medium">Sizes &amp; Options</h2>
                  <div className="mt-6 overflow-x-auto">
                    <table className="w-full min-w-[26rem] border-collapse text-left">
                      <thead>
                        <tr className="border-void/25 border-b">
                          {["Option", "Size", "Availability"].map((head) => (
                            <th
                              key={head}
                              scope="col"
                              className="mono-label text-slate py-3 pr-4"
                            >
                              {head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {variants.map((variant) => (
                          <tr key={variant.id} className="border-void/12 border-b">
                            <td className="text-void py-3.5 pr-4 font-medium">
                              {variant.name}
                            </td>
                            <td className="text-slate py-3.5 pr-4 tabular-nums">
                              {variant.size ?? "—"}
                            </td>
                            <td className="py-3.5">
                              <span
                                className={`mono-label ${
                                  variant.inStock ? "text-ember" : "text-slate"
                                }`}
                              >
                                {variant.inStock ? "In stock" : "To order"}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-slate mt-4 text-sm">
                    Custom sizes are available on most ranges — send us the measurements
                    and we&apos;ll confirm what&apos;s possible.
                  </p>
                </div>
              )}

              <div className="space-y-8 lg:col-span-5">
                {product.material && (
                  <div>
                    <h2 className="mono-label text-ember">Materials &amp; Quality</h2>
                    <p className="text-slate mt-3 leading-relaxed">{product.material}</p>
                  </div>
                )}
                {product.care && (
                  <div className="border-void/15 border-t pt-8">
                    <h2 className="mono-label text-ember">Care</h2>
                    <p className="text-slate mt-3 leading-relaxed">{product.care}</p>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>
      )}

      {related.length > 0 && (
        <section className="bg-void py-20 sm:py-28">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 className="font-display text-bone text-[clamp(1.9rem,4vw,3rem)] font-medium">
                More in {product.category}
              </h2>
              <Link
                href="/products"
                className="group mono-label border-smoke text-bone hover:border-saffron hover:text-saffron inline-flex items-center gap-2 rounded-full border px-6 py-3.5 transition-colors duration-500"
              >
                All Products
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="group block">
                  <div className="arch bg-char relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                  </div>
                  <h3 className="font-display text-bone mt-5 text-xl font-medium">
                    {item.name}
                  </h3>
                  <p className="text-ash mt-2 line-clamp-2 text-sm leading-relaxed">
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
