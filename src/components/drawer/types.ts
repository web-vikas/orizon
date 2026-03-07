import type { ReactNode, CSSProperties } from "react";

export type DrawerPlacement = "top" | "right" | "bottom" | "left";
export type DrawerSize = "default" | "large";

export interface DrawerProps {
  /** Whether the drawer is visible */
  open?: boolean;
  /** Callback when the drawer is closed */
  onClose?: (e: React.MouseEvent | React.KeyboardEvent) => void;
  /** Title of the drawer */
  title?: ReactNode;
  /** Placement of the drawer */
  placement?: DrawerPlacement;
  /** Width of the drawer (for left/right placement) */
  width?: string | number;
  /** Height of the drawer (for top/bottom placement) */
  height?: string | number;
  /** Footer content */
  footer?: ReactNode;
  /** Extra content in the header */
  extra?: ReactNode;
  /** Whether to show close button */
  closable?: boolean;
  /** Whether to show mask */
  mask?: boolean;
  /** Whether to support keyboard (Esc to close) */
  keyboard?: boolean;
  /** Destroy child elements when closed */
  destroyOnHidden?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Preset size */
  size?: DrawerSize;
  /** Push the content when nested drawers open */
  push?: boolean | { distance?: number };
  /** Callback after open/close animation */
  afterOpenChange?: (open: boolean) => void;
  /** Mount container */
  getContainer?: () => HTMLElement | false;
  /** z-index of the drawer */
  zIndex?: number;
  /** Children content */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}
