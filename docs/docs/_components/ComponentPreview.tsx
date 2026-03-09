import "./preview.css";
import type { ReactNode } from "react";

interface ComponentPreviewProps {
  children: ReactNode;
  title?: string;
}

export function ComponentPreview({ children, title }: ComponentPreviewProps) {
  return (
    <div
      style={{
        border: "1px solid var(--rp-c-divider)",
        borderRadius: "8px",
        marginBottom: "16px",
        overflow: "hidden",
      }}
    >
      {title && (
        <div
          style={{
            padding: "8px 16px",
            fontSize: "13px",
            fontWeight: 500,
            color: "var(--rp-c-text-2)",
            borderBottom: "1px solid var(--rp-c-divider)",
            background: "var(--rp-c-bg-soft)",
          }}
        >
          {title}
        </div>
      )}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          background: "var(--rp-c-bg)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
