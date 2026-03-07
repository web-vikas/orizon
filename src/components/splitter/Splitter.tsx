"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SplitterProps, SplitterPanelProps, SplitterLayout } from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseSizeToPercent(
  size: number | string | undefined,
  fallback: number,
): number {
  if (size == null) return fallback;
  if (typeof size === "number") return size;
  if (size.endsWith("%")) return parseFloat(size);
  // Treat raw numeric strings as percentages
  const parsed = parseFloat(size);
  return isNaN(parsed) ? fallback : parsed;
}

function clampSize(
  value: number,
  min: number | string | undefined,
  max: number | string | undefined,
): number {
  let result = value;
  if (min != null) {
    const minVal = parseSizeToPercent(min, 0);
    result = Math.max(result, minVal);
  }
  if (max != null) {
    const maxVal = parseSizeToPercent(max, 100);
    result = Math.min(result, maxVal);
  }
  return result;
}

interface PanelConfig {
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
  collapsible?: boolean | { start?: boolean; end?: boolean };
  resizable?: boolean;
}

function isCollapsibleForDirection(
  collapsible: SplitterPanelProps["collapsible"],
  direction: "start" | "end",
): boolean {
  if (collapsible === true) return true;
  if (typeof collapsible === "object") {
    return direction === "start"
      ? collapsible.start === true
      : collapsible.end === true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// ResizeHandle
// ---------------------------------------------------------------------------

interface ResizeHandleProps {
  layout: SplitterLayout;
  onDragStart: () => void;
  onDrag: (delta: number) => void;
  onDragEnd: () => void;
  onDoubleClick: () => void;
  collapseStart?: boolean;
  collapseEnd?: boolean;
  onCollapseStart?: () => void;
  onCollapseEnd?: () => void;
}

const ResizeHandle: React.FC<ResizeHandleProps> = ({
  layout,
  onDragStart,
  onDrag,
  onDragEnd,
  onDoubleClick,
  collapseStart,
  collapseEnd,
  onCollapseStart,
  onCollapseEnd,
}) => {
  const isHorizontal = layout === "horizontal";
  const handleRef = React.useRef<HTMLDivElement>(null);

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onDragStart();

      const startPos = isHorizontal ? e.clientX : e.clientY;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const currentPos = isHorizontal
          ? moveEvent.clientX
          : moveEvent.clientY;
        onDrag(currentPos - startPos);
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        onDragEnd();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [isHorizontal, onDragStart, onDrag, onDragEnd],
  );

  // Grip dots SVG
  const gripDots = isHorizontal ? (
    <svg
      width="6"
      height="24"
      viewBox="0 0 6 24"
      fill="currentColor"
      className="text-muted-foreground/60"
    >
      <circle cx="1.5" cy="5" r="1.5" />
      <circle cx="1.5" cy="12" r="1.5" />
      <circle cx="1.5" cy="19" r="1.5" />
      <circle cx="4.5" cy="5" r="1.5" />
      <circle cx="4.5" cy="12" r="1.5" />
      <circle cx="4.5" cy="19" r="1.5" />
    </svg>
  ) : (
    <svg
      width="24"
      height="6"
      viewBox="0 0 24 6"
      fill="currentColor"
      className="text-muted-foreground/60"
    >
      <circle cx="5" cy="1.5" r="1.5" />
      <circle cx="12" cy="1.5" r="1.5" />
      <circle cx="19" cy="1.5" r="1.5" />
      <circle cx="5" cy="4.5" r="1.5" />
      <circle cx="12" cy="4.5" r="1.5" />
      <circle cx="19" cy="4.5" r="1.5" />
    </svg>
  );

  return (
    <div
      ref={handleRef}
      data-slot="splitter-handle"
      className={cn(
        "relative flex shrink-0 items-center justify-center bg-border transition-colors hover:bg-primary/10",
        isHorizontal ? "w-2 cursor-col-resize" : "h-2 cursor-row-resize",
      )}
      onMouseDown={handleMouseDown}
      onDoubleClick={onDoubleClick}
      role="separator"
      aria-orientation={isHorizontal ? "vertical" : "horizontal"}
      tabIndex={0}
      onKeyDown={(e) => {
        const step = 2; // percent
        if (isHorizontal) {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            onDragStart();
            onDrag(-step);
            onDragEnd();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            onDragStart();
            onDrag(step);
            onDragEnd();
          }
        } else {
          if (e.key === "ArrowUp") {
            e.preventDefault();
            onDragStart();
            onDrag(-step);
            onDragEnd();
          } else if (e.key === "ArrowDown") {
            e.preventDefault();
            onDragStart();
            onDrag(step);
            onDragEnd();
          }
        }
      }}
    >
      {gripDots}

      {/* Collapse arrows */}
      {collapseStart && (
        <button
          type="button"
          className={cn(
            "absolute z-10 flex size-4 items-center justify-center rounded-sm bg-border text-muted-foreground hover:bg-primary/20 hover:text-foreground",
            isHorizontal ? "-left-2 top-1/2 -translate-y-1/2 -translate-x-full" : "-top-2 left-1/2 -translate-x-1/2 -translate-y-full",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onCollapseStart?.();
          }}
          aria-label="Collapse previous panel"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isHorizontal ? (
              <polyline points="5,1 2,4 5,7" />
            ) : (
              <polyline points="1,5 4,2 7,5" />
            )}
          </svg>
        </button>
      )}
      {collapseEnd && (
        <button
          type="button"
          className={cn(
            "absolute z-10 flex size-4 items-center justify-center rounded-sm bg-border text-muted-foreground hover:bg-primary/20 hover:text-foreground",
            isHorizontal ? "-right-2 top-1/2 -translate-y-1/2 translate-x-full" : "-bottom-2 left-1/2 -translate-x-1/2 translate-y-full",
          )}
          onClick={(e) => {
            e.stopPropagation();
            onCollapseEnd?.();
          }}
          aria-label="Collapse next panel"
        >
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {isHorizontal ? (
              <polyline points="3,1 6,4 3,7" />
            ) : (
              <polyline points="1,3 4,6 7,3" />
            )}
          </svg>
        </button>
      )}
    </div>
  );
};

