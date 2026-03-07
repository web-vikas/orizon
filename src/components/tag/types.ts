import type { ReactNode, CSSProperties, HTMLAttributes, MouseEvent } from "react";

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
  | "gold"
  | "success"
  | "processing"
  | "error"
  | "warning"
  | "default";

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /** Preset or custom color */
  color?: PresetColor | string;
  /** Whether the tag is closable */
  closable?: boolean;
  /** Icon element */
  icon?: ReactNode;
  /** Whether to show border */
  bordered?: boolean;
  /** Callback when tag is closed */
  onClose?: (e: MouseEvent<HTMLElement>) => void;
  /** Custom close icon */
  closeIcon?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}

export interface CheckableTagProps extends Omit<HTMLAttributes<HTMLSpanElement>, "onChange"> {
  /** Whether the tag is checked */
  checked: boolean;
  /** Callback when checked state changes */
  onChange?: (checked: boolean) => void;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}
