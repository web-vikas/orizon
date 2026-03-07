import type { ReactNode, HTMLAttributes, CSSProperties } from "react";

export type SiderTheme = "light" | "dark";
export type SiderBreakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

export interface LayoutProps extends HTMLAttributes<HTMLElement> {
  /** Whether the layout contains a Sider (auto-detected) */
  hasSider?: boolean;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}

export interface ContentProps extends HTMLAttributes<HTMLElement> {
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}

export interface SiderProps extends HTMLAttributes<HTMLElement> {
  /** Whether the sider is collapsed */
  collapsed?: boolean;
  /** Whether the sider can be collapsed */
  collapsible?: boolean;
  /** Width of collapsed sider */
  collapsedWidth?: number;
  /** Width of sider */
  width?: number | string;
  /** Breakpoint at which to auto-collapse */
  breakpoint?: SiderBreakpoint;
  /** Theme of the sider */
  theme?: SiderTheme;
  /** Custom trigger element; null hides the default trigger */
  trigger?: ReactNode | null;
  /** Callback when collapsed state changes */
  onCollapse?: (collapsed: boolean, type: "clickTrigger" | "responsive") => void;
  /** Callback when breakpoint changes */
  onBreakpoint?: (broken: boolean) => void;
  /** Reverse arrow direction */
  reverseArrow?: boolean;
  /** Zero-width trigger style */
  zeroWidthTriggerStyle?: CSSProperties;
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}
