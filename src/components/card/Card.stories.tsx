/**
 * @file Card Stories
 *
 * Visual test suite for `<Card>`, `<Card.Meta>`, and `<Card.Grid>`.
 * Stories:
 *   Playground     — interactive controls
 *   Basic          — title + extra + content
 *   Hoverable      — hover shadow effect
 *   Loading        — skeleton loading state
 *   NoBorder       — borderless variant
 *   WithCover      — cover image above body
 *   Meta           — Card.Meta avatar + title + description
 *   Grid           — Card.Grid hoverable cells
 *   InnerCard      — nested inner card type
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import { SettingsIcon, EditIcon, EllipsisIcon } from "lucide-react";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  parameters: { layout: "padded" },
  argTypes: {
    bordered: { control: "boolean" },
    hoverable: { control: "boolean" },
    loading: { control: "boolean" },
    size: {
      control: "select",
      options: ["default", "small"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    title: "Card Title",
    extra: <a href="#" className="text-sm text-primary">More</a>,
    children: <p className="text-sm">Card content goes here.</p>,
    bordered: true,
    hoverable: false,
    loading: false,
  },
};

// ---------------------------------------------------------------------------
// Basic — title + extra header + body content
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div className="w-80">
      <Card title="Card Title" extra={<a href="#" className="text-sm text-primary">More</a>}>
        <p className="text-sm">Simple card with title, extra link, and body content.</p>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Hoverable — shadow on hover
// ---------------------------------------------------------------------------
export const Hoverable: Story = {
  name: "Hoverable",
  render: () => (
    <div className="flex gap-4">
      <Card title="Hover me" hoverable className="w-60">
        <p className="text-sm">Shadow on hover</p>
      </Card>
      <Card title="No hover" className="w-60">
        <p className="text-sm">No hover effect</p>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading — skeleton placeholder
// ---------------------------------------------------------------------------
export const Loading: Story = {
  name: "Loading",
  render: () => (
    <div className="w-80">
      <Card title="Loading Card" loading>
        <p>This content is hidden while loading.</p>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// NoBorder — bordered={false}
// ---------------------------------------------------------------------------
export const NoBorder: Story = {
  name: "No Border",
  render: () => (
    <div className="rounded-lg bg-muted/30 p-6">
      <Card title="No Border" bordered={false}>
        <p className="text-sm">Card without border, on a tinted background.</p>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithCover — cover image above the card body
// ---------------------------------------------------------------------------
export const WithCover: Story = {
  name: "With Cover Image",
  render: () => (
    <div className="w-72">
      <Card
        cover={
          <img
            src="https://picsum.photos/seed/card/400/200"
            alt="Cover"
            className="h-40 w-full object-cover"
          />
        }
      >
        <Card.Meta
          title="Europe Street Beat"
          description="www.example.com"
        />
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Meta — Card.Meta with avatar, title, description
// ---------------------------------------------------------------------------
export const Meta: Story = {
  name: "Card.Meta",
  render: () => (
    <div className="w-80">
      <Card
        actions={[
          <SettingsIcon key="setting" className="size-4" />,
          <EditIcon key="edit" className="size-4" />,
          <EllipsisIcon key="more" className="size-4" />,
        ]}
      >
        <Card.Meta
          avatar={
            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
              JD
            </div>
          }
          title="John Doe"
          description="Software Engineer at Acme Corp"
        />
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Grid — Card.Grid hoverable cells
// ---------------------------------------------------------------------------
export const GridCells: Story = {
  name: "Card.Grid",
  render: () => (
    <div className="w-96">
      <Card title="Grid Card">
        <div className="grid grid-cols-3">
          <Card.Grid>Cell 1</Card.Grid>
          <Card.Grid>Cell 2</Card.Grid>
          <Card.Grid>Cell 3</Card.Grid>
          <Card.Grid>Cell 4</Card.Grid>
          <Card.Grid>Cell 5</Card.Grid>
          <Card.Grid>Cell 6</Card.Grid>
        </div>
      </Card>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// InnerCard — nested card with type="inner"
// ---------------------------------------------------------------------------
export const InnerCard: Story = {
  name: "Inner Card",
  render: () => (
    <div className="w-96">
      <Card title="Outer Card">
        <p className="mb-3 text-sm">Some outer content</p>
        <Card type="inner" title="Inner Card">
          <p className="text-sm">Nested inner content with tinted header.</p>
        </Card>
      </Card>
    </div>
  ),
};
