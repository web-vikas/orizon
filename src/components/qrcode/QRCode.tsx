/**
 * @file QRCode -- QR code generator with status overlays.
 *
 * Renders a real scannable QR code using `qrcode.react` with configurable
 * colours, size, center icon, bordered frame, and status overlays for
 * loading, expired, and scanned states.
 *
 * Key props: `value`, `size`, `color`, `bgColor`, `status`, `icon`,
 * `bordered`, `onRefresh`, `errorLevel`.
 *
 * @example
 * ```tsx
 * <QRCode value="https://example.com" />
 * <QRCode value="https://example.com" status="expired" onRefresh={refresh} />
 * ```
 *
 * @see ./types.ts  - QRCodeProps
 * @see ./index.ts  - public export
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { RefreshCwIcon, Loader2Icon, CheckCircleIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import type { QRCodeProps, QRCodeStatus } from "./types";

// ---------------------------------------------------------------------------
// Status overlays
// ---------------------------------------------------------------------------

function StatusOverlay({
  status,
  onRefresh,
}: {
  status: QRCodeStatus;
  onRefresh?: () => void;
}) {
  if (status === "active") return null;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-background/80">
      {status === "loading" && (
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      )}
      {status === "expired" && (
        <>
          <span className="text-xs text-muted-foreground">QR code expired</span>
          {onRefresh && (
            <button
              className="inline-flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
              onClick={onRefresh}
            >
              <RefreshCwIcon className="size-3" />
              Refresh
            </button>
          )}
        </>
      )}
      {status === "scanned" && (
        <>
          <CheckCircleIcon className="size-6 text-green-500" />
          <span className="text-xs text-muted-foreground">Scanned</span>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// InternalQRCode
// ---------------------------------------------------------------------------

const InternalQRCode: React.FC<QRCodeProps> = ({
  value,
  size = 160,
  color = "#000000",
  bgColor = "#ffffff",
  bordered = true,
  errorLevel = "M",
  icon,
  iconSize = 40,
  status = "active",
  onRefresh,
  className,
  style,
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg",
        bordered && "border p-3",
        className,
      )}
      style={style}
    >
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={color}
        level={errorLevel}
        marginSize={4}
        imageSettings={
          icon
            ? {
                src: icon,
                height: iconSize,
                width: iconSize,
                excavate: true,
              }
            : undefined
        }
      />

      {/* Status overlay */}
      <StatusOverlay status={status} onRefresh={onRefresh} />
    </div>
  );
};

InternalQRCode.displayName = "QRCode";

export { InternalQRCode };
