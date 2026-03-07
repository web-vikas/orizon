import type { ReactNode, CSSProperties, Key } from "react";

export type CollapsibleType = "header" | "icon" | "disabled";
export type ExpandIconPosition = "start" | "end";
export type CollapseSize = "large" | "middle" | "small";

export interface CollapseItem {
  /** Unique key */
  key: Key;
  /** Panel header */
  label: ReactNode;
  /** Panel content */
  children: ReactNode;
  /** Extra content at the right of header */
  extra?: ReactNode;
  /** Whether to show the expand arrow */
  showArrow?: boolean;
  /** Force render hidden panels */
  forceRender?: boolean;
  /** Collapsible mode for this item */
  collapsible?: CollapsibleType;
  /** Header class name */
  headerClass?: string;
  /** Style */
  style?: CSSProperties;
  /** Class name */
  className?: string;
}

export interface CollapseProps {
  /** Items config */
  items?: CollapseItem[];
  /** Active panel keys (controlled) */
  activeKey?: Key | Key[];
  /** Default active panel keys */
  defaultActiveKey?: Key | Key[];
  /** Accordion mode (only one panel open) */
  accordion?: boolean;
  /** Whether to show border */
  bordered?: boolean;
  /** Position of expand icon */
  expandIconPosition?: ExpandIconPosition;
  /** Ghost mode (no background) */
  ghost?: boolean;
  /** Size */
  size?: CollapseSize;
  /** Callback when active panels change */
  onChange?: (key: Key | Key[]) => void;
  /** Collapsible trigger mode */
  collapsible?: CollapsibleType;
  /** Custom expand icon */
  expandIcon?: (panelProps: { isActive: boolean }) => ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Destroy inactive panel content */
  destroyInactivePanel?: boolean;
}
