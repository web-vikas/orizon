/**
 * @file Grid Stories
 *
 * Visual test suite for `<Row>` and `<Col>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   BasicGrid         — simple column spans
 *   GutterSpacing     — horizontal and vertical gutters
 *   Offset            — column offset
 *   FlexAlignment     — row align and justify
 *   ResponsiveColumns — breakpoint-based spans
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Row, Col } from "./index";

const meta: Meta<typeof Row> = {
  title: "Components/Grid",
  component: Row,
  parameters: { layout: "padded" },
  argTypes: {
    gutter: { control: "number" },
    align: {
      control: "select",
      options: ["top", "middle", "bottom", "stretch"],
    },
    justify: {
      control: "select",
      options: ["start", "end", "center", "space-around", "space-between", "space-evenly"],
    },
    wrap: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof Row>;

const ColBox = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded bg-primary/15 p-3 text-center text-sm">{children}</div>
);

const ColBoxAlt = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded bg-primary/25 p-3 text-center text-sm">{children}</div>
);

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    gutter: 16,
    align: "top",
    justify: "start",
    wrap: true,
  },
  render: (args) => (
    <Row {...args}>
      <Col span={6}><ColBox>col-6</ColBox></Col>
      <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
      <Col span={6}><ColBox>col-6</ColBox></Col>
      <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
    </Row>
  ),
};

// ---------------------------------------------------------------------------
// BasicGrid — simple column spans
// ---------------------------------------------------------------------------

export const BasicGrid: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Basic Column Spans</h3>
      <Row gutter={8}>
        <Col span={24}><ColBox>col-24</ColBox></Col>
      </Row>
      <Row gutter={8}>
        <Col span={12}><ColBox>col-12</ColBox></Col>
        <Col span={12}><ColBoxAlt>col-12</ColBoxAlt></Col>
      </Row>
      <Row gutter={8}>
        <Col span={8}><ColBox>col-8</ColBox></Col>
        <Col span={8}><ColBoxAlt>col-8</ColBoxAlt></Col>
        <Col span={8}><ColBox>col-8</ColBox></Col>
      </Row>
      <Row gutter={8}>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
        <Col span={6}><ColBox>col-6</ColBox></Col>
        <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
      </Row>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// GutterSpacing — horizontal and vertical gutters
// ---------------------------------------------------------------------------

export const GutterSpacing: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-sm font-medium">Gutter Spacing</h3>
      <div>
        <span className="mb-1 block text-xs text-muted-foreground">Horizontal: 16</span>
        <Row gutter={16}>
          <Col span={6}><ColBox>col-6</ColBox></Col>
          <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
          <Col span={6}><ColBox>col-6</ColBox></Col>
          <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
        </Row>
      </div>
      <div>
        <span className="mb-1 block text-xs text-muted-foreground">H: 16, V: 24</span>
        <Row gutter={[16, 24]}>
          <Col span={6}><ColBox>col-6</ColBox></Col>
          <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
          <Col span={6}><ColBox>col-6</ColBox></Col>
          <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
          <Col span={6}><ColBox>col-6</ColBox></Col>
          <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
          <Col span={6}><ColBox>col-6</ColBox></Col>
          <Col span={6}><ColBoxAlt>col-6</ColBoxAlt></Col>
        </Row>
      </div>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Offset — column offset
// ---------------------------------------------------------------------------

export const Offset: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Column Offset</h3>
      <Row gutter={8}>
        <Col span={8}><ColBox>col-8</ColBox></Col>
        <Col span={8} offset={8}><ColBoxAlt>col-8 offset-8</ColBoxAlt></Col>
      </Row>
      <Row gutter={8}>
        <Col span={6} offset={6}><ColBox>col-6 offset-6</ColBox></Col>
        <Col span={6} offset={6}><ColBoxAlt>col-6 offset-6</ColBoxAlt></Col>
      </Row>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// FlexAlignment — row align and justify
// ---------------------------------------------------------------------------

export const FlexAlignment: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Flex Alignment</h3>
      {(["start", "center", "end", "space-between", "space-around"] as const).map((j) => (
        <div key={j}>
          <span className="mb-1 block text-xs text-muted-foreground">justify: {j}</span>
          <Row gutter={8} justify={j} className="rounded border p-1">
            <Col span={4}><ColBox>col-4</ColBox></Col>
            <Col span={4}><ColBoxAlt>col-4</ColBoxAlt></Col>
            <Col span={4}><ColBox>col-4</ColBox></Col>
          </Row>
        </div>
      ))}
    </div>
  ),
};

// ---------------------------------------------------------------------------
// ResponsiveColumns — breakpoint-based spans
// ---------------------------------------------------------------------------

export const ResponsiveColumns: Story = {
  render: () => (
    <div>
      <h3 className="mb-2 text-sm font-medium">Responsive (resize window)</h3>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ColBox>xs=24 sm=12 md=8 lg=6</ColBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ColBoxAlt>xs=24 sm=12 md=8 lg=6</ColBoxAlt>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ColBox>xs=24 sm=12 md=8 lg=6</ColBox>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ColBoxAlt>xs=24 sm=12 md=8 lg=6</ColBoxAlt>
        </Col>
      </Row>
    </div>
  ),
};
