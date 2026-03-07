/**
 * @file Empty state component type definitions.
 *
 * Defines props for the `<Empty>` component, which displays a placeholder
 * illustration with optional description and action area.
 *
 * @see {@link ./Empty.tsx} for the component implementation
 */
import type { ReactNode, CSSProperties } from "react";

export interface EmptyProps {
  /** Custom description text */
  description?: ReactNode;
  /** Custom image element or string src */
  image?: ReactNode;
  /** Image style */
  imageStyle?: CSSProperties;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** Action area content (e.g., a button) */
  children?: ReactNode;
}
