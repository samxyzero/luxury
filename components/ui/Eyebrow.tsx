interface EyebrowProps {
  children: string;
  /** Two-digit section index, rendered as a filing mark before the label. */
  index?: number;
  tone?: "bone" | "void";
  className?: string;
}

/**
 * Every section is introduced the same way: an index, a rule, a mono label.
 * Repeating one device down the page is what lets the layouts underneath it
 * differ wildly without the site coming apart.
 */
export default function Eyebrow({
  children,
  index,
  tone = "bone",
  className = "",
}: EyebrowProps) {
  const muted = tone === "bone" ? "text-ash" : "text-slate";
  const rule = tone === "bone" ? "bg-smoke" : "bg-void/20";
  // Ember on the light tones, not saffron: the closing section's background is
  // itself saffron, where a saffron index would simply disappear.
  const mark = tone === "bone" ? "text-saffron" : "text-ember";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {index !== undefined && (
        <span className={`mono-label ${mark}`}>{String(index).padStart(2, "0")}</span>
      )}
      <span className={`h-px w-8 ${rule}`} aria-hidden />
      <span className={`mono-label ${muted}`}>{children}</span>
    </div>
  );
}
