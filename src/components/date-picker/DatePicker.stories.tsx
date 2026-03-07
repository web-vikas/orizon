/**
 * @file DatePicker Stories
 *
 * Visual test suite for `<DatePicker>` and `<DatePicker.RangePicker>`.
 * Stories:
 *   Playground     — interactive controls
 *   Basic          — default date picker
 *   Sizes          — small, middle, large
 *   Disabled       — disabled state
 *   DisabledDates  — disable weekends
 *   Presets        — quick selection presets
 *   RangePicker    — DatePicker.RangePicker for date ranges
 */

import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker } from "./index";

const meta: Meta<typeof DatePicker> = {
  title: "Components/DatePicker",
  component: DatePicker,
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
type Story = StoryObj<typeof DatePicker>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    placeholder: "Select date",
    allowClear: true,
  },
};

// ---------------------------------------------------------------------------
// Basic — default date picker
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Basic DatePicker</h3>
      <DatePicker placeholder="Select date" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes — small, middle, large
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-3" style={{ maxWidth: 280 }}>
      <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
      <DatePicker placeholder="Small" size="small" />
      <DatePicker placeholder="Middle (default)" size="middle" />
      <DatePicker placeholder="Large" size="large" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — disabled state
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled</h3>
      <DatePicker placeholder="Cannot select" disabled />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DisabledDates — weekends are disabled
// ---------------------------------------------------------------------------
export const DisabledDates: Story = {
  name: "Disabled Dates",
  render: () => (
    <div style={{ maxWidth: 280 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Weekends are disabled
      </h3>
      <DatePicker
        placeholder="No weekends"
        disabledDate={(d) => d.getDay() === 0 || d.getDay() === 6}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Presets — quick selection presets
// ---------------------------------------------------------------------------
export const Presets: Story = {
  name: "Presets",
  render: () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    return (
      <div style={{ maxWidth: 280 }}>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Quick preset buttons in the dropdown
        </h3>
        <DatePicker
          placeholder="Select date"
          presets={[
            { label: "Today", value: today },
            { label: "Yesterday", value: yesterday },
            { label: "Last Week", value: lastWeek },
          ]}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// RangePicker — date range selection
// ---------------------------------------------------------------------------
export const RangePickerStory: Story = {
  name: "Range Picker",
  render: () => (
    <div style={{ maxWidth: 360 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        DatePicker.RangePicker — select a start and end date
      </h3>
      <DatePicker.RangePicker placeholder={["Start date", "End date"]} />
    </div>
  ),
};
