import { InternalStatistic, Countdown } from "./Statistic";

type StatisticComponent = typeof InternalStatistic & {
  Countdown: typeof Countdown;
};

const Statistic = InternalStatistic as StatisticComponent;
Statistic.Countdown = Countdown;

export { Statistic };
export type { StatisticProps, CountdownProps } from "./types";
