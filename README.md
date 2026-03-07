# Orizon

Ant Design API on shadcn/ui primitives. 68 React components with full TypeScript support.

## Install

```bash
npm install orizon
```

**Peer dependencies** — your project needs:

```bash
npm install react react-dom tailwindcss
```

For the **Form** component (optional):

```bash
npm install react-hook-form @hookform/resolvers zod
```

## Setup

Add these 3 lines to your app's CSS file:

```css
@import "tailwindcss";
@import "orizon/preset.css";
@source "../node_modules/orizon/dist";
```

That's it. The `@source` directive tells Tailwind to scan Orizon's compiled JS for utility classes.

## Usage

```tsx
import { Button, Input, Form, Table, Modal, message } from "orizon";

function App() {
  return (
    <div>
      <Button type="primary" onClick={() => message.success("Hello!")}>
        Click me
      </Button>
    </div>
  );
}
```

The API follows Ant Design exactly — same props, same patterns:

```tsx
// Compound components
<Input.Password placeholder="Password" />
<Form.Item label="Name" name="name">
  <Input />
</Form.Item>

// Static methods
Modal.confirm({ title: "Sure?", onOk: () => {} });
message.success("Saved!");
notification.open({ message: "Done" });
```

## Components (68)

| Category | Components |
|----------|-----------|
| General | Button, FloatButton, Typography |
| Layout | Space, Flex, Grid, Divider, Layout, Masonry, Splitter |
| Navigation | Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs |
| Data Entry | AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload |
| Data Display | Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Popover, QRCode, Segmented, Statistic, Table, Tag, Timeline, Tooltip, Tour, Tree |
| Feedback | Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin, Watermark |
| Other | Affix, App, ConfigProvider |

## Theming

Override CSS variables in your CSS:

```css
:root {
  --primary: oklch(0.6 0.25 150);    /* green primary */
  --radius: 0.5rem;                   /* rounder corners */
}
```

Or use the ConfigProvider:

```tsx
import { ConfigProvider } from "orizon";

<ConfigProvider theme={{ algorithm: "dark" }}>
  <App />
</ConfigProvider>
```

## License

MIT
