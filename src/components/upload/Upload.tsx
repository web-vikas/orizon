"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  UploadProps,
  UploadFile,
  UploadChangeInfo,
  UploadListType,
} from "./types";

// ---------------------------------------------------------------------------
// Icons (inline SVGs to avoid unused imports)
// ---------------------------------------------------------------------------

function FileIcon({ className }: { className?: string }) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function PlusIcon({ className }: { className?: string }) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function EyeIcon({ className }: { className?: string }) {
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
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

let uidCounter = 0;
function generateUid(): string {
  uidCounter += 1;
  return `upload-${Date.now()}-${uidCounter}`;
}

function fileToUploadFile(file: File): UploadFile {
  return {
    uid: generateUid(),
    name: file.name,
    size: file.size,
    type: file.type,
    status: "uploading",
    percent: 0,
    originFileObj: file,
  };
}

function isImageFile(file: UploadFile): boolean {
  if (file.type?.startsWith("image/")) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg"].includes(ext);
}

// ---------------------------------------------------------------------------
// FileListItem
// ---------------------------------------------------------------------------

interface FileListItemProps {
  file: UploadFile;
  listType: UploadListType;
  onRemove: (file: UploadFile) => void;
  onPreview?: (file: UploadFile) => void;
  showPreviewIcon: boolean;
  showRemoveIcon: boolean;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  listType,
  onRemove,
  onPreview,
  showPreviewIcon,
  showRemoveIcon,
}) => {
  const thumbSrc = file.thumbUrl ?? file.url;

  // -- picture-card / picture-circle layout --
  if (listType === "picture-card" || listType === "picture-circle") {
    const isCircle = listType === "picture-circle";
    return (
      <div
        className={cn(
          "group relative flex items-center justify-center overflow-hidden border border-border bg-muted/30",
          isCircle
            ? "size-[104px] rounded-full"
            : "size-[104px] rounded-lg",
          file.status === "error" && "border-destructive",
        )}
      >
        {file.status === "uploading" ? (
          <div className="flex flex-col items-center gap-1">
            <LoaderIcon className="size-5 text-muted-foreground" />
            {file.percent != null && (
              <span className="text-xs text-muted-foreground">
                {Math.round(file.percent)}%
              </span>
            )}
          </div>
        ) : thumbSrc && isImageFile(file) ? (
          <img
            src={thumbSrc}
            alt={file.name}
            className="size-full object-cover"
          />
        ) : (
          <FileIcon className="size-8 text-muted-foreground" />
        )}

        {/* Overlay actions */}
        {file.status !== "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
            {showPreviewIcon && onPreview && (
              <button
                type="button"
                className="rounded-full p-1 text-white hover:text-white/80"
                onClick={() => onPreview(file)}
              >
                <EyeIcon className="size-4" />
              </button>
            )}
            {showRemoveIcon && (
              <button
                type="button"
                className="rounded-full p-1 text-white hover:text-white/80"
                onClick={() => onRemove(file)}
              >
                <XIcon className="size-4" />
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // -- picture layout --
  if (listType === "picture") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-lg border border-border px-2 py-1.5",
          file.status === "error" && "border-destructive text-destructive",
        )}
      >
        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded bg-muted/30">
          {thumbSrc && isImageFile(file) ? (
            <img
              src={thumbSrc}
              alt={file.name}
              className="size-full object-cover"
            />
          ) : (
            <FileIcon className="size-6 text-muted-foreground" />
          )}
        </div>
        <span className="min-w-0 flex-1 truncate text-sm">{file.name}</span>
        {file.status === "uploading" && (
          <LoaderIcon className="size-4 shrink-0 text-muted-foreground" />
        )}
        {file.status === "done" && (
          <CheckCircleIcon className="size-4 shrink-0 text-green-500" />
        )}
        {file.status === "error" && (
          <XIcon className="size-4 shrink-0 text-destructive" />
        )}
        {showRemoveIcon && (
          <button
            type="button"
            className="shrink-0 rounded p-0.5 text-muted-foreground hover:text-foreground"
            onClick={() => onRemove(file)}
          >
            <XIcon className="size-3.5" />
          </button>
        )}
      </div>
    );
  }

  // -- text layout (default) --
  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded px-2 py-1 hover:bg-muted/50",
        file.status === "error" && "text-destructive",
      )}
    >
      <FileIcon className="size-4 shrink-0 text-muted-foreground" />
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-sm",
          onPreview && "cursor-pointer hover:text-primary",
        )}
        onClick={onPreview ? () => onPreview(file) : undefined}
      >
        {file.name}
      </span>
      {file.status === "uploading" && (
        <LoaderIcon className="size-3.5 shrink-0 text-muted-foreground" />
      )}
      {file.status === "done" && (
        <CheckCircleIcon className="size-3.5 shrink-0 text-green-500" />
      )}
      {file.status === "error" && (
        <XIcon className="size-3.5 shrink-0 text-destructive" />
      )}
      {showRemoveIcon && (
        <button
          type="button"
          className="shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
          onClick={() => onRemove(file)}
        >
          <XIcon className="size-3.5" />
        </button>
      )}
      {file.status === "uploading" && file.percent != null && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${file.percent}%` }}
          />
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// InternalUpload
// ---------------------------------------------------------------------------

const InternalUpload = React.forwardRef<HTMLDivElement, UploadProps>(
  (props, ref) => {
    const {
      accept,
      action,
      beforeUpload,
      customRequest,
      fileList: fileListProp,
      defaultFileList = [],
      onChange,
      onRemove,
      onPreview,
      listType = "text",
      multiple = false,
      maxCount,
      disabled = false,
      showUploadList = true,
      directory = false,
      name: inputName = "file",
      headers,
      data,
      children,
      className,
      style,
    } = props;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const [internalFileList, setInternalFileList] =
      React.useState<UploadFile[]>(defaultFileList);
    const fileList = fileListProp ?? internalFileList;

    const showList = showUploadList !== false;
    const showPreviewIcon =
      typeof showUploadList === "object"
        ? showUploadList.showPreviewIcon !== false
        : true;
    const showRemoveIcon =
      typeof showUploadList === "object"
        ? showUploadList.showRemoveIcon !== false
        : true;

    const updateFileList = React.useCallback(
      (updater: (prev: UploadFile[]) => UploadFile[]) => {
        if (fileListProp === undefined) {
          setInternalFileList(updater);
        }
      },
      [fileListProp],
    );

    const triggerChange = React.useCallback(
      (info: UploadChangeInfo) => {
        onChange?.(info);
      },
      [onChange],
    );

    const doUpload = React.useCallback(
      (uploadFile: UploadFile, file: File) => {
        if (customRequest) {
          customRequest({
            file,
            onSuccess: (response) => {
              const updated: UploadFile = {
                ...uploadFile,
                status: "done",
                percent: 100,
                response,
              };
              updateFileList((prev) =>
                prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
              );
              triggerChange({
                file: updated,
                fileList: fileList.map((f) =>
                  f.uid === uploadFile.uid ? updated : f,
                ),
              });
            },
            onError: (error) => {
              const updated: UploadFile = {
                ...uploadFile,
                status: "error",
                error,
              };
              updateFileList((prev) =>
                prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
              );
              triggerChange({
                file: updated,
                fileList: fileList.map((f) =>
                  f.uid === uploadFile.uid ? updated : f,
                ),
              });
            },
            onProgress: (event) => {
              const updated: UploadFile = {
                ...uploadFile,
                status: "uploading",
                percent: event.percent,
              };
              updateFileList((prev) =>
                prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
              );
              triggerChange({
                file: updated,
                fileList: fileList.map((f) =>
                  f.uid === uploadFile.uid ? updated : f,
                ),
                event,
              });
            },
          });
          return;
        }

        // Default: simulate upload progress if action is provided
        if (action) {
          let percent = 0;
          const interval = setInterval(() => {
            percent = Math.min(percent + 10 + Math.random() * 20, 99);
            const updated: UploadFile = {
              ...uploadFile,
              percent,
              status: "uploading",
            };
            updateFileList((prev) =>
              prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
            );
            triggerChange({
              file: updated,
              fileList: fileList.map((f) =>
                f.uid === uploadFile.uid ? updated : f,
              ),
              event: { percent },
            });
          }, 200);

          const resolveAction =
            typeof action === "string" ? Promise.resolve(action) : action(file);

          resolveAction
            .then((url) => {
              const formData = new FormData();
              formData.append(inputName, file);
              if (data) {
                const extraData =
                  typeof data === "function" ? data(uploadFile) : data;
                Object.entries(extraData).forEach(([key, val]) => {
                  formData.append(key, val);
                });
              }
              return fetch(url, {
                method: "POST",
                headers,
                body: formData,
              });
            })
            .then((res) => {
              clearInterval(interval);
              const updated: UploadFile = {
                ...uploadFile,
                status: res.ok ? "done" : "error",
                percent: 100,
                response: res,
              };
              updateFileList((prev) =>
                prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
              );
              triggerChange({
                file: updated,
                fileList: fileList.map((f) =>
                  f.uid === uploadFile.uid ? updated : f,
                ),
              });
            })
            .catch((err) => {
              clearInterval(interval);
              const updated: UploadFile = {
                ...uploadFile,
                status: "error",
                error: err,
              };
              updateFileList((prev) =>
                prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
              );
              triggerChange({
                file: updated,
                fileList: fileList.map((f) =>
                  f.uid === uploadFile.uid ? updated : f,
                ),
              });
            });
        } else {
          // No action, just mark as done
          const updated: UploadFile = {
            ...uploadFile,
            status: "done",
            percent: 100,
          };
          updateFileList((prev) =>
            prev.map((f) => (f.uid === uploadFile.uid ? updated : f)),
          );
          triggerChange({
            file: updated,
            fileList: fileList.map((f) =>
              f.uid === uploadFile.uid ? updated : f,
            ),
          });
        }
      },
      [
        customRequest,
        action,
        inputName,
        headers,
        data,
        fileList,
        updateFileList,
        triggerChange,
      ],
    );

    const processFiles = React.useCallback(
      async (files: File[]) => {
        let filesToUpload = files;

        // Enforce maxCount
        if (maxCount != null) {
          const remaining = maxCount - fileList.length;
          if (remaining <= 0) return;
          filesToUpload = filesToUpload.slice(0, remaining);
        }

        for (const file of filesToUpload) {
          // beforeUpload check
          if (beforeUpload) {
            const result = await Promise.resolve(
              beforeUpload(file, filesToUpload),
            );
            if (result === false) continue;
          }

          const uploadFile = fileToUploadFile(file);

          // Generate thumb URL for images
          if (isImageFile(uploadFile)) {
            uploadFile.thumbUrl = URL.createObjectURL(file);
          }

          updateFileList((prev) => [...prev, uploadFile]);

          const newList = [...fileList, uploadFile];
          triggerChange({ file: uploadFile, fileList: newList });

          doUpload(uploadFile, file);
        }
      },
      [
        maxCount,
        fileList,
        beforeUpload,
        updateFileList,
        triggerChange,
        doUpload,
      ],
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        if (files.length > 0) {
          processFiles(files);
        }
        // Reset input so same file can be selected again
        e.target.value = "";
      },
      [processFiles],
    );

    const handleRemove = React.useCallback(
      async (file: UploadFile) => {
        if (onRemove) {
          const result = await Promise.resolve(onRemove(file));
          if (result === false) return;
        }
        const newList = fileList.filter((f) => f.uid !== file.uid);
        updateFileList(() => newList);
        triggerChange({
          file: { ...file, status: "removed" },
          fileList: newList,
        });
      },
      [onRemove, fileList, updateFileList, triggerChange],
    );

    const openFileDialog = React.useCallback(() => {
      if (disabled) return;
      inputRef.current?.click();
    }, [disabled]);

    const isCardOrCircle =
      listType === "picture-card" || listType === "picture-circle";

    const visibleFiles = fileList.filter((f) => f.status !== "removed");
    const canUploadMore = maxCount == null || visibleFiles.length < maxCount;

    return (
      <div ref={ref} className={cn("inline-block", className)} style={style}>
        {/* Hidden file input */}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={handleInputChange}
          disabled={disabled}
          {...(directory
            ? {
                webkitdirectory: "true",
                directory: "true",
              }
            : {})}
        />

        {isCardOrCircle ? (
          /* Card / Circle grid layout */
          <div className="flex flex-wrap gap-2">
            {showList &&
              visibleFiles.map((file) => (
                <FileListItem
                  key={file.uid}
                  file={file}
                  listType={listType}
                  onRemove={handleRemove}
                  onPreview={onPreview}
                  showPreviewIcon={showPreviewIcon}
                  showRemoveIcon={showRemoveIcon}
                />
              ))}
            {canUploadMore && (
              <button
                type="button"
                disabled={disabled}
                onClick={openFileDialog}
                className={cn(
                  "flex items-center justify-center border border-dashed border-border bg-muted/20 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
                  disabled && "cursor-not-allowed opacity-50",
                  listType === "picture-circle"
                    ? "size-[104px] rounded-full"
                    : "size-[104px] rounded-lg",
                )}
              >
                {children ?? (
                  <div className="flex flex-col items-center gap-1">
                    <PlusIcon className="size-6" />
                    <span className="text-xs">Upload</span>
                  </div>
                )}
              </button>
            )}
          </div>
        ) : (
          /* Text / Picture layout */
          <>
            {children && (
              <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                className={cn(
                  "inline-block cursor-pointer",
                  disabled && "cursor-not-allowed opacity-50",
                )}
                onClick={openFileDialog}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFileDialog();
                  }
                }}
              >
                {children}
              </div>
            )}
            {showList && visibleFiles.length > 0 && (
              <div className="mt-2 flex flex-col gap-1">
                {visibleFiles.map((file) => (
                  <FileListItem
                    key={file.uid}
                    file={file}
                    listType={listType}
                    onRemove={handleRemove}
                    onPreview={onPreview}
                    showPreviewIcon={showPreviewIcon}
                    showRemoveIcon={showRemoveIcon}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  },
);

InternalUpload.displayName = "Upload";

export { InternalUpload };
