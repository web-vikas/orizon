/**
 * @file Cascader Stories
 *
 * Visual test suite for `<Cascader>`.
 * Stories:
 *   Playground        — interactive controls
 *   Basic             — simple hierarchical options
 *   ExpandOnHover     — expand columns on hover
 *   ChangeOnSelect    — select intermediate nodes
 *   AllowClear        — clearable selection
 *   Disabled          — disabled state
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Cascader } from "./index";

const locationOptions = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          { value: "xihu", label: "West Lake" },
          { value: "binjiang", label: "Binjiang" },
        ],
      },
      {
        value: "ningbo",
        label: "Ningbo",
        children: [{ value: "yinzhou", label: "Yinzhou" }],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [{ value: "zhonghua", label: "Zhonghua" }],
      },
      {
        value: "suzhou",
        label: "Suzhou",
        children: [{ value: "gusu", label: "Gusu" }],
      },
    ],
  },
];

const meta: Meta<typeof Cascader> = {
  title: "Components/Cascader",
  component: Cascader,
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    expandTrigger: {
      control: "select",
      options: ["click", "hover"],
    },
    allowClear: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Cascader>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    options: locationOptions,
    placeholder: "Select location",
    allowClear: true,
  },
};

// ---------------------------------------------------------------------------
// Basic — simple hierarchical options
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Basic Cascader</h3>
      <Cascader options={locationOptions} placeholder="Select location" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ExpandOnHover — columns expand when hovering
// ---------------------------------------------------------------------------
export const ExpandOnHover: Story = {
  name: "Expand on Hover",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Hover to expand columns
      </h3>
      <Cascader
        options={locationOptions}
        placeholder="Hover to expand"
        expandTrigger="hover"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ChangeOnSelect — select intermediate nodes
// ---------------------------------------------------------------------------
export const ChangeOnSelect: Story = {
  name: "Change on Select",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Select any level (changeOnSelect)
      </h3>
      <Cascader
        options={locationOptions}
        placeholder="Select any level"
        changeOnSelect
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AllowClear — clearable selection
// ---------------------------------------------------------------------------
export const AllowClear: Story = {
  name: "Allow Clear",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Clearable selection
      </h3>
      <Cascader
        options={locationOptions}
        placeholder="Select and clear"
        allowClear
        defaultValue={["zhejiang", "hangzhou", "xihu"]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — disabled state
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled</h3>
      <Cascader
        options={locationOptions}
        placeholder="Cannot interact"
        disabled
      />
    </div>
  ),
};
