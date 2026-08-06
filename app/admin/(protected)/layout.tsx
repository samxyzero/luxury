import Link from "next/link";
import { verifySession } from "@/lib/dal";
import { logout } from "@/lib/actions/auth";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/settings", label: "Site Settings" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/gallery", label: "Gallery" },
  { href: "/admin/reviews", label: "Reviews" },
  { href: "/admin/faq", label: "FAQ" },
  { href: "/admin/partners", label: "Partners" },
];

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  return (
    <div className="flex min-h-screen items-start bg-paper">
      {/* h-screen + sticky keeps the account block pinned to the viewport bottom
          instead of drifting below the fold on long pages. */}
      <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col bg-navy p-6">
        <div className="shrink-0">
          <Link href="/admin" className="font-display text-xl font-medium text-paper">
            Luxury Enterprises
          </Link>
          <p className="label mt-1 text-paper/50">Admin</p>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="label px-3 py-2.5 text-paper/70 transition-colors duration-300 hover:bg-white/5 hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 shrink-0 space-y-4 border-t border-stone-on-navy pt-6">
          <p className="truncate text-xs text-paper/45">{session.email}</p>
          <Link
            href="/"
            target="_blank"
            className="label block text-paper/70 transition-colors duration-300 hover:text-gold"
          >
            View Site &#8599;
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="label text-paper/70 transition-colors duration-300 hover:text-paper"
            >
              Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* No overflow-x-hidden here — it creates a scroll container that breaks
          the sticky save bar in the forms. min-w-0 handles flex overflow instead. */}
      <main className="min-w-0 flex-1 p-8 sm:p-10">{children}</main>
    </div>
  );
}
