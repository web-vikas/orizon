import type { ReactNode, CSSProperties, ImgHTMLAttributes } from "react";

export interface PreviewConfig {
  /** Visible state (controlled) */
  visible?: boolean;
  /** Callback when visibility changes */
  onVisibleChange?: (visible: boolean) => void;
  /** Source for preview (can differ from the displayed image) */
  src?: string;
  /** Mask content */
  mask?: ReactNode;
  /** Enable zoom controls */
  scaleStep?: number;
  /** Min scale */
  minScale?: number;
  /** Max scale */
  maxScale?: number;
}

export interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "placeholder"> {
  /** Image source */
  src?: string;
  /** Alt text */
  alt?: string;
  /** Width */
  width?: number | string;
  /** Height */
  height?: number | string;
  /** Preview config or boolean */
  preview?: boolean | PreviewConfig;
  /** Fallback image when loading fails */
  fallback?: string;
  /** Placeholder content displayed while loading */
  placeholder?: ReactNode | boolean;
  /** Root class name */
  rootClassName?: string;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}

export interface PreviewGroupProps {
  /** Preview config for the group */
  preview?: boolean | PreviewConfig;
  /** Items to preview */
  items?: string[];
  /** Extra class name */
  className?: string;
  children?: ReactNode;
}
