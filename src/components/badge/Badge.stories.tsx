/**
 * @file Badge Stories
 *
 * Visual test suite for `<Badge>` and `<Badge.Ribbon>`.
 * Stories:
 *   Playground     — interactive controls
 *   Count          — numeric count display
 *   Dot            — dot indicator on children
 *   Status         — standalone status dots with text
 *   Colors         — preset and custom colours
 *   Overflow       — overflowCount threshold
 *   Ribbon         — Badge.Ribbon decoration
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";
import { MailIcon, BellIcon } from "lucide-react";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  parameters: { layout: "padded" },
  argTypes: {
    count: { control: "number" },
    dot: { control: "boolean" },
    showZero: { control: "boolean" },
    overflowCount: { control: "number" },
    size: {
      control: "select",
      options: ["default", "small"],
    },
    status: {
      control: "select",
      options: [undefined, "success", "processing", "default", "error", "warning"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    count: 5,
    children: (
      <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
        <MailIcon className="size-5" />
      </div>
    ),
  },
};

// ---------------------------------------------------------------------------
// Count — numeric badge on an element
// ---------------------------------------------------------------------------
export const Count: Story = {
  name: "Count",
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-medium text-muted-foreground">Numeric Count</h3>
      <div className="flex items-center gap-6">
        <Badge count={5}>
          <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
            <MailIcon className="size-5" />
          </div>
        </Badge>
        <Badge count={0} showZero>
          <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
            <BellIcon className="size-5" />
          </div>
        </Badge>
        <Badge count={100} overflowCount={99}>
          <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
            <MailIcon className="size-5" />
          </div>
        </Badge>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Dot — dot indicator
// ---------------------------------------------------------------------------
export const Dot: Story = {
  name: "Dot",
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-medium text-muted-foreground">Dot Badge</h3>
      <div className="flex items-center gap-6">
        <Badge dot>
          <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
            <BellIcon className="size-5" />
          </div>
        </Badge>
        <Badge dot size="small">
          <span className="text-sm">Notifications</span>
        </Badge>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Status — standalone status dots with text labels
// ---------------------------------------------------------------------------
export const StatusBadges: Story = {
  name: "Status",
  render: () => (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-muted-foreground">Status Indicators</h3>
      <Badge status="success" text="Success" />
      <Badge status="processing" text="Processing" />
      <Badge status="default" text="Default" />
      <Badge status="warning" text="Warning" />
      <Badge status="error" text="Error" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Colors — preset and custom
// ---------------------------------------------------------------------------
export const Colors: Story = {
  name: "Colors",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Preset Colors</h3>
        <div className="flex flex-wrap gap-6">
          {(["blue", "green", "red", "orange", "purple", "cyan", "gold", "lime"] as const).map(
            (color) => (
              <Badge key={color} count={8} color={color}>
                <div className="flex size-10 items-center justify-center rounded-lg border bg-muted text-xs">
                  {color}
                </div>
              </Badge>
            ),
          )}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Custom Color</h3>
        <Badge count={3} color="#722ed1">
          <div className="flex size-10 items-center justify-center rounded-lg border bg-muted">
            <MailIcon className="size-5" />
          </div>
        </Badge>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Overflow — count exceeding overflowCount threshold
// ---------------------------------------------------------------------------
export const Overflow: Story = {
  name: "Overflow Count",
  render: () => (
    <div className="flex items-center gap-6">
      <Badge count={99} overflowCount={99}>
        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted text-xs">99</div>
      </Badge>
      <Badge count={100} overflowCount={99}>
        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted text-xs">100</div>
      </Badge>
      <Badge count={1000} overflowCount={999}>
        <div className="flex size-10 items-center justify-center rounded-lg border bg-muted text-xs">1000</div>
      </Badge>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Ribbon — corner ribbon decoration
// ---------------------------------------------------------------------------
export const Ribbon: Story = {
  name: "Badge.Ribbon",
  render: () => (
    <div className="flex flex-col gap-6">
      <h3 className="text-sm font-medium text-muted-foreground">Ribbon Placement</h3>
      <div className="flex gap-6">
        <Badge.Ribbon text="New">
          <div className="w-48 rounded-lg border p-4 text-sm">Card with end ribbon</div>
        </Badge.Ribbon>
        <Badge.Ribbon text="Sale" color="red" placement="start">
          <div className="w-48 rounded-lg border p-4 text-sm">Card with start ribbon</div>
        </Badge.Ribbon>
      </div>
    </div>
  ),
};
