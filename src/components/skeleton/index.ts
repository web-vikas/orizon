/**
 * @file Public API for the Skeleton component.
 *
 * Re-exports `<Skeleton>` with sub-components: `.Avatar`, `.Button`,
 * `.Input`, `.Image`, `.Node`.
 *
 * @see ./Skeleton.tsx         - main skeleton
 * @see ./SkeletonElements.tsx - individual element shapes
 */
import { InternalSkeleton } from "./Skeleton";
import {
  SkeletonAvatar,
  SkeletonButton,
  SkeletonInput,
  SkeletonImage,
  SkeletonNode,
} from "./SkeletonElements";

type SkeletonComponent = typeof InternalSkeleton & {
  Avatar: typeof SkeletonAvatar;
  Button: typeof SkeletonButton;
  Input: typeof SkeletonInput;
  Image: typeof SkeletonImage;
  Node: typeof SkeletonNode;
};

/**
 * Placeholder loading skeleton for content areas.
 *
 * Use `<Skeleton>` for full content placeholders, or individual
 * sub-components for specific UI element shapes.
 *
 * @example
 * ```tsx
 * <Skeleton active avatar paragraph={{ rows: 3 }} />
 * <Skeleton.Avatar active shape="circle" />
 * <Skeleton.Button active />
 * <Skeleton.Input active />
 * <Skeleton.Image active />
 * ```
 */
const Skeleton = InternalSkeleton as SkeletonComponent;
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Button = SkeletonButton;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;
Skeleton.Node = SkeletonNode;

export { Skeleton };
export type {
  SkeletonProps,
  SkeletonAvatarProps,
  SkeletonButtonProps,
  SkeletonInputProps,
  SkeletonImageProps,
  SkeletonNodeProps,
  SkeletonAvatarConfig,
  SkeletonTitleConfig,
  SkeletonParagraphConfig,
  SkeletonAvatarShape,
  SkeletonAvatarSize,
  SkeletonButtonSize,
  SkeletonButtonShape,
  SkeletonInputSize,
} from "./types";
