/**
 * @file Tooltip Stories
 *
 * Visual test suite for `<Tooltip>` covering every major prop:
 * - Playground (args)
 * - Placements
 * - CustomColor
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    title: "Prompt text",
    children: <button className="rounded-md border px-4 py-2 text-sm">Hover me</button>,
  },
};

// ---------------------------------------------------------------------------
// Placements
// ---------------------------------------------------------------------------

export const Placements: Story = {
  render: () => {
    const placements = [
      "top", "topLeft", "topRight",
      "bottom", "bottomLeft", "bottomRight",
      "left", "leftTop", "leftBottom",
      "right", "rightTop", "rightBottom",
    ] as const;

    return (
      <div>
        <h3 className="mb-6 text-sm font-medium">All 12 placements</h3>
        <div className="flex flex-wrap gap-3">
          {placements.map((p) => (
            <Tooltip key={p} title={p} placement={p}>
              <button className="rounded-md border px-3 py-1 text-xs">{p}</button>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Custom Color
// ---------------------------------------------------------------------------

export const CustomColor: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip title="Custom pink" color="#ec4899">
        <button className="rounded-md border px-4 py-2 text-sm">Pink</button>
      </Tooltip>
      <Tooltip title="Custom teal" color="#14b8a6">
        <button className="rounded-md border px-4 py-2 text-sm">Teal</button>
      </Tooltip>
    </div>
  ),
};
