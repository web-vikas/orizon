/**
 * @file Badge — Public Barrel Export
 *
 * Composes `InternalBadge` + `BadgeRibbon` into a single `Badge`
 * export with a `.Ribbon` static property.
 */

import { InternalBadge, BadgeRibbon } from "./Badge";

type BadgeComponent = typeof InternalBadge & {
  Ribbon: typeof BadgeRibbon;
};

/**
 * Badge component for numeric counts, dots, and status indicators.
 *
 * Supports `count`, `dot`, `status`, preset / custom `color`,
 * `overflowCount`, `size`, and `showZero`.
 *
 * Use `Badge.Ribbon` for corner ribbon decorations on cards.
 *
 * @example
 * ```tsx
 * <Badge count={5}><button>Notifications</button></Badge>
 * <Badge dot status="processing"><span>Online</span></Badge>
 * <Badge status="success" text="Completed" />
 *
 * <Badge.Ribbon text="Hot" color="red">
 *   <Card>Content</Card>
 * </Badge.Ribbon>
 * ```
 */
const Badge = InternalBadge as BadgeComponent;
Badge.Ribbon = BadgeRibbon;

export { Badge };
export type {
  BadgeProps,
  BadgeRibbonProps,
  BadgeStatus,
  BadgeSize,
  PresetColor,
  RibbonPlacement,
} from "./types";
