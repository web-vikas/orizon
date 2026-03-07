/**
 * @file Drawer Stories
 *
 * Visual test suite for `<Drawer>` covering every prop.
 * Stories:
 *   Playground    — interactive controls
 *   Placements    — top / right / bottom / left
 *   Sizes         — default vs large preset
 *   WithFooter    — drawer with footer buttons
 *   Loading       — loading spinner state
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Drawer } from "./index";

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  parameters: { layout: "fullscreen" },
  argTypes: {
    open: { control: "boolean" },
    placement: {
      control: "radio",
      options: ["top", "right", "bottom", "left"],
    },
    size: { control: "radio", options: ["default", "large"] },
    closable: { control: "boolean" },
    mask: { control: "boolean" },
    loading: { control: "boolean" },
    title: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    open: true,
    title: "Drawer Title",
    placement: "right",
    size: "default",
    closable: true,
    mask: true,
    loading: false,
    children: "Drawer body content goes here.",
  },
};

// ---------------------------------------------------------------------------
// Placements — top / right / bottom / left
// ---------------------------------------------------------------------------

export const Placements: Story = {
  render: () => {
    const [placement, setPlacement] = React.useState<"top" | "right" | "bottom" | "left" | null>(null);
    return (
      <div className="flex gap-2 p-8">
        <h3 className="mb-2 text-sm font-medium">Placements</h3>
        {(["top", "right", "bottom", "left"] as const).map((p) => (
          <button
            key={p}
            className="rounded border px-3 py-1 text-sm"
            onClick={() => setPlacement(p)}
          >
            {p}
          </button>
        ))}
        <Drawer
          open={placement !== null}
          placement={placement ?? "right"}
          title={`${placement} Drawer`}
          onClose={() => setPlacement(null)}
        >
          <p>This drawer slides from the {placement} side.</p>
        </Drawer>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Sizes — default vs large preset
// ---------------------------------------------------------------------------

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = React.useState<"default" | "large" | null>(null);
    return (
      <div className="flex gap-2 p-8">
        <h3 className="mb-2 text-sm font-medium">Sizes</h3>
        {(["default", "large"] as const).map((s) => (
          <button
            key={s}
            className="rounded border px-3 py-1 text-sm"
            onClick={() => setSize(s)}
          >
            {s}
          </button>
        ))}
        <Drawer
          open={size !== null}
          size={size ?? "default"}
          title={`${size} size`}
          onClose={() => setSize(null)}
        >
          <p>Drawer content</p>
        </Drawer>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// WithFooter — drawer with footer buttons
// ---------------------------------------------------------------------------

export const WithFooter: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-8">
        <h3 className="mb-2 text-sm font-medium">Drawer with Footer</h3>
        <button className="rounded border px-3 py-1 text-sm" onClick={() => setOpen(true)}>
          Open
        </button>
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          title="With Footer"
          footer={
            <>
              <button
                className="rounded border px-3 py-1 text-sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="rounded bg-primary px-3 py-1 text-sm text-primary-foreground"
                onClick={() => setOpen(false)}
              >
                OK
              </button>
            </>
          }
        >
          <p>Check the footer area below.</p>
        </Drawer>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Loading — loading spinner state
// ---------------------------------------------------------------------------

export const Loading: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="p-8">
        <h3 className="mb-2 text-sm font-medium">Loading State</h3>
        <button className="rounded border px-3 py-1 text-sm" onClick={() => setOpen(true)}>
          Open Loading Drawer
        </button>
        <Drawer open={open} onClose={() => setOpen(false)} title="Loading" loading>
          <p>This will not show because loading is true.</p>
        </Drawer>
      </div>
    );
  },
};
