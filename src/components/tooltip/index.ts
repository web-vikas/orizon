import { InternalTooltip } from "./Tooltip";

/**
 * Tooltip component for showing contextual hints on hover.
 *
 * @example
 * ```tsx
 * <Tooltip title="Helpful tip">
 *   <button>Hover me</button>
 * </Tooltip>
 * ```
 */
const Tooltip = InternalTooltip;

export { Tooltip };
export type { TooltipProps, TooltipPlacement, TooltipTrigger } from "./types";
