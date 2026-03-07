"use client";

import * as React from "react";
import { Button } from "@/components/button";
import { InternalDropdown } from "./Dropdown";
import type { DropdownButtonProps } from "./types";

const EllipsisIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const DropdownButton = React.forwardRef<HTMLDivElement, DropdownButtonProps>(
  (props, ref) => {
    const {
      icon,
      size = "middle",
      type = "default",
      onClick,
      danger = false,
      loading = false,
      children,
      menu,
      trigger,
      placement,
      open,
      onOpenChange,
      disabled = false,
      overlayClassName,
    } = props;

    return (
      <div ref={ref} data-slot="dropdown-button" className="inline-flex">
        <Button
          type={type}
          size={size}
          danger={danger}
          loading={loading}
          disabled={disabled}
          onClick={onClick}
          className="rounded-r-none border-r-0"
        >
          {children}
        </Button>
        <InternalDropdown
          menu={menu}
          trigger={trigger}
          placement={placement}
          open={open}
          onOpenChange={onOpenChange}
          disabled={disabled || loading}
          overlayClassName={overlayClassName}
        >
          <Button
            type={type}
            size={size}
            danger={danger}
            disabled={disabled || loading}
            className="rounded-l-none px-2"
            icon={icon ?? <EllipsisIcon />}
          />
        </InternalDropdown>
      </div>
    );
  }
);

DropdownButton.displayName = "Dropdown.Button";

export { DropdownButton };
