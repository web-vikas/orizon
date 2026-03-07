/**
 * @file QRCode component type definitions.
 *
 * Exports props for the `<QRCode>` component including value encoding,
 * colour customisation, status overlays, and error correction level.
 *
 * @see ./QRCode.tsx - component implementation
 * @see ./index.ts   - public export
 */
import type { CSSProperties } from "react";

export type QRCodeErrorLevel = "L" | "M" | "Q" | "H";
export type QRCodeStatus = "active" | "expired" | "loading" | "scanned";
export type QRCodeType = "canvas" | "svg";

export interface QRCodeProps {
  /** The value/URL to encode in the QR code */
  value: string;
  /** Size in pixels */
  size?: number;
  /** QR code color */
  color?: string;
  /** Background color */
  bgColor?: string;
  /** Whether to show border */
  bordered?: boolean;
  /** Error correction level */
  errorLevel?: QRCodeErrorLevel;
  /** Center icon URL */
  icon?: string;
  /** Icon size in pixels */
  iconSize?: number;
  /** Status of the QR code */
  status?: QRCodeStatus;
  /** Render type */
  type?: QRCodeType;
  /** Callback when refresh is clicked for expired status */
  onRefresh?: () => void;
  /** Extra class name */
  className?: string;
  /** Style */
  style?: CSSProperties;
}
