/**
 * @file ButtonGroup Component
 *
 * Renders adjacent `<Button>` children as a visually connected group:
 *   - Collapsed borders via `-ml-px` on non-first children
 *   - First child keeps left rounding, last child keeps right rounding,
 *     middle children have no rounding
 *   - Hovered / focused children are promoted via `z-10` so their
 *     border/ring sits above neighbours
 *
 * An optional `size` prop overrides every child button's size.
 *
 * @example
 * ```tsx
 * <Button.Group size="small">
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </Button.Group>
 * ```
 *
 * @see {@link ./types.ts} — `ButtonGroupProps`
 */

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ButtonGroupProps } from "./types";

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  size,
  className,
  children,
}) => {
  return (
    <div
      data-slot="button-group"
      className={cn(
        // Connected styling: collapse borders, share rounding, lift on interaction
        "inline-flex items-center [&>*:not(:first-child)]:-ml-px [&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:first-child):not(:last-child)]:rounded-none [&>*]:focus-visible:z-10 [&>*]:hover:z-10",
        className
      )}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // Forward group-level size to each child; preserve child's own size if group size is unset
          return React.cloneElement(child as React.ReactElement<{ size?: string }>, {
            size: size ?? (child.props as { size?: string }).size,
          });
        }
        return child;
      })}
    </div>
  );
};

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup };
