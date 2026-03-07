/**
 * @file Transfer Stories
 *
 * Visual test suite for `<Transfer>` covering every major prop:
 * - Playground (args)
 * - WithSearch
 * - OneWay
 * - Pagination
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Transfer } from "./index";
import type { TransferItem } from "./types";

const mockData: TransferItem[] = Array.from({ length: 20 }).map((_, i) => ({
  key: `${i}`,
  title: `Item ${i + 1}`,
  description: `Description of item ${i + 1}`,
  disabled: i === 3,
}));

const meta: Meta<typeof Transfer> = {
  title: "Components/Transfer",
  component: Transfer,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Transfer>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    dataSource: mockData,
    targetKeys: ["1", "3", "5"],
    titles: ["Source", "Target"],
  },
};

// ---------------------------------------------------------------------------
// With Search
// ---------------------------------------------------------------------------

export const WithSearch: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Searchable transfer</h3>
      <Transfer
        dataSource={mockData}
        targetKeys={["2", "4"]}
        showSearch
        titles={["Source", "Target"]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// One Way
// ---------------------------------------------------------------------------

export const OneWay: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">One-way transfer (no move-left button)</h3>
      <Transfer
        dataSource={mockData}
        targetKeys={["0", "1"]}
        oneWay
        titles={["Source", "Target"]}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const PaginationStory: Story = {
  name: "Pagination",
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Paginated panels (5 items per page)</h3>
      <Transfer
        dataSource={mockData}
        targetKeys={["10", "11", "12"]}
        pagination={{ pageSize: 5 }}
        titles={["Source", "Target"]}
      />
    </div>
  ),
};
