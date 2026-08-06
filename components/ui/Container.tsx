import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

/** The site's single horizontal gutter definition. */
export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 ${className}`}>{children}</div>
  );
}
