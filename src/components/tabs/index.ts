/**
 * Tabs component for tabbed content navigation.
 *
 * Supports line, card, and editable-card types with multiple
 * positions (top, bottom, left, right).
 *
 * @example
 * ```tsx
 * <Tabs
 *   items={[
 *     { key: "1", label: "Tab 1", children: "Content 1" },
 *     { key: "2", label: "Tab 2", children: "Content 2" },
 *   ]}
 * />
 * ```
 */
export { Tabs } from "./Tabs";
export type { TabsProps, TabItem, TabsType, TabsSize, TabsPosition } from "./types";
