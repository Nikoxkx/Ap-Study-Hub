import type { ReactNode, CSSProperties, HTMLAttributes } from "react";

export function GlassCard({
  children,
  className = "",
  style,
  hover = true,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "children" | "className" | "style">) {
  return (
    <div
      className={`glass-card ${hover ? "glass-card--hover" : ""} ${className}`}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
}

export function GlassCardGrid({ children }: { children: ReactNode }) {
  return <div className="glass-grid">{children}</div>;
}
