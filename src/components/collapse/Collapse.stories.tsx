/**
 * @file Collapse Stories
 *
 * Visual test suite for `<Collapse>`.
 * Stories:
 *   Playground        — interactive controls
 *   Basic             — default multi-open collapse
 *   Accordion         — single panel open at a time
 *   Ghost             — borderless transparent style
 *   Sizes             — large, middle, small
 *   ExpandIconEnd     — arrow icon on the right
 *   WithExtra         — extra content in panel header
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Collapse } from "./index";
import type { CollapseItem } from "./index";

const basicItems: CollapseItem[] = [
  {
    key: "1",
    label: "What is React?",
    children: (
      <p>
        React is a JavaScript library for building user interfaces, maintained
        by Meta and a community of developers.
      </p>
    ),
  },
  {
    key: "2",
    label: "What is TypeScript?",
    children: (
      <p>
        TypeScript is a strongly-typed superset of JavaScript that compiles to
        plain JavaScript.
      </p>
    ),
  },
  {
    key: "3",
    label: "What is Tailwind CSS?",
    children: (
      <p>
        Tailwind CSS is a utility-first CSS framework for rapidly building
        custom user interfaces.
      </p>
    ),
  },
];

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  parameters: { layout: "padded" },
  argTypes: {
    accordion: { control: "boolean" },
    bordered: { control: "boolean" },
    ghost: { control: "boolean" },
    size: {
      control: "select",
      options: ["large", "middle", "small"],
    },
    expandIconPosition: {
      control: "select",
      options: ["start", "end"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Collapse>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    items: basicItems,
    accordion: false,
    bordered: true,
    ghost: false,
    size: "middle",
  },
};

// ---------------------------------------------------------------------------
// Basic — default multi-open
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Multiple panels can be open
      </h3>
      <Collapse items={basicItems} defaultActiveKey={["1"]} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Accordion — single panel open at a time
// ---------------------------------------------------------------------------
export const Accordion: Story = {
  name: "Accordion",
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Only one panel open at a time
      </h3>
      <Collapse items={basicItems} accordion defaultActiveKey={["1"]} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Ghost — borderless transparent style
// ---------------------------------------------------------------------------
export const Ghost: Story = {
  name: "Ghost",
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Ghost style (no border)</h3>
      <Collapse items={basicItems} ghost />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes — large, middle, small
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: 600 }}>
      {(["large", "middle", "small"] as const).map((s) => (
        <div key={s}>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">Size: {s}</h3>
          <Collapse items={basicItems} size={s} defaultActiveKey={["1"]} />
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ExpandIconEnd — arrow on the right side
// ---------------------------------------------------------------------------
export const ExpandIconEnd: Story = {
  name: "Expand Icon End",
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Expand icon on the right
      </h3>
      <Collapse items={basicItems} expandIconPosition="end" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithExtra — extra content in panel header
// ---------------------------------------------------------------------------
export const WithExtra: Story = {
  name: "With Extra",
  render: () => (
    <div style={{ maxWidth: 600 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Extra content in header
      </h3>
      <Collapse
        items={basicItems.map((item) => ({
          ...item,
          extra: (
            <span className="text-xs text-muted-foreground">
              Details
            </span>
          ),
        }))}
      />
    </div>
  ),
};
