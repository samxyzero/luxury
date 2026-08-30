interface CircleBadgeProps {
  /** Repeated around the ring; keep it short or the letters collide. */
  text: string;
  /** Rendered large in the middle of the ring. */
  centre?: string;
  className?: string;
}

/**
 * A slowly turning seal — the kind stamped on a bolt of cloth. Used once per
 * page at most, pinned to the corner of a photograph.
 *
 * Set on an SVG `textPath` rather than by positioning each glyph, so the
 * spacing stays even at any size and the text is still selectable and readable
 * by assistive tech.
 */
export default function CircleBadge({
  text,
  centre,
  className = "",
}: CircleBadgeProps) {
  const ring = `${text} · `.repeat(3);

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 120 120"
        className="h-full w-full motion-safe:animate-[spin_26s_linear_infinite]"
      >
        <defs>
          <path
            id="circle-badge-path"
            d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          style={{
            fontFamily: "var(--font-jet), monospace",
            fontSize: "9px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#circle-badge-path">{ring}</textPath>
        </text>
      </svg>

      {centre && (
        <span className="font-display absolute inset-0 flex items-center justify-center text-2xl font-medium">
          {centre}
        </span>
      )}
    </div>
  );
}
