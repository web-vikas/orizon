/**
 * @file Public API for the Spin component.
 * @see ./Spin.tsx - implementation
 */
import { InternalSpin } from "./Spin";

/**
 * Loading spinner for indicating async operations.
 *
 * Can be used standalone, wrapping content, or fullscreen.
 *
 * @example
 * ```tsx
 * <Spin />
 * <Spin tip="Loading..." size="large">
 *   <Card>Content</Card>
 * </Spin>
 * <Spin fullscreen />
 * ```
 */
const Spin = InternalSpin;

export { Spin };
export type { SpinProps, SpinSize } from "./types";
