import Link from "next/link";
import { prisma } from "@/lib/prisma";

const SECTIONS = [
  { href: "/admin/products", label: "Products", count: (c: Counts) => c.products },
  { href: "/admin/services", label: "Services", count: (c: Counts) => c.services },
  { href: "/admin/gallery", label: "Gallery", count: (c: Counts) => c.gallery },
  { href: "/admin/reviews", label: "Reviews", count: (c: Counts) => c.reviews },
  { href: "/admin/faq", label: "FAQ", count: (c: Counts) => c.faq },
  { href: "/admin/partners", label: "Partners", count: (c: Counts) => c.partners },
];

interface Counts {
  products: number;
  services: number;
  gallery: number;
  reviews: number;
  faq: number;
  partners: number;
}

async function getCounts(): Promise<Counts | null> {
  try {
    const [products, services, gallery, reviews, faq, partners] = await Promise.all([
      prisma.product.count(),
      prisma.service.count(),
      prisma.galleryItem.count(),
      prisma.review.count(),
      prisma.faqItem.count(),
      prisma.partner.count(),
    ]);
    return { products, services, gallery, reviews, faq, partners };
  } catch (error) {
    console.error("[admin] dashboard counts failed:", error);
    return null;
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div className="max-w-4xl">
      <h1 className="font-display text-3xl font-medium text-ink">Dashboard</h1>
      <p className="mt-2 text-ink-muted">
        Manage everything shown on the public site from here.
      </p>

      {!counts && (
        <p className="mt-8 border border-stone bg-red-50 p-4 text-sm text-red-800">
          Couldn&apos;t reach the database just now — counts below are unavailable, but
          the public site is still serving from its fallback content.
        </p>
      )}

      <div className="mt-10 grid grid-cols-2 gap-px border border-stone bg-stone sm:grid-cols-3">
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="group bg-paper p-6 transition-colors duration-300 hover:bg-navy"
          >
            <span className="font-display text-3xl font-medium text-ink group-hover:text-paper">
              {counts ? section.count(counts) : "—"}
            </span>
            <span className="label mt-2 block text-ink-muted group-hover:text-paper/60">
              {section.label}
            </span>
          </Link>
        ))}
      </div>

      <Link
        href="/admin/settings"
        className="label mt-8 inline-block border border-navy px-6 py-3 text-navy transition-colors duration-300 hover:bg-navy hover:text-paper"
      >
        Edit Site Settings
      </Link>
    </div>
  );
}
