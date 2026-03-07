/**
 * @file Anchor — Public Barrel Export
 *
 * Re-exports the `<Anchor>` scroll-spy navigation component.
 */

/**
 * Anchor component for scroll-spy navigation.
 *
 * Highlights the active section as the user scrolls and smooth-scrolls
 * to targets on click. Supports `direction` (vertical / horizontal),
 * `affix` mode, nested `items`, and custom `getContainer`.
 *
 * @example
 * ```tsx
 * <Anchor
 *   items={[
 *     { key: "intro", href: "#intro", title: "Introduction" },
 *     { key: "api", href: "#api", title: "API" },
 *   ]}
 *   direction="vertical"
 *   offsetTop={80}
 * />
 * ```
 */
export { Anchor } from "./Anchor";
export type { AnchorProps, AnchorItem, AnchorDirection } from "./types";
