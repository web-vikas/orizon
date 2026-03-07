/**
 * @file Public API for the Result component.
 * @see ./Result.tsx - implementation
 */
import { InternalResult } from "./Result";

/**
 * Feedback page for operation outcomes or HTTP error codes.
 *
 * @example
 * ```tsx
 * <Result status="success" title="Done!" extra={<Button>Go Back</Button>} />
 * <Result status={404} />
 * ```
 */
const Result = InternalResult;

export { Result };
export type { ResultProps, ResultStatus } from "./types";
