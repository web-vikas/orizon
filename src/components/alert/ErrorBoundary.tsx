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
