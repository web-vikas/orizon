"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TagProps, CheckableTagProps, PresetColor } from "./types";

// ---------------------------------------------------------------------------
// Color mapping
// ---------------------------------------------------------------------------

const PRESET_BG: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  purple: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800",
  cyan: "bg-cyan-50 text-cyan-600 border-cyan-200 dark:bg-cyan-950 dark:text-cyan-400 dark:border-cyan-800",
  green: "bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  magenta: "bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-950 dark:text-pink-400 dark:border-pink-800",
  pink: "bg-pink-50 text-pink-600 border-pink-200 dark:bg-pink-950 dark:text-pink-400 dark:border-pink-800",
  red: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  orange: "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800",
  yellow: "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  volcano: "bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-400 dark:border-orange-800",
  geekblue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  lime: "bg-lime-50 text-lime-600 border-lime-200 dark:bg-lime-950 dark:text-lime-400 dark:border-lime-800",
  gold: "bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-800",
  success: "bg-green-50 text-green-600 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-800",
  processing: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800",
  error: "bg-red-50 text-red-600 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  warning: "bg-yellow-50 text-yellow-600 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-800",
  default: "bg-muted text-foreground border-border",
};

function isPresetColor(color?: string): color is PresetColor {
  return !!color && color in PRESET_BG;
}

// ---------------------------------------------------------------------------
// InternalTag
// ---------------------------------------------------------------------------

const InternalTag = React.forwardRef<HTMLSpanElement, TagProps>(
  (
    {
      color,
      closable = false,
      icon,
      bordered = true,
      onClose,
      closeIcon,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) => {
    const [visible, setVisible] = React.useState(true);

    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      onClose?.(e);
      if (!e.defaultPrevented) {
        setVisible(false);
      }
    };

    if (!visible) return null;

    const preset = isPresetColor(color);
    const colorClasses = preset ? PRESET_BG[color!] : undefined;
    const customStyle: React.CSSProperties = {
      ...style,
      ...(color && !preset
        ? { backgroundColor: color, borderColor: color, color: "white" }
        : {}),
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium",
          bordered && "border",
          colorClasses ?? "bg-muted text-foreground border-border",
          className,
        )}
        style={customStyle}
        {...rest}
      >
        {icon && <span className="inline-flex items-center [&>svg]:size-3">{icon}</span>}
        {children}
        {closable && (
          <span
            className="ml-0.5 inline-flex cursor-pointer items-center opacity-60 transition-opacity hover:opacity-100"
            onClick={handleClose}
            role="button"
            tabIndex={0}
            aria-label="Close"
          >
            {closeIcon ?? <X className="size-3" />}
          </span>
        )}
      </span>
    );
  },
);

InternalTag.displayName = "Tag";

// ---------------------------------------------------------------------------
// Tag.CheckableTag
// ---------------------------------------------------------------------------

const CheckableTag: React.FC<CheckableTagProps> = ({
  checked,
  onChange,
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <span
      className={cn(
        "inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors",
        checked
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-background text-foreground hover:bg-muted",
        className,
      )}
      style={style}
      onClick={() => onChange?.(!checked)}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      {...rest}
    >
      {children}
    </span>
  );
};

CheckableTag.displayName = "Tag.CheckableTag";

export { InternalTag, CheckableTag };
