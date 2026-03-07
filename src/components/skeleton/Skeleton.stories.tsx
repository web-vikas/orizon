/**
 * @file Skeleton Stories
 *
 * Visual test suite for `<Skeleton>` covering every prop and sub-component.
 *
 * Stories:
 *   Playground        -- interactive controls
 *   BasicSkeleton     -- default title + paragraph placeholder
 *   WithAvatar        -- avatar + content skeleton
 *   ActiveAnimation   -- animated pulse mode
 *   ElementShapes     -- Skeleton.Avatar, .Button, .Input, .Image
 *   LoadingToggle     -- toggle between skeleton and real content
 *   CustomParagraph   -- custom row count and widths
 */
import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./index";
import { Button } from "../button";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    active: true,
    loading: true,
    avatar: false,
  },
};

// ---------------------------------------------------------------------------
// Basic Skeleton
// ---------------------------------------------------------------------------
export const BasicSkeleton: Story = {
  name: "Basic",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Default skeleton with title + paragraph</h3>
      <Skeleton />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Avatar
// ---------------------------------------------------------------------------
export const WithAvatar: Story = {
  name: "With Avatar",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Avatar + content skeleton</h3>
      <Skeleton avatar />
      <h3 className="text-sm font-medium text-muted-foreground">Square avatar</h3>
      <Skeleton avatar={{ shape: "square", size: "large" }} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Active Animation
// ---------------------------------------------------------------------------
export const ActiveAnimation: Story = {
  name: "Active (Animated)",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">Pulse animation enabled</h3>
      <Skeleton active avatar />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Element Shapes
// ---------------------------------------------------------------------------
export const ElementShapes: Story = {
  name: "Individual Element Shapes",
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Skeleton.Avatar</h3>
        <div className="flex items-center gap-4">
          <Skeleton.Avatar active shape="circle" size="small" />
          <Skeleton.Avatar active shape="circle" size="default" />
          <Skeleton.Avatar active shape="circle" size="large" />
          <Skeleton.Avatar active shape="square" size="default" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Skeleton.Button</h3>
        <div className="flex items-center gap-4">
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="default" />
          <Skeleton.Button active size="large" />
          <Skeleton.Button active shape="round" />
          <Skeleton.Button active shape="circle" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Skeleton.Input</h3>
        <div className="flex flex-col gap-3 w-64">
          <Skeleton.Input active size="small" />
          <Skeleton.Input active size="default" />
          <Skeleton.Input active size="large" />
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-sm font-medium text-muted-foreground">Skeleton.Image</h3>
        <Skeleton.Image active />
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading Toggle
// ---------------------------------------------------------------------------
export const LoadingToggle: Story = {
  name: "Loading Toggle",
  render: () => {
    const [loading, setLoading] = useState(true);
    return (
      <div className="flex flex-col gap-4 w-96">
        <Button type="primary" onClick={() => setLoading(!loading)}>
          Toggle Loading ({loading ? "ON" : "OFF"})
        </Button>
        <Skeleton loading={loading} active avatar>
          <div className="flex gap-4 items-center">
            <div className="size-10 rounded-full bg-primary" />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">Software Engineer</p>
            </div>
          </div>
        </Skeleton>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom Paragraph
// ---------------------------------------------------------------------------
export const CustomParagraph: Story = {
  name: "Custom Paragraph Rows",
  render: () => (
    <div className="flex flex-col gap-4 w-96">
      <h3 className="text-sm font-medium text-muted-foreground">5 rows with custom widths</h3>
      <Skeleton
        active
        paragraph={{ rows: 5, width: ["100%", "100%", "80%", "60%", "40%"] }}
      />
    </div>
  ),
};