ResizeHandle.displayName = "SplitterResizeHandle";

// ---------------------------------------------------------------------------
// InternalSplitter
// ---------------------------------------------------------------------------

const InternalSplitter = React.forwardRef<HTMLDivElement, SplitterProps>(
  (props, ref) => {
    const {
      layout = "horizontal",
      onResize,
      onResizeStart,
      onResizeEnd,
      children,
      className,
      style,
    } = props;

    const containerRef = React.useRef<HTMLDivElement>(null);

    // Extract panel configs from children
    const panelChildren = React.useMemo(() => {
      const panels: React.ReactElement<SplitterPanelProps>[] = [];
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          panels.push(child as React.ReactElement<SplitterPanelProps>);
        }
      });
      return panels;
    }, [children]);

    const panelConfigs: PanelConfig[] = React.useMemo(
      () =>
        panelChildren.map((child) => ({
          defaultSize: child.props.defaultSize,
          min: child.props.min,
          max: child.props.max,
          collapsible: child.props.collapsible,
          resizable: child.props.resizable,
        })),
      [panelChildren],
    );

    // Initialize sizes as percentages
    const [sizes, setSizes] = React.useState<number[]>(() => {
      const count = panelConfigs.length;
      if (count === 0) return [];
      const defaultEqual = 100 / count;
      return panelConfigs.map((cfg) =>
        parseSizeToPercent(cfg.defaultSize, defaultEqual),
      );
    });

    // Track drag start sizes for delta calculations
    const dragStartSizes = React.useRef<number[]>([]);

    const getSizes = React.useCallback(() => sizes, [sizes]);

    // Handle drag start
    const handleDragStart = React.useCallback(
      (handleIndex: number) => {
        dragStartSizes.current = [...sizes];
        onResizeStart?.(sizes);

        return handleIndex; // used for closure reference
      },
      [sizes, onResizeStart],
    );

    // Handle drag (delta in pixels, convert to percent)
    const handleDrag = React.useCallback(
      (handleIndex: number, delta: number) => {
        const container = containerRef.current;
        if (!container) return;

        const isHorizontal = layout === "horizontal";
        const containerSize = isHorizontal
          ? container.offsetWidth
          : container.offsetHeight;

        if (containerSize === 0) return;

        const deltaPercent = (delta / containerSize) * 100;
        const startSizes = dragStartSizes.current;

        if (startSizes.length === 0) return;

        const newSizes = [...startSizes];
        const leftIdx = handleIndex;
        const rightIdx = handleIndex + 1;

        let newLeft = startSizes[leftIdx] + deltaPercent;
        let newRight = startSizes[rightIdx] - deltaPercent;

        // Clamp
        newLeft = clampSize(newLeft, panelConfigs[leftIdx]?.min, panelConfigs[leftIdx]?.max);
        newRight = clampSize(newRight, panelConfigs[rightIdx]?.min, panelConfigs[rightIdx]?.max);

        // Ensure total stays consistent
        const total = startSizes[leftIdx] + startSizes[rightIdx];
        if (newLeft + newRight > total) {
          if (deltaPercent > 0) {
            newRight = total - newLeft;
          } else {
            newLeft = total - newRight;
          }
        }

        newSizes[leftIdx] = newLeft;
        newSizes[rightIdx] = newRight;

        setSizes(newSizes);
        onResize?.(newSizes);
      },
      [layout, panelConfigs, onResize],
    );

    // Handle drag end
    const handleDragEnd = React.useCallback(() => {
      const currentSizes = getSizes();
      onResizeEnd?.(currentSizes);
      dragStartSizes.current = [];
    }, [getSizes, onResizeEnd]);

    // Collapse a panel to its min
    const collapsePanel = React.useCallback(
      (panelIndex: number, handleIndex: number) => {
        const config = panelConfigs[panelIndex];
        if (!config) return;

        const minSize = parseSizeToPercent(config.min, 0);
        const currentSize = sizes[panelIndex];
        const diff = currentSize - minSize;

        // Distribute diff to the neighbor
        const neighborIndex =
          panelIndex === handleIndex ? handleIndex + 1 : handleIndex;

        const newSizes = [...sizes];
        newSizes[panelIndex] = minSize;
        newSizes[neighborIndex] = sizes[neighborIndex] + diff;

        setSizes(newSizes);
        onResize?.(newSizes);
      },
      [panelConfigs, sizes, onResize],
    );

    // Double-click on handle: toggle collapse for adjacent collapsible panel
    const handleDoubleClick = React.useCallback(
      (handleIndex: number) => {
        const leftConfig = panelConfigs[handleIndex];
        const rightConfig = panelConfigs[handleIndex + 1];

        // Prefer collapsing the left panel toward start, then right toward end
        if (isCollapsibleForDirection(leftConfig?.collapsible, "end")) {
          collapsePanel(handleIndex, handleIndex);
        } else if (
          isCollapsibleForDirection(rightConfig?.collapsible, "start")
        ) {
          collapsePanel(handleIndex + 1, handleIndex);
        }
      },
      [panelConfigs, collapsePanel],
    );

    const isHorizontal = layout === "horizontal";

    return (
      <div
        ref={(node) => {
          // Merge refs
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        data-slot="splitter"
        className={cn(
          "flex h-full w-full overflow-hidden rounded-lg border",
          isHorizontal ? "flex-row" : "flex-col",
          className,
        )}
        style={style}
      >
        {panelChildren.map((child, index) => {
          const panelSize = sizes[index] ?? 0;
          const config = panelConfigs[index];
          const isResizable = config?.resizable !== false;

          const panelStyle: React.CSSProperties = {
            ...(child.props.style ?? {}),
            flexBasis: `${panelSize}%`,
            flexGrow: 0,
            flexShrink: 0,
            overflow: "auto",
          };

          return (
            <React.Fragment key={index}>
              {React.cloneElement(child, {
                style: panelStyle,
              } as Partial<SplitterPanelProps>)}

              {/* Render handle between panels */}
              {index < panelChildren.length - 1 && isResizable && (
                <ResizeHandle
                  layout={layout}
                  onDragStart={() => handleDragStart(index)}
                  onDrag={(delta) => handleDrag(index, delta)}
                  onDragEnd={handleDragEnd}
                  onDoubleClick={() => handleDoubleClick(index)}
                  collapseStart={isCollapsibleForDirection(
                    config?.collapsible,
                    "end",
                  )}
                  collapseEnd={isCollapsibleForDirection(
                    panelConfigs[index + 1]?.collapsible,
                    "start",
                  )}
                  onCollapseStart={() => collapsePanel(index, index)}
                  onCollapseEnd={() => collapsePanel(index + 1, index)}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

InternalSplitter.displayName = "Splitter";

export { InternalSplitter };
