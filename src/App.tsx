"use client";

import { useState } from "react";
import {
  // General
  Button,
  Typography,

  // Layout
  Space,
  Flex,
  Row,
  Col,
  Divider,

  // Data Entry
  Input,
  Select,
  Checkbox,
  Radio,
  Switch,
  InputNumber,
  Rate,
  Slider,

  // Data Display
  Card,
  Avatar,
  Badge,
  Tag,
  Tooltip,
  Table,
  Collapse,
  Tabs,
  Empty,
  Statistic,
  Timeline,
  Segmented,

  // Feedback
  Alert,
  Progress,
  Spin,
  Skeleton,
  Result,
  Modal,
  Drawer,
  message,
  notification,

  // Config
  ConfigProvider,
} from "./index";

const { Title, Text, Paragraph } = Typography;

// ─── Table Data ──────────────────────────────────────────────────
const tableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a: { name: string }, b: { name: string }) =>
      a.name.localeCompare(b.name),
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
    sorter: (a: { age: number }, b: { age: number }) => a.age - b.age,
  },
  { title: "Email", dataIndex: "email", key: "email" },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (val: string) => (
      <Tag
        color={
          val === "active" ? "green" : val === "pending" ? "orange" : "red"
        }
      >
        {val.toUpperCase()}
      </Tag>
    ),
  },
];

const tableData = [
  {
    key: "1",
    name: "Alice Johnson",
    age: 28,
    email: "alice@example.com",
    status: "active",
  },
  {
    key: "2",
    name: "Bob Smith",
    age: 34,
    email: "bob@example.com",
    status: "pending",
  },
  {
    key: "3",
    name: "Charlie Brown",
    age: 22,
    email: "charlie@example.com",
    status: "inactive",
  },
  {
    key: "4",
    name: "Diana Ross",
    age: 45,
    email: "diana@example.com",
    status: "active",
  },
  {
    key: "5",
    name: "Edward Norton",
    age: 31,
    email: "edward@example.com",
    status: "active",
  },
];

