/**
 * @file Carousel Stories
 *
 * Visual test suite for `<Carousel>`.
 * Stories:
 *   Playground     — interactive controls
 *   Basic          — default scroll effect with dots
 *   FadeEffect     — fade transition between slides
 *   Arrows         — navigation arrow buttons
 *   DotPositions   — top, bottom, left, right
 *   Autoplay       — auto-advancing slides
 */

import type { Meta, StoryObj } from "@storybook/react";
import { Carousel } from "./index";

const meta: Meta<typeof Carousel> = {
  title: "Components/Carousel",
  component: Carousel,
  parameters: { layout: "padded" },
  argTypes: {
    effect: {
      control: "select",
      options: ["scrollx", "fade"],
    },
    dotPosition: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    arrows: { control: "boolean" },
    autoplay: { control: "boolean" },
    infinite: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

const slideStyle =
  "flex h-40 items-center justify-center rounded-lg text-lg font-semibold text-white";

const slides = [
  <div key="1" className={slideStyle} style={{ background: "#364d79" }}>Slide 1</div>,
  <div key="2" className={slideStyle} style={{ background: "#6b4984" }}>Slide 2</div>,
  <div key="3" className={slideStyle} style={{ background: "#2d7d46" }}>Slide 3</div>,
  <div key="4" className={slideStyle} style={{ background: "#c75050" }}>Slide 4</div>,
];

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------
export const Playground: Story = {
  args: {
    effect: "scrollx",
    dotPosition: "bottom",
    arrows: false,
    autoplay: false,
    children: slides,
  },
};

// ---------------------------------------------------------------------------
// Basic — default scroll effect with dots
// ---------------------------------------------------------------------------
export const Basic: Story = {
  name: "Basic",
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Default scroll effect with dots
      </h3>
      <Carousel>{slides}</Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FadeEffect — crossfade transition
// ---------------------------------------------------------------------------
export const FadeEffect: Story = {
  name: "Fade Effect",
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">Fade transition</h3>
      <Carousel effect="fade">{slides}</Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Arrows — navigation arrows visible
// ---------------------------------------------------------------------------
export const Arrows: Story = {
  name: "With Arrows",
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Arrow navigation
      </h3>
      <Carousel arrows>{slides}</Carousel>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// DotPositions — all four positions
// ---------------------------------------------------------------------------
export const DotPositions: Story = {
  name: "Dot Positions",
  render: () => (
    <div className="grid grid-cols-2 gap-6" style={{ maxWidth: 800 }}>
      {(["top", "bottom", "left", "right"] as const).map((pos) => (
        <div key={pos}>
          <h3 className="mb-2 text-sm font-medium text-muted-foreground">
            dotPosition=&quot;{pos}&quot;
          </h3>
          <Carousel dotPosition={pos}>{slides}</Carousel>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Autoplay — auto-advancing with pause on hover
// ---------------------------------------------------------------------------
export const Autoplay: Story = {
  name: "Autoplay",
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Autoplay (hover to pause)
      </h3>
      <Carousel autoplay>{slides}</Carousel>
    </div>
  ),
};
