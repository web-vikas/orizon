/**
 * @file Tree Stories
 *
 * Visual test suite for `<Tree>` covering every major prop:
 * - Playground (args)
 * - Checkable
 * - ShowLine
 * - DefaultExpandAll
 * - DirectoryTree
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Tree } from "./index";
import type { TreeDataNode } from "./types";

const sampleTreeData: TreeDataNode[] = [
  {
    key: "0-0",
    title: "Documents",
    children: [
      {
        key: "0-0-0",
        title: "Work",
        children: [
          { key: "0-0-0-0", title: "report.pdf", isLeaf: true },
          { key: "0-0-0-1", title: "presentation.pptx", isLeaf: true },
        ],
      },
      {
        key: "0-0-1",
        title: "Personal",
        children: [
          { key: "0-0-1-0", title: "resume.docx", isLeaf: true },
        ],
      },
    ],
  },
  {
    key: "0-1",
    title: "Pictures",
    children: [
      { key: "0-1-0", title: "vacation.jpg", isLeaf: true },
      { key: "0-1-1", title: "family.png", isLeaf: true },
    ],
  },
];

const meta: Meta<typeof Tree> = {
  title: "Components/Tree",
  component: Tree,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Tree>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    treeData: sampleTreeData,
    defaultExpandAll: true,
  },
};

// ---------------------------------------------------------------------------
// Checkable
// ---------------------------------------------------------------------------

export const Checkable: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Checkable tree with default expanded</h3>
      <Tree
        treeData={sampleTreeData}
        checkable
        defaultExpandAll
        defaultCheckedKeys={["0-0-0-0"]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Show Line
// ---------------------------------------------------------------------------

export const ShowLine: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Tree with connecting lines</h3>
      <Tree treeData={sampleTreeData} showLine defaultExpandAll />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Default Expand All
// ---------------------------------------------------------------------------

export const DefaultExpandAll: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">All nodes expanded + icons</h3>
      <Tree treeData={sampleTreeData} defaultExpandAll showIcon />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DirectoryTree
// ---------------------------------------------------------------------------

export const DirectoryTreeStory: Story = {
  name: "DirectoryTree",
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Directory tree with folder icons</h3>
      <Tree.DirectoryTree
        treeData={sampleTreeData}
        defaultExpandAll
      />
    </div>
  ),
};
