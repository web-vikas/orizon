/**
 * @file Select Stories
 *
 * Visual test suite for `<Select>` covering every prop.
 *
 * Stories:
 *   Playground       -- interactive controls
 *   BasicSelect      -- single select
 *   MultipleSelect   -- multiple mode
 *   TagsMode         -- tags mode with custom entries
 *   WithSearch       -- searchable select
 *   Variants         -- outlined / filled / borderless / underlined
 *   Sizes            -- small / middle / large
 *   StatusValidation -- error / warning states
 *   DisabledSelect   -- disabled state
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./index";

const fruitOptions = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Date", value: "date" },
  { label: "Elderberry", value: "elderberry" },
  { label: "Fig", value: "fig", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Select>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    options: fruitOptions,
    placeholder: "Select a fruit",
    style: { width: 200 },
  },
};

// ---------------------------------------------------------------------------
// Basic Select
// ---------------------------------------------------------------------------
export const BasicSelect: Story = {
  name: "Basic (Single)",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Single select</h3>
      <Select options={fruitOptions} placeholder="Choose a fruit" style={{ width: 200 }} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Multiple Select
// ---------------------------------------------------------------------------
export const MultipleSelect: Story = {
  name: "Multiple",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Select multiple values</h3>
      <Select
        mode="multiple"
        options={fruitOptions}
        placeholder="Select fruits"
        allowClear
        style={{ width: 320 }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Tags Mode
// ---------------------------------------------------------------------------
export const TagsMode: Story = {
  name: "Tags",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Tags mode (type custom entries)</h3>
      <Select
        mode="tags"
        options={fruitOptions}
        placeholder="Type or select"
        style={{ width: 320 }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Search
// ---------------------------------------------------------------------------
export const WithSearch: Story = {
  name: "Searchable",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Filter options by typing</h3>
      <Select
        showSearch
        options={fruitOptions}
        placeholder="Search fruits"
        style={{ width: 200 }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------
export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Visual variants</h3>
      <div className="flex flex-wrap items-start gap-4">
        {(["outlined", "filled", "borderless", "underlined"] as const).map((v) => (
          <Select
            key={v}
            variant={v}
            options={fruitOptions}
            placeholder={v}
            defaultValue="apple"
            style={{ width: 180 }}
          />
        ))}
      </div>
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
      <div className="flex flex-wrap items-start gap-4">
        {(["small", "middle", "large"] as const).map((s) => (
          <Select
            key={s}
            size={s}
            options={fruitOptions}
            placeholder={s}
            style={{ width: 180 }}
          />
        ))}
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Status Validation
// ---------------------------------------------------------------------------
export const StatusValidation: Story = {
  name: "Validation Status",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Error and warning states</h3>
      <div className="flex flex-wrap items-start gap-4">
        <Select status="error" options={fruitOptions} placeholder="Error" style={{ width: 180 }} />
        <Select status="warning" options={fruitOptions} placeholder="Warning" style={{ width: 180 }} />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const DisabledSelect: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Disabled select</h3>
      <Select disabled options={fruitOptions} defaultValue="apple" style={{ width: 200 }} />
    </div>
  ),
};
