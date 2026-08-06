import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CornerMarks from "@/components/CornerMarks";
import Reveal from "@/components/Reveal";
import type { ProductCategory } from "@/types/content";

interface CategoryTilesProps {
  categories: ProductCategory[];
}

/**
 * Category-first entry into the catalogue. Deep-links into /products with the
 * filter pre-applied, which is also the shape a future shop would want.
 */
export default function CategoryTiles({ categories }: CategoryTilesProps) {
  if (categories.length === 0) return null;

  return (
    <Section tone="paper" space="lg">
      <Container>
        <SectionHeading
          eyebrow="Shop by Category"
          title="Start With the Room You're Furnishing"
          intro="Three collections covering everything from the bed up — browse a category, or talk to us and we'll specify the whole room."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category.name} delay={i * 0.08}>
              <Link
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={category.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-navy/45 transition-colors duration-300 group-hover:bg-navy/30" />
                  <CornerMarks
                    tone="paper"
                    inset={14}
                    className="opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="label text-paper/70">
                      {category.count} {category.count === 1 ? "range" : "ranges"}
                    </p>
                    <h3 className="mt-2 flex items-center gap-2 font-display text-2xl font-medium text-paper">
                      {category.name}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
