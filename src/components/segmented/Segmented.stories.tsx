/**
 * @file Segmented Stories
 *
 * Visual test suite for `<Segmented>` covering every prop.
 *
 * Stories:
 *   Playground      -- interactive controls
 *   BasicSegmented  -- simple string options
 *   WithIcons       -- options with icon nodes
 *   Sizes           -- large / middle / small
 *   Block           -- full-width mode
 *   Disabled        -- disabled state
 *   Controlled      -- controlled value state
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Segmented } from "./index";
import { ListIcon, LayoutGridIcon, KanbanIcon } from "lucide-react";

const meta: Meta<typeof Segmented> = {
  title: "Components/Segmented",
  component: Segmented,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Segmented>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    options: ["Daily", "Weekly", "Monthly", "Yearly"],
    defaultValue: "Daily",
  },
};

// ---------------------------------------------------------------------------
// Basic Segmented
// ---------------------------------------------------------------------------
export const BasicSegmented: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Simple string options</h3>
      <Segmented options={["Map", "Transit", "Satellite"]} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Icons
// ---------------------------------------------------------------------------
export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Options with icons</h3>
      <Segmented
        options={[
          { label: "List", value: "list", icon: <ListIcon className="size-4" /> },
          { label: "Grid", value: "grid", icon: <LayoutGridIcon className="size-4" /> },
          { label: "Kanban", value: "kanban", icon: <KanbanIcon className="size-4" /> },
        ]}
      />
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
      <h3 className="text-sm font-medium text-muted-foreground">Size variants</h3>
      {(["large", "middle", "small"] as const).map((size) => (
        <Segmented
          key={size}
          size={size}
          options={["S", "M", "L", "XL"]}
          defaultValue="M"
        />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Block
// ---------------------------------------------------------------------------
export const Block: Story = {
  name: "Block (Full Width)",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Full-width segmented control</h3>
      <Segmented block options={["Day", "Week", "Month", "Year"]} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const DisabledSegmented: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Entire control disabled</h3>
      <Segmented disabled options={["A", "B", "C"]} defaultValue="B" />
      <h3 className="text-sm font-medium text-muted-foreground">Individual option disabled</h3>
      <Segmented
        options={[
          { label: "Enabled", value: "a" },
          { label: "Disabled", value: "b", disabled: true },
          { label: "Enabled", value: "c" },
        ]}
        defaultValue="a"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Controlled
// ---------------------------------------------------------------------------
export const Controlled: Story = {
  name: "Controlled",
  render: () => {
    const [value, setValue] = useState<string | number>("weekly");
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Controlled value</h3>
        <Segmented
          value={value}
          onChange={setValue}
          options={["daily", "weekly", "monthly"]}
        />
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};
