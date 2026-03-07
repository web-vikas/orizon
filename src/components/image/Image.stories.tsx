/**
 * @file Image Stories
 *
 * Visual test suite for `<Image>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   BasicImage        — default image with preview
 *   NoPreview         — preview disabled
 *   Fallback          — fallback image on error
 *   Placeholder       — placeholder while loading
 *   PreviewGroup      — gallery with navigation
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Image } from "./index";

const SAMPLE_SRC = "https://picsum.photos/seed/orizon1/300/200";
const SAMPLE_SRC_2 = "https://picsum.photos/seed/orizon2/300/200";
const SAMPLE_SRC_3 = "https://picsum.photos/seed/orizon3/300/200";
const BROKEN_SRC = "https://example.com/nonexistent.jpg";
const FALLBACK_SRC = "https://picsum.photos/seed/fallback/300/200";

const meta: Meta<typeof Image> = {
  title: "Components/Image",
  component: Image,
  parameters: { layout: "padded" },
  argTypes: {
    src: { control: "text" },
    width: { control: "number" },
    height: { control: "number" },
    preview: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Image>;

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    src: SAMPLE_SRC,
    width: 200,
    preview: true,
    alt: "Sample image",
  },
};

// ---------------------------------------------------------------------------
// BasicImage — default image with preview
// ---------------------------------------------------------------------------

export const BasicImage: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Click to Preview</h3>
      <Image src={SAMPLE_SRC} width={200} alt="Clickable preview" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// NoPreview — preview disabled
// ---------------------------------------------------------------------------

export const NoPreview: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Preview Disabled</h3>
      <Image src={SAMPLE_SRC} width={200} preview={false} alt="No preview" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Fallback — fallback image on error
// ---------------------------------------------------------------------------

export const Fallback: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Fallback on Error</h3>
      <Image src={BROKEN_SRC} fallback={FALLBACK_SRC} width={200} alt="Fallback" />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Placeholder — placeholder while loading
// ---------------------------------------------------------------------------

export const Placeholder: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Placeholder while Loading</h3>
      <Image
        src={SAMPLE_SRC + "?delay=3000"}
        width={200}
        height={133}
        placeholder
        alt="With placeholder"
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// PreviewGroup — gallery with navigation
// ---------------------------------------------------------------------------

export const PreviewGroup: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Preview Group Gallery</h3>
      <Image.PreviewGroup items={[SAMPLE_SRC, SAMPLE_SRC_2, SAMPLE_SRC_3]}>
        <Image src={SAMPLE_SRC} width={120} alt="Image 1" />
        <Image src={SAMPLE_SRC_2} width={120} alt="Image 2" />
        <Image src={SAMPLE_SRC_3} width={120} alt="Image 3" />
      </Image.PreviewGroup>
    </div>
  ),
};
