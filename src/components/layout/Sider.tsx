"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SiderProps, SiderBreakpoint } from "./types";

const BREAKPOINT_MAP: Record<SiderBreakpoint, number> = {
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
};

const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Sider = React.forwardRef<HTMLElement, SiderProps>((props, ref) => {
  const {
    collapsed: collapsedProp,
    collapsible = false,
    collapsedWidth = 80,
    width = 200,
    breakpoint,
    theme = "light",
    trigger,
    onCollapse,
    onBreakpoint,
    reverseArrow = false,
    zeroWidthTriggerStyle,
    className,
    children,
    style,
    ...rest
  } = props;

  const [internalCollapsed, setInternalCollapsed] = React.useState(false);
  const isControlled = collapsedProp !== undefined;
  const collapsed = isControlled ? collapsedProp : internalCollapsed;

  // Responsive breakpoint handling
  React.useEffect(() => {
    if (!breakpoint) return;

    const mediaQuery = window.matchMedia(
      `(max-width: ${BREAKPOINT_MAP[breakpoint]}px)`
    );

    function handleChange(e: MediaQueryListEvent | MediaQueryList) {
      const broken = "matches" in e ? e.matches : (e as MediaQueryListEvent).matches;
      onBreakpoint?.(broken);
      if (broken && !collapsed) {
        if (!isControlled) setInternalCollapsed(true);
        onCollapse?.(true, "responsive");
      } else if (!broken && collapsed) {
        if (!isControlled) setInternalCollapsed(false);
        onCollapse?.(false, "responsive");
      }
    }

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakpoint]);

  const handleTriggerClick = () => {
    const newCollapsed = !collapsed;
    if (!isControlled) setInternalCollapsed(newCollapsed);
    onCollapse?.(newCollapsed, "clickTrigger");
  };

  const siderWidth = collapsed ? collapsedWidth : width;
  const isZeroWidth = collapsed && collapsedWidth === 0;

  const triggerNode = (() => {
    if (!collapsible) return null;
    if (trigger === null) return null;

    if (trigger !== undefined) {
      return (
        <div
          data-slot="layout-sider-trigger"
          className="flex h-12 cursor-pointer items-center justify-center border-t border-border transition-colors hover:bg-accent"
          onClick={handleTriggerClick}
        >
          {trigger}
        </div>
      );
    }

    // Zero-width trigger (shows as a floating button on the side)
    if (isZeroWidth) {
      return (
        <span
          data-slot="layout-sider-zero-trigger"
          className={cn(
            "absolute top-16 z-10 flex h-10 w-9 cursor-pointer items-center justify-center rounded-r-md",
            theme === "dark"
              ? "bg-zinc-800 text-zinc-100 hover:bg-zinc-700"
              : "bg-background text-foreground shadow-md border border-border hover:bg-accent",
            reverseArrow ? "-left-9 rounded-r-none rounded-l-md" : "-right-9"
          )}
          style={zeroWidthTriggerStyle}
          onClick={handleTriggerClick}
        >
          {collapsed ? (reverseArrow ? <ChevronLeft /> : <ChevronRight />) : reverseArrow ? <ChevronRight /> : <ChevronLeft />}
        </span>
      );
    }

    // Default trigger
    return (
      <div
        data-slot="layout-sider-trigger"
        className={cn(
          "flex h-12 cursor-pointer items-center justify-center border-t transition-colors",
          theme === "dark"
            ? "border-zinc-700 text-zinc-100 hover:bg-zinc-700"
            : "border-border text-foreground hover:bg-accent"
        )}
        onClick={handleTriggerClick}
      >
        {collapsed
          ? reverseArrow
            ? <ChevronLeft />
            : <ChevronRight />
          : reverseArrow
            ? <ChevronRight />
            : <ChevronLeft />}
      </div>
    );
  })();

  return (
    <aside
      ref={ref}
      data-slot="layout-sider"
      data-collapsed={collapsed}
      data-theme={theme}
      className={cn(
        "relative flex flex-col shrink-0 transition-all duration-200",
        theme === "dark"
          ? "bg-zinc-900 text-zinc-100"
          : "bg-background border-r border-border",
        className
      )}
      style={{
        width: siderWidth,
        minWidth: siderWidth,
        maxWidth: siderWidth,
        ...style,
      }}
      {...rest}
    >
      <div className="flex-1 overflow-hidden">{children}</div>
      {triggerNode}
    </aside>
  );
});

Sider.displayName = "Layout.Sider";

export { Sider };
