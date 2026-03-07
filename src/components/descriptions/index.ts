/**
 * @file Descriptions — Public Barrel Export
 *
 * Re-exports the `<Descriptions>` key-value display component.
 */

import { InternalDescriptions } from "./Descriptions";

/**
 * Descriptions component for key-value pair display.
 *
 * Renders labelled items in a columnar layout. Supports `bordered`
 * table style, `layout` (horizontal / vertical), `column` count,
 * `size`, `title`, `extra`, and `colon` toggle.
 *
 * @example
 * ```tsx
 * <Descriptions
 *   title="User Info"
 *   bordered
 *   items={[
 *     { label: "Name", children: "Jane Doe" },
 *     { label: "Phone", children: "555-1234" },
 *     { label: "City", children: "San Francisco" },
 *   ]}
 * />
 * ```
 */
const Descriptions = InternalDescriptions;

export { Descriptions };
export type {
  DescriptionsProps,
  DescriptionsItem,
  DescriptionsLayout,
  DescriptionsSize,
  ResponsiveColumn,
} from "./types";
