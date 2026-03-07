"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { WatermarkProps, WatermarkFont } from "./types";

const DEFAULT_FONT: Required<WatermarkFont> = {
  color: "rgba(0, 0, 0, 0.15)",
  fontSize: 16,
  fontWeight: "normal",
  fontFamily: "sans-serif",
  fontStyle: "normal",
  textAlign: "center",
};

function getCanvasDataUrl(options: {
  content?: string | string[];
  image?: string;
  width: number;
  height: number;
  rotate: number;
  gap: [number, number];
  font: Required<WatermarkFont>;
  devicePixelRatio: number;
  onReady: (dataUrl: string, patternWidth: number, patternHeight: number) => void;
}) {
  const {
    content,
    image,
    width,
    height,
    rotate,
    gap,
    font,
    devicePixelRatio,
    onReady,
  } = options;

  const [gapX, gapY] = gap;
  const cellWidth = width + gapX;
  const cellHeight = height + gapY;

  // Pattern canvas (2 cells for offset pattern)
  const canvasWidth = cellWidth * 2;
  const canvasHeight = cellHeight * 2;

  const canvas = document.createElement("canvas");
  canvas.width = canvasWidth * devicePixelRatio;
  canvas.height = canvasHeight * devicePixelRatio;
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${canvasHeight}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.scale(devicePixelRatio, devicePixelRatio);

  function drawMark(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    ctx.translate(x + width / 2, y + height / 2);
    ctx.rotate((rotate * Math.PI) / 180);

    if (image) {
      // Image watermark
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.drawImage(img, -width / 2, -height / 2, width, height);
        ctx.restore();
        // We need to re-render after image loads
        onReady(
          canvas.toDataURL(),
          canvasWidth,
          canvasHeight
        );
      };
      img.src = image;
      ctx.restore();
      return false; // async
    }

    // Text watermark
    if (content) {
      ctx.textAlign = font.textAlign;
      ctx.textBaseline = "middle";
      ctx.font = `${font.fontStyle} ${font.fontWeight} ${font.fontSize}px ${font.fontFamily}`;
      ctx.fillStyle = font.color;

      const lines = Array.isArray(content) ? content : [content];
      const lineHeight = font.fontSize * 1.5;
      const totalHeight = lines.length * lineHeight;
      const startY = -totalHeight / 2 + lineHeight / 2;

      lines.forEach((line, i) => {
        ctx.fillText(line, 0, startY + i * lineHeight);
      });
    }

    ctx.restore();
    return true; // sync
  }

  // Draw marks at two offset positions
  const sync1 = drawMark(ctx, 0, 0);
  const sync2 = drawMark(ctx, cellWidth, cellHeight);

  if (sync1 !== false && sync2 !== false) {
    onReady(canvas.toDataURL(), canvasWidth, canvasHeight);
  }
}

const InternalWatermark = React.forwardRef<HTMLDivElement, WatermarkProps>(
  (props, ref) => {
    const {
      content,
      image,
      width: widthProp,
      height: heightProp,
      rotate = -22,
      gap = [100, 100],
      offset,
      font: fontProp,
      zIndex = 9,
      children,
      className,
      style,
    } = props;

    const [bgUrl, setBgUrl] = React.useState<string>("");
    const [patternSize, setPatternSize] = React.useState<[number, number]>([
      0, 0,
    ]);

    const font: Required<WatermarkFont> = React.useMemo(
      () => ({
        ...DEFAULT_FONT,
        ...fontProp,
      }),
      [fontProp]
    );

    // Default dimensions
    const width = widthProp ?? (image ? 120 : undefined);
    const computedWidth = React.useMemo(() => {
      if (width !== undefined) return width;
      // Estimate from content
      if (!content) return 120;
      const lines = Array.isArray(content) ? content : [content];
      const maxLen = Math.max(...lines.map((l) => l.length));
      return Math.max(maxLen * font.fontSize * 0.7, 80);
    }, [width, content, font.fontSize]);

    const height = heightProp ?? (image ? 64 : undefined);
    const computedHeight = React.useMemo(() => {
      if (height !== undefined) return height;
      if (!content) return 64;
      const lines = Array.isArray(content) ? content : [content];
      return Math.max(lines.length * font.fontSize * 1.5 + 8, 32);
    }, [height, content, font.fontSize]);

    React.useEffect(() => {
      if (!content && !image) {
        setBgUrl("");
        return;
      }

      const dpr = window.devicePixelRatio || 1;

      getCanvasDataUrl({
        content,
        image,
        width: computedWidth,
        height: computedHeight,
        rotate,
        gap,
        font,
        devicePixelRatio: dpr,
        onReady: (dataUrl, pw, ph) => {
          setBgUrl(dataUrl);
          setPatternSize([pw, ph]);
        },
      });
    }, [content, image, computedWidth, computedHeight, rotate, gap, font]);

    const offsetStyle: React.CSSProperties = {};
    if (offset) {
      offsetStyle.left = offset[0];
      offsetStyle.top = offset[1];
    }

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={style}
      >
        {children}
        {bgUrl && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              zIndex,
              backgroundImage: `url(${bgUrl})`,
              backgroundRepeat: "repeat",
              backgroundSize: patternSize[0]
                ? `${patternSize[0]}px ${patternSize[1]}px`
                : undefined,
              ...offsetStyle,
            }}
          />
        )}
      </div>
    );
  }
);

InternalWatermark.displayName = "Watermark";

export { InternalWatermark };
