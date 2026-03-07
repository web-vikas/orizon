import { InternalBadge, BadgeRibbon } from "./Badge";

type BadgeComponent = typeof InternalBadge & {
  Ribbon: typeof BadgeRibbon;
};

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
