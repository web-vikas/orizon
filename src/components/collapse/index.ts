/**
 * @file Collapse — Public Barrel Export
 *
 * Re-exports the `<Collapse>` accordion panel component.
 */

import { InternalCollapse } from "./Collapse";

/**
 * Collapse / Accordion panel component.
 *
 * Reveals content panels on header click. Supports `accordion`
 * (single open), `bordered` / `ghost` styles, `size` presets,
 * `expandIconPosition`, and custom `expandIcon`.
 *
 * @example
 * ```tsx
 * <Collapse
 *   items={[
 *     { key: "1", label: "Section A", children: <p>Content A</p> },
 *     { key: "2", label: "Section B", children: <p>Content B</p> },
 *   ]}
 * />
 *
 * <Collapse accordion ghost>
 *   ...
 * </Collapse>
 * ```
 */
const Collapse = InternalCollapse;

export { Collapse };
export type {
  CollapseProps,
  CollapseItem,
  CollapsibleType,
  ExpandIconPosition,
  CollapseSize,
} from "./types";
