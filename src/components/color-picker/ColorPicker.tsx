/**
 * @file ColorPicker Component
 *
 * A colour selection panel with saturation canvas, hue slider,
 * optional alpha slider, format switching (hex / rgb / hsb),
 * and preset colour swatches. Opens as a popover triggered by
 * click or hover on a colour swatch.
 *
 * Key props: `value`, `onChange`, `format`, `showText`, `presets`,
 * `disabledAlpha`, `size`, `trigger`.
 *
 * @example
 * ```tsx
 * <ColorPicker defaultValue="#1677ff" showText />
 * <ColorPicker
 *   presets={[{ label: "Brand", colors: ["#f00", "#0f0", "#00f"] }]}
 * />
 * ```
 *
 * @see {@link ./types.ts} — prop definitions
 * @see {@link ./index.ts} — barrel export
 */

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ColorFormat, ColorPickerProps } from "./types";

// ---------------------------------------------------------------------------
// Color conversion helpers
// ---------------------------------------------------------------------------

interface HSB {
  h: number; // 0-360
  s: number; // 0-100
  b: number; // 0-100
}

interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
}

function hexToRgb(hex: string): RGB {
  let clean = hex.replace("#", "");
  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(rgb: RGB): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

function rgbToHsb(rgb: RGB): HSB {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6;
    else if (max === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }

  const s = max === 0 ? 0 : Math.round((delta / max) * 100);
  const brightness = Math.round(max * 100);

  return { h, s, b: brightness };
}

function hsbToRgb(hsb: HSB): RGB {
  const h = hsb.h;
  const s = hsb.s / 100;
  const v = hsb.b / 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let rp = 0,
    gp = 0,
    bp = 0;
  if (h < 60) {
    rp = c;
    gp = x;
  } else if (h < 120) {
    rp = x;
    gp = c;
  } else if (h < 180) {
    gp = c;
    bp = x;
  } else if (h < 240) {
    gp = x;
    bp = c;
  } else if (h < 300) {
    rp = x;
    bp = c;
  } else {
    rp = c;
    bp = x;
  }

  return {
    r: Math.round((rp + m) * 255),
    g: Math.round((gp + m) * 255),
    b: Math.round((bp + m) * 255),
  };
}

function hsbToHex(hsb: HSB): string {
  return rgbToHex(hsbToRgb(hsb));
}

function formatColor(hsb: HSB, alpha: number, fmt: ColorFormat): string {
  if (fmt === "hex") {
    const hex = hsbToHex(hsb);
    if (alpha < 1) {
      const a = Math.round(alpha * 255)
        .toString(16)
        .padStart(2, "0");
      return `${hex}${a}`;
    }
    return hex;
  }
  if (fmt === "rgb") {
    const rgb = hsbToRgb(hsb);
    if (alpha < 1) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha.toFixed(2)})`;
    }
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }
  // hsb
  if (alpha < 1) {
    return `hsba(${hsb.h}, ${hsb.s}%, ${hsb.b}%, ${alpha.toFixed(2)})`;
  }
  return `hsb(${hsb.h}, ${hsb.s}%, ${hsb.b}%)`;
}

function parseColor(color: string): { hsb: HSB; alpha: number } {
  const trimmed = color.trim();

  // rgba(r, g, b, a)
  const rgbaMatch = trimmed.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)$/
  );
  if (rgbaMatch) {
    const rgb: RGB = {
      r: parseInt(rgbaMatch[1]),
      g: parseInt(rgbaMatch[2]),
      b: parseInt(rgbaMatch[3]),
    };
    const a = rgbaMatch[4] !== undefined ? parseFloat(rgbaMatch[4]) : 1;
    return { hsb: rgbToHsb(rgb), alpha: a };
  }

  // hsba(h, s%, b%, a)
  const hsbaMatch = trimmed.match(
    /^hsba?\(\s*(\d+)\s*,\s*([\d.]+)%?\s*,\s*([\d.]+)%?\s*(?:,\s*([\d.]+))?\s*\)$/
  );
  if (hsbaMatch) {
    const hsb: HSB = {
      h: parseInt(hsbaMatch[1]),
      s: parseFloat(hsbaMatch[2]),
      b: parseFloat(hsbaMatch[3]),
    };
    const a = hsbaMatch[4] !== undefined ? parseFloat(hsbaMatch[4]) : 1;
    return { hsb, alpha: a };
  }

  // Hex
  let hex = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
  let alpha = 1;
  if (hex.length === 9) {
    // #RRGGBBAA
    alpha = parseInt(hex.slice(7, 9), 16) / 255;
    hex = hex.slice(0, 7);
  }
  const rgb = hexToRgb(hex);
  return { hsb: rgbToHsb(rgb), alpha };
}

// ---------------------------------------------------------------------------
// Size map
// ---------------------------------------------------------------------------

const SIZE_MAP: Record<string, string> = {
  small: "size-6",
  middle: "size-8",
  large: "size-10",
};

// ---------------------------------------------------------------------------
// Saturation Panel
// ---------------------------------------------------------------------------

interface SaturationPanelProps {
  hue: number;
  saturation: number;
  brightness: number;
  onChange: (s: number, b: number) => void;
  onChangeComplete: () => void;
}

function SaturationPanel({
  hue,
  saturation,
  brightness,
  onChange,
  onChangeComplete,
}: SaturationPanelProps) {
  const panelRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const hueColor = hsbToHex({ h: hue, s: 100, b: 100 });

  const handlePointer = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!panelRef.current) return;
      const rect = panelRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const s = Math.round((x / rect.width) * 100);
      const b = Math.round((1 - y / rect.height) * 100);
      onChange(s, b);
    },
    [onChange]
  );

  React.useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      handlePointer(e.clientX, e.clientY);
    };
    const handleUp = () => {
      if (dragging.current) {
        dragging.current = false;
        onChangeComplete();
      }
    };
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [handlePointer, onChangeComplete]);

  return (
    <div
      ref={panelRef}
      className="relative h-[160px] w-full cursor-crosshair rounded-md"
      style={{
        background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})`,
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        handlePointer(e.clientX, e.clientY);
      }}
    >
      {/* Indicator */}
      <div
        className="pointer-events-none absolute size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{
          left: `${saturation}%`,
          top: `${100 - brightness}%`,
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hue Slider
// ---------------------------------------------------------------------------

