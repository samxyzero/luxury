import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionLinkProps {
  href: string;
  children: React.ReactNode;
  /** Sections on a light background need the inverted palette. */
  tone?: "bone" | "void";
}

/**
 * "View all …" link used wherever a section shows a teaser and the full listing
 * lives on its own route.
 */
export default function SectionLink({ href, children, tone = "bone" }: SectionLinkProps) {
  const palette =
    tone === "void"
      ? "border-void/25 text-void hover:bg-void hover:text-bone"
      : "border-smoke text-bone hover:border-saffron hover:text-saffron";

  return (
    <Link
      href={href}
      className={`group mono-label inline-flex items-center gap-2 rounded-full border px-6 py-3.5 transition-colors duration-500 ${palette}`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
