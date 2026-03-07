"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  XIcon,
} from "lucide-react";
import {
  Alert as ShadcnAlert,
  AlertTitle,
  AlertDescription,
  AlertAction,
} from "@/primitives/alert";
import { cn } from "@/lib/utils";
import type { AlertProps, AlertClosableConfig } from "./types";

const TYPE_ICON_MAP: Record<string, React.ReactNode> = {
  success: <CircleCheckIcon className="size-4" />,
  info: <InfoIcon className="size-4" />,
  warning: <TriangleAlertIcon className="size-4" />,
  error: <CircleXIcon className="size-4" />,
};

const TYPE_STYLE_MAP: Record<string, string> = {
  success:
    "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
  info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
  warning:
    "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
  error:
    "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
};

const InternalAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => {
    const {
      type = "info",
      message,
      title,
      description,
      closable = false,
      showIcon = false,
      icon,
      action,
      banner = false,
      afterClose,
      closeIcon,
      onClose,
      className,
      style,
    } = props;

    const [closed, setClosed] = React.useState(false);
    const [closing, setClosing] = React.useState(false);

    const resolvedTitle = message ?? title;

    // Normalize closable config
    const closableConfig: AlertClosableConfig | null = React.useMemo(() => {
      if (!closable && !banner) return null;
      if (closable === true || banner) {
        return {
          closeIcon: closeIcon,
          afterClose,
          onClose,
        };
      }
      if (typeof closable === "object") {
        return {
          closeIcon: closable.closeIcon ?? closeIcon,
          afterClose: closable.afterClose ?? afterClose,
          onClose: closable.onClose ?? onClose,
        };
      }
      return null;
    }, [closable, banner, closeIcon, afterClose, onClose]);

    const handleClose = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        closableConfig?.onClose?.(e);
        setClosing(true);
        setTimeout(() => {
          setClosed(true);
          closableConfig?.afterClose?.();
        }, 150);
      },
      [closableConfig]
    );

    if (closed) return null;

    const iconNode = icon ?? (showIcon || banner ? TYPE_ICON_MAP[type] : null);

    return (
      <ShadcnAlert
        ref={ref}
        className={cn(
          TYPE_STYLE_MAP[type],
          banner && "rounded-none border-x-0 border-t-0",
          closing && "opacity-0 transition-opacity duration-150",
          className
        )}
        style={style}
      >
        {iconNode}
        {resolvedTitle && <AlertTitle>{resolvedTitle}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
        {(action || closableConfig) && (
          <AlertAction>
            <div className="flex items-center gap-1">
              {action}
              {closableConfig && (
                <button
                  type="button"
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-sm p-0.5 opacity-70 transition-opacity hover:opacity-100"
                >
                  {closableConfig.closeIcon ?? <XIcon className="size-4" />}
                  <span className="sr-only">Close</span>
                </button>
              )}
            </div>
          </AlertAction>
        )}
      </ShadcnAlert>
    );
  }
);

InternalAlert.displayName = "Alert";

export { InternalAlert };
