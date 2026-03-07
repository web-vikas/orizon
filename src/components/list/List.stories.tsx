/**
 * @file List Stories
 *
 * Visual test suite for `<List>` covering every prop.
 * Stories:
 *   Playground        — interactive controls
 *   BasicList         — simple data list
 *   Bordered          — bordered list
 *   WithMeta          — List.Item.Meta with avatar/title/description
 *   WithActions       — list items with action buttons
 *   Loading           — loading skeleton
 *   Pagination        — paginated list
 *   GridLayout        — grid column layout
 */
import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./index";

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  parameters: { layout: "padded" },
  argTypes: {
    bordered: { control: "boolean" },
    loading: { control: "boolean" },
    size: { control: "radio", options: ["default", "small", "large"] },
    split: { control: "boolean" },
  },
};
export default meta;
type Story = StoryObj<typeof List>;

const sampleData = [
  "Racing car sprance up on Erin",
  "Japanese princess to wed commoner",
  "Australian walks 100km in outback",
  "Man charged over missing girl",
  "Los Angeles battles water shortage",
];

// ---------------------------------------------------------------------------
// Playground — interactive controls
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    bordered: true,
    loading: false,
    size: "default",
    split: true,
    dataSource: sampleData,
  },
  render: (args) => (
    <List
      {...args}
      header={<div className="font-medium">Header</div>}
      footer={<div className="text-muted-foreground">Footer</div>}
      renderItem={(item) => <List.Item>{item as string}</List.Item>}
    />
  ),
};

// ---------------------------------------------------------------------------
// BasicList — simple data list
// ---------------------------------------------------------------------------

export const BasicList: Story = {
  render: () => (
    <div className="max-w-lg">
      <h3 className="mb-2 text-sm font-medium">Basic List</h3>
      <List
        dataSource={sampleData}
        renderItem={(item) => <List.Item>{item as string}</List.Item>}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Bordered — bordered list
// ---------------------------------------------------------------------------

export const Bordered: Story = {
  render: () => (
    <div className="max-w-lg">
      <h3 className="mb-2 text-sm font-medium">Bordered List</h3>
      <List
        bordered
        header={<div className="font-medium">Headline</div>}
        footer={<div className="text-sm text-muted-foreground">End of list</div>}
        dataSource={sampleData}
        renderItem={(item) => <List.Item>{item as string}</List.Item>}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// WithMeta — List.Item.Meta with avatar/title/description
// ---------------------------------------------------------------------------

export const WithMeta: Story = {
  render: () => {
    const data = [
      { title: "Alice", desc: "Software Engineer" },
      { title: "Bob", desc: "Designer" },
      { title: "Charlie", desc: "Product Manager" },
    ];
    return (
      <div className="max-w-lg">
        <h3 className="mb-2 text-sm font-medium">List.Item.Meta</h3>
        <List
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/15 text-sm font-medium">
                    {(item as { title: string }).title[0]}
                  </div>
                }
                title={(item as { title: string }).title}
                description={(item as { desc: string }).desc}
              />
            </List.Item>
          )}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// WithActions — list items with action buttons
// ---------------------------------------------------------------------------

export const WithActions: Story = {
  render: () => (
    <div className="max-w-lg">
      <h3 className="mb-2 text-sm font-medium">Items with Actions</h3>
      <List
        bordered
        dataSource={sampleData.slice(0, 3)}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="edit" className="text-sm text-primary cursor-pointer">edit</a>,
              <a key="more" className="text-sm text-primary cursor-pointer">more</a>,
            ]}
          >
            {item as string}
          </List.Item>
        )}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading — loading skeleton
// ---------------------------------------------------------------------------

export const Loading: Story = {
  render: () => (
    <div className="max-w-lg">
      <h3 className="mb-2 text-sm font-medium">Loading State</h3>
      <List bordered loading dataSource={[]} renderItem={() => null} />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Pagination — paginated list
// ---------------------------------------------------------------------------

export const Pagination: Story = {
  render: () => {
    const bigData = Array.from({ length: 25 }, (_, i) => `Item ${i + 1}`);
    return (
      <div className="max-w-lg">
        <h3 className="mb-2 text-sm font-medium">Pagination</h3>
        <List
          bordered
          dataSource={bigData}
          renderItem={(item) => <List.Item>{item as string}</List.Item>}
          pagination={{ pageSize: 5 }}
        />
      </div>
    );
  },
};

// ---------------------------------------------------------------------------
// GridLayout — grid column layout
// ---------------------------------------------------------------------------

export const GridLayout: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h3 className="mb-2 text-sm font-medium">Grid Layout (3 columns)</h3>
      <List
        grid={{ column: 3, gutter: 16 }}
        dataSource={sampleData}
        renderItem={(item) => (
          <div className="rounded border p-4 text-sm">{item as string}</div>
        )}
      />
    </div>
  ),
};
