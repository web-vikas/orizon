"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { EmptyProps } from "./types";

// ---------------------------------------------------------------------------
// Default SVG images
// ---------------------------------------------------------------------------

const DefaultImage: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <svg
    className={cn("text-muted-foreground/30", className)}
    style={style}
    width="64"
    height="41"
    viewBox="0 0 64 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ellipse cx="32" cy="33" rx="32" ry="7" fill="currentColor" opacity="0.3" />
    <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6">
      <path d="M14 4.5h36a2 2 0 012 2v22a2 2 0 01-2 2H14a2 2 0 01-2-2v-22a2 2 0 012-2z" />
      <path d="M22 14h20M22 19h12" strokeLinecap="round" />
    </g>
  </svg>
);

const SimpleImage: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className,
  style,
}) => (
  <svg
    className={cn("text-muted-foreground/20", className)}
    style={style}
    width="64"
    height="41"
    viewBox="0 0 64 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.5">
      <path d="M32 8v16M24 16h16" strokeLinecap="round" />
    </g>
    <ellipse cx="32" cy="33" rx="24" ry="5" fill="currentColor" opacity="0.2" />
  </svg>
);

// ---------------------------------------------------------------------------
// InternalEmpty
// ---------------------------------------------------------------------------

const InternalEmpty = React.forwardRef<HTMLDivElement, EmptyProps>(
  ({ description, image, imageStyle, className, style, children }, ref) => {
    const imageNode =
      image === undefined ? (
        <DefaultImage style={imageStyle} />
      ) : typeof image === "string" ? (
        <img src={image} alt="empty" style={imageStyle} />
      ) : (
        <div style={imageStyle}>{image}</div>
      );

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center py-8 text-center",
          className,
        )}
        style={style}
      >
        <div className="mb-2">{imageNode}</div>
        {description !== null && (
          <div className="mb-4 text-sm text-muted-foreground">
            {description ?? "No data"}
          </div>
        )}
        {children && <div>{children}</div>}
      </div>
    );
  },
);

InternalEmpty.displayName = "Empty";

// Static image references
const PRESENTED_IMAGE_DEFAULT = DefaultImage;
const PRESENTED_IMAGE_SIMPLE = SimpleImage;

export { InternalEmpty, PRESENTED_IMAGE_DEFAULT, PRESENTED_IMAGE_SIMPLE };
