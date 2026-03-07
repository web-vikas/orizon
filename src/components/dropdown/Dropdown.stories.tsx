/**
 * @file Dropdown Stories
 *
 * Visual test suite for `<Dropdown>` covering every prop.
 * Stories:
 *   Playground       — interactive controls
 *   BasicMenu        — simple menu items
 *   WithIcons        — menu items with icons
 *   Placements       — dropdown placement variants
 *   ClickTrigger     — click-to-open dropdown
 *   DisabledItems    — items with disabled / danger states
 *   DropdownButton   — split-button variant
 */
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { CopyIcon, TrashIcon, EditIcon, DownloadIcon } from "lucide-react";
import { Dropdown } from "./index";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: { layout: "padded" },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "topLeft", "topRight", "bottom", "bottomLeft", "bottomRight"],
    },
    disabled: { control: "boolean" },
    arrow: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Dropdown>;

const basicItems = [
  { key: "1", label: "Item 1" },
  { key: "2", label: "Item 2" },
  { key: "3", label: "Item 3" },
];

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    menu: { items: basicItems },
    placement: "bottomLeft",
    disabled: false,
    children: "Hover me",
  },
};

// ---------------------------------------------------------------------------
// BasicMenu — simple menu items
// ---------------------------------------------------------------------------

export const BasicMenu: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Basic Dropdown</h3>
      <Dropdown menu={{ items: basicItems }}>
        <a className="cursor-pointer text-primary underline">Hover me</a>
      </Dropdown>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithIcons — menu items with icons
// ---------------------------------------------------------------------------

export const WithIcons: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Items with Icons</h3>
      <Dropdown
        menu={{
          items: [
            { key: "edit", label: "Edit", icon: <EditIcon /> },
            { key: "copy", label: "Copy", icon: <CopyIcon /> },
            { key: "download", label: "Download", icon: <DownloadIcon /> },
            { key: "divider", label: "", type: "divider" },
            { key: "delete", label: "Delete", icon: <TrashIcon />, danger: true },
          ],
        }}
      >
        <a className="cursor-pointer text-primary underline">Actions</a>
      </Dropdown>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placements — dropdown placement variants
// ---------------------------------------------------------------------------

export const Placements: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 py-16">
      <h3 className="mb-2 w-full text-sm font-medium">Placement Variants</h3>
      {(["topLeft", "top", "topRight", "bottomLeft", "bottom", "bottomRight"] as const).map(
        (p) => (
          <Dropdown key={p} menu={{ items: basicItems }} placement={p} trigger={["click"]}>
            <button className="rounded border px-3 py-1 text-sm">{p}</button>
          </Dropdown>
        ),
      )}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ClickTrigger — click-to-open dropdown
// ---------------------------------------------------------------------------

export const ClickTrigger: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Click Trigger</h3>
      <Dropdown menu={{ items: basicItems }} trigger={["click"]}>
        <button className="rounded border px-3 py-1 text-sm">Click me</button>
      </Dropdown>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DisabledItems — items with disabled / danger states
// ---------------------------------------------------------------------------

export const DisabledItems: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Disabled & Danger Items</h3>
      <Dropdown
        menu={{
          items: [
            { key: "1", label: "Normal item" },
            { key: "2", label: "Disabled item", disabled: true },
            { key: "3", label: "Danger item", danger: true },
          ],
        }}
        trigger={["click"]}
      >
        <button className="rounded border px-3 py-1 text-sm">Open Menu</button>
      </Dropdown>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DropdownButton — split-button variant
// ---------------------------------------------------------------------------

export const DropdownButtonStory: Story = {
  name: "Dropdown.Button",
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Split Button</h3>
      <Dropdown.Button
        menu={{
          items: [
            { key: "1", label: "Option A" },
            { key: "2", label: "Option B" },
          ],
        }}
      >
        Submit
      </Dropdown.Button>
    </div>
  ),
};
