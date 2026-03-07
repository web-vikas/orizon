/**
 * @file Anchor Component
 *
 * A scroll-spy navigation component that highlights the current
 * section in view and smooth-scrolls to anchor targets on click.
 * Supports vertical / horizontal layout, nested items, affix
 * (sticky) positioning, and a sliding active indicator.
 *
 * Key props: `items`, `direction`, `affix`, `targetOffset`, `onChange`.
 *
 * @example
 * ```tsx
 * <Anchor
 *   items={[
 *     { key: "1", href: "#section-1", title: "Introduction" },
 *     { key: "2", href: "#section-2", title: "Usage" },
 *   ]}
 * />
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AnchorProps, AnchorItem } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function flattenAnchors(items: AnchorItem[]): AnchorItem[] {
  const result: AnchorItem[] = [];
  for (const item of items) {
    result.push(item);
    if (item.children) {
      result.push(...flattenAnchors(item.children));
    }
  }
  return result;
}

function getOffsetTop(element: HTMLElement, container: HTMLElement | Window): number {
  if (container === window) {
    const rect = element.getBoundingClientRect();
    return rect.top + window.scrollY;
  }
  const containerEl = container as HTMLElement;
  return element.offsetTop - containerEl.offsetTop;
}

// ---------------------------------------------------------------------------
// AnchorLink
// ---------------------------------------------------------------------------

interface AnchorLinkProps {
  item: AnchorItem;
  activeKey: string;
  level: number;
  direction: AnchorProps["direction"];
  onClick?: AnchorProps["onClick"];
  onActivate: (key: string) => void;
}

function AnchorLink({
  item,
  activeKey,
  level,
  direction,
  onClick,
  onActivate,
}: AnchorLinkProps) {
  const isActive = activeKey === item.key;
  const isVertical = direction === "vertical";

  const handleClick = (e: React.MouseEvent) => {
    onClick?.(e, { title: item.title, href: item.href });
    onActivate(item.key);
  };

  return (
    <div data-slot="anchor-link" className={cn(item.className)}>
      <a
        href={item.href}
        target={item.target}
        data-active={isActive || undefined}
        className={cn(
          "block text-sm transition-colors",
          isVertical
            ? cn(
                "py-1",
                level > 0 && `pl-${level * 3}`,
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )
            : cn(
                "px-3 py-1.5 whitespace-nowrap",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )
        )}
        style={isVertical && level > 0 ? { paddingLeft: level * 12 } : undefined}
        onClick={handleClick}
      >
        {item.title}
      </a>
      {item.children && isVertical && (
        <div className="ml-0">
          {item.children.map((child) => (
            <AnchorLink
              key={child.key}
              item={child}
              activeKey={activeKey}
              level={level + 1}
              direction={direction}
              onClick={onClick}
              onActivate={onActivate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Anchor
// ---------------------------------------------------------------------------

const Anchor = React.forwardRef<HTMLDivElement, AnchorProps>((props, ref) => {
  const {
    items = [],
    direction = "vertical",
    getCurrentAnchor,
    targetOffset = 0,
    affix = true,
    offsetTop = 0,
    onChange,
    onClick,
    bounds = 5,
    replace = false,
    getContainer,
    className,
    style,
  } = props;

  const [activeKey, setActiveKey] = React.useState<string>("");
  const animatingRef = React.useRef(false);
  const isVertical = direction === "vertical";

  // Flatten for scroll spy
  const flatItems = React.useMemo(() => flattenAnchors(items), [items]);

  // Scroll spy effect
  React.useEffect(() => {
    const container = getContainer?.() ?? window;

    function handleScroll() {
      if (animatingRef.current) return;

      // Custom anchor resolver
      if (getCurrentAnchor) {
        const computed = getCurrentAnchor(activeKey);
        if (computed !== activeKey) {
          setActiveKey(computed);
          onChange?.(computed);
        }
        return;
      }

      const scrollTop =
        container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop;

      const viewportHeight =
        container === window
          ? window.innerHeight
          : (container as HTMLElement).clientHeight;

      const boundPx = (bounds / 100) * viewportHeight;

      let currentKey = "";

      for (const item of flatItems) {
        const hash = item.href;
        if (!hash.startsWith("#")) continue;

        const id = hash.slice(1);
        const element = document.getElementById(id);
        if (!element) continue;

        const top = getOffsetTop(element, container);
        if (top <= scrollTop + targetOffset + boundPx) {
          currentKey = item.key;
        }
      }

      if (currentKey !== activeKey) {
        setActiveKey(currentKey);
        onChange?.(currentKey);
      }
    }

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [flatItems, activeKey, targetOffset, bounds, getCurrentAnchor, onChange, getContainer]);

  const handleActivate = (key: string) => {
    setActiveKey(key);
    onChange?.(key);

    // Find the item and scroll to it
    const item = flatItems.find((i) => i.key === key);
    if (!item) return;

    const hash = item.href;
    if (!hash.startsWith("#")) return;

    const id = hash.slice(1);
    const element = document.getElementById(id);
    if (!element) return;

    animatingRef.current = true;

    const container = getContainer?.() ?? window;
    const top = getOffsetTop(element, container) - targetOffset;

    if (container === window) {
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      (container as HTMLElement).scrollTo({ top, behavior: "smooth" });
    }

    // Update URL hash
    if (replace) {
      window.history.replaceState(null, "", hash);
    } else {
      window.history.pushState(null, "", hash);
    }

    // Reset animating flag after scroll completes
    setTimeout(() => {
      animatingRef.current = false;
    }, 500);
  };

  // Indicator positioning
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = React.useState<React.CSSProperties>({});

  React.useEffect(() => {
    if (!anchorRef.current) return;

    const activeEl = anchorRef.current.querySelector<HTMLElement>(
      '[data-active="true"]'
    );
    if (!activeEl) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const containerRect = anchorRef.current.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    if (isVertical) {
      setIndicatorStyle({
        opacity: 1,
        top: activeRect.top - containerRect.top,
        height: activeRect.height,
      });
    } else {
      setIndicatorStyle({
        opacity: 1,
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      });
    }
  }, [activeKey, isVertical]);

  return (
    <div
      ref={ref}
      data-slot="anchor"
      data-direction={direction}
      className={cn(
        "relative",
        affix && "sticky",
        className
      )}
      style={{
        ...(affix ? { top: offsetTop } : {}),
        ...style,
      }}
    >
      <div
        ref={anchorRef}
        className={cn(
          "relative",
          isVertical
            ? "flex flex-col border-l border-border pl-2"
            : "flex flex-row items-center border-b border-border"
        )}
      >
        {/* Active indicator */}
        <span
          data-slot="anchor-indicator"
          className={cn(
            "absolute transition-all duration-200",
            isVertical
              ? "left-0 w-0.5 bg-primary rounded-full"
              : "bottom-0 h-0.5 bg-primary rounded-full"
          )}
          style={indicatorStyle}
        />

        {items.map((item) => (
          <AnchorLink
            key={item.key}
            item={item}
            activeKey={activeKey}
            level={0}
            direction={direction}
            onClick={onClick}
            onActivate={handleActivate}
          />
        ))}
      </div>
    </div>
  );
});

Anchor.displayName = "Anchor";

export { Anchor };
