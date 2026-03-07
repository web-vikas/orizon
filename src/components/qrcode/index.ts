/**
 * @file Public API for the QRCode component.
 * @see ./QRCode.tsx - implementation
 */
import { InternalQRCode } from "./QRCode";

/**
 * QR code generator with status overlays (loading, expired, scanned).
 *
 * @example
 * ```tsx
 * <QRCode value="https://example.com" />
 * <QRCode value="https://example.com" status="expired" onRefresh={refresh} />
 * ```
 */
const QRCode = InternalQRCode;

export { QRCode };
export type {
  QRCodeProps,
  QRCodeErrorLevel,
  QRCodeStatus,
  QRCodeType,
} from "./types";
