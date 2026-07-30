"use client";

import { Loader2 } from "lucide-react";

interface ToolInvocation {
  toolName: string;
  state: string;
  result?: unknown;
  args?: Record<string, unknown>;
}

interface ToolCallIndicatorProps {
  tool: ToolInvocation;
}

function getLabel(toolName: string, args?: Record<string, unknown>): string {
  if (toolName === "str_replace_editor") {
    const command = args?.command as string | undefined;
    const path = args?.path as string | undefined;
    const filename = path ? path.split("/").pop() : undefined;

    switch (command) {
      case "create":
        return filename ? `Creating ${filename}` : "Creating file";
      case "str_replace":
      case "insert":
        return filename ? `Editing ${filename}` : "Editing file";
      case "view":
        return filename ? `Reading ${filename}` : "Reading file";
      default:
        return filename ? `Updating ${filename}` : "Updating file";
    }
  }

  if (toolName === "file_manager") {
    const command = args?.command as string | undefined;
    const path = args?.path as string | undefined;
    const newPath = args?.new_path as string | undefined;
    const filename = path ? path.split("/").pop() : undefined;
    const newFilename = newPath ? newPath.split("/").pop() : undefined;

    if (command === "delete") {
      return filename ? `Deleting ${filename}` : "Deleting file";
    }
    if (command === "rename") {
      return newFilename ? `Renaming to ${newFilename}` : "Renaming file";
    }
  }

  return toolName;
}

export function ToolCallIndicator({ tool }: ToolCallIndicatorProps) {
  const isDone = tool.state === "result" && tool.result != null;
  const label = getLabel(tool.toolName, tool.args);

  return (
    <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 bg-neutral-50 rounded-lg text-xs font-mono border border-neutral-200">
      {isDone ? (
        <div className="w-2 h-2 rounded-full bg-emerald-500" />
      ) : (
        <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
      )}
      <span className="text-neutral-700">{label}</span>
    </div>
  );
}
