/**
 * @file Descriptions Stories
 *
 * Visual test suite for `<Descriptions>`.
 * Stories:
 *   Playground     — interactive controls
 *   Basic          — default horizontal layout
 *   Bordered       — bordered table style
 *   Vertical       — vertical layout
 *   Sizes          — default, middle, small
 *   WithTitle      — title and extra header
 *   ColumnSpan     — items spanning multiple columns
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Descriptions } from "./index";
import type { DescriptionsItem } from "./index";

const userItems: DescriptionsItem[] = [
  { key: "1", label: "Name", children: "Jane Doe" },
  { key: "2", label: "Phone", children: "555-0123" },
  { key: "3", label: "City", children: "San Francisco" },
  { key: "4", label: "Country", children: "USA" },
  { key: "5", label: "Birthday", children: "1990-01-15" },
  { key: "6", label: "Occupation", children: "Software Engineer" },
];

const meta: Meta<typeof Descriptions> = {
  title: "Components/Descriptions",
  component: Descriptions,
  parameters: { layout: "padded" },
  argTypes: {
    bordered: { control: "boolean" },
    column: { control: "number" },
    layout: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    size: {
      control: "select",
      options: ["default", "middle", "small"],
    },
    colon: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Descriptions>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    title: "User Info",
    items: userItems,
    bordered: false,
    column: 3,
    layout: "horizontal",
    size: "default",
    colon: true,
  },
};

// ---------------------------------------------------------------------------
// Basic — default horizontal layout
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <Descriptions title="User Info" items={userItems} />
  ),
};

// ---------------------------------------------------------------------------
// Bordered — bordered table style
// ---------------------------------------------------------------------------
export const Bordered: Story = {
  name: "Bordered",
  render: () => (
    <Descriptions title="User Info" items={userItems} bordered />
  ),
};

// ---------------------------------------------------------------------------
// Vertical — vertical layout
// ---------------------------------------------------------------------------
export const Vertical: Story = {
  name: "Vertical Layout",
  render: () => (
    <Descriptions title="User Info" items={userItems} layout="vertical" />
  ),
};

// ---------------------------------------------------------------------------
// Sizes — default, middle, small
// ---------------------------------------------------------------------------
export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div className="flex flex-col gap-8">
      {(["default", "middle", "small"] as const).map((s) => (
        <div key={s}>
          <Descriptions
            title={`Size: ${s}`}
            items={userItems}
            bordered
            size={s}
          />
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithTitle — title and extra header
// ---------------------------------------------------------------------------
export const WithTitle: Story = {
  name: "Title + Extra",
  render: () => (
    <Descriptions
      title="User Details"
      extra={
        <button className="rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground">
          Edit
        </button>
      }
      items={userItems}
      bordered
    />
  ),
};

// ---------------------------------------------------------------------------
// ColumnSpan — items spanning multiple columns
// ---------------------------------------------------------------------------
export const ColumnSpan: Story = {
  name: "Column Span",
  render: () => (
    <Descriptions
      title="Order Info"
      bordered
      column={3}
      items={[
        { key: "1", label: "Product", children: "Cloud Database" },
        { key: "2", label: "Billing Mode", children: "Prepaid" },
        { key: "3", label: "Auto Renew", children: "Yes" },
        { key: "4", label: "Order Time", children: "2024-01-15 12:00:00" },
        { key: "5", label: "Usage", children: "10 GB / 50 GB", span: 2 },
        {
          key: "6",
          label: "Description",
          children:
            "A high-performance cloud database with automatic scaling and backup features.",
          span: 3,
        },
      ]}
    />
  ),
};
