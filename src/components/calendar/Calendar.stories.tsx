/**
 * @file Calendar Stories
 *
 * Visual test suite for `<Calendar>`.
 * Stories:
 *   Playground     — interactive controls
 *   Fullscreen     — default full-screen month view
 *   Mini           — compact mini calendar
 *   YearMode       — year selection panel
 *   DisabledDates  — disable weekends
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Calendar } from "./index";

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  parameters: { layout: "padded" },
  argTypes: {
    fullscreen: { control: "boolean" },
    mode: {
      control: "select",
      options: ["month", "year"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Calendar>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    fullscreen: true,
    mode: "month",
  },
};

// ---------------------------------------------------------------------------
// Fullscreen — default full-screen month view
// ---------------------------------------------------------------------------
export const Fullscreen: Story = {
  name: "Full-screen Calendar",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Full-screen month view (default)
      </h3>
      <Calendar />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Mini — compact mini calendar
// ---------------------------------------------------------------------------
export const Mini: Story = {
  name: "Mini Calendar",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Compact mini calendar (fullscreen=false)
      </h3>
      <Calendar fullscreen={false} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// YearMode — year panel showing all months
// ---------------------------------------------------------------------------
export const YearMode: Story = {
  name: "Year Mode",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Year mode — select a month
      </h3>
      <Calendar mode="year" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DisabledDates — weekends are disabled
// ---------------------------------------------------------------------------
export const DisabledDates: Story = {
  name: "Disabled Dates",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Weekends are disabled
      </h3>
      <Calendar
        disabledDate={(date) => {
          const day = date.getDay();
          return day === 0 || day === 6;
        }}
      />
    </div>
  ),
};
