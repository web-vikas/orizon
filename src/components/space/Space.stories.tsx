/**
 * @file Space Stories
 *
 * Visual test suite for `<Space>` covering every prop.
 *
 * Stories:
 *   Playground      -- interactive controls
 *   BasicSpace      -- horizontal spacing
 *   Vertical        -- vertical direction
 *   Sizes           -- small / middle / large / custom
 *   Wrap            -- wrapping when content overflows
 *   WithSplit       -- separator between items
 *   Alignment       -- start / center / end / baseline
 *   Compact         -- Space.Compact for grouped controls
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Space } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Space> = {
  title: "Components/Space",
  component: Space,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Space>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    size: "middle",
    direction: "horizontal",
    children: (
      <>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
      </>
    ),
  },
};

// ---------------------------------------------------------------------------
// Basic Space
// ---------------------------------------------------------------------------
export const BasicSpace: Story = {
  name: "Horizontal",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Default horizontal spacing</h3>
      <Space>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="link">Link</Button>
      </Space>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical
// ---------------------------------------------------------------------------
export const Vertical: Story = {
  name: "Vertical",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Vertical direction</h3>
      <Space direction="vertical" size="middle">
        <Button type="primary" block>First</Button>
        <Button block>Second</Button>
        <Button type="dashed" block>Third</Button>
      </Space>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["small", "middle", "large"] as const).map((s) => (
        <div key={s}>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">size=&quot;{s}&quot;</h3>
          <Space size={s}>
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
          </Space>
        </div>
      ))}
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Custom size (32px)</h3>
        <Space size={32}>
          <Button>A</Button>
          <Button>B</Button>
          <Button>C</Button>
        </Space>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Wrap
// ---------------------------------------------------------------------------
export const WrapMode: Story = {
  name: "Wrap",
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <h3 className="text-sm font-medium text-muted-foreground">Wraps when overflowing</h3>
      <Space wrap size="small">
        {Array.from({ length: 12 }, (_, i) => (
          <Button key={i}>Item {i + 1}</Button>
        ))}
      </Space>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Split
// ---------------------------------------------------------------------------
export const WithSplit: Story = {
  name: "With Separator",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Split separator between items</h3>
      <Space split={<span className="text-muted-foreground">|</span>}>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </Space>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Alignment
// ---------------------------------------------------------------------------
export const Alignment: Story = {
  name: "Alignment",
  render: () => (
    <div className="flex flex-col gap-4">
      {(["start", "center", "end", "baseline"] as const).map((a) => (
        <div key={a}>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">align=&quot;{a}&quot;</h3>
          <Space align={a} size="middle">
            <Button size="small">Small</Button>
            <Button size="large">Large</Button>
            <span className="text-sm">Text</span>
          </Space>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Compact
// ---------------------------------------------------------------------------
export const Compact: Story = {
  name: "Space.Compact",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Grouped controls with collapsed borders</h3>
      <Space.Compact>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </Space.Compact>
    </div>
  ),
};
