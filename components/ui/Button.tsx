import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "outline" | "outlineLight" | "gold" | "quiet";

const VARIANT: Record<Variant, string> = {
  solid: "border border-navy bg-navy text-paper hover:bg-transparent hover:text-navy",
  outline: "border border-navy text-navy hover:bg-navy hover:text-paper",
  outlineLight: "border border-stone-on-navy text-paper hover:border-gold hover:text-gold",
  gold: "border border-gold bg-gold text-navy hover:bg-gold-dim hover:border-gold-dim",
  quiet: "border border-transparent text-ink hover:text-gold-dim",
};

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkProps extends BaseProps {
  href: string;
  /** Renders a plain <a> for external/tel/mailto targets. */
  external?: boolean;
  type?: never;
}

interface ButtonProps extends BaseProps {
  href?: never;
  external?: never;
  type?: "button" | "submit";
}

/**
 * One button surface for the whole site. `href` renders a link (internal via
 * next/link, external via <a>), otherwise a <button>.
 */
export default function Button(props: LinkProps | ButtonProps) {
  const { children, variant = "outline", className = "" } = props;
  const classes = `label inline-flex items-center justify-center gap-2 px-6 py-3.5 transition-colors duration-300 ${VARIANT[variant]} ${className}`;

  if ("href" in props && props.href) {
    if (props.external) {
      return (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={("type" in props && props.type) || "button"} className={classes}>
      {children}
    </button>
  );
}
