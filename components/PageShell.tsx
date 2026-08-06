import Link from "next/link";
import { ChevronRight } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

interface PageShellProps {
  trail: Crumb[];
  children: React.ReactNode;
}

/**
 * Shared chrome for every non-home page: clears the fixed navbar and renders a
 * breadcrumb bar with matching BreadcrumbList structured data.
 */
export default function PageShell({ trail, children }: PageShellProps) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(full)} />

      <div className="border-b border-stone bg-paper pt-[100px] lg:pt-[116px]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-7xl px-6 py-5 sm:px-8 lg:px-12"
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {full.map((crumb, i) => {
              const isLast = i === full.length - 1;
              return (
                <li key={crumb.path} className="flex items-center gap-2">
                  {i > 0 && (
                    <ChevronRight className="h-3.5 w-3.5 text-ink-muted/50" aria-hidden />
                  )}
                  {isLast ? (
                    <span className="label text-ink" aria-current="page">
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.path}
                      className="label text-ink-muted transition-colors duration-300 hover:text-gold-dim"
                    >
                      {crumb.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {children}
    </>
  );
}
