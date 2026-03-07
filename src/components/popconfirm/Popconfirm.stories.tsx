/**
 * @file Popconfirm Stories
 *
 * Visual test suite for `<Popconfirm>` covering every prop.
 *
 * Stories:
 *   Playground         -- interactive controls
 *   BasicConfirmation  -- simple delete confirmation
 *   Placement          -- different popup positions
 *   CustomButtons      -- custom OK/Cancel text and types
 *   WithDescription    -- title + description
 *   CustomIcon         -- override the default question icon
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Popconfirm } from "./index";
import { Button } from "../button";
import { Trash2Icon, AlertTriangleIcon } from "lucide-react";

const meta: Meta<typeof Popconfirm> = {
  title: "Components/Popconfirm",
  component: Popconfirm,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Popconfirm>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    title: "Are you sure?",
    children: <Button>Click me</Button>,
  },
};

// ---------------------------------------------------------------------------
// Basic Confirmation
// ---------------------------------------------------------------------------
export const BasicConfirmation: Story = {
  name: "Basic Confirmation",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Simple delete confirmation</h3>
      <Popconfirm
        title="Delete this item?"
        onConfirm={() => console.log("Confirmed")}
        onCancel={() => console.log("Cancelled")}
      >
        <Button danger icon={<Trash2Icon className="size-4" />}>Delete</Button>
      </Popconfirm>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placement
// ---------------------------------------------------------------------------
export const Placement: Story = {
  name: "Placement",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Popup placement options</h3>
      <div className="flex flex-wrap items-center gap-3 py-16 px-8">
        {(["top", "bottom", "left", "right"] as const).map((p) => (
          <Popconfirm key={p} title={`Placed at ${p}`} placement={p}>
            <Button>{p}</Button>
          </Popconfirm>
        ))}
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Buttons
// ---------------------------------------------------------------------------
export const CustomButtons: Story = {
  name: "Custom Button Text",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Custom OK/Cancel text and type</h3>
      <Popconfirm title="Discard changes?" okText="Yes, discard" cancelText="Keep editing" okType="primary">
        <Button>Discard</Button>
      </Popconfirm>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Description
// ---------------------------------------------------------------------------
export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Title + description</h3>
      <Popconfirm
        title="Remove this user?"
        description="This action cannot be undone. All associated data will be lost."
      >
        <Button danger>Remove User</Button>
      </Popconfirm>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Icon
// ---------------------------------------------------------------------------
export const CustomIcon: Story = {
  name: "Custom Icon",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Override the default question icon</h3>
      <Popconfirm
        title="This is dangerous!"
        icon={<AlertTriangleIcon className="size-4 text-red-500" />}
      >
        <Button danger>Danger Action</Button>
      </Popconfirm>
    </div>
  ),
};
