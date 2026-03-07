/**
 * @file Alert Error Boundary
 *
 * A React class-based error boundary that catches render errors
 * in its children and displays them as an error `<Alert>`. Used
 * via `Alert.ErrorBoundary`.
 *
 * @see {@link ./Alert.tsx} — main Alert component
 * @see {@link ./types.ts} — prop definitions
 */

"use client";

import * as React from "react";
import { InternalAlert } from "./Alert";
import type { AlertErrorBoundaryProps } from "./types";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class AlertErrorBoundary extends React.Component<
  AlertErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: AlertErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <InternalAlert
          type="error"
          message={this.props.message ?? "Something went wrong"}
          description={
            this.props.description ?? this.state.error?.message ?? ""
          }
          showIcon
        />
      );
    }

    return this.props.children;
  }
}

export { AlertErrorBoundary };
