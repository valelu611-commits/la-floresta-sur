import type { ReactNode } from "react";

interface BadgeProps {
  color: string;
  children: ReactNode;
  className?: string;
}

export function Badge({ color, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`chip ${className}`}
      style={{ borderColor: `${color}55`, backgroundColor: `${color}1f`, color }}
    >
      {children}
    </span>
  );
}
