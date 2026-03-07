/**
 * @file QRCode -- QR code generator with status overlays.
 *
 * Renders a QR code pattern (placeholder) with configurable colours,
 * size, center icon, bordered frame, and status overlays for loading,
 * expired, and scanned states. Replace the placeholder SVG with a real
 * QR library (`qrcode.react`, `qrcode`, etc.) for production use.
 *
 * Key props: `value`, `size`, `color`, `bgColor`, `status`, `icon`,
 * `bordered`, `onRefresh`.
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
import type { QRCodeProps, QRCodeStatus } from "./types";

/**
 * QRCode component - placeholder implementation.
 *
 * This component provides the full API surface but renders a placeholder
 * because actual QR code generation requires a library such as:
 *   - `qrcode` (npm)
 *   - `qr.js`
 *   - `qrcode.react`
 *
 * To enable actual QR code rendering, install one of the above packages
 * and replace the placeholder rendering below with the real QR generation logic.
 *
 * Example with qrcode.react:
 *   npm install qrcode.react
 *
 * Then replace the placeholder div with:
 *   import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
 */

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
// Placeholder QR pattern
// ---------------------------------------------------------------------------

function QRPlaceholderSVG({
  size,
  color,
  bgColor,
  value,
}: {
  size: number;
  color: string;
  bgColor: string;
  value: string;
}) {
  // Generate a simple deterministic pattern based on the value string
  const cells = 21; // Standard QR code minimum modules
  const cellSize = size / cells;

  const pattern = React.useMemo(() => {
    const grid: boolean[][] = [];
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
      hash = ((hash << 5) - hash + value.charCodeAt(i)) | 0;
    }

    for (let r = 0; r < cells; r++) {
      grid[r] = [];
      for (let c = 0; c < cells; c++) {
        // Always fill finder patterns (top-left, top-right, bottom-left)
        const inFinderTL = r < 7 && c < 7;
        const inFinderTR = r < 7 && c >= cells - 7;
        const inFinderBL = r >= cells - 7 && c < 7;

        if (inFinderTL || inFinderTR || inFinderBL) {
          // Finder pattern - solid border with empty center
          const isOuter =
            r === 0 || r === 6 || c === 0 || c === 6 ||
            (r < 7 && (c === cells - 7 || c === cells - 1)) ||
            (c >= cells - 7 && (r === 0 || r === 6)) ||
            (r >= cells - 7 && (c === 0 || c === 6)) ||
            (c < 7 && (r === cells - 7 || r === cells - 1));
          const isInner =
            (r >= 2 && r <= 4 && c >= 2 && c <= 4) ||
            (r >= 2 && r <= 4 && c >= cells - 5 && c <= cells - 3) ||
            (r >= cells - 5 && r <= cells - 3 && c >= 2 && c <= 4);

          grid[r][c] = isOuter || isInner;
        } else {
          // Pseudo-random fill
          const seed = ((hash * (r * cells + c + 1)) >>> 0) % 100;
          grid[r][c] = seed < 40;
        }
      }
    }
    return grid;
  }, [value, cells]);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={bgColor} />
      {pattern.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill={color}
            />
          ) : null,
        ),
      )}
    </svg>
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
      {/* QR code placeholder - replace with actual QR library rendering */}
      <QRPlaceholderSVG
        size={size}
        color={color}
        bgColor={bgColor}
        value={value}
      />

      {/* Center icon */}
      {icon && status === "active" && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded bg-white p-0.5"
          style={{ width: iconSize, height: iconSize }}
        >
          <img src={icon} alt="QR icon" className="size-full object-contain" />
        </div>
      )}

      {/* Status overlay */}
      <StatusOverlay status={status} onRefresh={onRefresh} />
    </div>
  );
};

InternalQRCode.displayName = "QRCode";

export { InternalQRCode };
