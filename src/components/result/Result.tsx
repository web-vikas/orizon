/**
 * @file Result -- feedback page for operation outcomes or HTTP errors.
 *
 * Renders a centered status icon, title, subtitle, and optional extra
 * action area. Provides built-in presets for success, error, info, warning,
 * 403, 404, and 500 statuses.
 *
 * Key props: `status`, `title`, `subTitle`, `icon`, `extra`, `children`.
 *
 * @example
 * ```tsx
 * <Result status="success" title="Done!" subTitle="Order placed." extra={<Button>Back</Button>} />
 * <Result status={404} />
 * ```
 *
 * @see ./types.ts  - ResultProps, ResultStatus
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  CircleXIcon,
  InfoIcon,
  TriangleAlertIcon,
  ShieldXIcon,
  ServerCrashIcon,
  FileSearchIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { ResultProps } from "./types";

const STATUS_ICON_MAP: Record<string, React.ReactNode> = {
  success: <CircleCheckIcon className="size-16 text-green-500" />,
  error: <CircleXIcon className="size-16 text-red-500" />,
  info: <InfoIcon className="size-16 text-blue-500" />,
  warning: <TriangleAlertIcon className="size-16 text-yellow-500" />,
  "403": <ShieldXIcon className="size-16 text-muted-foreground" />,
  "404": <FileSearchIcon className="size-16 text-muted-foreground" />,
  "500": <ServerCrashIcon className="size-16 text-muted-foreground" />,
};

const STATUS_TITLE_MAP: Record<string, string> = {
  success: "Success",
  error: "Error",
  info: "Info",
  warning: "Warning",
  "403": "403",
  "404": "404",
  "500": "500",
};

const STATUS_SUBTITLE_MAP: Record<string, string> = {
  "403": "Sorry, you are not authorized to access this page.",
  "404": "Sorry, the page you visited does not exist.",
  "500": "Sorry, something went wrong on the server.",
};

const InternalResult = React.forwardRef<HTMLDivElement, ResultProps>(
  (props, ref) => {
    const {
      status = "info",
      title,
      subTitle,
      icon,
      extra,
      children,
      className,
      style,
    } = props;

    const statusKey = String(status);
    const iconNode = icon ?? STATUS_ICON_MAP[statusKey];
    const resolvedTitle = title ?? STATUS_TITLE_MAP[statusKey];
    const resolvedSubTitle = subTitle ?? STATUS_SUBTITLE_MAP[statusKey];

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center px-8 py-12 text-center",
          className
        )}
        style={style}
      >
        {/* Icon */}
        {iconNode && <div className="mb-6">{iconNode}</div>}

        {/* Title */}
        {resolvedTitle && (
          <h3 className="mb-2 text-2xl font-semibold text-foreground">
            {resolvedTitle}
          </h3>
        )}

        {/* Subtitle */}
        {resolvedSubTitle && (
          <p className="mb-6 max-w-md text-sm text-muted-foreground">
            {resolvedSubTitle}
          </p>
        )}

        {/* Extra (action buttons) */}
        {extra && (
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
            {extra}
          </div>
        )}

        {/* Custom children content */}
        {children && <div className="w-full">{children}</div>}
      </div>
    );
  }
);

InternalResult.displayName = "Result";

export { InternalResult };
