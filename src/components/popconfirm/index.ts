/**
 * @file Public API for the Popconfirm component.
 * @see ./Popconfirm.tsx - implementation
 */
import { InternalPopconfirm } from "./Popconfirm";

/**
 * Confirmation popup that wraps a trigger element.
 *
 * Shows a small popover with title, description, and OK/Cancel buttons.
 * Ideal for confirming destructive actions.
 *
 * @example
 * ```tsx
 * <Popconfirm title="Delete?" onConfirm={handleDelete}>
 *   <Button danger>Delete</Button>
 * </Popconfirm>
 * ```
 */
const Popconfirm = InternalPopconfirm;

export { Popconfirm };
export type { PopconfirmProps, PopconfirmPlacement } from "./types";
