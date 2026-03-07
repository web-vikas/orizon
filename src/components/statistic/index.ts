import { InternalStatistic, Countdown } from "./Statistic";

type StatisticComponent = typeof InternalStatistic & {
  Countdown: typeof Countdown;
};

/**
 * Statistic component for displaying formatted numeric values with
 * optional title, prefix, suffix, and loading skeleton.
 *
 * Includes a `Statistic.Countdown` sub-component for countdown timers.
 *
 * @example
 * ```tsx
 * <Statistic title="Active Users" value={112893} />
 *
 * <Statistic.Countdown
 *   title="Deadline"
 *   value={Date.now() + 1000 * 60 * 60 * 24}
 *   onFinish={() => console.log("finished")}
 * />
 * ```
 */
const Statistic = InternalStatistic as StatisticComponent;
Statistic.Countdown = Countdown;

export { Statistic };
export type { StatisticProps, CountdownProps } from "./types";
