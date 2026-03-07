/**
 * @file Statistic Stories
 *
 * Visual test suite for `<Statistic>` covering every major prop:
 * - Playground (args)
 * - WithPrefixSuffix
 * - Precision
 * - Loading
 * - Countdown
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Statistic } from "./index";
import { ArrowUp, ArrowDown } from "lucide-react";

const meta: Meta<typeof Statistic> = {
  title: "Components/Statistic",
  component: Statistic,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Statistic>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    title: "Active Users",
    value: 112893,
  },
};

// ---------------------------------------------------------------------------
// With Prefix & Suffix
// ---------------------------------------------------------------------------

export const WithPrefixSuffix: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Prefix icon (increase)</h3>
        <Statistic
          title="Growth"
          value={11.28}
          precision={2}
          prefix={<ArrowUp className="size-4 text-green-500" />}
          suffix="%"
          valueStyle={{ color: "#22c55e" }}
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Prefix icon (decrease)</h3>
        <Statistic
          title="Decline"
          value={9.3}
          precision={2}
          prefix={<ArrowDown className="size-4 text-red-500" />}
          suffix="%"
          valueStyle={{ color: "#ef4444" }}
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Precision
// ---------------------------------------------------------------------------

export const Precision: Story = {
  render: () => (
    <div className="flex gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">2 decimal places</h3>
        <Statistic title="Balance" value={1128.93} precision={2} />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">No decimals</h3>
        <Statistic title="Score" value={98} precision={0} />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

export const Loading: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Loading skeleton</h3>
      <Statistic title="Active Users" value={112893} loading />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Countdown
// ---------------------------------------------------------------------------

export const CountdownStory: Story = {
  name: "Countdown",
  render: () => (
    <div className="flex gap-8">
      <div>
        <h3 className="mb-2 text-sm font-medium">Default format</h3>
        <Statistic.Countdown
          title="Time Left"
          value={Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30}
        />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Day format</h3>
        <Statistic.Countdown
          title="Deadline"
          value={Date.now() + 1000 * 60 * 60 * 24 * 5}
          format="D days HH:mm:ss"
        />
      </div>
    </div>
  ),
};
