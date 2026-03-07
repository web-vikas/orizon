/**
 * @file Affix — Public Barrel Export
 *
 * Re-exports the `<Affix>` component that pins content to the viewport
 * on scroll.
 */

/**
 * Affix component that pins its children to the viewport when scrolling.
 *
 * Supports `offsetTop` / `offsetBottom` for threshold control, a custom
 * `target` scroll container, and an `onChange` callback.
 *
 * @example
 * ```tsx
 * <Affix offsetTop={64}>
 *   <div>I stick 64px from top</div>
 * </Affix>
 *
 * <Affix offsetBottom={20}>
 *   <button>Floating action</button>
 * </Affix>
 * ```
 */
export { Affix } from "./Affix";
export type { AffixProps } from "./types";
