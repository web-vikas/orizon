/**
 * @file Typography Stories
 *
 * Visual test suite for `<Typography>` covering every sub-component:
 * - TitleLevels
 * - TextVariants
 * - ParagraphCopyable
 * - LinkComponent
 * - Decorations
 * - Ellipsis
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./index";

const { Title, Text, Paragraph, Link } = Typography;

const meta: Meta<typeof Typography> = {
  title: "Components/Typography",
  component: Typography,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Typography>;

// ---------------------------------------------------------------------------
// Title Levels
// ---------------------------------------------------------------------------

export const TitleLevels: Story = {
  render: () => (
    <div className="space-y-2">
      <h3 className="mb-4 text-sm font-medium">Heading levels 1 through 5</h3>
      <Title level={1}>h1. Heading</Title>
      <Title level={2}>h2. Heading</Title>
      <Title level={3}>h3. Heading</Title>
      <Title level={4}>h4. Heading</Title>
      <Title level={5}>h5. Heading</Title>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Text Variants
// ---------------------------------------------------------------------------

export const TextVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <h3 className="mb-4 text-sm font-medium">Text type variants</h3>
      <div className="flex flex-col gap-1">
        <Text>Default text</Text>
        <Text type="secondary">Secondary text</Text>
        <Text type="success">Success text</Text>
        <Text type="warning">Warning text</Text>
        <Text type="danger">Danger text</Text>
        <Text disabled>Disabled text</Text>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Paragraph Copyable
// ---------------------------------------------------------------------------

export const ParagraphCopyable: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Copyable paragraph</h3>
      <Paragraph copyable>
        This is a copyable paragraph. Click the copy icon to copy the text.
      </Paragraph>
      <h3 className="text-sm font-medium">Editable paragraph</h3>
      <Paragraph editable>
        Click the edit icon to modify this text.
      </Paragraph>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Link Component
// ---------------------------------------------------------------------------

export const LinkComponent: Story = {
  render: () => (
    <div className="space-y-2">
      <h3 className="mb-4 text-sm font-medium">Typography.Link</h3>
      <div className="flex flex-col gap-1">
        <Link href="https://example.com" target="_blank">
          External link
        </Link>
        <Link href="/docs">Internal link</Link>
        <Link type="danger" href="/danger">
          Danger link
        </Link>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Decorations
// ---------------------------------------------------------------------------

export const Decorations: Story = {
  render: () => (
    <div className="space-y-2">
      <h3 className="mb-4 text-sm font-medium">Text decorations</h3>
      <div className="flex flex-col gap-1">
        <Text mark>Marked text</Text>
        <Text code>Code text</Text>
        <Text keyboard>Keyboard text</Text>
        <Text underline>Underlined text</Text>
        <Text delete>Deleted text</Text>
        <Text strong>Strong text</Text>
        <Text italic>Italic text</Text>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Ellipsis
// ---------------------------------------------------------------------------

export const Ellipsis: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <h3 className="text-sm font-medium">Single-line ellipsis</h3>
      <Paragraph ellipsis>
        This is a very long paragraph that will be truncated to a single line
        when it overflows the container width.
      </Paragraph>

      <h3 className="text-sm font-medium">Multi-line ellipsis (2 rows, expandable)</h3>
      <Paragraph ellipsis={{ rows: 2, expandable: true }}>
        This is a very long paragraph that will be truncated to two lines when
        it overflows. Users can click the expand button to see the full content
        of this paragraph which contains additional information that might be
        useful for understanding the complete context.
      </Paragraph>
    </div>
  ),
};
