/**
 * @file Public API for the Popover component.
 * @see ./Popover.tsx - implementation
 */
import { InternalPopover } from "./Popover";

/**
 * Floating content panel with optional title, triggered by a child element.
 *
 * @example
 * ```tsx
 * <Popover content={<p>Rich content here</p>} title="Details">
 *   <Button>Click me</Button>
 * </Popover>
 * ```
 */
const Popover = InternalPopover;

export { Popover };
export type { PopoverProps, PopoverPlacement, PopoverTrigger } from "./types";
