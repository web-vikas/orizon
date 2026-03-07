/**
 * @file Drawer component — sliding panel overlay.
 *
 * Renders a panel that slides in from top, right, bottom, or left. Includes
 * a header with title and close button, a scrollable body, and an optional
 * footer. Supports controlled open state, preset sizes, loading state, and
 * destroy-on-close behaviour.
 *
 * Key props: `open`, `onClose`, `placement`, `title`, `footer`, `size`, `loading`.
 *
 * @example
 * ```tsx
 * <Drawer open={open} onClose={() => setOpen(false)} title="Details">
 *   <p>Drawer body content</p>
 * </Drawer>
 * ```
 *
 * @see {@link ./types.ts} for prop type definitions
 * @see {@link ./index.ts} for the public export
 */
"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { Button as ShadcnButton } from "@/primitives/button";
import { cn } from "@/lib/utils";
import type { DrawerProps, DrawerPlacement, DrawerSize } from "./types";

const SIZE_WIDTH_MAP: Record<DrawerSize, number> = {
  default: 378,
  large: 736,
};

const SIZE_HEIGHT_MAP: Record<DrawerSize, number> = {
  default: 378,
  large: 736,
};

const PLACEMENT_CLASSES: Record<DrawerPlacement, string> = {
  right:
    "inset-y-0 right-0 h-full border-l data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-right-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-right-10",
  left: "inset-y-0 left-0 h-full border-r data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-left-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-left-10",
  top: "inset-x-0 top-0 w-full border-b data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-10",
  bottom:
    "inset-x-0 bottom-0 w-full border-t data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-10",
};

const InternalDrawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (props, ref) => {
    const {
      open = false,
      onClose,
      title,
      placement = "right",
      width,
      height,
      footer,
      extra,
      closable = true,
      mask = true,
      destroyOnHidden = false,
      loading = false,
      size = "default",
      afterOpenChange,
      zIndex,
      children,
      className,
      style,
    } = props;

    const [internalOpen, setInternalOpen] = React.useState(open);

    React.useEffect(() => {
      setInternalOpen(open);
    }, [open]);

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (!nextOpen) {
          onClose?.({} as React.MouseEvent);
        }
        setInternalOpen(nextOpen);
        afterOpenChange?.(nextOpen);
      },
      [onClose, afterOpenChange]
    );

    if (!internalOpen && destroyOnHidden) {
      return null;
    }

    // Compute dimensions
    const isHorizontal = placement === "left" || placement === "right";
    const resolvedWidth =
      width ?? (isHorizontal ? SIZE_WIDTH_MAP[size] : undefined);
    const resolvedHeight =
      height ?? (!isHorizontal ? SIZE_HEIGHT_MAP[size] : undefined);

    const dimensionStyle: React.CSSProperties = {};
    if (isHorizontal && resolvedWidth) {
      dimensionStyle.width =
        typeof resolvedWidth === "number"
          ? `${resolvedWidth}px`
          : resolvedWidth;
    }
    if (!isHorizontal && resolvedHeight) {
      dimensionStyle.height =
        typeof resolvedHeight === "number"
          ? `${resolvedHeight}px`
          : resolvedHeight;
    }

    return (
      <SheetPrimitive.Root
        open={internalOpen}
        onOpenChange={handleOpenChange}
        disablePointerDismissal={false}
      >
        <SheetPrimitive.Portal>
          {mask && (
            <SheetPrimitive.Backdrop
              className="fixed inset-0 z-50 bg-black/45 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
              style={zIndex ? { zIndex } : undefined}
            />
          )}
          <SheetPrimitive.Popup
            ref={ref}
            data-slot="drawer-content"
            className={cn(
              "fixed z-50 flex flex-col bg-background text-sm shadow-lg transition duration-200 ease-in-out",
              PLACEMENT_CLASSES[placement],
              className
            )}
            style={{
              ...dimensionStyle,
              ...(zIndex ? { zIndex } : {}),
              ...style,
            }}
          >
            {/* Header */}
            {(title || closable || extra) && (
              <div className="flex items-center justify-between border-b px-6 py-4">
                <div className="flex items-center gap-2">
                  {title && (
                    <SheetPrimitive.Title className="text-base font-semibold leading-none">
                      {title}
                    </SheetPrimitive.Title>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {extra}
                  {closable && (
                    <SheetPrimitive.Close
                      render={
                        <ShadcnButton variant="ghost" size="icon-sm" />
                      }
                    >
                      <XIcon className="size-4" />
                      <span className="sr-only">Close</span>
                    </SheetPrimitive.Close>
                  )}
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 overflow-auto px-6 py-4">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                children
              )}
            </div>

            {/* Footer */}
            {footer && (
              <div className="flex items-center justify-end gap-2 border-t px-6 py-3">
                {footer}
              </div>
            )}
          </SheetPrimitive.Popup>
        </SheetPrimitive.Portal>
      </SheetPrimitive.Root>
    );
  }
);

InternalDrawer.displayName = "Drawer";

export { InternalDrawer };
