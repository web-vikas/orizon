"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { LayoutProps, HeaderProps, ContentProps, FooterProps } from "./types";

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

const InternalLayout = React.forwardRef<HTMLElement, LayoutProps>(
  (props, ref) => {
    const { hasSider, className, children, ...rest } = props;

    // Auto-detect sider presence
    const [autoHasSider, setAutoHasSider] = React.useState(false);

    const containsSider = hasSider ?? autoHasSider;

    // Children scan for Sider displayName
    React.useEffect(() => {
      let found = false;
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child)) {
          const childType = child.type as React.ComponentType & { displayName?: string };
          if (childType?.displayName === "Layout.Sider") {
            found = true;
          }
        }
      });
      setAutoHasSider(found);
    }, [children]);

    return (
      <section
        ref={ref}
        data-slot="layout"
        className={cn(
          "flex min-h-0",
          containsSider ? "flex-row" : "flex-col",
          "bg-background",
          className
        )}
        {...rest}
      >
        {children}
      </section>
    );
  }
);

InternalLayout.displayName = "Layout";

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

const Header = React.forwardRef<HTMLElement, HeaderProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <header
      ref={ref}
      data-slot="layout-header"
      className={cn(
        "flex h-16 items-center px-6 shrink-0",
        "bg-background border-b border-border",
        className
      )}
      {...rest}
    >
      {children}
    </header>
  );
});

Header.displayName = "Layout.Header";

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const Content = React.forwardRef<HTMLElement, ContentProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <main
      ref={ref}
      data-slot="layout-content"
      className={cn("flex-1 min-h-0 p-6", className)}
      {...rest}
    >
      {children}
    </main>
  );
});

Content.displayName = "Layout.Content";

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

const Footer = React.forwardRef<HTMLElement, FooterProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <footer
      ref={ref}
      data-slot="layout-footer"
      className={cn(
        "flex items-center px-6 py-4 shrink-0",
        "bg-background border-t border-border text-sm text-muted-foreground",
        className
      )}
      {...rest}
    >
      {children}
    </footer>
  );
});

Footer.displayName = "Layout.Footer";

export { InternalLayout, Header, Content, Footer };
