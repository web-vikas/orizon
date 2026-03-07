/**
 * @file Calendar — Public Barrel Export
 *
 * Re-exports the `<Calendar>` date selection component.
 */

import { InternalCalendar } from "./Calendar";

/**
 * Calendar component for date display and selection.
 *
 * Renders a full-screen monthly/yearly calendar by default, or a
 * compact mini calendar when `fullscreen={false}`. Supports
 * `mode`, `disabledDate`, custom `cellRender`, and `headerRender`.
 *
 * @example
 * ```tsx
 * <Calendar />
 * <Calendar fullscreen={false} />
 * <Calendar mode="year" onChange={(d) => console.log(d)} />
 * ```
 */
const Calendar = InternalCalendar;

export { Calendar };
export type { CalendarProps, CalendarMode } from "./types";
