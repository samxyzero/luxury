import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import CornerMarks from "@/components/CornerMarks";
import Reveal from "@/components/Reveal";
import type { Product } from "@/types/content";

interface FeaturedProductsProps {
  products: Product[];
}

/**
 * A static, server-rendered selection — deliberately not the filterable grid
 * from /products, so the homepage stays light and fully pre-rendered.
 */
export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  if (products.length === 0) return null;

  return (
    <Section tone="navy" space="lg">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Pieces We're Known For"
          intro="The ranges our customers come back for — specified for real use, in homes and in properties running at full occupancy."
          tone="paper"
        />

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 0.06}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="label absolute left-0 top-0 z-10 bg-paper px-3 py-1.5 text-navy">
                    {product.idealFor}
                  </span>
                  <CornerMarks
                    tone="paper"
                    inset={12}
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-5 border-t border-stone-on-navy pt-4">
                  <p className="label text-gold">{product.category}</p>
                  <h3 className="mt-1.5 font-display text-xl font-medium text-paper">
                    {product.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-paper/55">
                    {product.shortDescription ?? product.description}
                  </p>
                  {product.colors && product.colors.length > 0 && (
                    <p className="mt-3 text-xs text-paper/40">
                      {product.colors.length} colourways
                    </p>
                  )}
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-paper/80 transition-colors duration-300 group-hover:text-gold">
                    View Details
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14">
          <Button href="/products" variant="outlineLight">
            Browse All Products
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Button>
        </div>
      </Container>
    </Section>
  );
}
