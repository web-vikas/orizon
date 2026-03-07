/**
 * @file Card Component
 *
 * A versatile container component with optional title, extra content,
 * cover image, action bar, and loading skeleton. Includes `Card.Meta`
 * for avatar + title + description layouts and `Card.Grid` for grid
 * cells within the card body.
 *
 * Key props: `title`, `extra`, `cover`, `actions`, `bordered`,
 * `hoverable`, `loading`, `size`, `type`.
 *
 * @example
 * ```tsx
 * <Card title="Card Title" extra={<a href="#">More</a>}>
 *   <p>Card content</p>
 * </Card>
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import {
  Card as ShadcnCard,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/primitives/card";
import { Skeleton } from "@/primitives/skeleton";
import { cn } from "@/lib/utils";
import type { CardProps, CardMetaProps, CardGridProps } from "./types";

// ---------------------------------------------------------------------------
// Card.Meta
// ---------------------------------------------------------------------------

const CardMeta: React.FC<CardMetaProps> = ({ avatar, title, description, className, style }) => {
  return (
    <div className={cn("flex items-start gap-3", className)} style={style}>
      {avatar && <div className="shrink-0">{avatar}</div>}
      <div className="min-w-0 flex-1">
        {title && (
          <div className="text-sm font-medium leading-snug text-foreground">{title}</div>
        )}
        {description && (
          <div className="mt-0.5 text-sm text-muted-foreground">{description}</div>
        )}
      </div>
    </div>
  );
};

CardMeta.displayName = "Card.Meta";

// ---------------------------------------------------------------------------
// Card.Grid
// ---------------------------------------------------------------------------

const CardGrid: React.FC<CardGridProps> = ({
  hoverable = true,
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      className={cn(
        "border-r border-b p-4",
        hoverable && "cursor-pointer transition-shadow hover:shadow-md",
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
    </div>
  );
};

CardGrid.displayName = "Card.Grid";

// ---------------------------------------------------------------------------
// Loading placeholder
// ---------------------------------------------------------------------------

function CardLoadingSkeleton() {
  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-8 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-4/6" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// InternalCard
// ---------------------------------------------------------------------------

const InternalCard = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      extra,
      cover,
      actions,
      bordered = true,
      hoverable = false,
      loading = false,
      size = "default",
      type,
      bodyStyle,
      headStyle,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const isSmall = size === "small";
    const isInner = type === "inner";

    return (
      <ShadcnCard
        ref={ref}
        size={isSmall ? "sm" : "default"}
        className={cn(
          !bordered && "ring-0 shadow-none",
          hoverable && "cursor-pointer transition-shadow hover:shadow-lg",
          isInner && "bg-muted/30",
          className,
        )}
        style={style}
        {...rest}
      >
        {/* Cover */}
        {cover && (
          <div className="overflow-hidden rounded-t-xl [&>img]:w-full [&>img]:object-cover">
            {cover}
          </div>
        )}

        {/* Header */}
        {(title || extra) && (
          <CardHeader
            className={cn(isInner && "bg-muted/50")}
            style={headStyle}
          >
            <div className="flex items-center justify-between gap-2">
              {title && <CardTitle>{title}</CardTitle>}
              {extra && <div className="ml-auto shrink-0">{extra}</div>}
            </div>
          </CardHeader>
        )}

        {/* Body */}
        <CardContent style={bodyStyle}>
          {loading ? <CardLoadingSkeleton /> : children}
        </CardContent>

        {/* Actions */}
        {actions && actions.length > 0 && (
          <CardFooter className="justify-evenly gap-0 p-0">
            {actions.map((action, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex flex-1 items-center justify-center py-3",
                  idx < actions.length - 1 && "border-r",
                )}
              >
                {action}
              </div>
            ))}
          </CardFooter>
        )}
      </ShadcnCard>
    );
  },
);

InternalCard.displayName = "Card";

export { InternalCard, CardMeta, CardGrid };
