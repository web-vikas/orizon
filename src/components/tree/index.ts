import { InternalTree, DirectoryTree } from "./Tree";

type TreeComponent = typeof InternalTree & {
  DirectoryTree: typeof DirectoryTree;
};

const Tree = InternalTree as TreeComponent;
Tree.DirectoryTree = DirectoryTree;

export { Tree };
export type { TreeProps, DirectoryTreeProps, TreeDataNode } from "./types";
