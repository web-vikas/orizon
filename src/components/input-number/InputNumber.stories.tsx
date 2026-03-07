/**
 * @file InputNumber Stories
 *
 * Visual test suite for `<InputNumber>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   BasicUsage        — default with min/max
 *   Sizes             — small / middle / large
 *   PrefixSuffix      — prefix and suffix nodes
 *   Addons            — addonBefore / addonAfter
 *   StatusVariants    — error / warning
 *   NoControls        — controls hidden
 *   Precision         — fixed decimal precision
 */
import type { Meta, StoryObj } from "@storybook/react";
import { InputNumber } from "./index";

const meta: Meta<typeof InputNumber> = {
  title: "Components/InputNumber",
  component: InputNumber,
  parameters: { layout: "padded" },
  argTypes: {
    size: { control: "radio", options: ["small", "middle", "large"] },
    variant: { control: "radio", options: ["outlined", "borderless", "filled"] },
    status: { control: "radio", options: [undefined, "error", "warning"] },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean" },
    min: { control: "number" },
    max: { control: "number" },
    step: { control: "number" },
    precision: { control: "number" },
  },
};
export default meta;
type Story = StoryObj<typeof InputNumber>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
    size: "middle",
    disabled: false,
  },
};

// ---------------------------------------------------------------------------
// BasicUsage — default with min/max
// ---------------------------------------------------------------------------

export const BasicUsage: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">Basic InputNumber</h3>
      <InputNumber min={1} max={10} defaultValue={3} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes — small / middle / large
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">Size Variants</h3>
      <InputNumber size="small" defaultValue={1} />
      <InputNumber size="middle" defaultValue={2} />
      <InputNumber size="large" defaultValue={3} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// PrefixSuffix — prefix and suffix nodes
// ---------------------------------------------------------------------------

export const PrefixSuffix: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">Prefix & Suffix</h3>
      <InputNumber prefix="$" defaultValue={100} />
      <InputNumber suffix="%" defaultValue={50} />
      <InputNumber prefix="$" suffix="USD" defaultValue={99.99} precision={2} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Addons — addonBefore / addonAfter
// ---------------------------------------------------------------------------

export const Addons: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">Addons</h3>
      <InputNumber addonBefore="+" addonAfter="$" defaultValue={10} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// StatusVariants — error / warning
// ---------------------------------------------------------------------------

export const StatusVariants: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">Validation Status</h3>
      <InputNumber status="error" defaultValue={0} />
      <InputNumber status="warning" defaultValue={0} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// NoControls — controls hidden
// ---------------------------------------------------------------------------

export const NoControls: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">No Step Controls</h3>
      <InputNumber controls={false} defaultValue={42} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Precision — fixed decimal precision
// ---------------------------------------------------------------------------

export const Precision: Story = {
  render: () => (
    <div className="space-y-3 max-w-xs">
      <h3 className="text-sm font-medium">Fixed Precision (2 decimals)</h3>
      <InputNumber precision={2} step={0.1} defaultValue={1.0} />
    </div>
  ),
};
