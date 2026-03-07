import { InternalMasonry } from "./Masonry";

/**
 * Masonry layout component for Pinterest-style multi-column layouts.
 *
 * @example
 * ```tsx
 * <Masonry columns={3} gutter={16}>
 *   <div>Card 1</div>
 *   <div>Card 2</div>
 * </Masonry>
 * <Masonry columns={{ sm: 1, md: 2, lg: 3 }} items={cards} />
 * ```
 */
const Masonry = InternalMasonry;

export { Masonry };
export type { MasonryProps } from "./types";
