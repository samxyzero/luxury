import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "saffron" | "bone" | "ghost" | "ghostDark";

/**
 * `base` is the resting state; `wipe` is the colour that floods up from the
 * bottom on hover. Splitting them this way means every variant animates
 * identically and only its two colours differ.
 */
const VARIANT: Record<Variant, { base: string; wipe: string; hover: string }> = {
  saffron: {
    base: "bg-saffron text-void",
    wipe: "bg-bone",
    hover: "group-hover:text-void",
  },
  bone: {
    base: "bg-bone text-void",
    wipe: "bg-saffron",
    hover: "group-hover:text-void",
  },
  ghost: {
    base: "border border-smoke text-bone",
    wipe: "bg-bone",
    hover: "group-hover:text-void",
  },
  ghostDark: {
    base: "border border-void/25 text-void",
    wipe: "bg-void",
    hover: "group-hover:text-bone",
  },
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  /** Renders a plain <a> for external, tel and mailto targets. */
  external?: boolean;
  type?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  external?: never;
  type?: "button" | "submit";
}

/**
 * One button surface for the whole site: a pill whose fill wipes up from the
 * bottom edge on hover. `href` renders a link (internal via next/link, external
 * via <a>), otherwise a <button>.
 */
export default function Button(props: LinkProps | ButtonProps) {
  const { children, variant = "saffron", className = "" } = props;
  const v = VARIANT[variant];

  const shell = `group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-4 transition-colors duration-500 ${v.base} ${className}`;

  const inner = (
    <>
      {/* Scales from the bottom edge, so the fill reads as liquid rising rather
          than a rectangle fading in. */}
      <span
        aria-hidden
        className={`absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${v.wipe}`}
      />
      <span
        className={`mono-label flex items-center gap-2.5 transition-colors duration-500 ${v.hover}`}
      >
        {children}
      </span>
    </>
  );

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={shell}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={props.href} className={shell}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={("type" in props && props.type) || "button"} className={shell}>
      {inner}
    </button>
  );
}
