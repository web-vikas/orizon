import { InternalTransfer } from "./Transfer";

/**
 * Transfer component for moving items between two panels.
 *
 * @example
 * ```tsx
 * <Transfer
 *   dataSource={[
 *     { key: "1", title: "Item 1" },
 *     { key: "2", title: "Item 2" },
 *   ]}
 *   targetKeys={["2"]}
 *   onChange={(keys) => console.log(keys)}
 * />
 * ```
 */
const Transfer = InternalTransfer;

export { Transfer };
export type { TransferProps, TransferItem } from "./types";
