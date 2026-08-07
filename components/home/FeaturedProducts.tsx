import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import CornerMarks from "@/components/CornerMarks";
import Reveal from "@/components/Reveal";
import type { Product } from "@/types/content";

interface FeaturedProductsProps {
  products: Product[];
}

/**
 * Editorial layout rather than a uniform grid: the first product runs tall
 * across two rows, the rest stack beside it. Server-rendered — the filterable
 * grid lives on /products.
 */
export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  const [lead, ...rest] = products;

  return (
    <section className="bg-paper py-24 sm:py-32">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold" />
              <span className="label text-ink-muted">Signature Ranges</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl">
              What We&apos;re Known For
            </h2>
          </div>
          <Link
            href="/products"
            className="group label inline-flex items-center gap-2 border-b border-ink pb-2 text-ink transition-colors duration-300 hover:border-gold hover:text-gold-dim"
          >
            All 14 Ranges
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Reveal>

        <div className="mt-16 grid gap-8 lg:grid-cols-12">
          {/* Lead product — tall, given room to breathe. */}
          <Reveal className="lg:col-span-6">
            <Link href={`/products/${lead.slug}`} className="group block h-full">
              <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-[34rem]">
                <Image
                  src={lead.image}
                  alt={lead.name}
                  fill
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <CornerMarks tone="paper" inset={16} />
                <span className="label absolute left-0 top-0 bg-paper px-4 py-2 text-navy">
                  {lead.category}
                </span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-6 border-t border-stone pt-5">
                <div>
                  <h3 className="font-display text-2xl font-medium text-ink">{lead.name}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">
                    {lead.shortDescription ?? lead.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
              </div>
            </Link>
          </Reveal>

          {/* Supporting products — wide, low cards for contrast with the lead. */}
          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1 lg:gap-6">
            {rest.map((product, i) => (
              <Reveal key={product.id} delay={0.08 * (i + 1)}>
                <Link
                  href={`/products/${product.slug}`}
                  className="group flex items-center gap-6 border-b border-stone pb-6"
                >
                  <div className="relative h-28 w-28 shrink-0 overflow-hidden sm:h-32 sm:w-32">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      sizes="128px"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="label text-gold">{product.category}</p>
                    <h3 className="mt-1.5 font-display text-xl font-medium text-ink">
                      {product.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                      {product.shortDescription ?? product.description}
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-5 w-5 shrink-0 text-ink-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
