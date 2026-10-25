import Link from "next/link";
import type { ReactNode, ButtonHTMLAttributes } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "soft" | "sky";
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function NeumorphicButton({ children, href, variant = "primary", size = "md", className = "", ...rest }: Props & { className?: string }) {
  const cls = `neumorph-btn neumorph-btn--${variant} neumorph-btn--${size} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}

export function NeumorphicButtonRow({ children }: { children: ReactNode }) {
  return <div className="neumorph-row">{children}</div>;
}
