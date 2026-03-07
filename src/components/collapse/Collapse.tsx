"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronRightIcon } from "lucide-react";
import type { CollapseProps, CollapseSize } from "./types";
import type { Key } from "react";

// ---------------------------------------------------------------------------
// Size mapping
// ---------------------------------------------------------------------------

const SIZE_CLASSES: Record<CollapseSize, string> = {
  large: "[&_[data-slot=accordion-trigger]]:py-4 [&_[data-slot=accordion-trigger]]:text-base",
  middle: "[&_[data-slot=accordion-trigger]]:py-3",
  small: "[&_[data-slot=accordion-trigger]]:py-2 [&_[data-slot=accordion-trigger]]:text-xs",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function normalizeKeys(keys?: Key | Key[]): Key[] {
  if (!keys) return [];
  return Array.isArray(keys) ? keys : [keys];
}

// ---------------------------------------------------------------------------
// InternalCollapse
// ---------------------------------------------------------------------------

const InternalCollapse: React.FC<CollapseProps> = ({
  items = [],
  activeKey: activeKeyProp,
  defaultActiveKey,
  accordion = false,
  bordered = true,
  expandIconPosition = "start",
  ghost = false,
  size = "middle",
  onChange,
  collapsible: globalCollapsible,
  expandIcon,
  className,
  style,
  destroyInactivePanel = false,
}) => {
  const [internalKeys, setInternalKeys] = React.useState<Key[]>(
    normalizeKeys(defaultActiveKey),
  );
  const isControlled = activeKeyProp !== undefined;
  const activeKeys = isControlled ? normalizeKeys(activeKeyProp) : internalKeys;

  const handleChange = (newKeys: Key[]) => {
    if (!isControlled) setInternalKeys(newKeys);
    onChange?.(accordion ? (newKeys[0] ?? null) : newKeys);
  };

  const togglePanel = (key: Key) => {
    if (accordion) {
      const newKeys = activeKeys.includes(key) ? [] : [key];
      handleChange(newKeys);
    } else {
      const newKeys = activeKeys.includes(key)
        ? activeKeys.filter((k) => k !== key)
        : [...activeKeys, key];
      handleChange(newKeys);
    }
  };

  return (
    <div
      data-slot="collapse"
      className={cn(
        "w-full overflow-hidden rounded-lg",
        bordered && !ghost && "border",
        ghost && "border-0",
        SIZE_CLASSES[size],
        className,
      )}
      style={style}
    >
      {items.map((item) => {
        const isActive = activeKeys.includes(item.key);
        const itemCollapsible = item.collapsible ?? globalCollapsible;
        const isDisabled = itemCollapsible === "disabled";
        const showArrow = item.showArrow !== false;

        const handleTriggerClick = () => {
          if (isDisabled) return;
          if (itemCollapsible === "icon") return; // handled by icon click
          togglePanel(item.key);
        };

        const handleIconClick = (e: React.MouseEvent) => {
          e.stopPropagation();
          if (isDisabled) return;
          togglePanel(item.key);
        };

        const arrowIcon = expandIcon ? (
          expandIcon({ isActive })
        ) : (
          <ChevronRightIcon
            className={cn(
              "size-4 shrink-0 text-muted-foreground transition-transform",
              isActive && "rotate-90",
            )}
          />
        );

        return (
          <div
            key={item.key}
            className={cn(
              "not-last:border-b",
              ghost && "border-0",
              item.className,
            )}
            style={item.style}
          >
            {/* Header */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors",
                !isDisabled && "cursor-pointer hover:bg-muted/50",
                isDisabled && "cursor-not-allowed opacity-50",
                !ghost && isActive && "bg-muted/30",
                expandIconPosition === "end" && "flex-row-reverse justify-between",
                item.headerClass,
              )}
              onClick={handleTriggerClick}
              role="button"
              tabIndex={isDisabled ? -1 : 0}
              aria-expanded={isActive}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleTriggerClick();
                }
              }}
            >
              {showArrow && (
                <span
                  className="inline-flex shrink-0"
                  onClick={itemCollapsible === "icon" ? handleIconClick : undefined}
                >
                  {arrowIcon}
                </span>
              )}
              <span className="flex-1">{item.label}</span>
              {item.extra && (
                <span
                  className="ml-auto shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  {item.extra}
                </span>
              )}
            </div>

            {/* Content */}
            {(isActive || item.forceRender || !destroyInactivePanel) && (
              <div
                className={cn(
                  "overflow-hidden transition-all",
                  isActive ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
                )}
              >
                <div className="px-4 pb-4 pt-0 text-sm">{item.children}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

InternalCollapse.displayName = "Collapse";

export { InternalCollapse };
