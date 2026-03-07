import type { ReactNode, CSSProperties, HTMLAttributes } from "react";

export type AvatarSize = number | "small" | "middle" | "large";
export type AvatarShape = "circle" | "square";

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Image source */
  src?: string;
  /** Size of avatar */
  size?: AvatarSize;
  /** Shape */
  shape?: AvatarShape;
  /** Icon displayed when no src */
  icon?: ReactNode;
  /** Alt text for image */
  alt?: string;
  /** Gap between character and border */
  gap?: number;
  /** Src set */
  srcSet?: string;
  /** Whether to allow drag */
  draggable?: boolean;
  /** Cross-origin */
  crossOrigin?: "" | "anonymous" | "use-credentials";
  /** Fallback text (children) */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  /** onError callback for image loading */
  onError?: () => boolean;
}

export interface AvatarGroupMaxConfig {
  count?: number;
  style?: CSSProperties;
  popover?: boolean;
}

export interface AvatarGroupProps {
  /** Max config */
  max?: AvatarGroupMaxConfig;
  /** Default size for all avatars */
  size?: AvatarSize;
  /** Default shape for all avatars */
  shape?: AvatarShape;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
  children?: ReactNode;
}
