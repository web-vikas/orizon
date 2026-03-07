/**
 * @file Popover Stories
 *
 * Visual test suite for `<Popover>` covering every prop.
 *
 * Stories:
 *   Playground      -- interactive controls
 *   BasicPopover    -- simple content popup
 *   WithTitle       -- title + content
 *   Placement       -- different popup positions
 *   ControlledOpen  -- programmatic open/close
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Popover>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    content: "Popover content here",
    title: "Title",
    children: <Button>Hover me</Button>,
  },
};

// ---------------------------------------------------------------------------
// Basic Popover
// ---------------------------------------------------------------------------
export const BasicPopover: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Simple content popup</h3>
      <Popover content={<p>Some helpful content in the popover.</p>}>
        <Button>Click me</Button>
      </Popover>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Title
// ---------------------------------------------------------------------------
export const WithTitle: Story = {
  name: "With Title",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Title + content</h3>
      <Popover title="User Info" content={<div><p>Name: John Doe</p><p>Role: Admin</p></div>}>
        <Button>View Details</Button>
      </Popover>
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
      <h3 className="text-sm font-medium text-muted-foreground">Placement options</h3>
      <div className="flex flex-wrap items-center gap-3 py-16 px-8">
        {(["top", "bottom", "left", "right", "topLeft", "topRight"] as const).map((p) => (
          <Popover key={p} content={`Placed at ${p}`} placement={p}>
            <Button>{p}</Button>
          </Popover>
        ))}
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Controlled Open
// ---------------------------------------------------------------------------
export const ControlledOpen: Story = {
  name: "Controlled Open",
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-muted-foreground">Programmatic open/close</h3>
        <div className="flex gap-3">
          <Popover content="Controlled popover" open={open} onOpenChange={setOpen}>
            <Button>Trigger</Button>
          </Popover>
          <Button type="primary" onClick={() => setOpen(!open)}>
            Toggle ({open ? "Open" : "Closed"})
          </Button>
        </div>
      </div>
    );
  },
};
