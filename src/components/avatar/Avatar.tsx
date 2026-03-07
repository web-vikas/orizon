/**
 * @file Avatar Component
 *
 * Renders a user avatar as an image, icon, or auto-scaled text
 * initials. Supports circle / square shapes, three preset sizes
 * (plus custom numeric), and grouped display via `Avatar.Group`.
 *
 * Key props: `src`, `size`, `shape`, `icon`, `alt`, `gap`.
 *
 * @example
 * ```tsx
 * <Avatar src="/user.jpg" alt="Jane" />
 * <Avatar icon={<UserIcon />} shape="square" size="large" />
 * <Avatar.Group max={{ count: 3 }}>
 *   <Avatar src="/a.jpg" />
 *   <Avatar src="/b.jpg" />
 *   <Avatar src="/c.jpg" />
 *   <Avatar src="/d.jpg" />
 * </Avatar.Group>
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import {
  Avatar as ShadcnAvatar,
  AvatarImage,
  AvatarFallback,
  AvatarGroup as ShadcnAvatarGroup,
  AvatarGroupCount,
} from "@/primitives/avatar";
import { cn } from "@/lib/utils";
import type { AvatarProps, AvatarGroupProps } from "./types";

// ---------------------------------------------------------------------------
// Size helpers
// ---------------------------------------------------------------------------

function getSizeClass(size?: AvatarProps["size"]): string {
  if (typeof size === "number") return "";
  switch (size) {
    case "small":
      return "size-6 text-xs";
    case "large":
      return "size-10 text-base";
    default:
      return "size-8 text-sm";
  }
}

function getShadcnSize(size?: AvatarProps["size"]): "default" | "sm" | "lg" {
  if (typeof size === "number") return "default";
  switch (size) {
    case "small":
      return "sm";
    case "large":
      return "lg";
    default:
      return "default";
  }
}

// ---------------------------------------------------------------------------
// InternalAvatar
// ---------------------------------------------------------------------------

const InternalAvatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      size = "middle",
      shape = "circle",
      icon,
      alt,
      gap = 4,
      srcSet,
      draggable,
      crossOrigin,
      children,
      className,
      style,
      onError,
      ...rest
    },
    ref,
  ) => {
    const [imgError, setImgError] = React.useState(false);
    const textRef = React.useRef<HTMLSpanElement>(null);
    const containerRef = React.useRef<HTMLSpanElement>(null);
    const [scale, setScale] = React.useState(1);

    const isCustomSize = typeof size === "number";

    // Auto-scale text content
    React.useEffect(() => {
      if (textRef.current && containerRef.current && !src && !icon) {
        const textWidth = textRef.current.offsetWidth;
        const containerWidth = containerRef.current.offsetWidth;
        const availableWidth = containerWidth - gap * 2;
        if (textWidth > 0 && availableWidth > 0) {
          setScale(Math.min(availableWidth / textWidth, 1));
        }
      }
    }, [children, gap, src, icon]);

    const handleImgError = () => {
      const result = onError?.();
      if (result !== false) {
        setImgError(true);
      }
    };

    const customStyle: React.CSSProperties = {
      ...style,
      ...(isCustomSize ? { width: size, height: size, fontSize: size * 0.5 } : {}),
    };

    const hasSrc = src && !imgError;

    return (
      <ShadcnAvatar
        ref={(el) => {
          (containerRef as React.MutableRefObject<HTMLSpanElement | null>).current = el;
          if (typeof ref === "function") ref(el);
          else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = el;
        }}
        size={getShadcnSize(size)}
        className={cn(
          isCustomSize && getSizeClass(undefined),
          shape === "square" && "rounded-lg after:rounded-lg",
          className,
        )}
        style={customStyle}
        {...rest}
      >
        {hasSrc ? (
          <AvatarImage
            src={src}
            alt={alt}
            srcSet={srcSet}
            draggable={draggable}
            crossOrigin={crossOrigin}
            onError={handleImgError}
            className={cn(shape === "square" && "rounded-lg")}
          />
        ) : null}
        <AvatarFallback
          className={cn(shape === "square" && "rounded-lg")}
        >
          {icon ? (
            <span className="inline-flex items-center justify-center">{icon}</span>
          ) : children ? (
            <span
              ref={textRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: "center",
              }}
            >
              {children}
            </span>
          ) : null}
        </AvatarFallback>
      </ShadcnAvatar>
    );
  },
);

InternalAvatar.displayName = "Avatar";

// ---------------------------------------------------------------------------
// AvatarGroup
// ---------------------------------------------------------------------------

const InternalAvatarGroup: React.FC<AvatarGroupProps> = ({
  max,
  size,
  shape,
  className,
  style,
  children,
}) => {
  const childArray = React.Children.toArray(children);
  const maxCount = max?.count ?? childArray.length;
  const visibleChildren = childArray.slice(0, maxCount);
  const restCount = childArray.length - maxCount;

  return (
    <ShadcnAvatarGroup className={className} style={style}>
      {visibleChildren.map((child, idx) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<AvatarProps>, {
            key: idx,
            size: size ?? (child.props as AvatarProps).size,
            shape: shape ?? (child.props as AvatarProps).shape,
          });
        }
        return child;
      })}
      {restCount > 0 && (
        <AvatarGroupCount style={max?.style}>
          +{restCount}
        </AvatarGroupCount>
      )}
    </ShadcnAvatarGroup>
  );
};

InternalAvatarGroup.displayName = "Avatar.Group";

export { InternalAvatar, InternalAvatarGroup };
