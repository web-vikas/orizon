"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  XIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  NotificationInstance,
  NotificationType,
  NotificationPlacement,
} from "./types";

const TYPE_ICON_MAP: Record<NotificationType, React.ReactNode> = {
  success: <CircleCheckIcon className="size-5 text-green-500" />,
  info: <InfoIcon className="size-5 text-blue-500" />,
  warning: <TriangleAlertIcon className="size-5 text-yellow-500" />,
  error: <CircleXIcon className="size-5 text-red-500" />,
};

const PLACEMENT_CLASSES: Record<NotificationPlacement, string> = {
  top: "inset-x-0 top-0 items-center",
  topLeft: "top-0 left-0 items-start",
  topRight: "top-0 right-0 items-end",
  bottom: "inset-x-0 bottom-0 items-center",
  bottomLeft: "bottom-0 left-0 items-start",
  bottomRight: "bottom-0 right-0 items-end",
};

const getSlideClass = (
  placement: NotificationPlacement,
  closing: boolean
): string => {
  if (closing) return "translate-x-0 opacity-0 scale-95";

  const slideIn: Record<NotificationPlacement, string> = {
    top: "animate-in fade-in-0 slide-in-from-top-5",
    topLeft: "animate-in fade-in-0 slide-in-from-left-5",
    topRight: "animate-in fade-in-0 slide-in-from-right-5",
    bottom: "animate-in fade-in-0 slide-in-from-bottom-5",
    bottomLeft: "animate-in fade-in-0 slide-in-from-left-5",
    bottomRight: "animate-in fade-in-0 slide-in-from-right-5",
  };

  return slideIn[placement];
};

interface NotificationItemProps {
  instance: NotificationInstance;
  placement: NotificationPlacement;
  onClose: (id: string) => void;
}

function NotificationItem({
  instance,
  placement,
  onClose,
}: NotificationItemProps) {
  const { config, type, closing, id, createdAt } = instance;
  const resolvedTitle = config.message ?? config.title;
  const closable = config.closable !== false;
  const showProgress = config.showProgress ?? false;
  const pauseOnHover = config.pauseOnHover ?? true;
  const duration = config.duration ?? 4.5;

  const [paused, setPaused] = React.useState(false);
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    if (!showProgress || duration <= 0) return;

    const startTime = createdAt;
    let pauseStart = 0;
    let totalPaused = 0;

    const frame = () => {
      if (paused) {
        if (!pauseStart) pauseStart = Date.now();
        animId = requestAnimationFrame(frame);
        return;
      }

      if (pauseStart) {
        totalPaused += Date.now() - pauseStart;
        pauseStart = 0;
      }

      const elapsed = Date.now() - startTime - totalPaused;
      const pct = Math.max(0, 100 - (elapsed / (duration * 1000)) * 100);
      setProgress(pct);

      if (pct > 0) {
        animId = requestAnimationFrame(frame);
      }
    };

    let animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, [showProgress, duration, createdAt, paused]);

  return (
    <div
      className={cn(
        "pointer-events-auto relative w-[384px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg bg-background p-4 shadow-lg ring-1 ring-foreground/10 transition-all duration-200",
        getSlideClass(placement, closing)
      )}
      style={config.style}
      onClick={config.onClick}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div className="flex gap-3">
        {/* Icon */}
        {(config.icon || type) && (
          <span className="mt-0.5 flex-shrink-0">
            {config.icon ?? (type ? TYPE_ICON_MAP[type] : null)}
          </span>
        )}

        {/* Content */}
        <div className="flex-1 space-y-1">
          {resolvedTitle && (
            <div className="text-sm font-semibold">{resolvedTitle}</div>
          )}
          {config.description && (
            <div className="text-sm text-muted-foreground">
              {config.description}
            </div>
          )}
          {config.actions && (
            <div className="mt-3 flex items-center gap-2">
              {config.actions}
            </div>
          )}
        </div>

        {/* Close button */}
        {closable && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose(id);
            }}
            className="flex-shrink-0 rounded-sm p-0.5 opacity-50 transition-opacity hover:opacity-100"
          >
            {config.closeIcon ?? <XIcon className="size-4" />}
          </button>
        )}
      </div>

      {/* Progress bar */}
      {showProgress && duration > 0 && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-muted">
          <div
            className="h-full bg-primary transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface NotificationContainerProps {
  notifications: NotificationInstance[];
  placement: NotificationPlacement;
  top?: number;
  bottom?: number;
  onClose: (id: string) => void;
}

export function NotificationContainer({
  notifications,
  placement,
  top = 24,
  bottom = 24,
  onClose,
}: NotificationContainerProps) {
  const isTop = placement.startsWith("top") || placement === "top";

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[1010] flex flex-col gap-3 p-4",
        PLACEMENT_CLASSES[placement]
      )}
      style={isTop ? { top } : { bottom }}
    >
      {notifications.map((n) => (
        <NotificationItem
          key={n.id}
          instance={n}
          placement={placement}
          onClose={onClose}
        />
      ))}
    </div>
  );
}
