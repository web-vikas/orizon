/**
 * @file Watermark Stories
 *
 * Visual test suite for `<Watermark>` covering every major prop:
 * - Playground (args)
 * - MultiLineText
 * - CustomFont
 * - ImageWatermark
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Watermark } from "./index";

const meta: Meta<typeof Watermark> = {
  title: "Components/Watermark",
  component: Watermark,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Watermark>;

// ---------------------------------------------------------------------------
// Sample content block used across stories
// ---------------------------------------------------------------------------

const SampleContent = () => (
  <div className="flex h-[300px] items-center justify-center rounded-lg border bg-background p-8">
    <p className="text-center text-muted-foreground">
      This area is protected by a watermark overlay.
    </p>
  </div>
);

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    content: "Confidential",
    children: <SampleContent />,
  },
};

// ---------------------------------------------------------------------------
// Multi-line Text
// ---------------------------------------------------------------------------

export const MultiLineText: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Multi-line watermark text</h3>
      <Watermark content={["Orizon Design", "Draft Copy"]}>
        <SampleContent />
      </Watermark>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Custom Font
// ---------------------------------------------------------------------------

export const CustomFont: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Custom font configuration</h3>
      <Watermark
        content="Custom"
        font={{
          color: "rgba(255, 0, 0, 0.15)",
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "serif",
        }}
        rotate={-30}
      >
        <SampleContent />
      </Watermark>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Image Watermark
// ---------------------------------------------------------------------------

export const ImageWatermark: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Image-based watermark</h3>
      <Watermark
        image="https://placehold.co/60x30/ccc/666?text=LOGO"
        width={60}
        height={30}
      >
        <SampleContent />
      </Watermark>
    </div>
  ),
};
