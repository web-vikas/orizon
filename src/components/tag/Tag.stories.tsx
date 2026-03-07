/**
 * @file Tag Stories
 *
 * Visual test suite for `<Tag>` covering every major prop:
 * - Playground (args)
 * - PresetColors
 * - Closable
 * - WithIcon
 * - Borderless
 * - CheckableTag
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Tag } from "./index";
import { Star, Zap } from "lucide-react";
import { useState } from "react";

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Tag>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    children: "Tag",
    color: "blue",
    closable: false,
  },
};

// ---------------------------------------------------------------------------
// Preset Colors
// ---------------------------------------------------------------------------

export const PresetColors: Story = {
  render: () => {
    const colors = [
      "blue", "purple", "cyan", "green", "magenta", "red",
      "orange", "yellow", "lime", "gold", "success", "processing",
      "error", "warning", "default",
    ] as const;
    return (
      <div>
        <h3 className="mb-4 text-sm font-medium">All preset colours</h3>
        <div className="flex flex-wrap gap-2">
          {colors.map((c) => (
            <Tag key={c} color={c}>{c}</Tag>
          ))}
        </div>
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// Closable
// ---------------------------------------------------------------------------

export const Closable: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Closable tags</h3>
      <div className="flex gap-2">
        <Tag closable color="blue">Blue</Tag>
        <Tag closable color="green">Green</Tag>
        <Tag closable color="red">Red</Tag>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// With Icon
// ---------------------------------------------------------------------------

export const WithIcon: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Tags with icons</h3>
      <div className="flex gap-2">
        <Tag icon={<Star className="size-3" />} color="gold">Starred</Tag>
        <Tag icon={<Zap className="size-3" />} color="orange">Featured</Tag>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Borderless
// ---------------------------------------------------------------------------

export const Borderless: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Borderless tags</h3>
      <div className="flex gap-2">
        <Tag bordered={false} color="blue">Blue</Tag>
        <Tag bordered={false} color="green">Green</Tag>
        <Tag bordered={false} color="red">Red</Tag>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// CheckableTag
// ---------------------------------------------------------------------------

function CheckableDemo() {
  const options = ["Movies", "Books", "Music", "Sports"];
  const [selected, setSelected] = useState<string[]>(["Movies"]);

  const toggle = (tag: string) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  return (
    <div>
      <h3 className="mb-4 text-sm font-medium">Checkable tags</h3>
      <div className="flex gap-2">
        {options.map((opt) => (
          <Tag.CheckableTag
            key={opt}
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
          >
            {opt}
          </Tag.CheckableTag>
        ))}
      </div>
    </div>
  );
}

export const CheckableTagStory: Story = {
  name: "CheckableTag",
  render: () => <CheckableDemo />,
};
