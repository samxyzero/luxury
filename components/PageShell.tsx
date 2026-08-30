import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import Container from "@/components/ui/Container";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

interface PageShellProps {
  trail: Crumb[];
  children: React.ReactNode;
}

/**
 * Shared chrome for every non-home page: clears the floating navbar and renders
 * a breadcrumb with matching BreadcrumbList structured data.
 *
 * Set in mono and separated by slashes rather than chevrons — it reads as a
 * file path, which is the same register as the index numbers and micro-labels
 * used throughout the rest of the site.
 */
export default function PageShell({ trail, children }: PageShellProps) {
  const full: Crumb[] = [{ name: "Home", path: "/" }, ...trail];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(full)} />

      <div className="bg-void pt-28 sm:pt-32">
        <Container>
          <nav aria-label="Breadcrumb" className="border-smoke border-b py-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {full.map((crumb, i) => {
                const isLast = i === full.length - 1;
                return (
                  <li key={crumb.path} className="flex items-center gap-2">
                    {i > 0 && (
                      <span aria-hidden className="text-slate mono-label">
                        /
                      </span>
                    )}
                    {isLast ? (
                      <span className="mono-label text-saffron" aria-current="page">
                        {crumb.name}
                      </span>
                    ) : (
                      <Link
                        href={crumb.path}
                        className="mono-label text-slate hover:text-bone transition-colors duration-300"
                      >
                        {crumb.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        </Container>
      </div>

      {children}
    </>
  );
}
