/**
 * @file Anchor Stories
 *
 * Visual test suite for `<Anchor>` covering every prop.
 * Stories:
 *   Playground   — interactive controls
 *   Vertical     — default vertical layout
 *   Horizontal   — horizontal layout
 *   NestedItems  — nested anchor hierarchy
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Anchor } from "./index";

const meta: Meta<typeof Anchor> = {
  title: "Components/Anchor",
  component: Anchor,
  parameters: { layout: "padded" },
  argTypes: {
    direction: {
      control: "select",
      options: ["vertical", "horizontal"],
    },
    affix: { control: "boolean" },
    offsetTop: { control: "number" },
    targetOffset: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof Anchor>;

const basicItems = [
  { key: "1", href: "#section-1", title: "Introduction" },
  { key: "2", href: "#section-2", title: "Getting Started" },
  { key: "3", href: "#section-3", title: "API Reference" },
  { key: "4", href: "#section-4", title: "Examples" },
];

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    items: basicItems,
    direction: "vertical",
    affix: false,
  },
};

// ---------------------------------------------------------------------------
// Vertical — default vertical layout with active indicator
// ---------------------------------------------------------------------------
export const Vertical: Story = {
  name: "Vertical",
  render: () => (
    <div className="flex gap-8">
      <Anchor items={basicItems} direction="vertical" affix={false} />
      <div className="flex-1 space-y-4 text-sm text-muted-foreground">
        <p>Scroll the parent container to see the active anchor update.</p>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Horizontal — horizontal layout
// ---------------------------------------------------------------------------
export const Horizontal: Story = {
  name: "Horizontal",
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-medium text-muted-foreground">Horizontal direction</h3>
      <Anchor items={basicItems} direction="horizontal" affix={false} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// NestedItems — nested anchor hierarchy
// ---------------------------------------------------------------------------
export const NestedItems: Story = {
  name: "Nested Items",
  render: () => (
    <div className="flex gap-8">
      <Anchor
        affix={false}
        items={[
          { key: "1", href: "#overview", title: "Overview" },
          {
            key: "2",
            href: "#components",
            title: "Components",
            children: [
              { key: "2-1", href: "#button", title: "Button" },
              { key: "2-2", href: "#input", title: "Input" },
              { key: "2-3", href: "#select", title: "Select" },
            ],
          },
          { key: "3", href: "#changelog", title: "Changelog" },
        ]}
      />
      <div className="flex-1 text-sm text-muted-foreground">
        <p>Nested links render indented under their parent.</p>
      </div>
    </div>
  ),
};
