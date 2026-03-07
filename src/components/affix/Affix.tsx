/**
 * @file Affix Component
 *
 * Pins its children to the viewport when the scroll position crosses
 * a configurable offset. Supports both top and bottom pinning, and
 * a custom scroll container via the `target` prop.
 *
 * Key props: `offsetTop`, `offsetBottom`, `target`, `onChange`.
 *
 * @example
 * ```tsx
 * <Affix offsetTop={80}>
 *   <nav>Sticky toolbar</nav>
 * </Affix>
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { AffixProps } from "./types";

// ---------------------------------------------------------------------------
// Affix
// ---------------------------------------------------------------------------

const Affix: React.FC<AffixProps> = ({
  offsetTop,
  offsetBottom,
  target,
  onChange,
  children,
  className,
  style,
}) => {
  const [affixed, setAffixed] = React.useState(false);
  const [placeholderStyle, setPlaceholderStyle] = React.useState<React.CSSProperties>({});
  const [fixedStyle, setFixedStyle] = React.useState<React.CSSProperties>({});

  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const prevAffixedRef = React.useRef(false);

  // Determine the effective offset: if neither is specified, default to offsetTop: 0
  const useBottom = offsetBottom !== undefined && offsetTop === undefined;
  const effectiveOffset = useBottom ? (offsetBottom ?? 0) : (offsetTop ?? 0);

  React.useEffect(() => {
    const scrollTarget = target ? target() : window;
    const el = wrapperRef.current;
    if (!el) return;

    const getTargetRect = (): { top: number; bottom: number; height: number } => {
      if (scrollTarget instanceof Window) {
        return {
          top: 0,
          bottom: window.innerHeight,
          height: window.innerHeight,
        };
      }
      const rect = (scrollTarget as HTMLElement).getBoundingClientRect();
      return { top: rect.top, bottom: rect.bottom, height: rect.height };
    };

    const measure = () => {
      const elRect = el.getBoundingClientRect();
      const targetRect = getTargetRect();

      let shouldAffix = false;

      if (useBottom) {
        // Affix to the bottom: when the element's bottom edge goes below
        // the target's bottom minus the offset
        shouldAffix = elRect.bottom > targetRect.bottom - effectiveOffset;
      } else {
        // Affix to the top: when the element's top edge goes above
        // the target's top plus the offset
        shouldAffix = elRect.top <= targetRect.top + effectiveOffset;
      }

      if (shouldAffix !== prevAffixedRef.current) {
        prevAffixedRef.current = shouldAffix;
        setAffixed(shouldAffix);
        onChange?.(shouldAffix);
      }

      if (shouldAffix) {
        setPlaceholderStyle({
          width: elRect.width,
          height: elRect.height,
        });

        const newFixedStyle: React.CSSProperties = {
          position: "fixed",
          width: elRect.width,
          zIndex: 100,
        };

        if (useBottom) {
          newFixedStyle.bottom = effectiveOffset;
        } else {
          newFixedStyle.top = targetRect.top + effectiveOffset;
        }

        setFixedStyle(newFixedStyle);
      }
    };

    measure();

    scrollTarget.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      scrollTarget.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [effectiveOffset, useBottom, target, onChange]);

  if (affixed) {
    return (
      <div ref={wrapperRef} className={cn(className)} style={style}>
        {/* Placeholder to maintain space */}
        <div style={placeholderStyle} />
        {/* Fixed content */}
        <div style={fixedStyle}>{children}</div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={cn(className)} style={style}>
      {children}
    </div>
  );
};

Affix.displayName = "Affix";

export { Affix };
