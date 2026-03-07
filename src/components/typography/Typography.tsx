/**
 * @file Typography -- rich text display with Title, Text, Paragraph,
 * and Link sub-components.
 *
 * Provides semantic text rendering with built-in copy-to-clipboard,
 * inline editing, text ellipsis with expand, and decorative
 * modifiers (mark, code, keyboard, underline, delete, strong, italic).
 *
 * Sub-components:
 * - `Typography.Title` -- heading levels 1-5
 * - `Typography.Text` -- inline span
 * - `Typography.Paragraph` -- block paragraph
 * - `Typography.Link` -- anchor link
 *
 * Key props: `type`, `copyable`, `editable`, `ellipsis`.
 *
 * @example
 * ```tsx
 * <Typography.Title level={2}>Heading</Typography.Title>
 * <Typography.Text type="success">Success text</Typography.Text>
 * <Typography.Paragraph copyable>Copy me</Typography.Paragraph>
 * <Typography.Link href="https://example.com">Link</Typography.Link>
 * ```
 *
 * @see {@link ./types.ts} for prop definitions.
 * @see {@link ./index.ts} for the public export.
 */
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type {
  TypographyType,
  CopyableConfig,
  EditableConfig,
  EllipsisConfig,
  TypographyTitleProps,
  TypographyTextProps,
  TypographyParagraphProps,
  TypographyLinkProps,
} from "./types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const TYPE_CLASS_MAP: Record<TypographyType, string> = {
  secondary: "text-muted-foreground",
  success: "text-green-600",
  warning: "text-yellow-600",
  danger: "text-destructive",
};

const TITLE_SIZE_MAP: Record<number, string> = {
  1: "text-4xl font-bold tracking-tight",
  2: "text-3xl font-semibold tracking-tight",
  3: "text-2xl font-semibold",
  4: "text-xl font-semibold",
  5: "text-lg font-semibold",
};

// ---------------------------------------------------------------------------
// Copy Icon
// ---------------------------------------------------------------------------

const CopyIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5"
  >
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5 text-green-500"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const EditIcon: React.FC = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-3.5"
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    <path d="m15 5 4 4" />
  </svg>
);

// ---------------------------------------------------------------------------
// CopyButton
// ---------------------------------------------------------------------------

