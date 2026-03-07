/**
 * @file Checkbox Stories
 *
 * Visual test suite for `<Checkbox>` and `<Checkbox.Group>`.
 * Stories:
 *   Playground      — interactive controls
 *   Basic           — single checkbox with label
 *   Disabled        — disabled state
 *   Indeterminate   — partially checked visual
 *   GroupOptions    — Checkbox.Group with options array
 *   GroupChildren   — Checkbox.Group with child composition
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./index";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  parameters: { layout: "padded" },
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    children: "Checkbox label",
    defaultChecked: false,
  },
};

// ---------------------------------------------------------------------------
// Basic — single checkbox with label
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">Single Checkboxes</h3>
      <Checkbox>Remember me</Checkbox>
      <Checkbox defaultChecked>Pre-checked</Checkbox>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — disabled unchecked and checked
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">Disabled State</h3>
      <Checkbox disabled>Disabled unchecked</Checkbox>
      <Checkbox disabled defaultChecked>Disabled checked</Checkbox>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Indeterminate — partial selection visual
// ---------------------------------------------------------------------------
export const Indeterminate: Story = {
  name: "Indeterminate",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        Indeterminate (dash icon)
      </h3>
      <Checkbox indeterminate>Select all</Checkbox>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// GroupOptions — Checkbox.Group with options array
// ---------------------------------------------------------------------------
export const GroupOptions: Story = {
  name: "Group with Options",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Checkbox.Group — options array
      </h3>
      <Checkbox.Group
        options={["Apple", "Pear", "Orange", "Banana"]}
        defaultValue={["Apple", "Orange"]}
        onChange={(vals) => console.log("Selected:", vals)}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// GroupChildren — Checkbox.Group with child composition
// ---------------------------------------------------------------------------
export const GroupChildren: Story = {
  name: "Group with Children",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Checkbox.Group — child composition
      </h3>
      <Checkbox.Group defaultValue={["a"]}>
        <Checkbox value="a">Option A</Checkbox>
        <Checkbox value="b">Option B</Checkbox>
        <Checkbox value="c" disabled>Option C (disabled)</Checkbox>
      </Checkbox.Group>
    </div>
  ),
};
