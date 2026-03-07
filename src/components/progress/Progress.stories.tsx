/**
 * @file Progress Stories
 *
 * Visual test suite for `<Progress>` covering every prop.
 *
 * Stories:
 *   Playground      -- interactive controls
 *   LineProgress    -- default line bar at various percentages
 *   CircleProgress  -- circular progress indicator
 *   Dashboard       -- dashboard (partial circle) type
 *   StatusColors    -- success / exception / active statuses
 *   Steps           -- segmented step progress
 *   SmallSize       -- compact variant
 *   CustomFormat    -- custom format function
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Progress } from "./index";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Progress>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    percent: 50,
    type: "line",
  },
};

// ---------------------------------------------------------------------------
// Line Progress
// ---------------------------------------------------------------------------
export const LineProgress: Story = {
  name: "Line",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Line progress at various percentages</h3>
      <Progress percent={0} />
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} />
      <Progress percent={100} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Circle Progress
// ---------------------------------------------------------------------------
export const CircleProgress: Story = {
  name: "Circle",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Circular progress</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Progress type="circle" percent={0} />
        <Progress type="circle" percent={50} />
        <Progress type="circle" percent={75} status="active" />
        <Progress type="circle" percent={100} />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------
export const Dashboard: Story = {
  name: "Dashboard",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Dashboard (partial circle)</h3>
      <div className="flex flex-wrap items-center gap-4">
        <Progress type="dashboard" percent={30} />
        <Progress type="dashboard" percent={75} />
        <Progress type="dashboard" percent={100} />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Status Colors
// ---------------------------------------------------------------------------
export const StatusColors: Story = {
  name: "Status Colors",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Status variants</h3>
      <Progress percent={30} status="normal" />
      <Progress percent={50} status="active" />
      <Progress percent={100} status="success" />
      <Progress percent={70} status="exception" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------
export const Steps: Story = {
  name: "Steps (Segmented)",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Step-based progress</h3>
      <Progress percent={30} steps={5} />
      <Progress percent={60} steps={5} strokeColor="#52c41a" />
      <Progress percent={100} steps={10} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Small Size
// ---------------------------------------------------------------------------
export const SmallSize: Story = {
  name: "Small Size",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Small line and circle</h3>
      <div className="w-64">
        <Progress percent={50} size="small" />
      </div>
      <div className="flex gap-4">
        <Progress type="circle" percent={50} size="small" />
        <Progress type="dashboard" percent={75} size="small" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Format
// ---------------------------------------------------------------------------
export const CustomFormat: Story = {
  name: "Custom Format",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Custom format function</h3>
      <div className="w-96">
        <Progress percent={75} format={(pct) => `${pct} Days`} />
      </div>
      <Progress type="circle" percent={100} format={() => "Done"} />
    </div>
  ),
};
