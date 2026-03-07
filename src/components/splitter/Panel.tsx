"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { SplitterPanelProps } from "./types";

const Panel = React.forwardRef<HTMLDivElement, SplitterPanelProps>(
  (props, ref) => {
    const { children, className, style } = props;

    return (
      <div
        ref={ref}
        data-slot="splitter-panel"
        className={cn("overflow-auto", className)}
        style={style}
      >
        {children}
      </div>
    );
  },
);

Panel.displayName = "Splitter.Panel";

export { Panel };
