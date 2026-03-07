/**
 * @file Switch Stories
 *
 * Visual test suite for `<Switch>` covering every major prop:
 * - Playground (args)
 * - WithLabels
 * - SmallSize
 * - Loading
 * - Disabled
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./index";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Switch>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    defaultChecked: true,
  },
};

// ---------------------------------------------------------------------------
// With Labels
// ---------------------------------------------------------------------------

export const WithLabels: Story = {
  render: () => (
    <div className="flex gap-6">
      <div>
        <h3 className="mb-2 text-sm font-medium">Checked / unchecked text</h3>
        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Numeric labels</h3>
        <Switch checkedChildren="1" unCheckedChildren="0" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Small Size
// ---------------------------------------------------------------------------

export const SmallSize: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Middle (default)</h3>
        <Switch defaultChecked />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Small</h3>
        <Switch size="small" defaultChecked />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

export const Loading: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Loading (checked)</h3>
        <Switch loading defaultChecked />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Loading (unchecked)</h3>
        <Switch loading />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <div>
        <h3 className="mb-2 text-sm font-medium">Disabled on</h3>
        <Switch disabled defaultChecked />
      </div>
      <div>
        <h3 className="mb-2 text-sm font-medium">Disabled off</h3>
        <Switch disabled />
      </div>
    </div>
  ),
};