// ─── Collapse Items ──────────────────────────────────────────────
const collapseItems = [
  {
    key: "1",
    label: "What is Orizon?",
    children: (
      <p>
        Orizon is a component library that provides Ant Design&apos;s API built
        on top of shadcn/ui primitives. Best of both worlds.
      </p>
    ),
  },
  {
    key: "2",
    label: "How do I install it?",
    children: (
      <p>
        Install via npm:{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
          npm install orizon
        </code>
      </p>
    ),
  },
  {
    key: "3",
    label: "Does it work with Next.js?",
    children: (
      <p>
        Yes! All components include &quot;use client&quot; directives and work
        seamlessly with Next.js App Router and any React application.
      </p>
    ),
  },
];

// ─── Tab Items ──────────────────────────────────────────────────
const tabItems = [
  {
    key: "overview",
    label: "Overview",
    children: (
      <p className="py-4">
        This is the overview tab. Orizon supports all 70+ Ant Design components.
      </p>
    ),
  },
  {
    key: "docs",
    label: "Documentation",
    children: (
      <p className="py-4">
        Comprehensive documentation with code examples for every component.
      </p>
    ),
  },
  {
    key: "api",
    label: "API Reference",
    children: (
      <p className="py-4">
        Full TypeScript API reference with all props, types, and configurations.
      </p>
    ),
  },
];

// ─── Timeline Items ─────────────────────────────────────────────
const timelineItems = [
  {
    color: "green" as const,
    children: "Project initialized with Vite + React + TypeScript",
  },
  {
    color: "green" as const,
    children: "Core components built (Button, Input, Form, Table...)",
  },
  {
    color: "blue" as const,
    children: "Advanced components added (DatePicker, Upload, TreeSelect...)",
  },
  { children: "Documentation & testing in progress" },
];

// ─── App Component ──────────────────────────────────────────────

export default function App() {
  const [inputVal, setInputVal] = useState("");
  const [selectVal, setSelectVal] = useState<string>();
  const [checkVal, setCheckVal] = useState(false);
  const [radioVal, setRadioVal] = useState("a");
  const [switchVal, setSwitchVal] = useState(true);
  const [numVal, setNumVal] = useState<number | null>(3);
  const [rateVal, setRateVal] = useState(3.5);
  const [sliderVal, setSliderVal] = useState(40);
  const [segmentVal, setSegmentVal] = useState<string | number>("daily");
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(false);

  return (
    <ConfigProvider theme={darkMode ? { algorithm: "dark" } : undefined}>
      <div
        className={`min-h-screen bg-background text-foreground transition-colors ${darkMode ? "dark" : ""}`}
      >
        {/* ── Header ────────────────────────────────────── */}
        <div className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
            <Flex align="center" gap={12}>
              <Title level={4} style={{ margin: 0 }}>
                Orizon
              </Title>
              <Tag color="blue">v0.1.0</Tag>
            </Flex>
            <Space>
              <Text type="secondary">Dark Mode</Text>
              <Switch checked={darkMode} onChange={setDarkMode} />
            </Space>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-10 px-6 py-8">
          {/* ── Hero Section ─────────────────────────────── */}
          <div className="text-center">
            <Title>Orizon Component Library</Title>
            <Paragraph
              type="secondary"
              style={{ fontSize: 16, maxWidth: 600, margin: "0 auto" }}
            >
              Ant Design&apos;s beloved API, powered by shadcn/ui primitives.
              Build beautiful, accessible React apps with the best DX.
            </Paragraph>
            <Space style={{ marginTop: 16 }}>
              <Button type="primary" size="large">
                Get Started
              </Button>
              <Button size="large">View on GitHub</Button>
            </Space>
          </div>

          <Divider />

          {/* ── Section: Buttons ──────────────────────────── */}
          <section>
            <Title level={3}>Buttons</Title>
            <Space wrap>
              <Button type="primary">Primary</Button>
              <Button>Default</Button>
              <Button type="dashed">Dashed</Button>
              <Button type="text">Text</Button>
              <Button type="link">Link</Button>
              <Button type="primary" danger>
                Danger
              </Button>
              <Button type="primary" loading>
                Loading
              </Button>
              <Button disabled>Disabled</Button>
            </Space>

            <div className="mt-4">
              <Text type="secondary">Sizes:</Text>
              <Space style={{ marginLeft: 8 }}>
                <Button type="primary" size="small">
                  Small
                </Button>
                <Button type="primary">Default</Button>
                <Button type="primary" size="large">
                  Large
                </Button>
              </Space>
            </div>
          </section>

          <Divider />

          {/* ── Section: Data Entry ──────────────────────── */}
          <section>
            <Title level={3}>Data Entry</Title>
            <Row gutter={[24, 24]}>
              <Col span={12}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong>Input</Text>
                  <Input
                    placeholder="Type something..."
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    allowClear
                  />
                  <Input.Password placeholder="Password" />
                  <Input.Search placeholder="Search..." />
                  <Input.TextArea
                    placeholder="TextArea"
                    rows={3}
                    showCount
                    maxLength={200}
                  />
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Text strong>Select</Text>
                  <Select
                    placeholder="Select a fruit"
                    value={selectVal}
                    onChange={(val) => setSelectVal(val as string)}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "cherry", label: "Cherry" },
                      { value: "grape", label: "Grape" },
                    ]}
                    allowClear
                    style={{ width: "100%" }}
                  />

                  <Text strong>InputNumber</Text>
                  <InputNumber
                    min={0}
                    max={100}
                    value={numVal}
                    onChange={(val) => setNumVal(val)}
                    style={{ width: "100%" }}
                  />

                  <Text strong>Rate</Text>
                  <Rate allowHalf value={rateVal} onChange={setRateVal} />
                </Space>
              </Col>
            </Row>

            <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
              <Col span={12}>
                <Space direction="vertical">
                  <Text strong>Checkbox</Text>
                  <Checkbox
                    checked={checkVal}
                    onChange={(e) => setCheckVal(e.target.checked)}
                  >
                    I agree to the terms
                  </Checkbox>
                  <Checkbox.Group
                    options={[
                      { label: "React", value: "react" },
                      { label: "Vue", value: "vue" },
                      { label: "Angular", value: "angular" },
                    ]}
                    defaultValue={["react"]}
                  />
                </Space>
              </Col>
              <Col span={12}>
                <Space direction="vertical">
                  <Text strong>Radio</Text>
                  <Radio.Group
                    value={radioVal}
                    onChange={(e) => setRadioVal(e.target.value)}
                  >
                    <Radio value="a">Option A</Radio>
                    <Radio value="b">Option B</Radio>
                    <Radio value="c">Option C</Radio>
                  </Radio.Group>

                  <Text strong>Switch</Text>
                  <Space>
                    <Switch checked={switchVal} onChange={setSwitchVal} />
                    <Text>{switchVal ? "ON" : "OFF"}</Text>
                  </Space>
                </Space>
              </Col>
            </Row>

            <div className="mt-6">
              <Text strong>Slider</Text>
              <Slider
                value={sliderVal}
                onChange={(v) => setSliderVal(v as number)}
              />
            </div>
          </section>

          <Divider />

          {/* ── Section: Data Display ────────────────────── */}
          <section>
            <Title level={3}>Data Display</Title>

            {/* Cards */}
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card
                  title="Users"
                  extra={
                    <Button type="link" size="small">
                      View All
                    </Button>
                  }
                >
                  <Statistic title="Total Users" value={12847} />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  title="Revenue"
                  extra={<Tag color="green">+12%</Tag>}
                >
                  <Statistic
                    title="Monthly Revenue"
                    value={94520}
                    prefix="$"
                    precision={2}
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Team">
                  <Space>
                    <Avatar style={{ backgroundColor: "#1677ff" }}>A</Avatar>
                    <Avatar style={{ backgroundColor: "#87d068" }}>B</Avatar>
                    <Avatar style={{ backgroundColor: "#f56a00" }}>C</Avatar>
                    <Avatar>+5</Avatar>
                  </Space>
                </Card>
              </Col>
            </Row>

            {/* Table */}
            <div className="mt-6">
              <Text strong>Table</Text>
              <Table
                columns={tableColumns}
                dataSource={tableData}
                size="middle"
                pagination={{
                  pageSize: 5,
                  showTotal: (total) => `Total ${total} items`,
                }}
                style={{ marginTop: 8 }}
              />
            </div>

            {/* Badges & Tags */}
            <div className="mt-6">
              <Text strong>Badges & Tags</Text>
              <div className="mt-2">
                <Space size={24}>
                  <Badge count={5}>
                    <Avatar shape="square" size="large">
                      U
                    </Avatar>
                  </Badge>
                  <Badge count={0} showZero>
                    <Avatar shape="square" size="large">
                      Z
                    </Avatar>
                  </Badge>
                  <Badge dot>
                    <Avatar shape="square" size="large">
                      D
                    </Avatar>
                  </Badge>
                  <Badge count={99} overflowCount={10}>
                    <Avatar shape="square" size="large">
                      O
                    </Avatar>
                  </Badge>
                </Space>
              </div>
              <div className="mt-4">
                <Space wrap>
                  <Tag>Default</Tag>
                  <Tag color="blue">Blue</Tag>
                  <Tag color="green">Green</Tag>
                  <Tag color="red">Red</Tag>
                  <Tag color="orange">Orange</Tag>
                  <Tag color="purple">Purple</Tag>
                  <Tag
                    closable
                    onClose={() => message.info("Tag closed!")}
                  >
                    Closable
                  </Tag>
                </Space>
              </div>
            </div>

            {/* Tooltips */}
            <div className="mt-6">
              <Text strong>Tooltips</Text>
              <div className="mt-2">
                <Space>
                  <Tooltip title="Top tooltip">
                    <Button>Hover me (top)</Button>
                  </Tooltip>
                  <Tooltip title="Right tooltip" placement="right">
                    <Button>Hover me (right)</Button>
                  </Tooltip>
                  <Tooltip title="Custom color" color="#2db7f5">
                    <Button type="primary">Custom color</Button>
                  </Tooltip>
                </Space>
              </div>
            </div>

            {/* Segmented */}
            <div className="mt-6">
              <Text strong>Segmented</Text>
              <div className="mt-2">
                <Segmented
                  options={[
                    { label: "Daily", value: "daily" },
                    { label: "Weekly", value: "weekly" },
                    { label: "Monthly", value: "monthly" },
                  ]}
                  value={segmentVal}
                  onChange={setSegmentVal}
                />
              </div>
            </div>
          </section>

          <Divider />

          {/* ── Section: Tabs & Collapse ──────────────────── */}
          <section>
            <Title level={3}>Tabs & Collapse</Title>
            <Tabs items={tabItems} />
            <div className="mt-6">
              <Collapse items={collapseItems} defaultActiveKey={["1"]} />
            </div>
          </section>

          <Divider />

          {/* ── Section: Feedback ─────────────────────────── */}
          <section>
            <Title level={3}>Feedback</Title>

            {/* Alerts */}
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert
                message="Success! Your changes have been saved."
                type="success"
                showIcon
                closable
              />
              <Alert
                message="Heads up"
                description="This is an informational alert with a description."
                type="info"
                showIcon
              />
              <Alert message="Warning: Low disk space" type="warning" showIcon />
              <Alert
                message="Error: Connection failed"
                type="error"
                showIcon
              />
            </Space>

            {/* Progress */}
            <div className="mt-6">
              <Text strong>Progress</Text>
              <div className="mt-2">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Progress percent={75} />
                  <Progress percent={50} status="active" />
                  <Progress percent={100} />
                  <Progress percent={30} status="exception" />
                  <Space>
                    <Progress type="circle" percent={75} size={80} />
                    <Progress type="circle" percent={100} size={80} />
                    <Progress
                      type="circle"
                      percent={30}
                      status="exception"
                      size={80}
                    />
                  </Space>
                </Space>
              </div>
            </div>

            {/* Spin & Skeleton */}
            <div className="mt-6">
              <Text strong>Spin & Skeleton</Text>
              <div className="mt-2">
                <Space>
                  <Button onClick={() => setShowSkeleton(!showSkeleton)}>
                    Toggle Skeleton
                  </Button>
                  <Spin size="small" />
                  <Spin />
                  <Spin size="large" />
                </Space>
                {showSkeleton && (
                  <div className="mt-4">
                    <Skeleton
                      active
                      avatar
                      paragraph={{ rows: 3 }}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal & Drawer */}
            <div className="mt-6">
              <Text strong>Modal & Drawer</Text>
              <div className="mt-2">
                <Space wrap>
                  <Button
                    type="primary"
                    onClick={() => setModalOpen(true)}
                  >
                    Open Modal
                  </Button>
                  <Button onClick={() => setDrawerOpen(true)}>
                    Open Drawer
                  </Button>
                  <Button
                    onClick={() =>
                      message.success("This is a success message!")
                    }
                  >
                    Show Message
                  </Button>
                  <Button
                    onClick={() =>
                      notification.open({
                        message: "Notification Title",
                        description:
                          "This is a notification from Orizon.",
                        type: "info",
                      })
                    }
                  >
                    Show Notification
                  </Button>
                  <Button
                    danger
                    onClick={() =>
                      Modal.confirm({
                        title: "Are you sure?",
                        content: "This action cannot be undone.",
                        onOk: () => message.success("Confirmed!"),
                      })
                    }
                  >
                    Confirm Dialog
                  </Button>
                </Space>
              </div>
            </div>

            <Modal
              open={modalOpen}
              title="Orizon Modal"
              onOk={() => {
                message.success("OK clicked!");
                setModalOpen(false);
              }}
              onCancel={() => setModalOpen(false)}
            >
              <p>
                This is a modal built with Orizon. It wraps @base-ui/react
                Dialog with an antd-compatible API.
              </p>
              <p>
                You get <Text strong>footer buttons</Text>,{" "}
                <Text strong>loading states</Text>, and{" "}
                <Text strong>static methods</Text> out of the box.
              </p>
            </Modal>

            <Drawer
              open={drawerOpen}
              title="Orizon Drawer"
              onClose={() => setDrawerOpen(false)}
              placement="right"
            >
              <p>
                This is a drawer panel. Perfect for settings, filters, or
                detail views.
              </p>
              <Divider />
              <Space direction="vertical" style={{ width: "100%" }}>
                <Input placeholder="Search..." />
                <Checkbox>Remember my preferences</Checkbox>
                <Button type="primary" block>
                  Apply
                </Button>
              </Space>
            </Drawer>
          </section>

          <Divider />

          {/* ── Section: Timeline ──────────────────────────── */}
          <section>
            <Title level={3}>Timeline</Title>
            <Timeline items={timelineItems} />
          </section>

          <Divider />

          {/* ── Section: Empty & Result ────────────────────── */}
          <section>
            <Title level={3}>Empty & Result</Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card>
                  <Empty description="No data yet" />
                </Card>
              </Col>
              <Col span={12}>
                <Card>
                  <Result
                    status="success"
                    title="Successfully Purchased!"
                    subTitle="Order #2017182818 has been confirmed."
                    extra={[
                      <Button type="primary" key="console">
                        Go Console
                      </Button>,
                      <Button key="buy">Buy Again</Button>,
                    ]}
                  />
                </Card>
              </Col>
            </Row>
          </section>

          {/* ── Footer ──────────────────────────────────────── */}
          <Divider />
          <div className="py-8 text-center">
            <Text type="secondary">
              Orizon v0.1.0 — Ant Design API on shadcn/ui primitives — 68
              components
            </Text>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
