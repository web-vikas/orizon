/**
 * @file Public API for the Space component.
 *
 * Re-exports `<Space>` with the `.Compact` sub-component.
 *
 * @see ./Space.tsx   - implementation
 * @see ./Compact.tsx - compact group
 */
import { InternalSpace } from "./Space";
import { SpaceCompact } from "./Compact";

type SpaceComponent = typeof InternalSpace & {
  Compact: typeof SpaceCompact;
};

/**
 * Inline flex layout helper for spacing child elements.
 *
 * Use `Space.Compact` to group adjacent controls with collapsed borders.
 *
 * @example
 * ```tsx
 * <Space size="middle">
 *   <Button>One</Button>
 *   <Button>Two</Button>
 * </Space>
 *
 * <Space direction="vertical" size="large">
 *   <Card />
 *   <Card />
 * </Space>
 * ```
 */
const Space = InternalSpace as SpaceComponent;
Space.Compact = SpaceCompact;

export { Space };
export type { SpaceProps, SpaceCompactProps, SpaceSize, SpaceDirection, SpaceAlign } from "./types";