interface HueSliderProps {
  hue: number;
  onChange: (h: number) => void;
  onChangeComplete: () => void;
}

function HueSlider({ hue, onChange, onChangeComplete }: HueSliderProps) {
  const barRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const handlePointer = React.useCallback(
    (clientX: number) => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      onChange(Math.round((x / rect.width) * 360));
    },
    [onChange]
  );

  React.useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      handlePointer(e.clientX);
    };
    const handleUp = () => {
      if (dragging.current) {
        dragging.current = false;
        onChangeComplete();
      }
    };
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [handlePointer, onChangeComplete]);

  return (
    <div
      ref={barRef}
      className="relative h-3 w-full cursor-pointer rounded-full"
      style={{
        background:
          "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        handlePointer(e.clientX);
      }}
    >
      <div
        className="pointer-events-none absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{ left: `${(hue / 360) * 100}%` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Alpha Slider
// ---------------------------------------------------------------------------

interface AlphaSliderProps {
  hue: number;
  saturation: number;
  brightness: number;
  alpha: number;
  onChange: (a: number) => void;
  onChangeComplete: () => void;
}

function AlphaSlider({
  hue,
  saturation,
  brightness,
  alpha,
  onChange,
  onChangeComplete,
}: AlphaSliderProps) {
  const barRef = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);
  const solidColor = hsbToHex({ h: hue, s: saturation, b: brightness });

  const handlePointer = React.useCallback(
    (clientX: number) => {
      if (!barRef.current) return;
      const rect = barRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      onChange(Math.round((x / rect.width) * 100) / 100);
    },
    [onChange]
  );

  React.useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      handlePointer(e.clientX);
    };
    const handleUp = () => {
      if (dragging.current) {
        dragging.current = false;
        onChangeComplete();
      }
    };
    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
    return () => {
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
    };
  }, [handlePointer, onChangeComplete]);

  return (
    <div
      ref={barRef}
      className="relative h-3 w-full cursor-pointer rounded-full"
      style={{
        background: `linear-gradient(to right, transparent, ${solidColor}), repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 0 0 / 8px 8px`,
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        handlePointer(e.clientX);
      }}
    >
      <div
        className="pointer-events-none absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-sm"
        style={{ left: `${alpha * 100}%` }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// ColorPicker
// ---------------------------------------------------------------------------

const InternalColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
  (props, ref) => {
    const {
      value,
      defaultValue = "#1677ff",
      onChange,
      onChangeComplete,
      format: formatProp,
      defaultFormat = "hex",
      onFormatChange,
      showText = false,
      presets,
      disabled = false,
      disabledAlpha = false,
      size = "middle",
      trigger = "click",
      open: openProp,
      onOpenChange,
      children,
      className,
      style,
    } = props;

    // Current format
    const [internalFormat, setInternalFormat] =
      React.useState<ColorFormat>(formatProp ?? defaultFormat);
    const activeFormat = formatProp ?? internalFormat;

    // Parse initial color
    const initColor = value ?? defaultValue;
    const parsed = parseColor(initColor);

    const [hsb, setHsb] = React.useState<HSB>(parsed.hsb);
    const [alpha, setAlpha] = React.useState(parsed.alpha);

    // Sync from controlled value
    React.useEffect(() => {
      if (value !== undefined) {
        const p = parseColor(value);
        setHsb(p.hsb);
        setAlpha(p.alpha);
      }
    }, [value]);

    // Panel open
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isOpen = openProp !== undefined ? openProp : internalOpen;
    const setOpen = React.useCallback(
      (next: boolean) => {
        if (openProp === undefined) setInternalOpen(next);
        onOpenChange?.(next);
      },
      [openProp, onOpenChange]
    );

    // Close on outside click
    const containerRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!isOpen) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, setOpen]);

    // Emit onChange
    const emitChange = React.useCallback(
      (newHsb: HSB, newAlpha: number) => {
        const colorStr = formatColor(
          newHsb,
          disabledAlpha ? 1 : newAlpha,
          activeFormat
        );
        onChange?.(colorStr);
      },
      [onChange, activeFormat, disabledAlpha]
    );

    const emitChangeComplete = React.useCallback(() => {
      const colorStr = formatColor(
        hsb,
        disabledAlpha ? 1 : alpha,
        activeFormat
      );
      onChangeComplete?.(colorStr);
    }, [hsb, alpha, activeFormat, disabledAlpha, onChangeComplete]);

    // Current color as hex for swatch display
    const currentHex = hsbToHex(hsb);
    const currentDisplayColor =
      alpha < 1 && !disabledAlpha
        ? `rgba(${hsbToRgb(hsb).r}, ${hsbToRgb(hsb).g}, ${hsbToRgb(hsb).b}, ${alpha})`
        : currentHex;

    // Format text
    const colorText = formatColor(hsb, disabledAlpha ? 1 : alpha, activeFormat);
    const renderText = () => {
      if (!showText) return null;
      if (typeof showText === "function") return showText(colorText);
      return (
        <span className="ml-2 truncate text-sm">{colorText}</span>
      );
    };

    // Handle hex input change
    const handleHexInput = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^#?[0-9a-fA-F]{6}$/.test(val)) {
          const p = parseColor(val);
          setHsb(p.hsb);
          emitChange(p.hsb, alpha);
        }
      },
      [alpha, emitChange]
    );

    // Format cycling
    const formats: ColorFormat[] = ["hex", "rgb", "hsb"];
    const cycleFormat = React.useCallback(() => {
      const idx = formats.indexOf(activeFormat);
      const next = formats[(idx + 1) % formats.length];
      if (formatProp === undefined) setInternalFormat(next);
      onFormatChange?.(next);
    }, [activeFormat, formatProp, onFormatChange, formats]);

    // Trigger element
    const triggerElement = children ?? (
      <div
        className={cn(
          "inline-flex items-center rounded-lg border border-input p-1 transition-colors",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "cursor-pointer hover:border-ring"
        )}
      >
        <div
          className={cn("rounded-md", SIZE_MAP[size])}
          style={{
            backgroundColor: currentDisplayColor,
            backgroundImage:
              alpha < 1 && !disabledAlpha
                ? undefined
                : undefined,
          }}
        />
        {renderText()}
      </div>
    );

    const handleTriggerClick = () => {
      if (disabled || trigger !== "click") return;
      setOpen(!isOpen);
    };

    const handleTriggerHover = (entering: boolean) => {
      if (disabled || trigger !== "hover") return;
      setOpen(entering);
    };

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn("relative inline-block", className)}
        style={style}
        onMouseEnter={() => handleTriggerHover(true)}
        onMouseLeave={() => handleTriggerHover(false)}
      >
        {/* Trigger */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={handleTriggerClick}
          onKeyDown={(e) => {
            if ((e.key === "Enter" || e.key === " ") && !disabled) {
              e.preventDefault();
              setOpen(!isOpen);
            }
          }}
        >
          {triggerElement}
        </div>

        {/* Panel */}
        {isOpen && !disabled && (
          <div className="absolute z-50 mt-1 w-[280px] rounded-lg border bg-popover p-3 shadow-md">
            {/* Saturation canvas */}
            <SaturationPanel
              hue={hsb.h}
              saturation={hsb.s}
              brightness={hsb.b}
              onChange={(s, b) => {
                const newHsb = { ...hsb, s, b };
                setHsb(newHsb);
                emitChange(newHsb, alpha);
              }}
              onChangeComplete={emitChangeComplete}
            />

            {/* Sliders */}
            <div className="mt-3 flex items-center gap-3">
              {/* Color preview */}
              <div
                className="size-8 shrink-0 rounded-md border"
                style={{ backgroundColor: currentDisplayColor }}
              />
              <div className="flex flex-1 flex-col gap-2">
                <HueSlider
                  hue={hsb.h}
                  onChange={(h) => {
                    const newHsb = { ...hsb, h };
                    setHsb(newHsb);
                    emitChange(newHsb, alpha);
                  }}
                  onChangeComplete={emitChangeComplete}
                />
                {!disabledAlpha && (
                  <AlphaSlider
                    hue={hsb.h}
                    saturation={hsb.s}
                    brightness={hsb.b}
                    alpha={alpha}
                    onChange={(a) => {
                      setAlpha(a);
                      emitChange(hsb, a);
                    }}
                    onChangeComplete={emitChangeComplete}
                  />
                )}
              </div>
            </div>

            {/* Format input */}
            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={cycleFormat}
                className="shrink-0 rounded-md border px-2 py-0.5 text-xs uppercase hover:bg-accent"
              >
                {activeFormat}
              </button>
              <input
                className="w-full rounded-md border border-input bg-transparent px-2 py-1 text-xs outline-none focus:border-ring"
                value={colorText}
                onChange={handleHexInput}
                readOnly={activeFormat !== "hex"}
              />
            </div>

            {/* Presets */}
            {presets &&
              presets.map((preset, pIdx) => (
                <div key={pIdx} className="mt-3">
                  {preset.label && (
                    <div className="mb-1 text-xs text-muted-foreground">
                      {preset.label}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {preset.colors.map((color, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        className={cn(
                          "size-6 rounded-md border transition-transform hover:scale-110",
                          currentHex.toLowerCase() === color.toLowerCase() &&
                            "ring-2 ring-primary ring-offset-1"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => {
                          const p = parseColor(color);
                          setHsb(p.hsb);
                          setAlpha(p.alpha);
                          emitChange(p.hsb, p.alpha);
                          onChangeComplete?.(
                            formatColor(p.hsb, p.alpha, activeFormat)
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
);

InternalColorPicker.displayName = "ColorPicker";

export { InternalColorPicker };
