/**
 * @file AutoComplete Stories
 *
 * Visual test suite for `<AutoComplete>` covering every prop.
 * Stories:
 *   Playground    — interactive controls
 *   Sizes         — small, middle, large
 *   Variants      — outlined, borderless, filled
 *   Status        — error, warning validation states
 *   AllowClear    — clear button when value is present
 *   Disabled      — disabled state
 *   CustomFilter  — custom filter function
 */

import type { Meta, StoryObj } from "@storybook/react";
import { AutoComplete } from "./index";

const sampleOptions = [
  { value: "React" },
  { value: "Vue" },
  { value: "Angular" },
  { value: "Svelte" },
  { value: "Solid" },
  { value: "Next.js" },
];

const meta: Meta<typeof AutoComplete> = {
  title: "Components/AutoComplete",
  component: AutoComplete,
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    variant: {
      control: "select",
      options: ["outlined", "borderless", "filled"],
    },
    status: {
      control: "select",
      options: [undefined, "error", "warning"],
    },
    allowClear: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof AutoComplete>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    options: sampleOptions,
    placeholder: "Search frameworks...",
    size: "middle",
    variant: "outlined",
    allowClear: true,
  },
};

// ---------------------------------------------------------------------------
// Sizes — small, middle, large
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-4" style={{ maxWidth: 320 }}>
      <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
      <AutoComplete options={sampleOptions} placeholder="Small" size="small" />
      <AutoComplete options={sampleOptions} placeholder="Middle (default)" size="middle" />
      <AutoComplete options={sampleOptions} placeholder="Large" size="large" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Variants — outlined, borderless, filled
// ---------------------------------------------------------------------------
export const Variants: Story = {
  name: "Variants",
  render: () => (
    <div className="flex flex-col gap-4" style={{ maxWidth: 320 }}>
      <h3 className="text-sm font-medium text-muted-foreground">Variants</h3>
      <AutoComplete options={sampleOptions} placeholder="Outlined" variant="outlined" />
      <AutoComplete options={sampleOptions} placeholder="Borderless" variant="borderless" />
      <AutoComplete options={sampleOptions} placeholder="Filled" variant="filled" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Status — error and warning states
// ---------------------------------------------------------------------------
export const Status: Story = {
  name: "Status",
  render: () => (
    <div className="flex flex-col gap-4" style={{ maxWidth: 320 }}>
      <h3 className="text-sm font-medium text-muted-foreground">Validation Status</h3>
      <AutoComplete options={sampleOptions} placeholder="Error status" status="error" />
      <AutoComplete options={sampleOptions} placeholder="Warning status" status="warning" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AllowClear — clear button visible when there is a value
// ---------------------------------------------------------------------------
export const AllowClear: Story = {
  name: "Allow Clear",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Type something then click the clear icon
      </h3>
      <AutoComplete
        options={sampleOptions}
        placeholder="Type and clear..."
        allowClear
        defaultValue="React"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — disabled state
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled</h3>
      <AutoComplete
        options={sampleOptions}
        placeholder="Cannot type here"
        disabled
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomFilter — only show exact prefix matches
// ---------------------------------------------------------------------------
export const CustomFilter: Story = {
  name: "Custom Filter",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Prefix-only filter (case-insensitive)
      </h3>
      <AutoComplete
        options={sampleOptions}
        placeholder="Try typing 'Re'..."
        filterOption={(input, option) =>
          option.value.toLowerCase().startsWith(input.toLowerCase())
        }
      />
    </div>
  ),
};
