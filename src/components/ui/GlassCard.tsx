import type { ReactNode, CSSProperties } from "react";

export function GlassCard({
  children,
  className = "",
  style,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
}) {
  return (
    <div
      className={`glass-card ${hover ? "glass-card--hover" : ""} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

export function GlassCardGrid({ children }: { children: ReactNode }) {
  return <div className="glass-grid">{children}</div>;
}
