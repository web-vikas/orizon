/**
 * @file Rate Stories
 *
 * Visual test suite for `<Rate>` covering every prop.
 *
 * Stories:
 *   Playground       -- interactive controls
 *   BasicRate        -- default 5-star rating
 *   HalfStar         -- allowHalf for half-star precision
 *   Disabled         -- read-only display
 *   CustomCharacter  -- custom character node
 *   WithTooltips     -- tooltip text on each star
 *   CustomCount      -- non-default star count
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Rate } from "./index";
import { HeartIcon } from "lucide-react";

const meta: Meta<typeof Rate> = {
  title: "Components/Rate",
  component: Rate,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Rate>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    defaultValue: 3,
    count: 5,
  },
};

// ---------------------------------------------------------------------------
// Basic Rate
// ---------------------------------------------------------------------------
export const BasicRate: Story = {
  name: "Basic",
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Default star rating</h3>
        <Rate value={value} onChange={setValue} />
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Half Star
// ---------------------------------------------------------------------------
export const HalfStar: Story = {
  name: "Half Star",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Half-star precision</h3>
      <Rate allowHalf defaultValue={2.5} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const DisabledRate: Story = {
  name: "Disabled (read-only)",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Read-only display</h3>
      <Rate disabled defaultValue={4} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Character
// ---------------------------------------------------------------------------
export const CustomCharacter: Story = {
  name: "Custom Character",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Heart icon as character</h3>
      <Rate character={<HeartIcon className="size-5" />} defaultValue={3} />
      <h3 className="text-sm font-medium text-muted-foreground">Letter characters</h3>
      <Rate character="A" count={6} defaultValue={3} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Tooltips
// ---------------------------------------------------------------------------
export const WithTooltips: Story = {
  name: "With Tooltips",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Hover to see tooltip text</h3>
      <Rate tooltips={["Terrible", "Bad", "Normal", "Good", "Excellent"]} defaultValue={3} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Count
// ---------------------------------------------------------------------------
export const CustomCount: Story = {
  name: "Custom Star Count",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">10-star scale</h3>
      <Rate count={10} defaultValue={7} />
    </div>
  ),
};
