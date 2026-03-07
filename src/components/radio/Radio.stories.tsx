/**
 * @file Radio Stories
 *
 * Visual test suite for `<Radio>` covering every prop and sub-component.
 *
 * Stories:
 *   Playground        -- interactive controls
 *   BasicRadio        -- standalone radios
 *   RadioGroup        -- group with value binding
 *   GroupWithOptions   -- options prop shorthand
 *   ButtonStyle        -- Radio.Button / optionType="button"
 *   SolidButtonStyle   -- solid button variant
 *   Sizes              -- small / middle / large groups
 *   Disabled           -- disabled state
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./index";

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Radio>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    children: "Radio Option",
    checked: false,
  },
};

// ---------------------------------------------------------------------------
// Basic Radio
// ---------------------------------------------------------------------------
export const BasicRadio: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Standalone radio inputs</h3>
      <div className="flex gap-4">
        <Radio value="a">Option A</Radio>
        <Radio value="b">Option B</Radio>
        <Radio value="c" disabled>Option C (disabled)</Radio>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Radio Group
// ---------------------------------------------------------------------------
export const RadioGroupStory: Story = {
  name: "Radio.Group",
  render: () => {
    const [value, setValue] = useState("apple");
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Group with controlled value</h3>
        <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
          <Radio value="apple">Apple</Radio>
          <Radio value="banana">Banana</Radio>
          <Radio value="cherry">Cherry</Radio>
        </Radio.Group>
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Group with Options
// ---------------------------------------------------------------------------
export const GroupWithOptions: Story = {
  name: "Group with Options Prop",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Options shorthand</h3>
      <Radio.Group
        options={[
          { label: "Small", value: "sm" },
          { label: "Medium", value: "md" },
          { label: "Large", value: "lg" },
        ]}
        defaultValue="md"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Button Style
// ---------------------------------------------------------------------------
export const ButtonStyle: Story = {
  name: "Button Style (outline)",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">optionType=&quot;button&quot;</h3>
      <Radio.Group
        optionType="button"
        defaultValue="b"
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Solid Button Style
// ---------------------------------------------------------------------------
export const SolidButtonStyle: Story = {
  name: "Button Style (solid)",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">buttonStyle=&quot;solid&quot;</h3>
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        defaultValue="b"
        options={[
          { label: "Daily", value: "daily" },
          { label: "Weekly", value: "weekly" },
          { label: "Monthly", value: "monthly" },
        ]}
      />
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
      <h3 className="text-sm font-medium text-muted-foreground">Button group sizes</h3>
      {(["small", "middle", "large"] as const).map((size) => (
        <Radio.Group
          key={size}
          optionType="button"
          buttonStyle="solid"
          size={size}
          defaultValue="a"
          options={[
            { label: "A", value: "a" },
            { label: "B", value: "b" },
            { label: "C", value: "c" },
          ]}
        />
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const DisabledRadio: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Disabled group</h3>
      <Radio.Group
        disabled
        defaultValue="a"
        options={[
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" },
        ]}
      />
    </div>
  ),
};
