/**
 * @file Flex Stories
 *
 * Visual test suite for `<Flex>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   HorizontalRow     — default horizontal layout
 *   VerticalColumn    — vertical (column) layout
 *   GapSizes          — small / middle / large / custom gaps
 *   JustifyContent    — justify-content variants
 *   AlignItems        — align-items variants
 *   Wrap              — wrapping behaviour
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./index";

const meta: Meta<typeof Flex> = {
  title: "Components/Flex",
  component: Flex,
  parameters: { layout: "padded" },
  argTypes: {
    vertical: { control: "boolean" },
    gap: {
      control: "select",
      options: ["small", "middle", "large", 8, 16, 32],
    },
    wrap: { control: "boolean" },
    justify: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "space-between", "space-around", "space-evenly"],
    },
    align: {
      control: "select",
      options: ["flex-start", "center", "flex-end", "stretch", "baseline"],
    },
  },
};
export default meta;
type Story = StoryObj<typeof Flex>;

const Box = ({ children, h }: { children: React.ReactNode; h?: number }) => (
  <div
    className="flex items-center justify-center rounded bg-primary/15 px-4 text-sm"
    style={{ height: h ?? 40 }}
  >
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    gap: "middle",
    vertical: false,
    wrap: false,
  },
  render: (args) => (
    <Flex {...args}>
      <Box>Item 1</Box>
      <Box>Item 2</Box>
      <Box>Item 3</Box>
    </Flex>
  ),
};

// ---------------------------------------------------------------------------
// HorizontalRow — default horizontal layout
// ---------------------------------------------------------------------------

export const HorizontalRow: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Horizontal (default)</h3>
      <Flex gap="middle">
        <Box>A</Box>
        <Box>B</Box>
        <Box>C</Box>
        <Box>D</Box>
      </Flex>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// VerticalColumn — vertical (column) layout
// ---------------------------------------------------------------------------

export const VerticalColumn: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Vertical</h3>
      <Flex vertical gap="small">
        <Box>Row 1</Box>
        <Box>Row 2</Box>
        <Box>Row 3</Box>
      </Flex>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// GapSizes — small / middle / large / custom gaps
// ---------------------------------------------------------------------------

export const GapSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Gap Sizes</h3>
      {(["small", "middle", "large"] as const).map((g) => (
        <div key={g}>
          <span className="mb-1 block text-xs text-muted-foreground">{g}</span>
          <Flex gap={g}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>
      ))}
      <div>
        <span className="mb-1 block text-xs text-muted-foreground">Custom (32px)</span>
        <Flex gap={32}>
          <Box>1</Box>
          <Box>2</Box>
          <Box>3</Box>
        </Flex>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// JustifyContent — justify-content variants
// ---------------------------------------------------------------------------

export const JustifyContent: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Justify Content</h3>
      {(["flex-start", "center", "flex-end", "space-between", "space-around"] as const).map(
        (j) => (
          <div key={j}>
            <span className="mb-1 block text-xs text-muted-foreground">{j}</span>
            <Flex justify={j} gap="small" className="rounded border p-2">
              <Box>A</Box>
              <Box>B</Box>
              <Box>C</Box>
            </Flex>
          </div>
        ),
      )}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// AlignItems — align-items variants
// ---------------------------------------------------------------------------

export const AlignItems: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Align Items</h3>
      {(["flex-start", "center", "flex-end", "stretch"] as const).map((a) => (
        <div key={a}>
          <span className="mb-1 block text-xs text-muted-foreground">{a}</span>
          <Flex align={a} gap="small" className="h-24 rounded border p-2">
            <Box h={30}>Short</Box>
            <Box h={50}>Tall</Box>
            <Box h={40}>Med</Box>
          </Flex>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Wrap — wrapping behaviour
// ---------------------------------------------------------------------------

export const Wrap: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Wrap</h3>
      <Flex wrap gap="small" className="max-w-xs rounded border p-2">
        {Array.from({ length: 10 }, (_, i) => (
          <Box key={i}>Item {i + 1}</Box>
        ))}
      </Flex>
    </div>
  ),
};
