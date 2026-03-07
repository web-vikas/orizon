/**
 * @file Timeline Stories
 *
 * Visual test suite for `<Timeline>` covering every major prop:
 * - Playground (args)
 * - Alternate
 * - Colors
 * - Pending
 * - WithLabels
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Timeline } from "./index";
import { Clock } from "lucide-react";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    items: [
      { children: "Create a services site" },
      { children: "Solve initial network problems" },
      { children: "Technical testing" },
      { children: "Network problems being solved" },
    ],
  },
};

// ---------------------------------------------------------------------------
// Alternate
// ---------------------------------------------------------------------------

export const Alternate: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Alternate mode</h3>
      <Timeline
        mode="alternate"
        items={[
          { children: "Create a services site 2024-01-01" },
          { children: "Solve initial network problems 2024-02-01" },
          { children: "Technical testing 2024-03-01" },
          { children: "Network problems being solved 2024-04-01" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

export const Colors: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Coloured dots</h3>
      <Timeline
        items={[
          { children: "Success", color: "green" },
          { children: "Default", color: "blue" },
          { children: "Error", color: "red" },
          { children: "Inactive", color: "gray" },
          { children: "Custom", color: "#faad14" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Pending
// ---------------------------------------------------------------------------

export const Pending: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Pending indicator</h3>
      <Timeline
        pending="Recording..."
        items={[
          { children: "Create a services site 2024-01-01" },
          { children: "Solve initial network problems 2024-02-01" },
          { children: "Technical testing 2024-03-01" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Labels
// ---------------------------------------------------------------------------

export const WithLabels: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Items with labels on the opposite side</h3>
      <Timeline
        mode="alternate"
        items={[
          { label: "2024-01-01", children: "Create a services site" },
          { label: "2024-02-01", children: "Solve initial network problems" },
          { label: "2024-03-01", children: "Technical testing" },
          {
            label: "2024-04-01",
            children: "Custom dot",
            dot: <Clock className="size-4 text-primary" />,
          },
        ]}
      />
    </div>
  ),
};
