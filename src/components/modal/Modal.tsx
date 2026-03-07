"use client";

import * as React from "react";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Button as ShadcnButton } from "@/primitives/button";
import { cn } from "@/lib/utils";
import { Button } from "@/components/button";
import type { ModalProps } from "./types";

const InternalModal = React.forwardRef<HTMLDivElement, ModalProps>(
  (props, ref) => {
    const {
      open = false,
      onOk,
      onCancel,
      title,
      footer,
      width = 520,
      centered = false,
      closable = true,
      closeIcon,
      confirmLoading = false,
      destroyOnHidden = false,
      mask = true,
      maskClosable = true,
      okText = "OK",
      cancelText = "Cancel",
      okType = "primary",
      okButtonProps,
      cancelButtonProps,
      afterClose,
      afterOpenChange,
      zIndex,
      loading = false,
      modalRender,
      wrapClassName,
      children,
      className,
      style,
    } = props;

    const [internalOpen, setInternalOpen] = React.useState(open);

    React.useEffect(() => {
      setInternalOpen(open);
    }, [open]);

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (!nextOpen) {
          onCancel?.(
            {} as React.MouseEvent<HTMLButtonElement>
          );
        }
        setInternalOpen(nextOpen);
        afterOpenChange?.(nextOpen);
        if (!nextOpen) {
          afterClose?.();
        }
      },
      [onCancel, afterOpenChange, afterClose]
    );

    const handleOk = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onOk?.(e);
      },
      [onOk]
    );

    const handleCancel = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onCancel?.(e);
        setInternalOpen(false);
      },
      [onCancel]
    );

    // Cancel button component for footer render function
    const CancelBtn: React.FC = React.useCallback(
      () => (
        <Button
          type="default"
          onClick={handleCancel}
          {...cancelButtonProps}
        >
          {cancelText}
        </Button>
      ),
      [handleCancel, cancelButtonProps, cancelText]
    );

    // OK button component for footer render function
    const OkBtn: React.FC = React.useCallback(
      () => (
        <Button
          type={okType}
          loading={confirmLoading}
          onClick={handleOk}
          {...okButtonProps}
        >
          {okText}
        </Button>
      ),
      [okType, confirmLoading, handleOk, okButtonProps, okText]
    );

    // Build footer
    const defaultFooter = (
      <>
        <CancelBtn />
        <OkBtn />
      </>
    );

    let footerContent: React.ReactNode;
    if (footer === null) {
      footerContent = null;
    } else if (typeof footer === "function") {
      footerContent = footer(defaultFooter, { OkBtn, CancelBtn });
    } else if (footer !== undefined) {
      footerContent = footer;
    } else {
      footerContent = defaultFooter;
    }

    const widthStyle =
      typeof width === "number" ? `${width}px` : width;

    // Determine if we should render content or not when closed
    if (!internalOpen && destroyOnHidden) {
      return null;
    }

    const modalBody = loading ? (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    ) : (
      children
    );

    const modalContent = (
      <DialogPrimitive.Popup
        ref={ref}
        data-slot="modal-content"
        className={cn(
          "fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-0 text-sm ring-1 ring-foreground/10 duration-100 outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          centered ? "top-1/2" : "top-[100px] translate-y-0",
          wrapClassName,
          className
        )}
        style={{
          maxWidth: widthStyle,
          ...(zIndex ? { zIndex } : {}),
          ...style,
        }}
      >
        {/* Header */}
        {(title || closable) && (
          <div className="flex items-center justify-between border-b px-6 py-4">
            {title && (
              <DialogPrimitive.Title className="text-base font-semibold leading-none">
                {title}
              </DialogPrimitive.Title>
            )}
            {closable && (
              <DialogPrimitive.Close
                render={
                  <ShadcnButton
                    variant="ghost"
                    className="ml-auto -mr-2"
                    size="icon-sm"
                  />
                }
              >
                {closeIcon ?? <XIcon className="size-4" />}
                <span className="sr-only">Close</span>
              </DialogPrimitive.Close>
            )}
          </div>
        )}

        {/* Body */}
        <div className="px-6 py-2">{modalBody}</div>

        {/* Footer */}
        {footerContent !== null && (
          <div className="flex items-center justify-end gap-2 border-t px-6 py-3">
            {footerContent}
          </div>
        )}
      </DialogPrimitive.Popup>
    );

    const renderedContent = modalRender
      ? modalRender(modalContent)
      : modalContent;

    return (
      <DialogPrimitive.Root
        open={internalOpen}
        onOpenChange={handleOpenChange}
        disablePointerDismissal={!maskClosable}
      >
        <DialogPrimitive.Portal>
          {mask && (
            <DialogPrimitive.Backdrop
              className={cn(
                "fixed inset-0 isolate z-50 bg-black/45 duration-100 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0"
              )}
              style={zIndex ? { zIndex } : undefined}
            />
          )}
          {renderedContent}
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

InternalModal.displayName = "Modal";

export { InternalModal };
