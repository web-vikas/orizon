/**
 * @file TimePicker Stories
 *
 * Visual test suite for `<TimePicker>` covering every major prop:
 * - Playground (args)
 * - TwelveHourMode
 * - Sizes
 * - StatusVariants
 * - RangePicker
 */
import type { Meta, StoryObj } from "@storybook/react";
import { TimePicker } from "./index";

const meta: Meta<typeof TimePicker> = {
  title: "Components/TimePicker",
  component: TimePicker,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof TimePicker>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    placeholder: "Select time",
  },
};

// ---------------------------------------------------------------------------
// 12-Hour Mode
// ---------------------------------------------------------------------------

export const TwelveHourMode: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">12-hour format with AM/PM</h3>
      <TimePicker use12Hours placeholder="Select time" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Small</h3>
        <TimePicker size="small" placeholder="Small" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Middle</h3>
        <TimePicker size="middle" placeholder="Middle" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Large</h3>
        <TimePicker size="large" placeholder="Large" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Status Variants
// ---------------------------------------------------------------------------

export const StatusVariants: Story = {
  render: () => (
    <div className="flex items-start gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Error</h3>
        <TimePicker status="error" placeholder="Error" />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Warning</h3>
        <TimePicker status="warning" placeholder="Warning" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// RangePicker
// ---------------------------------------------------------------------------

export const RangePickerStory: Story = {
  name: "RangePicker",
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Time range selection</h3>
      <TimePicker.RangePicker placeholder={["Start time", "End time"]} />
    </div>
  ),
};
