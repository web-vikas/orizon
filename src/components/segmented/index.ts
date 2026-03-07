/**
 * @file Public API for the Segmented component.
 * @see ./Segmented.tsx - implementation
 */
import { InternalSegmented } from "./Segmented";

/**
 * Segmented toggle control for switching between options.
 *
 * @example
 * ```tsx
 * <Segmented options={["Daily", "Weekly", "Monthly"]} />
 * <Segmented options={[{ label: "List", value: "list", icon: <ListIcon /> }]} />
 * ```
 */
const Segmented = InternalSegmented;

export { Segmented };
export type {
  SegmentedProps,
  SegmentedOption,
  SegmentedOptionType,
  SegmentedSize,
} from "./types";
