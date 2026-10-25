import React from "react";

/**
 * Embossed tactile button (#e8e8e8 surface, dual neumorphic shadow, crisp white
 * hover border).
 */
interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "md" | "sm";
  children: React.ReactNode;
}

export function GlassButton({
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: GlassButtonProps) {
  return (
    <button
      type={type}
      className={[
        "btn",
        size === "sm" ? "btn-sm" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}

export default GlassButton;
