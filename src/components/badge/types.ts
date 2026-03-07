import type { ReactNode, CSSProperties, HTMLAttributes } from "react";

export type BadgeStatus = "success" | "processing" | "default" | "error" | "warning";
export type BadgeSize = "default" | "small";

export type PresetColor =
  | "blue"
  | "purple"
  | "cyan"
  | "green"
  | "magenta"
  | "pink"
  | "red"
  | "orange"
  | "yellow"
  | "volcano"
  | "geekblue"
  | "lime"
  | "gold";

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, "title"> {
  /** Number to display */
  count?: ReactNode;
  /** Show as a dot */
  dot?: boolean;
  /** Status type */
  status?: BadgeStatus;
  /** Custom color */
  color?: PresetColor | string;
  /** Size */
  size?: BadgeSize;
  /** Whether to show when count is 0 */
  showZero?: boolean;
  /** Max count to show */
  overflowCount?: number;
  /** Position offset [x, y] */
  offset?: [number, number];
  /** Title attribute for the badge */
  title?: string;
  /** Text to display next to status dot */
  text?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}

export type RibbonPlacement = "start" | "end";

export interface BadgeRibbonProps {
  /** Ribbon text */
  text?: ReactNode;
  /** Ribbon color */
  color?: PresetColor | string;
  /** Placement */
  placement?: RibbonPlacement;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}
