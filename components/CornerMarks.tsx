interface CornerMarksProps {
  tone?: "gold" | "ink" | "paper";
  inset?: number;
  size?: number;
  className?: string;
}

const TONE_MAP: Record<NonNullable<CornerMarksProps["tone"]>, string> = {
  gold: "border-gold",
  ink: "border-ink",
  paper: "border-paper",
};

/**
 * Blueprint-style crop marks — the site's recurring device for framing photography,
 * echoing architectural site-plan annotations.
 */
export default function CornerMarks({
  tone = "gold",
  inset = 10,
  size = 22,
  className = "",
}: CornerMarksProps) {
  const borderColor = TONE_MAP[tone];
  const corners = [
    { top: inset, left: inset, borderWidth: "2px 0 0 2px" },
    { top: inset, right: inset, borderWidth: "2px 2px 0 0" },
    { bottom: inset, left: inset, borderWidth: "0 0 2px 2px" },
    { bottom: inset, right: inset, borderWidth: "0 2px 2px 0" },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 z-10 ${className}`}>
      {corners.map((c, i) => (
        <span
          key={i}
          className={`absolute ${borderColor} border-solid`}
          style={{
            width: size,
            height: size,
            top: "top" in c ? c.top : undefined,
            bottom: "bottom" in c ? c.bottom : undefined,
            left: "left" in c ? c.left : undefined,
            right: "right" in c ? c.right : undefined,
            borderWidth: c.borderWidth,
          }}
        />
      ))}
    </div>
  );
}
