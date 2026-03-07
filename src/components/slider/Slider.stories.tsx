/**
 * @file Slider Stories
 *
 * Visual test suite for `<Slider>` covering every prop.
 *
 * Stories:
 *   Playground      -- interactive controls
 *   BasicSlider     -- simple single-value slider
 *   RangeSlider     -- dual-thumb range selection
 *   WithMarks       -- labeled marks on the track
 *   WithDots        -- step dots visible
 *   Vertical        -- vertical orientation
 *   Disabled        -- disabled state
 *   CustomTooltip   -- tooltip formatter
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./index";

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Slider>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    defaultValue: 30,
    min: 0,
    max: 100,
  },
};

// ---------------------------------------------------------------------------
// Basic Slider
// ---------------------------------------------------------------------------
export const BasicSlider: Story = {
  name: "Basic",
  render: () => {
    const [value, setValue] = useState(30);
    return (
      <div className="flex flex-col gap-4 w-96">
        <h3 className="text-sm font-medium text-muted-foreground">Single value slider</h3>
        <Slider value={value} onChange={(v) => setValue(v as number)} />
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Range Slider
// ---------------------------------------------------------------------------
export const RangeSlider: Story = {
  name: "Range",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Dual-thumb range selection</h3>
      <Slider range defaultValue={[20, 50]} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Marks
// ---------------------------------------------------------------------------
export const WithMarks: Story = {
  name: "With Marks",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Labeled marks on the track</h3>
      <Slider
        marks={{ 0: "0C", 26: "26C", 37: "37C", 100: "100C" }}
        defaultValue={37}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Dots
// ---------------------------------------------------------------------------
export const WithDots: Story = {
  name: "With Dots",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Step dots visible</h3>
      <Slider dots step={10} defaultValue={30} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical
// ---------------------------------------------------------------------------
export const Vertical: Story = {
  name: "Vertical",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Vertical orientation</h3>
      <div style={{ height: 200 }} className="flex gap-8 ml-8">
        <Slider vertical defaultValue={30} />
        <Slider vertical range defaultValue={[20, 60]} />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const DisabledSlider: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Disabled state</h3>
      <Slider disabled defaultValue={50} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Tooltip
// ---------------------------------------------------------------------------
export const CustomTooltip: Story = {
  name: "Custom Tooltip",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Tooltip formatter</h3>
      <Slider
        defaultValue={50}
        tooltip={{ formatter: (val) => `${val}%`, open: true }}
      />
    </div>
  ),
};
