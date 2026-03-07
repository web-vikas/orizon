/**
 * @file Anchor Type Definitions
 *
 * Props and item interfaces for the `<Anchor>` scroll-spy navigation
 * component. Supports vertical and horizontal layout, affix mode,
 * nested anchor items, and custom scroll containers.
 *
 * @see {@link ./Anchor.tsx} — component implementation
 */

import type { ReactNode, CSSProperties } from "react";

export type AnchorDirection = "horizontal" | "vertical";

export interface AnchorItem {
  /** Unique key for the anchor */
  key: string;
  /** Link href (e.g., "#section-id") */
  href: string;
  /** Display title */
  title: ReactNode;
  /** Nested children anchor items */
  children?: AnchorItem[];
  /** Target for the link (e.g., "_blank") */
  target?: string;
  /** Class name for the item */
  className?: string;
}

export interface AnchorProps {
  /** Anchor items */
  items?: AnchorItem[];
  /** Direction of the anchor layout */
  direction?: AnchorDirection;
  /** Custom function to determine the current active anchor */
  getCurrentAnchor?: (activeLink: string) => string;
  /** Pixel offset from top when scrolling to an anchor */
  targetOffset?: number;
  /** Whether to pin the anchor to the viewport (affix mode) */
  affix?: boolean;
  /** Offset top when affix is active */
  offsetTop?: number;
  /** Callback when active anchor changes */
  onChange?: (currentActiveLink: string) => void;
  /** Callback when an anchor link is clicked */
  onClick?: (
    e: React.MouseEvent,
    link: { title: ReactNode; href: string }
  ) => void;
  /** Bounds for activating anchor links (proportion of viewport) */
  bounds?: number;
  /** Replace browser history instead of push */
  replace?: boolean;
  /** Container to listen for scroll events (defaults to window) */
  getContainer?: () => HTMLElement | Window;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}
