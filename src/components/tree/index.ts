import { InternalTree, DirectoryTree } from "./Tree";

type TreeComponent = typeof InternalTree & {
  DirectoryTree: typeof DirectoryTree;
};

/**
 * Tree component for hierarchical data display with expand/collapse,
 * selection, and checkbox support.
 *
 * Includes `Tree.DirectoryTree` for file-system-style navigation.
 *
 * @example
 * ```tsx
 * <Tree
 *   treeData={[
 *     { key: "0", title: "Parent", children: [
 *       { key: "0-0", title: "Child" },
 *     ]},
 *   ]}
 *   checkable
 * />
 * ```
 */
const Tree = InternalTree as TreeComponent;
Tree.DirectoryTree = DirectoryTree;

export { Tree };
export type { TreeProps, DirectoryTreeProps, TreeDataNode } from "./types";
