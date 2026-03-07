/**
 * @file Button Type Definitions
 *
 * All public prop interfaces for `<Button>` and `<Button.Group>`.
 * Follows Ant Design naming conventions (type, size, shape, danger, ghost, etc.)
 * while mapping internally to shadcn/CVA variants.
 *
 * @see {@link ./Button.tsx} — component implementation
 * @see {@link ./ButtonGroup.tsx} — group implementation
 */

import type { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react";

/** Visual style — maps to CVA `variant` in the primitive. */
export type ButtonType = "primary" | "default" | "dashed" | "link" | "text";

/** T-shirt sizing — maps to CVA `size` in the primitive. */
export type ButtonSize = "small" | "middle" | "large";

/** Border-radius preset. "circle" forces a 1:1 aspect ratio. */
export type ButtonShape = "default" | "circle" | "round";

/** Native `<button type="">` attribute. Kept separate from `ButtonType`. */
export type ButtonHTMLType = "button" | "submit" | "reset";

/**
 * Props for the public `<Button>` component.
 *
 * Extends native button attributes but replaces `type` with
 * the Ant-Design-style {@link ButtonType} (use `htmlType` for
 * the native attribute instead).
 */
export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /**
   * Visual type of the button.
   *
   * | value     | rendered as                |
   * |-----------|----------------------------|
   * | primary   | Solid primary background   |
   * | default   | Outlined / bordered        |
   * | dashed    | Outlined with dashed border|
   * | text      | Ghost / transparent        |
   * | link      | Inline text link style     |
   *
   * @default "default"
   */
  type?: ButtonType;

  /**
   * Button size. Inherits from `SizeContext` if not provided.
   * @default "middle"
   */
  size?: ButtonSize;

  /**
   * Border-radius shape.
   * - `"default"` — standard rounded-lg
   * - `"round"` — fully rounded (pill shape)
   * - `"circle"` — 1:1 square with full rounding (use with icon-only)
   *
   * @default "default"
   */
  shape?: ButtonShape;

  /**
   * Show a loading spinner and disable the button.
   * Replaces the `icon` slot with a spinning `<Loader2>`.
   * @default false
   */
  loading?: boolean;

  /**
   * Apply destructive (red) styling regardless of `type`.
   * @default false
   */
  danger?: boolean;

  /**
   * Transparent background with border in the current text color.
   * Useful on dark/colored backgrounds.
   * @default false
   */
  ghost?: boolean;

  /**
   * Stretch to 100% width of the parent container.
   * @default false
   */
  block?: boolean;

  /**
   * Icon element rendered alongside (or instead of) the label.
   * Pass any `ReactNode` — typically a Lucide icon.
   */
  icon?: ReactNode;

  /**
   * Which side of the label the `icon` appears on.
   * @default "start"
   */
  iconPosition?: "start" | "end";

  /**
   * Native `<button>` type attribute.
   * Kept separate from the visual `type` prop to avoid conflicts.
   * @default "button"
   */
  htmlType?: ButtonHTMLType;

  /**
   * Plain-text tooltip shown on hover via the Tooltip primitive.
   * Wraps the button in a `<TooltipProvider> → <Tooltip> → <TooltipTrigger>`.
   * Only renders the tooltip wrapper when a non-empty string is provided.
   */
  hint?: string;

  /** Click handler. */
  onClick?: MouseEventHandler<HTMLButtonElement>;

  /** Button label / content. */
  children?: ReactNode;
}

/**
 * Props for `<Button.Group>`.
 *
 * Groups adjacent buttons with collapsed borders and shared rounding.
 * Children are cloned with the group-level `size` if provided.
 */
export interface ButtonGroupProps {
  /**
   * Overrides the size of every child `<Button>` in the group.
   * Individual button sizes are preserved if this is not set.
   */
  size?: ButtonSize;

  /** Additional CSS classes on the group wrapper. */
  className?: string;

  /** `<Button>` children. */
  children?: ReactNode;
}
