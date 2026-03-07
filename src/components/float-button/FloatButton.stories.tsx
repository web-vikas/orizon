/**
 * @file FloatButton Stories
 *
 * Visual test suite for `<FloatButton>` covering every prop.
 * Stories:
 *   Playground    — interactive controls
 *   BasicButton   — default and primary types
 *   Shapes        — circle vs square
 *   WithBadge     — badge dot and count
 *   WithTooltip   — tooltip on hover
 *   Description   — button with description text
 *   GroupTrigger  — expandable group
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { PlusIcon, EditIcon, ShareIcon, QuestionMarkIcon, MessageSquareIcon } from "lucide-react";
import { FloatButton } from "./index";

const meta: Meta<typeof FloatButton> = {
  title: "Components/FloatButton",
  component: FloatButton,
  parameters: { layout: "fullscreen" },
  argTypes: {
    type: { control: "radio", options: ["default", "primary"] },
    shape: { control: "radio", options: ["circle", "square"] },
  },
};
export default meta;
type Story = StoryObj<typeof FloatButton>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    type: "default",
    shape: "circle",
    icon: <PlusIcon className="size-5" />,
  },
  render: (args) => (
    <div className="relative h-64">
      <FloatButton {...args} style={{ position: "absolute" }} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// BasicButton — default and primary types
// ---------------------------------------------------------------------------

export const BasicButton: Story = {
  render: () => (
    <div className="relative h-64">
      <h3 className="p-4 text-sm font-medium">Type Variants</h3>
      <div className="flex gap-4 p-4">
        <FloatButton icon={<PlusIcon className="size-5" />} style={{ position: "relative" }} />
        <FloatButton icon={<PlusIcon className="size-5" />} type="primary" style={{ position: "relative" }} />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Shapes — circle vs square
// ---------------------------------------------------------------------------

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <h3 className="text-sm font-medium">Shapes</h3>
      <FloatButton icon={<EditIcon className="size-5" />} shape="circle" style={{ position: "relative" }} />
      <FloatButton icon={<EditIcon className="size-5" />} shape="square" style={{ position: "relative" }} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithBadge — badge dot and count
// ---------------------------------------------------------------------------

export const WithBadge: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <h3 className="text-sm font-medium">Badges</h3>
      <FloatButton
        icon={<MessageSquareIcon className="size-5" />}
        badge={{ count: 5 }}
        style={{ position: "relative" }}
      />
      <FloatButton
        icon={<MessageSquareIcon className="size-5" />}
        badge={{ dot: true }}
        style={{ position: "relative" }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithTooltip — tooltip on hover
// ---------------------------------------------------------------------------

export const WithTooltip: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <h3 className="text-sm font-medium">Tooltip (hover)</h3>
      <FloatButton
        icon={<PlusIcon className="size-5" />}
        tooltip="Create new"
        style={{ position: "relative" }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Description — button with description text
// ---------------------------------------------------------------------------

export const Description: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <h3 className="text-sm font-medium">With Description</h3>
      <FloatButton
        icon={<ShareIcon className="size-4" />}
        description="Share"
        style={{ position: "relative" }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// GroupTrigger — expandable group
// ---------------------------------------------------------------------------

export const GroupTrigger: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="relative h-80">
        <h3 className="p-4 text-sm font-medium">Float Button Group (click trigger)</h3>
        <FloatButton.Group trigger="click" open={open} onOpenChange={setOpen}>
          <FloatButton icon={<EditIcon className="size-5" />} />
          <FloatButton icon={<ShareIcon className="size-5" />} />
        </FloatButton.Group>
      </div>
    );
  },
};
