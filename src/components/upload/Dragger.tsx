"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { InternalUpload } from "./Upload";
import type { DraggerProps } from "./types";

// ---------------------------------------------------------------------------
// InboxIcon
// ---------------------------------------------------------------------------

function InboxIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Dragger
// ---------------------------------------------------------------------------

const Dragger = React.forwardRef<HTMLDivElement, DraggerProps>((props, ref) => {
  const { height, disabled = false, children, className, style, ...rest } = props;

  const [isDragOver, setIsDragOver] = React.useState(false);
  const dragCountRef = React.useRef(0);
  const innerRef = React.useRef<HTMLDivElement>(null);

  // Merge refs
  const mergedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    },
    [ref],
  );

  const handleDragEnter = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      dragCountRef.current += 1;
      if (dragCountRef.current === 1) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCountRef.current -= 1;
      if (dragCountRef.current === 0) {
        setIsDragOver(false);
      }
    },
    [],
  );

  const handleDragOver = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
    },
    [],
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      dragCountRef.current = 0;
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length === 0) return;

      // Trigger the Upload's processFiles via a synthetic input change
      // We'll use a hidden input approach: create a DataTransfer, set files, trigger change
      const uploadEl = innerRef.current?.querySelector(
        'input[type="file"]',
      ) as HTMLInputElement | null;
      if (uploadEl) {
        const dt = new DataTransfer();
        files.forEach((f) => dt.items.add(f));
        uploadEl.files = dt.files;
        uploadEl.dispatchEvent(new Event("change", { bubbles: true }));
      }
    },
    [disabled],
  );

  return (
    <InternalUpload ref={mergedRef} disabled={disabled} {...rest}>
      <div
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/20 px-6 py-8 text-center transition-colors",
          isDragOver && "border-primary bg-primary/5",
          disabled && "cursor-not-allowed opacity-50",
          !disabled && "hover:border-primary/50",
          className,
        )}
        style={{ ...style, ...(height ? { height } : {}) }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {children ?? (
          <>
            <InboxIcon className="mb-3 size-12 text-primary/60" />
            <p className="mb-1 text-base font-medium text-foreground">
              Click or drag file to this area to upload
            </p>
            <p className="text-sm text-muted-foreground">
              Support for a single or bulk upload.
            </p>
          </>
        )}
      </div>
    </InternalUpload>
  );
});

Dragger.displayName = "Upload.Dragger";

export { Dragger };
