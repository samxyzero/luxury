"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Matches a media query on the client.
 *
 * `useSyncExternalStore` rather than state-in-an-effect: a media query list is
 * exactly the external store this hook exists for, and it gets the server
 * render right by construction — the third argument is the snapshot used for
 * SSR and hydration, so there is never a mismatch to reconcile.
 *
 * That server snapshot is `false`, so callers must treat `false` as "not yet
 * known" and branch to the layout that degrades most gracefully. On this site
 * that is the small-screen layout, which is the correct default regardless.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", onStoreChange);
      return () => list.removeEventListener("change", onStoreChange);
    },
    [query]
  );

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
