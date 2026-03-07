import { InternalTreeSelect } from "./TreeSelect";

/**
 * TreeSelect component for selecting values from a hierarchical
 * tree dropdown.
 *
 * @example
 * ```tsx
 * <TreeSelect
 *   treeData={[
 *     { value: "node1", title: "Node 1", children: [
 *       { value: "child1", title: "Child 1" },
 *     ]},
 *   ]}
 *   placeholder="Select"
 * />
 * ```
 */
const TreeSelect = InternalTreeSelect;

export { TreeSelect };
export type {
  TreeSelectProps,
  TreeSelectDataNode,
  TreeSelectSize,
  TreeSelectStatus,
  TreeSelectVariant,
} from "./types";
