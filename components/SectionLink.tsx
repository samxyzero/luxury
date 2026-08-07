import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface SectionLinkProps {
  href: string;
  children: React.ReactNode;
  /** Sections on a navy background need the inverted palette. */
  tone?: "ink" | "paper";
}

/**
 * "View all …" link used on the homepage, where each section shows a teaser and
 * the full listing lives on its own route.
 */
export default function SectionLink({ href, children, tone = "ink" }: SectionLinkProps) {
  const palette =
    tone === "paper"
      ? "border-stone-on-navy text-paper hover:border-gold hover:text-gold"
      : "border-navy text-navy hover:bg-navy hover:text-paper";

  return (
    <Link
      href={href}
      className={`group label inline-flex items-center gap-2 border px-6 py-3.5 transition-colors duration-300 ${palette}`}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
