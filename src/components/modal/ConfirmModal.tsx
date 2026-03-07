"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  CircleHelpIcon,
} from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Button as ShadcnButton } from "@/primitives/button";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import { XIcon } from "lucide-react";
import type { ModalStaticConfig } from "./types";

const TYPE_ICON_MAP: Record<string, React.ReactNode> = {
  confirm: <CircleHelpIcon className="size-5 text-blue-500" />,
  info: <InfoIcon className="size-5 text-blue-500" />,
  success: <CircleCheckIcon className="size-5 text-green-500" />,
  error: <CircleXIcon className="size-5 text-red-500" />,
  warning: <TriangleAlertIcon className="size-5 text-yellow-500" />,
};

interface ConfirmModalProps extends ModalStaticConfig {
  open: boolean;
  onInternalClose: () => void;
}

export function ConfirmModal({
  open,
  onInternalClose,
  type = "confirm",
  title,
  content,
  icon,
  onOk,
  onCancel,
  okText = "OK",
  cancelText = "Cancel",
  okType = "primary",
  okButtonProps,
  cancelButtonProps,
  closable = false,
  closeIcon,
  confirmLoading = false,
  width = 416,
  centered = false,
  mask = true,
  maskClosable = false,
  zIndex,
  className,
  style,
}: ConfirmModalProps) {
  const handleOk = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onOk?.(e);
      onInternalClose();
    },
    [onOk, onInternalClose]
  );

  const handleCancel = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onCancel?.(e);
      onInternalClose();
    },
    [onCancel, onInternalClose]
  );

  const iconNode = icon ?? TYPE_ICON_MAP[type ?? "confirm"];
  const widthStyle = typeof width === "number" ? `${width}px` : width;

  const showCancel = type === "confirm";

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          handleCancel({} as React.MouseEvent<HTMLButtonElement>);
        }
      }}
      disablePointerDismissal={!maskClosable}
    >
      <DialogPrimitive.Portal>
        {mask && (
          <DialogPrimitive.Backdrop
            className="fixed inset-0 isolate z-50 bg-black/45 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
            style={zIndex ? { zIndex } : undefined}
          />
        )}
        <DialogPrimitive.Popup
          data-slot="confirm-modal-content"
          className={cn(
            "fixed top-1/2 left-1/2 z-50 w-full -translate-x-1/2 -translate-y-1/2 rounded-xl bg-background p-6 text-sm ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            centered ? "top-1/2" : "top-[100px] translate-y-0",
            className
          )}
          style={{
            maxWidth: widthStyle,
            ...(zIndex ? { zIndex } : {}),
            ...style,
          }}
        >
          {closable && (
            <DialogPrimitive.Close
              render={
                <ShadcnButton
                  variant="ghost"
                  className="absolute top-3 right-3"
                  size="icon-sm"
                />
              }
            >
              {closeIcon ?? <XIcon className="size-4" />}
              <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
          )}

          <div className="flex gap-3">
            {iconNode && (
              <span className="mt-0.5 flex-shrink-0">{iconNode}</span>
            )}
            <div className="flex-1 space-y-2">
              {title && (
                <DialogPrimitive.Title className="text-base font-semibold leading-tight">
                  {title}
                </DialogPrimitive.Title>
              )}
              {content && (
                <div className="text-sm text-muted-foreground">{content}</div>
              )}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-2">
            {showCancel && (
              <Button
                type="default"
                onClick={handleCancel}
                {...cancelButtonProps}
              >
                {cancelText}
              </Button>
            )}
            <Button
              type={okType}
              loading={confirmLoading}
              onClick={handleOk}
              {...okButtonProps}
            >
              {okText}
            </Button>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
