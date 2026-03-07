/**
 * @file Table Stories
 *
 * Visual test suite for `<Table>` covering every major prop:
 * - Playground (args)
 * - Sorting
 * - Pagination
 * - RowSelection
 * - Bordered
 * - Expandable
 * - Loading
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Table } from "./index";
import type { ColumnType } from "./types";

interface DataRecord {
  key: string;
  name: string;
  age: number;
  address: string;
}

const sampleData: DataRecord[] = [
  { key: "1", name: "John Brown", age: 32, address: "New York" },
  { key: "2", name: "Jane Smith", age: 28, address: "London" },
  { key: "3", name: "Sam Green", age: 45, address: "Sydney" },
  { key: "4", name: "Lisa White", age: 36, address: "Toronto" },
  { key: "5", name: "Tom Black", age: 22, address: "Berlin" },
  { key: "6", name: "Amy Clark", age: 31, address: "Paris" },
];

const columns: ColumnType<DataRecord>[] = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Age", dataIndex: "age", key: "age" },
  { title: "Address", dataIndex: "address", key: "address" },
];

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof Table>;

// ---------------------------------------------------------------------------
// Playground
// ---------------------------------------------------------------------------

export const Playground: Story = {
  args: {
    columns,
    dataSource: sampleData,
  },
};

// ---------------------------------------------------------------------------
// Sorting
// ---------------------------------------------------------------------------

export const Sorting: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Click column headers to sort</h3>
      <Table
        columns={[
          { title: "Name", dataIndex: "name", key: "name", sorter: true },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
            sorter: (a: DataRecord, b: DataRecord) => a.age - b.age,
            defaultSortOrder: "ascend",
          },
          { title: "Address", dataIndex: "address", key: "address" },
        ]}
        dataSource={sampleData}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const Pagination: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Pagination with 2 items per page</h3>
      <Table
        columns={columns}
        dataSource={sampleData}
        pagination={{
          pageSize: 2,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Row Selection
// ---------------------------------------------------------------------------

export const RowSelection: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Checkbox row selection</h3>
      <Table
        columns={columns}
        dataSource={sampleData}
        rowSelection={{
          type: "checkbox",
          onChange: (keys, rows) =>
            console.log("Selected:", keys, rows),
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Bordered
// ---------------------------------------------------------------------------

export const Bordered: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Bordered table</h3>
      <Table columns={columns} dataSource={sampleData} bordered />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Expandable
// ---------------------------------------------------------------------------

export const Expandable: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Expandable rows</h3>
      <Table
        columns={columns}
        dataSource={sampleData}
        expandable={{
          expandedRowRender: (record: DataRecord) => (
            <p>{record.name} lives in {record.address} and is {record.age} years old.</p>
          ),
        }}
      />
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Loading
// ---------------------------------------------------------------------------

export const LoadingState: Story = {
  render: () => (
    <div>
      <h3 className="mb-4 text-sm font-medium">Loading state</h3>
      <Table columns={columns} dataSource={sampleData} loading />
    </div>
  ),
};
