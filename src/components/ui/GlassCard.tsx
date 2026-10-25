import React from "react";

/**
 * Universal Glass Box container.
 *
 * Pure neutral frosted glass (rgba(217, 217, 217, 0.58), 1px white border,
 * soft shadow, 6px backdrop blur, 17px border-radius) with zero color hue.
 * Interactive cards scale smoothly on hover and tilt gently on active press.
 */
interface GlassCardProps extends React.HTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "nav";
  interactive?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function GlassCard({
  as: Tag = "div",
  interactive = false,
  padding = "md",
  className,
  children,
  ...props
}: GlassCardProps) {
  const padClass =
    padding === "none"
      ? ""
      : padding === "sm"
        ? "p-4"
        : padding === "lg"
          ? "p-7 sm:p-9"
          : "p-5 sm:p-6";

  return (
    <Tag
      className={[
        "glass-box",
        interactive ? "glass-box-interactive" : "",
        padClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Tag>
  );
}

export default GlassCard;
