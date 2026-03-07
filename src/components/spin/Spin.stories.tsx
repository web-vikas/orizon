/**
 * @file Spin Stories
 *
 * Visual test suite for `<Spin>` covering every prop.
 *
 * Stories:
 *   Playground        -- interactive controls
 *   BasicSpin         -- standalone spinner
 *   Sizes             -- small / middle / large
 *   WithTip           -- text below the spinner
 *   WrappingContent   -- overlay on child content
 *   Delay             -- delayed appearance
 *   CustomIndicator   -- custom spinner node
 *   WithPercent       -- percent progress indicator
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Spin } from "./index";
import { Button } from "../button";
import { LoaderIcon } from "lucide-react";

const meta: Meta<typeof Spin> = {
  title: "Components/Spin",
  component: Spin,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Spin>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    spinning: true,
    size: "middle",
  },
};

// ---------------------------------------------------------------------------
// Basic Spin
// ---------------------------------------------------------------------------
export const BasicSpin: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Standalone spinner</h3>
      <Spin />
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
      <h3 className="text-sm font-medium text-muted-foreground">Spinner sizes</h3>
      <div className="flex items-center gap-6">
        <Spin size="small" />
        <Spin size="middle" />
        <Spin size="large" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Tip
// ---------------------------------------------------------------------------
export const WithTip: Story = {
  name: "With Tip Text",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Descriptive tip below spinner</h3>
      <Spin tip="Loading data..." size="large" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Wrapping Content
// ---------------------------------------------------------------------------
export const WrappingContent: Story = {
  name: "Wrapping Content",
  render: () => {
    const [loading, setLoading] = useState(true);
    return (
      <div className="flex flex-col gap-4">
        <Button type="primary" onClick={() => setLoading(!loading)}>
          Toggle Loading ({loading ? "ON" : "OFF"})
        </Button>
        <Spin spinning={loading} tip="Loading...">
          <div className="rounded-lg border p-6">
            <h4 className="font-medium">Card Title</h4>
            <p className="mt-2 text-sm text-muted-foreground">
              This content is behind the loading overlay. Toggle the spinner
              to reveal or hide the overlay.
            </p>
          </div>
        </Spin>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Delay
// ---------------------------------------------------------------------------
export const DelayedSpin: Story = {
  name: "Delayed Appearance",
  render: () => {
    const [loading, setLoading] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">500ms delay before showing</h3>
        <Button type="primary" onClick={() => setLoading(!loading)}>
          Toggle ({loading ? "Spinning" : "Stopped"})
        </Button>
        <Spin spinning={loading} delay={500}>
          <div className="rounded-lg border p-6">
            <p className="text-sm">Spinner appears after a 500ms delay.</p>
          </div>
        </Spin>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom Indicator
// ---------------------------------------------------------------------------
export const CustomIndicator: Story = {
  name: "Custom Indicator",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Custom spinner node</h3>
      <Spin
        indicator={<LoaderIcon className="size-8 animate-spin text-blue-500" />}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Percent
// ---------------------------------------------------------------------------
export const WithPercent: Story = {
  name: "Percent Progress",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Circular progress percentage</h3>
      <div className="flex items-center gap-6">
        <Spin percent={25} />
        <Spin percent={50} />
        <Spin percent={75} />
        <Spin percent={100} />
      </div>
    </div>
  ),
};
