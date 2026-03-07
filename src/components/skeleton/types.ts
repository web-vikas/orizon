/**
 * @file Skeleton component type definitions.
 *
 * Exports props for the `<Skeleton>` placeholder and its sub-components
 * (`Skeleton.Avatar`, `.Button`, `.Input`, `.Image`, `.Node`).
 *
 * @see ./Skeleton.tsx         - main skeleton implementation
 * @see ./SkeletonElements.tsx - individual element skeletons
 * @see ./index.ts             - public export
 */
import type { ReactNode, CSSProperties } from "react";

export type SkeletonAvatarShape = "circle" | "square";
export type SkeletonAvatarSize = "small" | "default" | "large" | number;
export type SkeletonButtonSize = "small" | "default" | "large";
export type SkeletonButtonShape = "default" | "circle" | "round";
export type SkeletonInputSize = "small" | "default" | "large";

export interface SkeletonAvatarConfig {
  /** Avatar shape */
  shape?: SkeletonAvatarShape;
  /** Avatar size */
  size?: SkeletonAvatarSize;
}

export interface SkeletonTitleConfig {
  /** Width of the title */
  width?: string | number;
}

export interface SkeletonParagraphConfig {
  /** Number of rows */
  rows?: number;
  /** Width of each row (can be array for each row) */
  width?: string | number | (string | number)[];
}

export interface SkeletonProps {
  /** Whether to animate the skeleton */
  active?: boolean;
  /** Whether to show skeleton (true) or children (false) */
  loading?: boolean;
  /** Avatar configuration */
  avatar?: boolean | SkeletonAvatarConfig;
  /** Title configuration */
  title?: boolean | SkeletonTitleConfig;
  /** Paragraph configuration */
  paragraph?: boolean | SkeletonParagraphConfig;
  /** Use rounded borders */
  round?: boolean;
  /** Children shown when loading is false */
  children?: ReactNode;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}

export interface SkeletonElementProps {
  /** Whether to animate */
  active?: boolean;
  /** Extra class name */
  className?: string;
  /** Inline style */
  style?: CSSProperties;
}

export interface SkeletonAvatarProps extends SkeletonElementProps {
  /** Shape of avatar */
  shape?: SkeletonAvatarShape;
  /** Size of avatar */
  size?: SkeletonAvatarSize;
}

export interface SkeletonButtonProps extends SkeletonElementProps {
  /** Size of button */
  size?: SkeletonButtonSize;
  /** Shape of button */
  shape?: SkeletonButtonShape;
  /** Block mode */
  block?: boolean;
}

export interface SkeletonInputProps extends SkeletonElementProps {
  /** Size of input */
  size?: SkeletonInputSize;
  /** Block mode */
  block?: boolean;
}

export interface SkeletonImageProps extends SkeletonElementProps {}

export interface SkeletonNodeProps extends SkeletonElementProps {
  /** Children content */
  children?: ReactNode;
}
