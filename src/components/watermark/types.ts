/**
 * @file Watermark component type definitions.
 *
 * Provides `WatermarkProps` for the content watermark overlay and
 * `WatermarkFont` for font styling configuration.
 *
 * @see {@link ./Watermark.tsx} for the implementation.
 * @see {@link ./index.ts} for the public export.
 */
import type { ReactNode, CSSProperties } from "react";

export interface WatermarkFont {
  /** Font color */
  color?: string;
  /** Font size in px */
  fontSize?: number;
  /** Font weight */
  fontWeight?: CSSProperties["fontWeight"];
  /** Font family */
  fontFamily?: string;
  /** Font style */
  fontStyle?: CSSProperties["fontStyle"];
  /** Text alignment */
  textAlign?: CanvasTextAlign;
}

export interface WatermarkProps {
  /** Text content of the watermark (string or array of lines) */
  content?: string | string[];
  /** Image URL for the watermark */
  image?: string;
  /** Width of a single watermark area */
  width?: number;
  /** Height of a single watermark area */
  height?: number;
  /** Rotation angle in degrees (default -22) */
  rotate?: number;
  /** Gap between watermarks [horizontal, vertical] */
  gap?: [number, number];
  /** Offset of the watermark pattern [left, top] */
  offset?: [number, number];
  /** Font configuration */
  font?: WatermarkFont;
  /** z-index of the watermark layer */
  zIndex?: number;
  /** Whether nested Watermark inherits from parent */
  inherit?: boolean;
  /** Children content to be watermarked */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}
