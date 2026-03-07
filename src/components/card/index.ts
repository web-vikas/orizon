/**
 * @file Card — Public Barrel Export
 *
 * Composes `InternalCard` + `CardMeta` + `CardGrid` into a single
 * `Card` export with `.Meta` and `.Grid` static properties.
 */

import { InternalCard, CardMeta, CardGrid } from "./Card";

type CardComponent = typeof InternalCard & {
  Meta: typeof CardMeta;
  Grid: typeof CardGrid;
};

/**
 * Card container component.
 *
 * Supports `title`, `extra`, `cover`, `actions`, `bordered`,
 * `hoverable`, `loading`, `size`, and `type` (inner for nesting).
 *
 * Use `Card.Meta` for avatar + title + description layouts and
 * `Card.Grid` for hoverable grid cells inside the card body.
 *
 * @example
 * ```tsx
 * <Card title="Users" extra={<a href="#">More</a>}>
 *   <p>Card body content</p>
 * </Card>
 *
 * <Card cover={<img src="/cover.jpg" alt="" />}>
 *   <Card.Meta title="Title" description="Description" />
 * </Card>
 *
 * <Card>
 *   <Card.Grid>Cell 1</Card.Grid>
 *   <Card.Grid>Cell 2</Card.Grid>
 * </Card>
 * ```
 */
const Card = InternalCard as CardComponent;
Card.Meta = CardMeta;
Card.Grid = CardGrid;

export { Card };
export type { CardProps, CardMetaProps, CardGridProps, CardSize, CardType } from "./types";
