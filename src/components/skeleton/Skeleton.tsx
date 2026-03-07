"use client";

import * as React from "react";
import { Skeleton as ShadcnSkeleton } from "@/primitives/skeleton";
import { cn } from "@/lib/utils";
import type {
  SkeletonProps,
  SkeletonAvatarConfig,
  SkeletonTitleConfig,
  SkeletonParagraphConfig,
} from "./types";

const InternalSkeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (props, ref) => {
    const {
      active = false,
      loading = true,
      avatar = false,
      title: titleProp = true,
      paragraph: paragraphProp = true,
      round = false,
      children,
      className,
      style,
    } = props;

    if (!loading) {
      return <>{children}</>;
    }

    // Normalize configs
    const avatarConfig: SkeletonAvatarConfig | null =
      avatar === true
        ? { shape: "circle", size: "default" }
        : avatar === false
          ? null
          : avatar;

    const titleConfig: SkeletonTitleConfig | null =
      titleProp === true
        ? { width: "38%" }
        : titleProp === false
          ? null
          : titleProp;

    const paragraphConfig: SkeletonParagraphConfig | null =
      paragraphProp === true
        ? { rows: 3 }
        : paragraphProp === false
          ? null
          : paragraphProp;

    const rows = paragraphConfig?.rows ?? 3;
    const paragraphWidths = paragraphConfig?.width;

    function getRowWidth(index: number): string | number {
      if (Array.isArray(paragraphWidths)) {
        return paragraphWidths[index] ?? "100%";
      }
      if (paragraphWidths !== undefined && index === rows - 1) {
        return paragraphWidths;
      }
      // Default: last row is 61% width
      if (index === rows - 1) return "61%";
      return "100%";
    }

    const avatarSize =
      avatarConfig?.size === "small"
        ? 32
        : avatarConfig?.size === "large"
          ? 48
          : typeof avatarConfig?.size === "number"
            ? avatarConfig.size
            : 40;

    return (
      <div ref={ref} className={cn("flex gap-4", className)} style={style}>
        {/* Avatar */}
        {avatarConfig && (
          <ShadcnSkeleton
            className={cn(
              "flex-shrink-0",
              avatarConfig.shape === "square" ? "rounded-md" : "rounded-full",
              active && "animate-pulse"
            )}
            style={{
              width: avatarSize,
              height: avatarSize,
            }}
          />
        )}

        {/* Content */}
        <div className="flex-1 space-y-3">
          {/* Title */}
          {titleConfig && (
            <ShadcnSkeleton
              className={cn(
                "h-4",
                round && "rounded-full",
                active && "animate-pulse"
              )}
              style={{
                width:
                  typeof titleConfig.width === "number"
                    ? `${titleConfig.width}px`
                    : titleConfig.width,
              }}
            />
          )}

          {/* Paragraph rows */}
          {paragraphConfig && (
            <div className="space-y-2">
              {Array.from({ length: rows }, (_, i) => {
                const w = getRowWidth(i);
                return (
                  <ShadcnSkeleton
                    key={i}
                    className={cn(
                      "h-3",
                      round && "rounded-full",
                      active && "animate-pulse"
                    )}
                    style={{
                      width: typeof w === "number" ? `${w}px` : w,
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InternalSkeleton.displayName = "Skeleton";

export { InternalSkeleton };