function CopyButton({
  textToCopy,
  config,
}: {
  textToCopy: string;
  config: CopyableConfig;
}) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      const text = config.text ?? textToCopy;
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        config.onCopy?.(e);
        setTimeout(() => setCopied(false), 2000);
      });
    },
    [config, textToCopy],
  );

  const iconPair = config.icon;
  const tooltipPair = config.tooltips;

  const currentIcon = copied
    ? (iconPair?.[1] ?? <CheckIcon />)
    : (iconPair?.[0] ?? <CopyIcon />);

  const currentTooltip = copied
    ? (tooltipPair?.[1] ?? "Copied")
    : (tooltipPair?.[0] ?? "Copy");

  return (
    <button
      type="button"
      className="group/copy relative ml-1 inline-flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
      onClick={handleCopy}
      aria-label="Copy"
    >
      {currentIcon}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-1.5 py-0.5 text-xs text-background opacity-0 transition-opacity group-hover/copy:opacity-100">
        {currentTooltip}
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Editable textarea
// ---------------------------------------------------------------------------

function EditableTextArea({
  value,
  config,
}: {
  value: string;
  config: EditableConfig;
}) {
  const [text, setText] = React.useState(value);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    textareaRef.current?.focus();
    textareaRef.current?.select();
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        config.onChange?.(text);
        config.onEnd?.();
      } else if (e.key === "Escape") {
        config.onCancel?.();
      }
    },
    [text, config],
  );

  const handleBlur = React.useCallback(() => {
    config.onChange?.(text);
    config.onEnd?.();
  }, [text, config]);

  const getAutoSizeProps = (): { minRows: number; maxRows: number } => {
    if (typeof config.autoSize === "object" && config.autoSize) {
      return {
        minRows: config.autoSize.minRows ?? 1,
        maxRows: config.autoSize.maxRows ?? 6,
      };
    }
    return { minRows: 1, maxRows: config.autoSize ? 999 : 1 };
  };

  const { minRows } = getAutoSizeProps();

  return (
    <span className="inline-flex items-center gap-1">
      <textarea
        ref={textareaRef}
        className="inline-block w-full resize-none rounded border border-primary bg-background px-1.5 py-0.5 text-inherit outline-none ring-1 ring-primary/20"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        rows={minRows}
        maxLength={config.maxLength}
      />
      {config.enterIcon !== undefined ? (
        config.enterIcon
      ) : (
        <span className="text-xs text-muted-foreground">Enter</span>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// wrapContent – applies mark, code, delete, underline, strong, italic
// ---------------------------------------------------------------------------

function wrapContent(
  content: React.ReactNode,
  options: {
    mark?: boolean;
    code?: boolean;
    keyboard?: boolean;
    underline?: boolean;
    del?: boolean;
    strong?: boolean;
    italic?: boolean;
  },
): React.ReactNode {
  let wrapped = content;
  if (options.strong) wrapped = <strong>{wrapped}</strong>;
  if (options.italic) wrapped = <em>{wrapped}</em>;
  if (options.underline) wrapped = <u>{wrapped}</u>;
  if (options.del) wrapped = <del>{wrapped}</del>;
  if (options.mark) wrapped = <mark className="bg-yellow-200 px-0.5 dark:bg-yellow-800">{wrapped}</mark>;
  if (options.code) {
    wrapped = (
      <code className="rounded bg-muted px-1 py-0.5 font-mono text-[0.875em]">{wrapped}</code>
    );
  }
  if (options.keyboard) {
    wrapped = (
      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.875em] shadow-sm">
        {wrapped}
      </kbd>
    );
  }
  return wrapped;
}

// ---------------------------------------------------------------------------
// getEllipsisStyle
// ---------------------------------------------------------------------------

function getEllipsisStyle(ellipsis: boolean | EllipsisConfig | undefined): React.CSSProperties {
  if (!ellipsis) return {};
  const rows = typeof ellipsis === "object" ? (ellipsis.rows ?? 1) : 1;
  if (rows === 1) {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };
  }
  return {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: rows,
    WebkitBoxOrient: "vertical",
  };
}

// ---------------------------------------------------------------------------
// getTextContent – extract text from children for copy
// ---------------------------------------------------------------------------

function getTextContent(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(getTextContent).join("");
  if (React.isValidElement(children) && children.props) {
    return getTextContent((children.props as { children?: React.ReactNode }).children);
  }
  return "";
}

// ---------------------------------------------------------------------------
// Title
// ---------------------------------------------------------------------------

const Title: React.FC<TypographyTitleProps> = ({
  level = 1,
  type,
  copyable,
  editable,
  ellipsis,
  mark,
  code,
  underline,
  delete: del,
  strong,
  italic,
  disabled,
  children,
  className,
  style,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

  const editConfig: EditableConfig | undefined =
    editable === true ? {} : editable === false ? undefined : editable;
  const copyConfig: CopyableConfig | undefined =
    copyable === true ? {} : copyable === false ? undefined : copyable;
  const ellipsisConfig: EllipsisConfig | undefined =
    ellipsis === true ? {} : ellipsis === false ? undefined : ellipsis;

  const isControlledEditing = editConfig?.editing !== undefined;

  const handleEditStart = React.useCallback(() => {
    if (!isControlledEditing) {
      setIsEditing(true);
    }
    editConfig?.onStart?.();
  }, [isControlledEditing, editConfig]);

  const editableResolved: EditableConfig | undefined = editConfig
    ? {
        ...editConfig,
        onEnd: () => {
          if (!isControlledEditing) setIsEditing(false);
          editConfig.onEnd?.();
        },
        onCancel: () => {
          if (!isControlledEditing) setIsEditing(false);
          editConfig.onCancel?.();
        },
      }
    : undefined;

  const editing = isControlledEditing ? editConfig?.editing : isEditing;

  const triggerTypes = editConfig?.triggerType ?? ["icon"];

  if (editing && editableResolved) {
    return (
      <Tag
        className={cn(TITLE_SIZE_MAP[level], type && TYPE_CLASS_MAP[type], className)}
        style={style}
      >
        <EditableTextArea value={getTextContent(children)} config={editableResolved} />
      </Tag>
    );
  }

  const ellipsisStyle = expanded ? {} : getEllipsisStyle(ellipsis);

  const textContent = getTextContent(children);
  const wrappedChildren = wrapContent(children, { mark, code, underline, del, strong, italic });

  return (
    <Tag
      className={cn(
        TITLE_SIZE_MAP[level],
        type && TYPE_CLASS_MAP[type],
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      style={{ ...ellipsisStyle, ...style }}
      onClick={
        editConfig && triggerTypes.includes("text") ? handleEditStart : undefined
      }
    >
      {wrappedChildren}
      {ellipsisConfig?.suffix}
      {ellipsisConfig?.expandable && !expanded && (
        <button
          type="button"
          className="ml-1 cursor-pointer text-primary"
          onClick={(e) => {
            setExpanded(true);
            ellipsisConfig.onExpand?.(e);
          }}
        >
          ...expand
        </button>
      )}
      {editConfig && triggerTypes.includes("icon") && (
        <button
          type="button"
          className="ml-1 inline-flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
          onClick={handleEditStart}
          aria-label="Edit"
        >
          {editConfig.icon ?? <EditIcon />}
        </button>
      )}
      {copyConfig && <CopyButton textToCopy={textContent} config={copyConfig} />}
    </Tag>
  );
};

Title.displayName = "Typography.Title";

// ---------------------------------------------------------------------------
// Text
// ---------------------------------------------------------------------------

const Text: React.FC<TypographyTextProps> = ({
  type,
  copyable,
  editable,
  ellipsis,
  mark,
  code,
  keyboard,
  underline,
  delete: del,
  strong,
  italic,
  disabled,
  children,
  className,
  style,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const editConfig: EditableConfig | undefined =
    editable === true ? {} : editable === false ? undefined : editable;
  const copyConfig: CopyableConfig | undefined =
    copyable === true ? {} : copyable === false ? undefined : copyable;
  const ellipsisConfig: EllipsisConfig | undefined =
    ellipsis === true ? {} : ellipsis === false ? undefined : ellipsis;

  const isControlledEditing = editConfig?.editing !== undefined;

  const handleEditStart = React.useCallback(() => {
    if (!isControlledEditing) {
      setIsEditing(true);
    }
    editConfig?.onStart?.();
  }, [isControlledEditing, editConfig]);

  const editableResolved: EditableConfig | undefined = editConfig
    ? {
        ...editConfig,
        onEnd: () => {
          if (!isControlledEditing) setIsEditing(false);
          editConfig.onEnd?.();
        },
        onCancel: () => {
          if (!isControlledEditing) setIsEditing(false);
          editConfig.onCancel?.();
        },
      }
    : undefined;

  const editing = isControlledEditing ? editConfig?.editing : isEditing;

  const triggerTypes = editConfig?.triggerType ?? ["icon"];

  if (editing && editableResolved) {
    return (
      <span
        className={cn("text-sm", type && TYPE_CLASS_MAP[type], className)}
        style={style}
      >
        <EditableTextArea value={getTextContent(children)} config={editableResolved} />
      </span>
    );
  }

  const ellipsisStyle = expanded ? {} : getEllipsisStyle(ellipsis);

  const textContent = getTextContent(children);
  const wrappedChildren = wrapContent(children, { mark, code, keyboard, underline, del, strong, italic });

  return (
    <span
      className={cn(
        type && TYPE_CLASS_MAP[type],
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      style={{ ...ellipsisStyle, ...style }}
      onClick={
        editConfig && triggerTypes.includes("text") ? handleEditStart : undefined
      }
    >
      {wrappedChildren}
      {ellipsisConfig?.suffix}
      {ellipsisConfig?.expandable && !expanded && (
        <button
          type="button"
          className="ml-1 cursor-pointer text-primary"
          onClick={(e) => {
            setExpanded(true);
            ellipsisConfig.onExpand?.(e);
          }}
        >
          ...expand
        </button>
      )}
      {editConfig && triggerTypes.includes("icon") && (
        <button
          type="button"
          className="ml-1 inline-flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
          onClick={handleEditStart}
          aria-label="Edit"
        >
          {editConfig.icon ?? <EditIcon />}
        </button>
      )}
      {copyConfig && <CopyButton textToCopy={textContent} config={copyConfig} />}
    </span>
  );
};

Text.displayName = "Typography.Text";

// ---------------------------------------------------------------------------
// Paragraph
// ---------------------------------------------------------------------------

const Paragraph: React.FC<TypographyParagraphProps> = ({
  type,
  copyable,
  editable,
  ellipsis,
  mark,
  code,
  underline,
  delete: del,
  strong,
  italic,
  disabled,
  children,
  className,
  style,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const editConfig: EditableConfig | undefined =
    editable === true ? {} : editable === false ? undefined : editable;
  const copyConfig: CopyableConfig | undefined =
    copyable === true ? {} : copyable === false ? undefined : copyable;
  const ellipsisConfig: EllipsisConfig | undefined =
    ellipsis === true ? {} : ellipsis === false ? undefined : ellipsis;

  const isControlledEditing = editConfig?.editing !== undefined;

  const handleEditStart = React.useCallback(() => {
    if (!isControlledEditing) {
      setIsEditing(true);
    }
    editConfig?.onStart?.();
  }, [isControlledEditing, editConfig]);

  const editableResolved: EditableConfig | undefined = editConfig
    ? {
        ...editConfig,
        onEnd: () => {
          if (!isControlledEditing) setIsEditing(false);
          editConfig.onEnd?.();
        },
        onCancel: () => {
          if (!isControlledEditing) setIsEditing(false);
          editConfig.onCancel?.();
        },
      }
    : undefined;

  const editing = isControlledEditing ? editConfig?.editing : isEditing;

  const triggerTypes = editConfig?.triggerType ?? ["icon"];

  if (editing && editableResolved) {
    return (
      <div
        className={cn(type && TYPE_CLASS_MAP[type], className)}
        style={style}
      >
        <EditableTextArea value={getTextContent(children)} config={editableResolved} />
      </div>
    );
  }

  const ellipsisStyle = expanded ? {} : getEllipsisStyle(ellipsis);

  const textContent = getTextContent(children);
  const wrappedChildren = wrapContent(children, { mark, code, underline, del, strong, italic });

  return (
    <div
      className={cn(
        type && TYPE_CLASS_MAP[type],
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
        className,
      )}
      style={{ ...ellipsisStyle, ...style }}
      onClick={
        editConfig && triggerTypes.includes("text") ? handleEditStart : undefined
      }
    >
      {wrappedChildren}
      {ellipsisConfig?.suffix}
      {ellipsisConfig?.expandable && !expanded && (
        <button
          type="button"
          className="ml-1 cursor-pointer text-primary"
          onClick={(e) => {
            setExpanded(true);
            ellipsisConfig.onExpand?.(e);
          }}
        >
          ...expand
        </button>
      )}
      {editConfig && triggerTypes.includes("icon") && (
        <button
          type="button"
          className="ml-1 inline-flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
          onClick={handleEditStart}
          aria-label="Edit"
        >
          {editConfig.icon ?? <EditIcon />}
        </button>
      )}
      {copyConfig && <CopyButton textToCopy={textContent} config={copyConfig} />}
    </div>
  );
};

Paragraph.displayName = "Typography.Paragraph";

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------

const Link: React.FC<TypographyLinkProps> = ({
  type,
  copyable,
  ellipsis,
  href,
  target,
  children,
  className,
  style,
}) => {
  const [expanded, setExpanded] = React.useState(false);

  const copyConfig: CopyableConfig | undefined =
    copyable === true ? {} : copyable === false ? undefined : copyable;
  const ellipsisConfig: EllipsisConfig | undefined =
    ellipsis === true ? {} : ellipsis === false ? undefined : ellipsis;

  const ellipsisStyle = expanded ? {} : getEllipsisStyle(ellipsis);

  const textContent = getTextContent(children);

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={cn(
        "text-primary underline-offset-4 hover:underline",
        type && TYPE_CLASS_MAP[type],
        className,
      )}
      style={{ ...ellipsisStyle, ...style }}
    >
      {children}
      {ellipsisConfig?.suffix}
      {ellipsisConfig?.expandable && !expanded && (
        <button
          type="button"
          className="ml-1 cursor-pointer text-primary"
          onClick={(e) => {
            e.preventDefault();
            setExpanded(true);
            ellipsisConfig.onExpand?.(e);
          }}
        >
          ...expand
        </button>
      )}
      {copyConfig && <CopyButton textToCopy={textContent} config={copyConfig} />}
    </a>
  );
};

Link.displayName = "Typography.Link";

// ---------------------------------------------------------------------------
// Typography (container)
// ---------------------------------------------------------------------------

const InternalTypography: React.FC<{
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}> = ({ children, className, style }) => (
  <article className={cn(className)} style={style}>
    {children}
  </article>
);

InternalTypography.displayName = "Typography";

export { InternalTypography, Title, Text, Paragraph, Link };
