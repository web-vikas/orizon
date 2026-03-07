/**
 * @file ColorPicker Stories
 *
 * Visual test suite for `<ColorPicker>`.
 * Stories:
 *   Playground     — interactive controls
 *   ShowText       — display colour value beside swatch
 *   Sizes          — small, middle, large triggers
 *   Presets        — preset colour swatches
 *   DisabledAlpha  — no alpha slider
 *   Disabled       — disabled state
 */

import type { Meta, StoryObj } from "@storybook/react";
import { ColorPicker } from "./index";

const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    trigger: {
      control: "select",
      options: ["click", "hover"],
    },
    showText: { control: "boolean" },
    disabledAlpha: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    defaultValue: "#1677ff",
    showText: true,
  },
};

// ---------------------------------------------------------------------------
// ShowText — display colour value beside the swatch
// ---------------------------------------------------------------------------
export const ShowText: Story = {
  name: "Show Text",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">
        Colour value shown next to swatch
      </h3>
      <ColorPicker defaultValue="#1677ff" showText />
      <ColorPicker defaultValue="#52c41a" showText format="rgb" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Sizes — small, middle, large trigger swatch
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex items-center gap-4">
      <div>
        <div className="mb-1 text-xs text-muted-foreground">Small</div>
        <ColorPicker defaultValue="#f5222d" size="small" />
      </div>
      <div>
        <div className="mb-1 text-xs text-muted-foreground">Middle</div>
        <ColorPicker defaultValue="#fa8c16" size="middle" />
      </div>
      <div>
        <div className="mb-1 text-xs text-muted-foreground">Large</div>
        <ColorPicker defaultValue="#722ed1" size="large" />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Presets — preset colour swatches in the panel
// ---------------------------------------------------------------------------
export const Presets: Story = {
  name: "Presets",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Click the swatch to see presets
      </h3>
      <ColorPicker
        defaultValue="#1677ff"
        showText
        presets={[
          {
            label: "Recommended",
            colors: [
              "#f5222d",
              "#fa8c16",
              "#fadb14",
              "#52c41a",
              "#1677ff",
              "#722ed1",
              "#eb2f96",
            ],
          },
          {
            label: "Neutrals",
            colors: [
              "#000000",
              "#434343",
              "#8c8c8c",
              "#bfbfbf",
              "#d9d9d9",
              "#ffffff",
            ],
          },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DisabledAlpha — no alpha slider
// ---------------------------------------------------------------------------
export const DisabledAlpha: Story = {
  name: "Disabled Alpha",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Alpha slider hidden
      </h3>
      <ColorPicker defaultValue="#1677ff" showText disabledAlpha />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled — disabled trigger
// ---------------------------------------------------------------------------
export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Disabled</h3>
      <ColorPicker defaultValue="#1677ff" disabled />
    </div>
  ),
};
