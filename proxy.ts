import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/session";

// Optimistic check only — reads the cookie, no database hit. Every admin
// Server Action still verifies the session itself (see lib/dal.ts).
export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProtectedRoute = pathname.startsWith("/admin") && pathname !== "/admin/login";

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  const session = await decrypt(request.cookies.get("session")?.value);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
