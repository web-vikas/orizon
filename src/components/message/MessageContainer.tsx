"use client";

import * as React from "react";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MessageInstance, MessageType } from "./types";

const TYPE_ICON_MAP: Record<MessageType, React.ReactNode> = {
  success: <CircleCheckIcon className="size-4 text-green-500" />,
  info: <InfoIcon className="size-4 text-blue-500" />,
  warning: <TriangleAlertIcon className="size-4 text-yellow-500" />,
  error: <CircleXIcon className="size-4 text-red-500" />,
  loading: <Loader2Icon className="size-4 animate-spin text-blue-500" />,
};

interface MessageContainerProps {
  messages: MessageInstance[];
  top?: number;
}

export function MessageContainer({ messages, top = 8 }: MessageContainerProps) {
  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[1010] flex flex-col items-center gap-2"
      style={{ top }}
    >
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-lg bg-background px-4 py-2.5 text-sm shadow-lg ring-1 ring-foreground/10 transition-all duration-200",
            msg.closing
              ? "translate-y-[-10px] opacity-0"
              : "translate-y-0 opacity-100 animate-in fade-in-0 slide-in-from-top-2"
          )}
          style={msg.config.style}
          onClick={msg.config.onClick}
        >
          {msg.config.icon ?? TYPE_ICON_MAP[msg.type]}
          <span>{msg.config.content}</span>
        </div>
      ))}
    </div>
  );
}
