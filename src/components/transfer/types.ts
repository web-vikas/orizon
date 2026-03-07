import type { CSSProperties, ReactNode } from "react";

export interface TransferItem {
  key: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  [name: string]: unknown;
}

export interface TransferProps {
  dataSource?: TransferItem[];
  targetKeys?: string[];
  selectedKeys?: string[];
  onChange?: (
    targetKeys: string[],
    direction: "left" | "right",
    moveKeys: string[],
  ) => void;
  onSelectChange?: (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[],
  ) => void;
  onSearch?: (direction: "left" | "right", value: string) => void;
  render?: (item: TransferItem) => ReactNode;
  showSearch?: boolean;
  titles?: [ReactNode, ReactNode];
  operations?: [string, string];
  disabled?: boolean;
  listStyle?:
    | CSSProperties
    | ((params: { direction: "left" | "right" }) => CSSProperties);
  pagination?: boolean | { pageSize?: number };
  oneWay?: boolean;
  selectAllLabels?: [
    (info: { selectedCount: number; totalCount: number }) => ReactNode,
    (info: { selectedCount: number; totalCount: number }) => ReactNode,
  ];
  className?: string;
  style?: CSSProperties;
}
