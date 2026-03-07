/**
 * @file Avatar Stories
 *
 * Visual test suite for `<Avatar>` and `<Avatar.Group>`.
 * Stories:
 *   Playground     — interactive controls
 *   Sizes          — small, middle, large, custom numeric
 *   Shapes         — circle, square
 *   Fallbacks      — icon fallback, text initials
 *   Group          — stacked avatars with overflow count
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./index";
import { UserIcon } from "lucide-react";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: { layout: "padded" },
  argTypes: {
    size: {
      control: "select",
      options: ["small", "middle", "large"],
    },
    shape: {
      control: "select",
      options: ["circle", "square"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    src: "https://api.dicebear.com/9.x/avataaars/svg?seed=Storybook",
    alt: "User",
    size: "middle",
    shape: "circle",
  },
};

// ---------------------------------------------------------------------------
// Sizes — preset and custom numeric sizes
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Preset Sizes</h3>
        <div className="flex items-center gap-3">
          <Avatar size="small">S</Avatar>
          <Avatar size="middle">M</Avatar>
          <Avatar size="large">L</Avatar>
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Custom Numeric Sizes</h3>
        <div className="flex items-center gap-3">
          <Avatar size={24}>24</Avatar>
          <Avatar size={40}>40</Avatar>
          <Avatar size={64}>64</Avatar>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Shapes — circle vs square
// ---------------------------------------------------------------------------
export const Shapes: Story = {
  name: "Shapes",
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-medium text-muted-foreground">Circle vs Square</h3>
      <div className="flex items-center gap-3">
        <Avatar shape="circle" size="large">C</Avatar>
        <Avatar shape="square" size="large">S</Avatar>
        <Avatar
          shape="circle"
          size="large"
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=Circle"
        />
        <Avatar
          shape="square"
          size="large"
          src="https://api.dicebear.com/9.x/avataaars/svg?seed=Square"
        />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Fallbacks — icon fallback and text initials
// ---------------------------------------------------------------------------
export const Fallbacks: Story = {
  name: "Fallbacks",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Icon Fallback</h3>
        <div className="flex items-center gap-3">
          <Avatar icon={<UserIcon className="size-4" />} />
          <Avatar icon={<UserIcon className="size-4" />} shape="square" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Text Initials</h3>
        <div className="flex items-center gap-3">
          <Avatar>AB</Avatar>
          <Avatar>John</Avatar>
          <Avatar>W</Avatar>
        </div>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Group — stacked avatars with max count
// ---------------------------------------------------------------------------
export const Group: Story = {
  name: "Avatar Group",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Group with max count = 3
        </h3>
        <Avatar.Group max={{ count: 3 }}>
          <Avatar src="https://api.dicebear.com/9.x/avataaars/svg?seed=A" />
          <Avatar src="https://api.dicebear.com/9.x/avataaars/svg?seed=B" />
          <Avatar src="https://api.dicebear.com/9.x/avataaars/svg?seed=C" />
          <Avatar src="https://api.dicebear.com/9.x/avataaars/svg?seed=D" />
          <Avatar src="https://api.dicebear.com/9.x/avataaars/svg?seed=E" />
        </Avatar.Group>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">
          Group with shared size and shape
        </h3>
        <Avatar.Group size="large" shape="square" max={{ count: 4 }}>
          <Avatar>A</Avatar>
          <Avatar>B</Avatar>
          <Avatar>C</Avatar>
          <Avatar>D</Avatar>
          <Avatar>E</Avatar>
        </Avatar.Group>
      </div>
    </div>
  ),
};
