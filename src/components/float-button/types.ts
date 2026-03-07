/**
 * @file FloatButton component type definitions.
 *
 * Defines props for `<FloatButton>`, `<FloatButton.Group>`, and
 * `<FloatButton.BackTop>` for floating action buttons positioned at
 * screen edges.
 *
 * @see {@link ./FloatButton.tsx} for the main button
 * @see {@link ./FloatButtonGroup.tsx} for the expandable group
 * @see {@link ./BackTop.tsx} for the back-to-top button
 */
import type { CSSProperties, ReactNode } from "react";

export type FloatButtonShape = "circle" | "square";

export type FloatButtonType = "primary" | "default";

export type FloatButtonGroupTrigger = "click" | "hover";

export interface FloatButtonBadge {
  count?: number;
  dot?: boolean;
  color?: string;
}

export interface FloatButtonProps {
  icon?: ReactNode;
  description?: ReactNode;
  tooltip?: ReactNode;
  type?: FloatButtonType;
  shape?: FloatButtonShape;
  badge?: FloatButtonBadge;
  href?: string;
  target?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  style?: CSSProperties;
}

export interface FloatButtonGroupProps {
  shape?: FloatButtonShape;
  trigger?: FloatButtonGroupTrigger;
  icon?: ReactNode;
  closeIcon?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface BackTopProps {
  visibilityHeight?: number;
  target?: () => HTMLElement;
  duration?: number;
  onClick?: (e: React.MouseEvent) => void;
  icon?: ReactNode;
  className?: string;
  style?: CSSProperties;
}
