import { InternalCard, CardMeta, CardGrid } from "./Card";

type CardComponent = typeof InternalCard & {
  Meta: typeof CardMeta;
  Grid: typeof CardGrid;
};

const Card = InternalCard as CardComponent;
Card.Meta = CardMeta;
Card.Grid = CardGrid;

export { Card };
export type { CardProps, CardMetaProps, CardGridProps, CardSize, CardType } from "./types";
