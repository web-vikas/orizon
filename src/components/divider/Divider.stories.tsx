/**
 * @file Divider Stories
 *
 * Visual test suite for `<Divider>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   Horizontal        — default horizontal dividers
 *   WithText          — divider with title text
 *   Orientation       — left / center / right title alignment
 *   Dashed            — dashed border style
 *   Vertical          — inline vertical dividers
 *   Plain             — non-bold text style
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Divider } from "./index";

const meta: Meta<typeof Divider> = {
  title: "Components/Divider",
  component: Divider,
  parameters: { layout: "padded" },
  argTypes: {
    type: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
    dashed: { control: "boolean" },
    orientation: {
      control: "radio",
      options: ["left", "center", "right"],
    },
    orientationMargin: { control: "text" },
    plain: { control: "boolean" },
    children: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: "Section Title",
    type: "horizontal",
    dashed: false,
    orientation: "center",
    plain: false,
  },
};

// ---------------------------------------------------------------------------
// Horizontal — default horizontal dividers
// ---------------------------------------------------------------------------

export const Horizontal: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Default Horizontal</h3>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithText — divider with title text
// ---------------------------------------------------------------------------

export const WithText: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Divider with Text</h3>
      <Divider>Center Title</Divider>
      <Divider orientation="left">Left Title</Divider>
      <Divider orientation="right">Right Title</Divider>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Orientation — left / center / right title alignment
// ---------------------------------------------------------------------------

export const Orientation: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Orientation Variants</h3>
      <Divider orientation="left">Left</Divider>
      <Divider orientation="center">Center</Divider>
      <Divider orientation="right">Right</Divider>
      <Divider orientation="left" orientationMargin="0">
        Left with margin 0
      </Divider>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dashed — dashed border style
// ---------------------------------------------------------------------------

export const Dashed: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Dashed Dividers</h3>
      <Divider dashed />
      <Divider dashed>Dashed with Text</Divider>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Vertical — inline vertical dividers
// ---------------------------------------------------------------------------

export const Vertical: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Vertical Dividers</h3>
      <span>Link 1</span>
      <Divider type="vertical" />
      <span>Link 2</span>
      <Divider type="vertical" />
      <span>Link 3</span>
      <Divider type="vertical" dashed />
      <span>Link 4 (dashed)</span>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Plain — non-bold text style
// ---------------------------------------------------------------------------

export const Plain: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Plain vs Bold Text</h3>
      <Divider>Bold (default)</Divider>
      <Divider plain>Plain text</Divider>
    </div>
  ),
};
