/**
 * @file Public API for the Progress component.
 * @see ./Progress.tsx - implementation
 */
import { InternalProgress } from "./Progress";

/**
 * Progress bar/circle for showing completion status.
 *
 * @example
 * ```tsx
 * <Progress percent={50} />
 * <Progress type="circle" percent={75} />
 * <Progress type="dashboard" percent={60} />
 * ```
 */
const Progress = InternalProgress;

export { Progress };
export type {
  ProgressProps,
  ProgressType,
  ProgressStatus,
  ProgressStrokeLinecap,
  ProgressSuccessConfig,
  ProgressSize,
} from "./types";
