import type { CSSProperties, ReactNode } from "react";

export type TypographyType = "secondary" | "success" | "warning" | "danger";

export interface EllipsisConfig {
  rows?: number;
  expandable?: boolean;
  suffix?: string;
  onExpand?: (e: React.MouseEvent) => void;
  onEllipsis?: (ellipsis: boolean) => void;
  tooltip?: ReactNode | boolean;
}

export interface CopyableConfig {
  text?: string;
  icon?: [ReactNode, ReactNode];
  tooltips?: [ReactNode, ReactNode];
  onCopy?: (e?: React.MouseEvent) => void;
}

export interface EditableConfig {
  icon?: ReactNode;
  tooltip?: ReactNode;
  editing?: boolean;
  maxLength?: number;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
  onStart?: () => void;
  onChange?: (value: string) => void;
  onCancel?: () => void;
  onEnd?: () => void;
  triggerType?: ("icon" | "text")[];
  enterIcon?: ReactNode;
}

export interface TypographyTitleProps {
  level?: 1 | 2 | 3 | 4 | 5;
  type?: TypographyType;
  copyable?: boolean | CopyableConfig;
  editable?: boolean | EditableConfig;
  ellipsis?: boolean | EllipsisConfig;
  mark?: boolean;
  code?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface TypographyTextProps {
  type?: TypographyType;
  copyable?: boolean | CopyableConfig;
  editable?: boolean | EditableConfig;
  ellipsis?: boolean | EllipsisConfig;
  mark?: boolean;
  code?: boolean;
  keyboard?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface TypographyParagraphProps {
  type?: TypographyType;
  copyable?: boolean | CopyableConfig;
  editable?: boolean | EditableConfig;
  ellipsis?: boolean | EllipsisConfig;
  mark?: boolean;
  code?: boolean;
  underline?: boolean;
  delete?: boolean;
  strong?: boolean;
  italic?: boolean;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface TypographyLinkProps {
  type?: TypographyType;
  copyable?: boolean | CopyableConfig;
  ellipsis?: boolean | EllipsisConfig;
  href?: string;
  target?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
