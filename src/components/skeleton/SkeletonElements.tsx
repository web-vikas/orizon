"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";
import { Skeleton as ShadcnSkeleton } from "@/primitives/skeleton";
import { cn } from "@/lib/utils";
import type {
  SkeletonAvatarProps,
  SkeletonButtonProps,
  SkeletonInputProps,
  SkeletonImageProps,
  SkeletonNodeProps,
} from "./types";

// ─── Skeleton.Avatar ────────────────────────────────────────────────────────

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ active = false, shape = "circle", size = "default", className, style }, ref) => {
    const sizeValue =
      size === "small" ? 32 : size === "large" ? 48 : typeof size === "number" ? size : 40;

    return (
      <ShadcnSkeleton
        ref={ref}
        className={cn(
          shape === "square" ? "rounded-md" : "rounded-full",
          active && "animate-pulse",
          className
        )}
        style={{ width: sizeValue, height: sizeValue, ...style }}
      />
    );
  }
);
SkeletonAvatar.displayName = "Skeleton.Avatar";

// ─── Skeleton.Button ────────────────────────────────────────────────────────

const SkeletonButton = React.forwardRef<HTMLDivElement, SkeletonButtonProps>(
  (
    { active = false, size = "default", shape = "default", block = false, className, style },
    ref
  ) => {
    const heights = { small: 28, default: 32, large: 36 };
    const widths = { small: 64, default: 80, large: 96 };
    const h = heights[size];
    const w = block ? "100%" : widths[size];

    return (
      <ShadcnSkeleton
        ref={ref}
        className={cn(
          shape === "circle" ? "rounded-full aspect-square" : shape === "round" ? "rounded-full" : "rounded-md",
          active && "animate-pulse",
          className
        )}
        style={{
          height: h,
          width: shape === "circle" ? h : w,
          ...style,
        }}
      />
    );
  }
);
SkeletonButton.displayName = "Skeleton.Button";

// ─── Skeleton.Input ─────────────────────────────────────────────────────────

const SkeletonInput = React.forwardRef<HTMLDivElement, SkeletonInputProps>(
  ({ active = false, size = "default", block = false, className, style }, ref) => {
    const heights = { small: 28, default: 32, large: 36 };
    const h = heights[size];

    return (
      <ShadcnSkeleton
        ref={ref}
        className={cn(
          "rounded-md",
          active && "animate-pulse",
          className
        )}
        style={{
          height: h,
          width: block ? "100%" : 200,
          ...style,
        }}
      />
    );
  }
);
SkeletonInput.displayName = "Skeleton.Input";

// ─── Skeleton.Image ─────────────────────────────────────────────────────────

const SkeletonImage = React.forwardRef<HTMLDivElement, SkeletonImageProps>(
  ({ active = false, className, style }, ref) => {
    return (
      <ShadcnSkeleton
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-md",
          active && "animate-pulse",
          className
        )}
        style={{
          width: 96,
          height: 96,
          ...style,
        }}
      >
        <ImageIcon className="size-6 text-muted-foreground/50" />
      </ShadcnSkeleton>
    );
  }
);
SkeletonImage.displayName = "Skeleton.Image";

// ─── Skeleton.Node ──────────────────────────────────────────────────────────

const SkeletonNode = React.forwardRef<HTMLDivElement, SkeletonNodeProps>(
  ({ active = false, children, className, style }, ref) => {
    return (
      <ShadcnSkeleton
        ref={ref}
        className={cn(
          "flex items-center justify-center rounded-md",
          active && "animate-pulse",
          className
        )}
        style={{ width: 96, height: 96, ...style }}
      >
        {children}
      </ShadcnSkeleton>
    );
  }
);
SkeletonNode.displayName = "Skeleton.Node";

export {
  SkeletonAvatar,
  SkeletonButton,
  SkeletonInput,
  SkeletonImage,
  SkeletonNode,
};
