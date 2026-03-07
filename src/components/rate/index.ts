/**
 * @file Public API for the Rate component.
 * @see ./Rate.tsx - implementation
 */
import { InternalRate } from "./Rate";

/**
 * Star rating input for scoring or feedback.
 *
 * Supports half-star precision, custom characters, tooltips, and
 * keyboard navigation.
 *
 * @example
 * ```tsx
 * <Rate defaultValue={3} />
 * <Rate allowHalf defaultValue={2.5} />
 * <Rate character="A" count={26} />
 * ```
 */
const Rate = InternalRate;

export { Rate };
export type { RateProps } from "./types";
