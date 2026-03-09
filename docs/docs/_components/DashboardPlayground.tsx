import "./preview.css";
import { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Button,
  Card,
  Badge,
  Tag,
  Avatar,
  Switch,
  Progress,
  Rate,
  Tabs,
  Alert,
  Input,
  Select,
  Checkbox,
  Radio,
  Slider,
  Tooltip,
  Divider,
  Steps,
  Typography,
  Space,
  Statistic,
  Timeline,
  Breadcrumb,
  Table,
  Descriptions,
  Empty,
  Skeleton,
  Spin,
  Segmented,
  Flex,
  InputNumber,
  DatePicker,
  TimePicker,
  ColorPicker,
  Dropdown,
  List,
} from "orizon";
import {
  Home,
  Users,
  Settings,
  BarChart3,
  Bell,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Mail,
  Eye,
  Edit,
  Download,
  // XCircle removed — factory error in rspack
  LogOut,
  Layers,
  Package,
  CreditCard,
  UserPlus,
} from "lucide-react";

const { Header, Sider, Content } = Layout;
const { Title, Text, Paragraph } = Typography;

// ─── Overview Page ──────────────────────────────────────────────────────────
function OverviewPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Stats Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
        }}
      >
        <Card size="small" hoverable>
          <Statistic
            title="Total Revenue"
            value={45231.89}
            precision={2}
            prefix={<DollarSign size={16} />}
            suffix={
              <Text
                style={{ fontSize: 12, color: "var(--color-success)" }}
              >
                <ArrowUpRight size={12} /> 12.5%
              </Text>
            }
          />
        </Card>
        <Card size="small" hoverable>
          <Statistic
            title="Active Users"
            value={2845}
            prefix={<Users size={16} />}
            suffix={
              <Text
                style={{ fontSize: 12, color: "var(--color-success)" }}
              >
                <ArrowUpRight size={12} /> 8.2%
              </Text>
            }
          />
        </Card>
        <Card size="small" hoverable>
          <Statistic
            title="Orders"
            value={1423}
            prefix={<ShoppingCart size={16} />}
            suffix={
              <Text style={{ fontSize: 12, color: "var(--color-error)" }}>
                <ArrowDownRight size={12} /> 3.1%
              </Text>
            }
          />
        </Card>
        <Card size="small" hoverable>
          <Statistic
            title="Conversion"
            value={4.3}
            precision={1}
            suffix="%"
            prefix={<TrendingUp size={16} />}
          />
        </Card>
      </div>

      {/* Charts + Activity Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <Card title="Revenue Overview" size="small">
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <Segmented
              options={["7 Days", "30 Days", "90 Days", "1 Year"]}
              defaultValue="30 Days"
            />
          </div>
          {/* Simulated chart bars */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: 6,
              height: 150,
              padding: "0 8px",
            }}
          >
            {[65, 45, 75, 55, 80, 70, 90, 60, 85, 50, 70, 95].map(
              (h, i) => (
                <Tooltip key={i} title={`$${(h * 45).toLocaleString()}`}>
                  <div
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      background:
                        i === 11
                          ? "var(--color-primary)"
                          : "var(--color-primary-bg)",
                      borderRadius: 4,
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  />
                </Tooltip>
              )
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8,
              padding: "0 8px",
            }}
          >
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(
              (m) => (
                <Text
                  key={m}
                  type="secondary"
                  style={{ fontSize: 11 }}
                >
                  {m}
                </Text>
              )
            )}
          </div>
        </Card>

        <Card title="Recent Activity" size="small">
          <Timeline
            items={[
              {
                color: "green",
                children: (
                  <div>
                    <Text strong>Payment received</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      $299 from Sarah Chen
                    </Text>
                  </div>
                ),
              },
              {
                color: "blue",
                children: (
                  <div>
                    <Text strong>New user signup</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      Emily Davis joined
                    </Text>
                  </div>
                ),
              },
              {
                color: "orange",
                children: (
                  <div>
                    <Text strong>Storage warning</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      89% capacity reached
                    </Text>
                  </div>
                ),
              },
              {
                color: "green",
                children: (
                  <div>
                    <Text strong>Deploy successful</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      v2.4.0 is now live
                    </Text>
                  </div>
                ),
              },
              {
                color: "red",
                children: (
                  <div>
                    <Text strong>API error spike</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      429 rate limit errors
                    </Text>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>

      {/* Progress + Team Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Project Status" size="small">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text>Frontend Redesign</Text>
                <Text type="secondary">73%</Text>
              </div>
              <Progress percent={73} status="active" showInfo={false} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text>API Migration</Text>
                <Text type="secondary">100%</Text>
              </div>
              <Progress percent={100} showInfo={false} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text>Database Optimization</Text>
                <Text type="secondary">45%</Text>
              </div>
              <Progress percent={45} status="exception" showInfo={false} />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 4,
                }}
              >
                <Text>Mobile App</Text>
                <Text type="secondary">28%</Text>
              </div>
              <Progress percent={28} showInfo={false} />
            </div>
          </div>
        </Card>
        <Card title="Team" size="small">
          <List
            size="small"
            dataSource={[
              { name: "Sarah Chen", role: "Lead Designer", color: "#f56a00", status: "online" },
              { name: "Mike Johnson", role: "Backend Dev", color: "#7265e6", status: "online" },
              { name: "Emily Davis", role: "Frontend Dev", color: "#ffbf00", status: "away" },
              { name: "Alex Morgan", role: "DevOps", color: "#00a2ae", status: "offline" },
            ]}
            renderItem={(item: any) => (
              <List.Item
                actions={[
                  <Button type="text" size="small" icon={<Mail size={14} />} key="mail" />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Badge
                      dot
                      status={
                        item.status === "online"
                          ? "success"
                          : item.status === "away"
                            ? "warning"
                            : "default"
                      }
                    >
                      <Avatar style={{ backgroundColor: item.color }}>
                        {item.name[0]}
                      </Avatar>
                    </Badge>
                  }
                  title={item.name}
                  description={item.role}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}

// ─── Users Page ─────────────────────────────────────────────────────────────
function UsersPage() {
  const dataSource = [
    {
      key: "1",
      id: "USR-001",
      name: "Sarah Chen",
      email: "sarah@example.com",
      role: "Admin",
      plan: "Enterprise",
      status: "Active",
      lastActive: "2 min ago",
    },
    {
      key: "2",
      id: "USR-002",
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "Editor",
      plan: "Pro",
      status: "Active",
      lastActive: "1 hour ago",
    },
    {
      key: "3",
      id: "USR-003",
      name: "Emily Davis",
      email: "emily@example.com",
      role: "Viewer",
      plan: "Basic",
      status: "Inactive",
      lastActive: "3 days ago",
    },
    {
      key: "4",
      id: "USR-004",
      name: "Alex Morgan",
      email: "alex@example.com",
      role: "Editor",
      plan: "Pro",
      status: "Active",
      lastActive: "5 min ago",
    },
    {
      key: "5",
      id: "USR-005",
      name: "Lisa Park",
      email: "lisa@example.com",
      role: "Admin",
      plan: "Enterprise",
      status: "Active",
      lastActive: "Just now",
    },
    {
      key: "6",
      id: "USR-006",
      name: "James Wilson",
      email: "james@example.com",
      role: "Viewer",
      plan: "Basic",
      status: "Pending",
      lastActive: "Never",
    },
  ];

  const columns = [
    {
      title: "User",
      key: "user",
      render: (_: any, record: any) => (
        <Space>
          <Avatar
            size="small"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            {record.name[0]}
          </Avatar>
          <div>
            <Text strong style={{ display: "block", lineHeight: 1.3 }}>
              {record.name}
            </Text>
            <Text type="secondary" style={{ fontSize: 12 }}>
              {record.email}
            </Text>
          </div>
        </Space>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => {
        const colors: Record<string, string> = {
          Admin: "red",
          Editor: "blue",
          Viewer: "default",
        };
        return <Tag color={colors[role]}>{role}</Tag>;
      },
    },
    {
      title: "Plan",
      dataIndex: "plan",
      key: "plan",
      render: (plan: string) => {
        const colors: Record<string, string> = {
          Enterprise: "purple",
          Pro: "cyan",
          Basic: "default",
        };
        return <Tag color={colors[plan]}>{plan}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const colors: Record<string, string> = {
          Active: "success",
          Inactive: "default",
          Pending: "warning",
        };
        return <Badge status={colors[status] as any} text={status} />;
      },
    },
    {
      title: "Last Active",
      dataIndex: "lastActive",
      key: "lastActive",
      render: (text: string) => (
        <Text type="secondary" style={{ fontSize: 13 }}>
          {text}
        </Text>
      ),
    },
    {
      title: "",
      key: "actions",
      render: () => (
        <Space>
          <Tooltip title="View">
            <Button type="text" size="small" icon={<Eye size={14} />} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<Edit size={14} />} />
          </Tooltip>
          <Tooltip title="Delete">
            <Button type="text" size="small" danger>Del</Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Space>
          <Input
            prefix={<Search size={16} />}
            placeholder="Search users..."
            style={{ width: 250 }}
          />
          <Select
            defaultValue="all"
            style={{ width: 130 }}
            options={[
              { value: "all", label: "All Roles" },
              { value: "admin", label: "Admin" },
              { value: "editor", label: "Editor" },
              { value: "viewer", label: "Viewer" },
            ]}
          />
          <Select
            defaultValue="all"
            style={{ width: 140 }}
            options={[
              { value: "all", label: "All Status" },
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </Space>
        <Space>
          <Button icon={<Download size={14} />}>Export</Button>
          <Button type="primary" icon={<UserPlus size={14} />}>
            Add User
          </Button>
        </Space>
      </div>
      <Table
        dataSource={dataSource}
        columns={columns}
        size="middle"
        pagination={{ pageSize: 5, showSizeChanger: true, showTotal: (total: number) => `${total} users` }}
      />
    </div>
  );
}

// ─── Orders Page ────────────────────────────────────────────────────────────
function OrdersPage() {
  const orders = [
    { key: "1", id: "ORD-7291", customer: "Sarah Chen", product: "Pro Plan", amount: "$299.00", status: "Completed", date: "Mar 8, 2026", method: "Visa •••• 4242" },
    { key: "2", id: "ORD-7290", customer: "Mike Johnson", product: "Team Plan", amount: "$599.00", status: "Pending", date: "Mar 7, 2026", method: "Mastercard •••• 5555" },
    { key: "3", id: "ORD-7289", customer: "Emily Davis", product: "Basic Plan", amount: "$99.00", status: "Completed", date: "Mar 7, 2026", method: "PayPal" },
    { key: "4", id: "ORD-7288", customer: "Alex Morgan", product: "Pro Plan", amount: "$299.00", status: "Cancelled", date: "Mar 6, 2026", method: "Visa •••• 1234" },
    { key: "5", id: "ORD-7287", customer: "Lisa Park", product: "Enterprise", amount: "$1,299.00", status: "Completed", date: "Mar 5, 2026", method: "Wire Transfer" },
    { key: "6", id: "ORD-7286", customer: "James Wilson", product: "Pro Plan", amount: "$299.00", status: "Refunded", date: "Mar 4, 2026", method: "Visa •••• 9876" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <Card size="small">
          <Statistic title="Total Orders" value={1423} prefix={<Package size={14} />} />
        </Card>
        <Card size="small">
          <Statistic title="Revenue" value={45231} prefix={<DollarSign size={14} />} precision={0} />
        </Card>
        <Card size="small">
          <Statistic title="Avg. Order" value={318} prefix={<CreditCard size={14} />} precision={0} suffix="$" />
        </Card>
        <Card size="small">
          <Statistic title="Refund Rate" value={2.1} suffix="%" prefix={<ArrowDownRight size={14} />} />
        </Card>
      </div>

      <Card size="small">
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Space>
            <Input prefix={<Search size={16} />} placeholder="Filter orders..." style={{ width: 220 }} />
            <Select defaultValue="all" style={{ width: 140 }} options={[
              { value: "all", label: "All Status" },
              { value: "completed", label: "Completed" },
              { value: "pending", label: "Pending" },
              { value: "cancelled", label: "Cancelled" },
              { value: "refunded", label: "Refunded" },
            ]} />
          </Space>
          <Space>
            <Button icon={<Download size={14} />}>Export CSV</Button>
            <Button type="primary" icon={<Plus size={14} />}>New Order</Button>
          </Space>
        </div>
        <Table
          dataSource={orders}
          size="small"
          columns={[
            { title: "Order", dataIndex: "id", key: "id", render: (text: string) => <Text strong>{text}</Text> },
            {
              title: "Customer",
              dataIndex: "customer",
              key: "customer",
              render: (text: string) => (
                <Space>
                  <Avatar size="small" style={{ backgroundColor: "var(--color-primary)" }}>{text[0]}</Avatar>
                  {text}
                </Space>
              ),
            },
            { title: "Product", dataIndex: "product", key: "product", render: (text: string) => <Tag>{text}</Tag> },
            { title: "Amount", dataIndex: "amount", key: "amount", render: (text: string) => <Text strong>{text}</Text> },
            { title: "Payment", dataIndex: "method", key: "method", render: (text: string) => <Text type="secondary" style={{ fontSize: 12 }}>{text}</Text> },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status: string) => {
                const colors: Record<string, string> = { Completed: "success", Pending: "warning", Cancelled: "error", Refunded: "purple" };
                return <Tag color={colors[status]}>{status}</Tag>;
              },
            },
            { title: "Date", dataIndex: "date", key: "date" },
          ]}
          pagination={{ pageSize: 5, size: "small" }}
        />
      </Card>
    </div>
  );
}

// ─── Analytics Page ─────────────────────────────────────────────────────────
function AnalyticsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        <Card size="small" hoverable>
          <div style={{ textAlign: "center" }}>
            <Progress type="circle" percent={75} size={80} />
            <div style={{ marginTop: 8 }}>
              <Text strong>Uptime</Text>
            </div>
          </div>
        </Card>
        <Card size="small" hoverable>
          <div style={{ textAlign: "center" }}>
            <Progress type="circle" percent={92} size={80} status="active" />
            <div style={{ marginTop: 8 }}>
              <Text strong>Performance</Text>
            </div>
          </div>
        </Card>
        <Card size="small" hoverable>
          <div style={{ textAlign: "center" }}>
            <Progress type="dashboard" percent={68} size={80} />
            <div style={{ marginTop: 8 }}>
              <Text strong>CPU Usage</Text>
            </div>
          </div>
        </Card>
        <Card size="small" hoverable>
          <div style={{ textAlign: "center" }}>
            <Progress type="circle" percent={45} size={80} status="exception" />
            <div style={{ marginTop: 8 }}>
              <Text strong>Error Rate</Text>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Traffic Sources" size="small">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { label: "Organic Search", value: 42, color: "var(--color-primary)" },
              { label: "Direct", value: 28, color: "var(--color-success)" },
              { label: "Social Media", value: 18, color: "var(--color-warning)" },
              { label: "Referral", value: 12, color: "#7265e6" },
            ].map((item) => (
              <div key={item.label}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <Text>{item.label}</Text>
                  <Text strong>{item.value}%</Text>
                </div>
                <Progress
                  percent={item.value}
                  showInfo={false}
                  strokeColor={item.color}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Pages" size="small">
          <List
            size="small"
            dataSource={[
              { page: "/dashboard", views: "12,847", change: "+5.2%" },
              { page: "/products", views: "8,392", change: "+2.1%" },
              { page: "/pricing", views: "6,105", change: "-1.3%" },
              { page: "/blog/react-tips", views: "4,832", change: "+12.8%" },
              { page: "/docs/getting-started", views: "3,291", change: "+8.4%" },
            ]}
            renderItem={(item: any) => (
              <List.Item actions={[<Text type="secondary" style={{ fontSize: 12 }} key="c">{item.change}</Text>]}>
                <List.Item.Meta
                  title={<Text code style={{ fontSize: 12 }}>{item.page}</Text>}
                  description={`${item.views} views`}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>

      <Card title="System Events" size="small">
        <Steps
          current={3}
          size="small"
          items={[
            { title: "Deploy v2.3", description: "Mar 1", status: "finish" },
            { title: "DB Migration", description: "Mar 3", status: "finish" },
            { title: "CDN Update", description: "Mar 5", status: "finish" },
            { title: "Deploy v2.4", description: "Mar 8", status: "process" },
            { title: "Load Testing", description: "Mar 10", status: "wait" },
          ]}
        />
      </Card>
    </div>
  );
}

// ─── Notifications Page ─────────────────────────────────────────────────────
function NotificationsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Space>
          <Segmented options={["All", "Unread", "Alerts", "Updates"]} defaultValue="All" />
        </Space>
        <Button type="text" size="small">Mark all as read</Button>
      </div>

      <Alert
        message="Critical: Database connection pool exhausted"
        description="The primary database cluster is experiencing connection pool saturation. Auto-scaling has been triggered. Monitor closely."
        type="error"
        showIcon
        closable
        action={
          <Space direction="vertical">
            <Button size="small" danger>View Logs</Button>
            <Button size="small">Dismiss</Button>
          </Space>
        }
      />
      <Alert
        message="Payment gateway update required"
        description="Stripe SDK v4 is available. Please update before March 15 to avoid service disruption."
        type="warning"
        showIcon
        closable
        action={<Button size="small" type="primary">Update Now</Button>}
      />
      <Alert
        message="New team member joined"
        description="Emily Davis has accepted the invitation and joined the Frontend team."
        type="success"
        showIcon
        closable
      />
      <Alert
        message="Scheduled maintenance window"
        description="System maintenance scheduled for March 12, 2:00-4:00 AM UTC. Expect brief downtime."
        type="info"
        showIcon
        closable
      />

      <Card title="Notification History" size="small">
        <Timeline
          items={[
            { color: "red", children: <div><Text strong>API Error Spike</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>429 rate limit errors detected — Mar 8, 3:14 PM</Text></div> },
            { color: "green", children: <div><Text strong>Deployment Successful</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>v2.4.0 deployed to production — Mar 8, 2:00 PM</Text></div> },
            { color: "blue", children: <div><Text strong>New Feature Flag</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>dark-mode-v2 enabled for 10% of users — Mar 7, 11:30 AM</Text></div> },
            { color: "orange", children: <div><Text strong>Storage Warning</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>S3 bucket at 89% capacity — Mar 7, 9:00 AM</Text></div> },
            { color: "green", children: <div><Text strong>Invoice Paid</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>Invoice #INV-1024 — $2,499.00 received — Mar 6, 4:15 PM</Text></div> },
            { color: "blue", children: <div><Text strong>Weekly Report</Text><br /><Text type="secondary" style={{ fontSize: 12 }}>Analytics summary for Feb 28 – Mar 6 generated — Mar 6, 8:00 AM</Text></div> },
          ]}
        />
      </Card>
    </div>
  );
}

// ─── Settings Page ──────────────────────────────────────────────────────────
function SettingsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Tabs
        defaultActiveKey="profile"
        items={[
          {
            key: "profile",
            label: "Profile",
            children: (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 8 }}>
                <Card title="Personal Information" size="small">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
                      <Avatar size={64} style={{ backgroundColor: "var(--color-primary)", fontSize: 24 }}>VP</Avatar>
                      <div>
                        <Button size="small">Change Avatar</Button>
                      </div>
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Full Name</Text>
                      <Input defaultValue="Vikas Patel" />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Email</Text>
                      <Input defaultValue="vikas@orizon.dev" />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Role</Text>
                      <Select defaultValue="admin" style={{ width: "100%" }} options={[
                        { value: "admin", label: "Administrator" },
                        { value: "editor", label: "Editor" },
                        { value: "viewer", label: "Viewer" },
                      ]} />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Bio</Text>
                      <Input.TextArea rows={3} defaultValue="Building Orizon — Ant Design API on shadcn/ui primitives." />
                    </div>
                    <Button type="primary" block>Save Changes</Button>
                  </div>
                </Card>
                <Card title="Preferences" size="small">
                  <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <Text strong>Email Notifications</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>Receive email about account activity</Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <Text strong>Push Notifications</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>Browser push notifications</Text>
                      </div>
                      <Switch />
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <Text strong>Two-Factor Auth</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>Extra security for your account</Text>
                      </div>
                      <Switch />
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <Text strong>Marketing Emails</Text>
                        <br />
                        <Text type="secondary" style={{ fontSize: 12 }}>Product updates and announcements</Text>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <Divider style={{ margin: 0 }} />
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Language</Text>
                      <Select defaultValue="en" style={{ width: "100%" }} options={[
                        { value: "en", label: "English" },
                        { value: "es", label: "Spanish" },
                        { value: "fr", label: "French" },
                        { value: "de", label: "German" },
                      ]} />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Timezone</Text>
                      <Select defaultValue="utc-5" style={{ width: "100%" }} options={[
                        { value: "utc-5", label: "UTC-5 (Eastern)" },
                        { value: "utc-8", label: "UTC-8 (Pacific)" },
                        { value: "utc+0", label: "UTC+0 (London)" },
                        { value: "utc+5.5", label: "UTC+5:30 (India)" },
                      ]} />
                    </div>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: "billing",
            label: "Billing",
            children: (
              <div style={{ marginTop: 8 }}>
                <Card size="small">
                  <Descriptions
                    bordered
                    size="small"
                    column={2}
                    items={[
                      { key: "1", label: "Plan", children: <Tag color="purple">Enterprise</Tag> },
                      { key: "2", label: "Status", children: <Badge status="success" text="Active" /> },
                      { key: "3", label: "Billing Cycle", children: "Monthly" },
                      { key: "4", label: "Next Payment", children: "April 1, 2026" },
                      { key: "5", label: "Amount", children: <Text strong>$99.00/mo</Text> },
                      { key: "6", label: "Payment Method", children: "Visa ending in 4242" },
                    ]}
                  />
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <Button>Change Plan</Button>
                    <Button>Update Payment</Button>
                    <Button danger>Cancel Subscription</Button>
                  </div>
                </Card>
              </div>
            ),
          },
          {
            key: "security",
            label: "Security",
            children: (
              <div style={{ marginTop: 8 }}>
                <Alert
                  message="Your account is secured"
                  description="Two-factor authentication is enabled. Last password change was 30 days ago."
                  type="success"
                  showIcon
                  style={{ marginBottom: 16 }}
                />
                <Card size="small">
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Current Password</Text>
                      <Input.Password placeholder="Enter current password" />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>New Password</Text>
                      <Input.Password placeholder="Enter new password" />
                    </div>
                    <div>
                      <Text type="secondary" style={{ fontSize: 13, display: "block", marginBottom: 4 }}>Confirm Password</Text>
                      <Input.Password placeholder="Confirm new password" />
                    </div>
                    <Button type="primary">Update Password</Button>
                  </div>
                </Card>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}

// ─── Components Page ────────────────────────────────────────────────────────
function ComponentsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card title="Buttons" size="small">
        <Space wrap>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="text">Text</Button>
          <Button type="link">Link</Button>
          <Button danger type="primary">Danger</Button>
          <Button type="primary" icon={<Plus size={14} />}>Create</Button>
          <Button type="primary" loading>Loading</Button>
          <Button type="primary" shape="circle" icon={<Search size={14} />} />
        </Space>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Tags & Badges" size="small">
          <Space wrap direction="vertical" style={{ width: "100%" }}>
            <Space wrap>
              <Tag color="blue">Feature</Tag>
              <Tag color="green">Resolved</Tag>
              <Tag color="orange">In Review</Tag>
              <Tag color="red">Critical</Tag>
              <Tag color="purple">Enhancement</Tag>
              <Tag color="cyan">Docs</Tag>
            </Space>
            <Space wrap>
              <Badge count={42} />
              <Badge count={100} overflowCount={99} />
              <Badge status="processing" text="Running" />
              <Badge status="success" text="Deployed" />
              <Badge status="error" text="Failed" />
              <Badge status="warning" text="Warning" />
            </Space>
          </Space>
        </Card>

        <Card title="Avatars" size="small">
          <Space direction="vertical">
            <Avatar.Group>
              <Avatar style={{ backgroundColor: "#f56a00" }}>U</Avatar>
              <Avatar style={{ backgroundColor: "#7265e6" }}>P</Avatar>
              <Avatar style={{ backgroundColor: "#ffbf00" }}>K</Avatar>
              <Avatar style={{ backgroundColor: "#00a2ae" }}>M</Avatar>
              <Avatar style={{ backgroundColor: "var(--color-primary)" }}>+3</Avatar>
            </Avatar.Group>
            <Space>
              <Avatar size="small" style={{ backgroundColor: "#f56a00" }}>S</Avatar>
              <Avatar style={{ backgroundColor: "#7265e6" }}>M</Avatar>
              <Avatar size="large" style={{ backgroundColor: "#ffbf00" }}>L</Avatar>
              <Avatar size={48} style={{ backgroundColor: "#00a2ae" }}>XL</Avatar>
            </Space>
          </Space>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Inputs" size="small">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Input placeholder="Text input" />
            <Input.Search placeholder="Search..." />
            <Input.Password placeholder="Password" />
            <Input.TextArea rows={2} placeholder="Textarea" />
            <Space>
              <InputNumber min={0} max={100} defaultValue={42} />
              <DatePicker />
              <ColorPicker defaultValue="#0d9488" />
            </Space>
          </div>
        </Card>

        <Card title="Selection" size="small">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Select
              defaultValue="react"
              style={{ width: "100%" }}
              options={[
                { value: "react", label: "React" },
                { value: "vue", label: "Vue" },
                { value: "angular", label: "Angular" },
                { value: "svelte", label: "Svelte" },
              ]}
            />
            <Checkbox.Group
              options={["TypeScript", "JavaScript", "Python"]}
              defaultValue={["TypeScript"]}
            />
            <Radio.Group
              defaultValue="monthly"
              options={[
                { value: "monthly", label: "Monthly" },
                { value: "yearly", label: "Yearly" },
              ]}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Switch defaultChecked />
              <Slider defaultValue={65} style={{ flex: 1 }} />
            </div>
            <Rate defaultValue={4} />
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Progress" size="small">
          <Space direction="vertical" style={{ width: "100%" }}>
            <Progress percent={60} status="active" />
            <Progress percent={100} />
            <Progress percent={30} status="exception" />
            <Space>
              <Progress type="circle" percent={75} size={60} />
              <Progress type="circle" percent={100} size={60} />
              <Progress type="dashboard" percent={68} size={60} />
            </Space>
          </Space>
        </Card>

        <Card title="Feedback" size="small">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Alert message="Success tip" type="success" showIcon />
            <Alert message="Info message" type="info" showIcon />
            <Alert message="Warning notice" type="warning" showIcon />
            <Alert message="Error alert" type="error" showIcon />
            <Space>
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
            </Space>
          </div>
        </Card>
      </div>

      <Card title="Skeleton Loading" size="small">
        <Skeleton avatar active />
      </Card>

      <Card title="Empty State" size="small">
        <Empty description="No records found" />
      </Card>
    </div>
  );
}

// ─── Main Dashboard Component ───────────────────────────────────────────────
export function DashboardPlayground() {
  const [currentPage, setCurrentPage] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);

  // Hide Rspress chrome so the playground is truly full-page
  useEffect(() => {
    const nav = document.querySelector(".rp-nav") as HTMLElement | null;
    if (nav) nav.style.display = "none";
    // Remove parent wrapper padding
    const root = document.getElementById("__rspress_root");
    if (root) {
      const contentWrapper = root.children[1] as HTMLElement | undefined;
      if (contentWrapper) {
        const inner = contentWrapper.firstElementChild as HTMLElement | undefined;
        if (inner) {
          inner.style.padding = "0";
          inner.style.maxWidth = "none";
        }
      }
    }
    return () => {
      if (nav) nav.style.display = "";
    };
  }, []);

  const pages: Record<string, { title: string; breadcrumb: string[]; component: React.ReactNode }> = {
    overview: {
      title: "Overview",
      breadcrumb: ["Home", "Dashboard", "Overview"],
      component: <OverviewPage />,
    },
    users: {
      title: "Users",
      breadcrumb: ["Home", "Management", "Users"],
      component: <UsersPage />,
    },
    orders: {
      title: "Orders",
      breadcrumb: ["Home", "Commerce", "Orders"],
      component: <OrdersPage />,
    },
    analytics: {
      title: "Analytics",
      breadcrumb: ["Home", "Reports", "Analytics"],
      component: <AnalyticsPage />,
    },
    notifications: {
      title: "Notifications",
      breadcrumb: ["Home", "System", "Notifications"],
      component: <NotificationsPage />,
    },
    settings: {
      title: "Settings",
      breadcrumb: ["Home", "Account", "Settings"],
      component: <SettingsPage />,
    },
    components: {
      title: "Components",
      breadcrumb: ["Home", "Library", "Components"],
      component: <ComponentsPage />,
    },
  };

  const page = pages[currentPage];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--rp-c-bg)" }}>
      {/* ── Top Nav Bar ── */}
      <div
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 24px",
          borderBottom: "1px solid var(--rp-c-divider)",
          background: "var(--rp-c-bg)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              O
            </div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>Orizon</span>
          </a>
          <Divider type="vertical" style={{ height: 20, margin: 0 }} />
          <Text type="secondary" style={{ fontSize: 14 }}>Playground</Text>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/getting-started"
            style={{ textDecoration: "none", color: "inherit", fontSize: 14 }}
          >
            Docs
          </a>
          <a
            href="https://github.com/nicepkg/orizon"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", fontSize: 14 }}
          >
            GitHub
          </a>
          <Divider type="vertical" style={{ height: 20, margin: 0 }} />
          <a
            href="/"
            style={{ textDecoration: "none" }}
          >
            <Button size="small" type="primary">
              Back to Site
            </Button>
          </a>
        </div>
      </div>

      {/* ── Dashboard ── */}
      <Layout style={{ flex: 1 }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={240}
          style={{ background: "var(--rp-c-bg)", borderRight: "1px solid var(--rp-c-divider)" }}
          theme="light"
        >
          <div
            style={{
              padding: collapsed ? "16px 8px" : "16px 16px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              borderBottom: "1px solid var(--rp-c-divider)",
            }}
          >
            {!collapsed ? (
              <Text strong style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 1, color: "var(--rp-c-text-2)" }}>
                Navigation
              </Text>
            ) : (
              <Text type="secondary" style={{ fontSize: 11, textAlign: "center", width: "100%" }}>Nav</Text>
            )}
          </div>
          <Menu
            mode="inline"
            selectedKeys={[currentPage]}
            onClick={({ key }) => setCurrentPage(key)}
            style={{ border: "none", background: "transparent" }}
            className={collapsed ? "playground-menu-collapsed" : ""}
            items={[
              {
                key: "overview",
                icon: <Home size={16} />,
                label: collapsed ? "" : "Overview",
              },
              {
                key: "users",
                icon: <Users size={16} />,
                label: collapsed ? "" : "Users",
              },
              {
                key: "orders",
                icon: <ShoppingCart size={16} />,
                label: collapsed ? "" : "Orders",
              },
              {
                key: "analytics",
                icon: <BarChart3 size={16} />,
                label: collapsed ? "" : "Analytics",
              },
              {
                key: "notifications",
                icon: <Bell size={16} />,
                label: collapsed ? "" : "Notifications",
              },
              { type: "divider" },
              {
                key: "settings",
                icon: <Settings size={16} />,
                label: collapsed ? "" : "Settings",
              },
              {
                key: "components",
                icon: <Layers size={16} />,
                label: collapsed ? "" : "Components",
              },
            ]}
          />
        </Sider>
        <Layout style={{ flex: 1, minWidth: 0 }}>
          <Header
            style={{
              background: "var(--rp-c-bg)",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid var(--rp-c-divider)",
              height: 56,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Title level={4} style={{ margin: 0 }}>
                {page.title}
              </Title>
              <Tag color="blue" style={{ marginLeft: 4 }}>Live Preview</Tag>
            </div>
            <Space>
              <Input
                prefix={<Search size={16} />}
                placeholder="Search..."
                style={{ width: 220 }}
              />
              <Badge count={3}>
                <Button
                  icon={<Bell size={16} />}
                  onClick={() => setCurrentPage("notifications")}
                />
              </Badge>
              <Dropdown
                menu={{
                  items: [
                    { key: "profile", label: "Profile", icon: <Users size={14} /> },
                    { key: "settings", label: "Settings", icon: <Settings size={14} /> },
                    { type: "divider" },
                    { key: "logout", label: "Log Out", icon: <LogOut size={14} />, danger: true },
                  ],
                  onClick: ({ key }) => {
                    if (key === "settings") setCurrentPage("settings");
                  },
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: "var(--color-primary)",
                    cursor: "pointer",
                  }}
                >
                  VP
                </Avatar>
              </Dropdown>
            </Space>
          </Header>
          <Content style={{ padding: 24, overflow: "auto" }}>
            <Breadcrumb
              style={{ marginBottom: 16 }}
              items={page.breadcrumb.map((item) => ({ title: item }))}
            />
            {page.component}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
