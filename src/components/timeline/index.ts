import { InternalTimeline } from "./Timeline";

/**
 * Timeline component for displaying a vertical list of
 * chronological events.
 *
 * @example
 * ```tsx
 * <Timeline
 *   items={[
 *     { children: "Step 1" },
 *     { children: "Step 2", color: "green" },
 *     { children: "Step 3" },
 *   ]}
 * />
 * ```
 */
const Timeline = InternalTimeline;

export { Timeline };
export type { TimelineProps, TimelineItem, TimelineMode, TimelineItemPosition } from "./types";
