/**
 * Film grain over the entire page. The whole design leans on large flat fields
 * of near-black and bone, which render as dead, plasticky gradients on a screen
 * — the noise gives them a woven texture and ties the photography to the UI.
 *
 * Deliberately not a client component, and deliberately not animated. A
 * crawling grain looks better for about ten seconds, but it pins the compositor
 * awake for the entire visit — on the mid-range Android most of this shop's
 * customers are browsing from, that is a real cost for an effect nobody is
 * looking at. One static 200×200 fractal-noise tile buys the whole texture for
 * a single paint.
 */
export default function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
    >
      <div
        // Plain opacity rather than a blend mode: a full-screen `mix-blend-*`
        // layer forces the entire page into one composited group for a result
        // that, against near-black, is indistinguishable from this.
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
