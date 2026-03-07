/**
 * @file TreeSelect Stories
 *
 * Visual test suite for `<TreeSelect>` covering every major prop:
 * - Playground (args)
 * - MultipleCheckable
 * - WithSearch
 * - TreeLine
 */
import type { Meta, StoryObj } from "@storybook/react";
import { TreeSelect } from "./index";
import type { TreeSelectDataNode } from "./types";

const treeData: TreeSelectDataNode[] = [
  {
    value: "engineering",
    title: "Engineering",
    children: [
      {
        value: "frontend",
        title: "Frontend",
        children: [
          { value: "react", title: "React Team" },
          { value: "vue", title: "Vue Team" },
        ],
      },
      {
        value: "backend",
        title: "Backend",
        children: [
          { value: "node", title: "Node.js Team" },
          { value: "python", title: "Python Team" },
        ],
      },
    ],
  },
  {
    value: "design",
    title: "Design",
    children: [
      { value: "ui", title: "UI Design" },
      { value: "ux", title: "UX Research" },
    ],
  },
];

const meta: Meta<typeof TreeSelect> = {
  title: "Components/TreeSelect",
  component: TreeSelect,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof TreeSelect>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    treeData,
    placeholder: "Select a team",
    allowClear: true,
    style: { width: 300 },
  },
};

// ---------------------------------------------------------------------------
// Multiple + Checkable
// ---------------------------------------------------------------------------

export const MultipleCheckable: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Multiple selection with checkboxes</h3>
      <TreeSelect
        treeData={treeData}
        treeCheckable
        placeholder="Select teams"
        treeDefaultExpandAll
        allowClear
        style={{ width: 360 }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Search
// ---------------------------------------------------------------------------

export const WithSearch: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Searchable tree select</h3>
      <TreeSelect
        treeData={treeData}
        showSearch
        placeholder="Search and select"
        treeDefaultExpandAll
        allowClear
        style={{ width: 300 }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Tree Line
// ---------------------------------------------------------------------------

export const TreeLine: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Dropdown with tree lines</h3>
      <TreeSelect
        treeData={treeData}
        treeLine
        placeholder="Select node"
        treeDefaultExpandAll
        style={{ width: 300 }}
      />
    </div>
  ),
};
