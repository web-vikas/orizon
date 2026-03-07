/**
 * @file Masonry Stories
 *
 * Visual test suite for `<Masonry>` covering every prop.
 * Stories:
 *   Playground           — interactive controls
 *   BasicMasonry         — simple multi-column layout
 *   ColumnCounts         — different column counts
 *   CustomGutter         — column and row gutters
 *   WithItemsProp        — using items array prop
 *   ResponsiveColumns    — responsive breakpoint columns
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Masonry } from "./index";

const meta: Meta<typeof Masonry> = {
  title: "Components/Masonry",
  component: Masonry,
  parameters: { layout: "padded" },
  argTypes: {
    columns: { control: "number" },
    gutter: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof Masonry>;

const heights = [120, 80, 160, 100, 140, 90, 180, 110, 130, 70, 150, 100];

const Card = ({ index, height }: { index: number; height: number }) => (
  <div
    className="flex items-center justify-center rounded-lg bg-primary/15 text-sm font-medium"
    style={{ height }}
  >
    Card {index + 1}
  </div>
);

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    columns: 3,
    gutter: 16,
  },
  render: (args) => (
    <Masonry {...args}>
      {heights.map((h, i) => (
        <Card key={i} index={i} height={h} />
      ))}
    </Masonry>
  ),
};

// ---------------------------------------------------------------------------
// BasicMasonry — simple multi-column layout
// ---------------------------------------------------------------------------

export const BasicMasonry: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Basic 3-Column Masonry</h3>
      <Masonry columns={3} gutter={16}>
        {heights.map((h, i) => (
          <Card key={i} index={i} height={h} />
        ))}
      </Masonry>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ColumnCounts — different column counts
// ---------------------------------------------------------------------------

export const ColumnCounts: Story = {
  render: () => (
    <div className="space-y-8">
      <h3 className="text-sm font-medium">Column Count Variants</h3>
      {[2, 3, 4].map((cols) => (
        <div key={cols}>
          <span className="mb-1 block text-xs text-muted-foreground">{cols} columns</span>
          <Masonry columns={cols} gutter={12}>
            {heights.slice(0, 8).map((h, i) => (
              <Card key={i} index={i} height={h} />
            ))}
          </Masonry>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomGutter — column and row gutters
// ---------------------------------------------------------------------------

export const CustomGutter: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-sm font-medium">Custom Gutters</h3>
      <div>
        <span className="mb-1 block text-xs text-muted-foreground">Uniform 24px</span>
        <Masonry columns={3} gutter={24}>
          {heights.slice(0, 6).map((h, i) => (
            <Card key={i} index={i} height={h} />
          ))}
        </Masonry>
      </div>
      <div>
        <span className="mb-1 block text-xs text-muted-foreground">Column: 8, Row: 24</span>
        <Masonry columns={3} gutter={[8, 24]}>
          {heights.slice(0, 6).map((h, i) => (
            <Card key={i} index={i} height={h} />
          ))}
        </Masonry>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithItemsProp — using items array prop
// ---------------------------------------------------------------------------

export const WithItemsProp: Story = {
  render: () => {
    const items = heights.slice(0, 6).map((h, i) => (
      <Card key={i} index={i} height={h} />
    ));
    return (
      <div>
        <h3 className="mb-2 text-sm font-medium">Using items Prop</h3>
        <Masonry columns={3} gutter={16} items={items} />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// ResponsiveColumns — responsive breakpoint columns
// ---------------------------------------------------------------------------

export const ResponsiveColumns: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Responsive Columns (resize window)</h3>
      <Masonry columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} gutter={16}>
        {heights.map((h, i) => (
          <Card key={i} index={i} height={h} />
        ))}
      </Masonry>
    </div>
  ),
};
