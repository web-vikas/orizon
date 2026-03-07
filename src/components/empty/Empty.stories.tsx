/**
 * @file Empty Stories
 *
 * Visual test suite for `<Empty>` covering every prop.
 * Stories:
 *   Playground       — interactive controls
 *   DefaultImage     — default empty illustration
 *   SimpleImage      — minimal empty illustration
 *   CustomDescription — custom description text
 *   WithAction       — action area with a button
 *   CustomImage      — custom image element
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "./index";

const meta: Meta<typeof Empty> = {
  title: "Components/Empty",
  component: Empty,
  parameters: { layout: "padded" },
  argTypes: {
    description: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Empty>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    description: "No data",
  },
};

// ---------------------------------------------------------------------------
// DefaultImage — default empty illustration
// ---------------------------------------------------------------------------

export const DefaultImage: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Default Image</h3>
      <Empty />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// SimpleImage — minimal empty illustration
// ---------------------------------------------------------------------------

export const SimpleImage: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Simple Image</h3>
      <Empty image={<Empty.PRESENTED_IMAGE_SIMPLE />} description="Simplified" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomDescription — custom description text
// ---------------------------------------------------------------------------

export const CustomDescription: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Custom Description</h3>
      <Empty description="There are no items to display." />
      <Empty description={null} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithAction — action area with a button
// ---------------------------------------------------------------------------

export const WithAction: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">With Action Button</h3>
      <Empty description="No records found">
        <button className="rounded bg-primary px-4 py-1 text-sm text-primary-foreground">
          Create Now
        </button>
      </Empty>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CustomImage — custom image element
// ---------------------------------------------------------------------------

export const CustomImage: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Custom Image</h3>
      <Empty
        image={
          <span className="text-4xl" role="img" aria-label="inbox">
            &#128235;
          </span>
        }
        description="Your inbox is empty"
      />
    </div>
  ),
};
