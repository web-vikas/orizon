/**
 * @file Pagination Stories
 *
 * Visual test suite for `<Pagination>` covering every prop.
 *
 * Stories:
 *   Playground        -- interactive controls
 *   BasicPagination   -- simple usage with total
 *   WithSizeChanger   -- page-size dropdown
 *   WithQuickJumper   -- "Go to" input
 *   ShowTotal         -- total items display
 *   SimpleMode        -- compact prev/next only
 *   SmallSize         -- small variant
 *   Disabled          -- all controls disabled
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./index";

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    total: 100,
    defaultCurrent: 1,
    defaultPageSize: 10,
  },
};

// ---------------------------------------------------------------------------
// Basic Pagination
// ---------------------------------------------------------------------------
export const BasicPagination: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Basic pagination</h3>
      <Pagination total={100} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Size Changer
// ---------------------------------------------------------------------------
export const WithSizeChanger: Story = {
  name: "Size Changer",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Page size selector</h3>
      <Pagination total={200} showSizeChanger pageSizeOptions={[10, 20, 50, 100]} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Quick Jumper
// ---------------------------------------------------------------------------
export const WithQuickJumper: Story = {
  name: "Quick Jumper",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Jump to a page</h3>
      <Pagination total={500} showQuickJumper />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Show Total
// ---------------------------------------------------------------------------
export const ShowTotal: Story = {
  name: "Show Total",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Display total count</h3>
      <Pagination
        total={85}
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Simple Mode
// ---------------------------------------------------------------------------
export const SimpleMode: Story = {
  name: "Simple Mode",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Compact prev/next only</h3>
      <Pagination total={50} simple />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Small Size
// ---------------------------------------------------------------------------
export const SmallSize: Story = {
  name: "Small Size",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">Small variant</h3>
      <Pagination total={100} size="small" showSizeChanger showQuickJumper />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Disabled
// ---------------------------------------------------------------------------
export const DisabledPagination: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-medium text-muted-foreground">All controls disabled</h3>
      <Pagination total={100} disabled showSizeChanger showQuickJumper />
    </div>
  ),
};
