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
