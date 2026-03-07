import type { ReactNode, CSSProperties } from "react";

export type TimelineMode = "left" | "right" | "alternate";
export type TimelineItemPosition = "left" | "right";

export interface TimelineItem {
  /** Content */
  children: ReactNode;
  /** Dot color (CSS color or preset) */
  color?: string;
  /** Custom dot element */
  dot?: ReactNode;
  /** Label displayed on opposite side */
  label?: ReactNode;
  /** Position override for alternate mode */
  position?: TimelineItemPosition;
  /** Class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}

export interface TimelineProps {
  /** Timeline items */
  items?: TimelineItem[];
  /** Mode of timeline */
  mode?: TimelineMode;
  /** Whether to show a pending indicator */
  pending?: ReactNode;
  /** Custom pending dot */
  pendingDot?: ReactNode;
  /** Whether to reverse the order */
  reverse?: boolean;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}
