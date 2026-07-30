import { test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ToolCallIndicator } from "../ToolCallIndicator";

function makeTool(
  toolName: string,
  args: Record<string, unknown>,
  state: "call" | "result" = "call",
  result?: unknown
) {
  return { toolName, args, state, result };
}

// str_replace_editor — create
test("shows 'Creating <filename>' for str_replace_editor create command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "create", path: "src/components/Button.tsx" })}
    />
  );
  expect(screen.getByText("Creating Button.tsx")).toBeDefined();
});

test("shows 'Creating file' when path is missing for create command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "create" })}
    />
  );
  expect(screen.getByText("Creating file")).toBeDefined();
});

// str_replace_editor — str_replace
test("shows 'Editing <filename>' for str_replace command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "str_replace", path: "src/App.tsx" })}
    />
  );
  expect(screen.getByText("Editing App.tsx")).toBeDefined();
});

// str_replace_editor — insert
test("shows 'Editing <filename>' for insert command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "insert", path: "src/index.ts" })}
    />
  );
  expect(screen.getByText("Editing index.ts")).toBeDefined();
});

// str_replace_editor — view
test("shows 'Reading <filename>' for view command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "view", path: "src/utils.ts" })}
    />
  );
  expect(screen.getByText("Reading utils.ts")).toBeDefined();
});

// str_replace_editor — unknown command
test("shows 'Updating <filename>' for unknown command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "undo_edit", path: "src/foo.tsx" })}
    />
  );
  expect(screen.getByText("Updating foo.tsx")).toBeDefined();
});

// file_manager — delete
test("shows 'Deleting <filename>' for file_manager delete command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("file_manager", { command: "delete", path: "src/old.tsx" })}
    />
  );
  expect(screen.getByText("Deleting old.tsx")).toBeDefined();
});

// file_manager — rename
test("shows 'Renaming to <filename>' for file_manager rename command", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("file_manager", { command: "rename", path: "src/old.tsx", new_path: "src/new.tsx" })}
    />
  );
  expect(screen.getByText("Renaming to new.tsx")).toBeDefined();
});

// Unknown tool falls back to tool name
test("falls back to tool name for unknown tools", () => {
  render(
    <ToolCallIndicator
      tool={makeTool("some_other_tool", {})}
    />
  );
  expect(screen.getByText("some_other_tool")).toBeDefined();
});

// Loading state shows spinner (no green dot)
test("shows spinner when tool is still running", () => {
  const { container } = render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "create", path: "src/Button.tsx" }, "call")}
    />
  );
  expect(container.querySelector(".animate-spin")).toBeDefined();
  expect(container.querySelector(".bg-emerald-500")).toBeNull();
});

// Done state shows green dot (no spinner)
test("shows green dot when tool has completed", () => {
  const { container } = render(
    <ToolCallIndicator
      tool={makeTool("str_replace_editor", { command: "create", path: "src/Button.tsx" }, "result", "ok")}
    />
  );
  expect(container.querySelector(".bg-emerald-500")).toBeDefined();
  expect(container.querySelector(".animate-spin")).toBeNull();
});
