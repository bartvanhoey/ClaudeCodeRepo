# Advanced Claude Code

## shortcuts

Generate key shortcuts for Claude Code.
c -> claude

add a bat file 'c.bat' to your path notepad "C:\Users\<Your-Username>\.local\bin\c.bat"

with the following content:

```bat
    @claude %*
```

Now, when you are in the explorer, enter "CTRL+L" to select the path, then type "cmd" and hit enter to open a command prompt in that directory. Type "c" and hit enter to run Claude Code in that directory.

## keyboard text replacement shortcuts for Claude Code

u=> ultrathink
w => what happened

## YOLO Mode (You Only Live Once)

YOLO mode" has a specific meaning too: it refers to running a tool with all safety confirmations disabled. For example, Claude Code has a --dangerously-skip-permissions flag that people informally call "YOLO mode," where it stops asking for approval before each action and just executes. Handy but risky, hence the name.

```batch
    claude --dangerously-skip-permissions
```

## Install Claude Code Docs

## Session Tracker Tool for Claude Code usage

[Usage Monitor](https://github.com/jens-duttke/usage-monitor-for-claude)

## AskForUserQuestion

AskForUserQuestion is a built-in tool in Claude Code that prompts the user for input before executing certain actions. It ensures that the user explicitly confirms or provides necessary information, adding an extra layer of safety and interactivity to the workflow.

## Useful Claude Code Skills

Running the skill below will audit your skills, and it will find a bunch of potential issues or improvements in your prompts.

```bash
/claude-api prompt-audit
```

### Built-in skills (ship with Claude Code)

**Migrate API code to a newer Claude model.** Sibling of `prompt-audit`: it classifies every file that calls the Claude API, applies the breaking changes for the target model, and then audits the prompts for patterns written for the old model.

```bash
/claude-api migrate
```

**Fewer permission prompts.** Scans your past session transcripts for read-only Bash and MCP calls you keep approving, then writes a prioritized allowlist into `.claude/settings.json` so those prompts stop appearing.

```bash
/fewer-permission-prompts
```

**Simplify the current diff.** A quality-only pass over your changed code (reuse, simplification, efficiency) that applies the fixes for you. It does not hunt for bugs; use `/code-review` for that.

```bash
/simplify
```

**Code review with effort levels and auto-fix.** Reviews the current diff, a PR number, a branch or a path. `low`/`medium` give fewer high-confidence findings, `high`/`max` go broader. `--fix` applies the findings to the working tree, `--comment` posts them as inline PR comments.

```bash
/code-review high
/code-review 42 --comment
/code-review --fix
```

**Security review of pending changes.** Runs a dedicated security review on the uncommitted or unpushed changes on the current branch.

```bash
/security-review
```

**Run the app to prove a change works.** Detects the project type (CLI, server, TUI, Electron, browser app) and launches it so Claude can see the change working in the real app instead of only in tests.

```bash
/run
```

**Recurring tasks with /loop.** Runs a prompt or slash command on an interval. Omit the interval and Claude paces itself.

```bash
/loop 5m /standup
/loop check whether the deploy on staging finished
```

**Scheduled cloud agents.** Creates routines that run on a cron schedule in the cloud, or a one-time run at a given time, without keeping your terminal open.

```bash
/schedule
```

**Configure hooks, permissions and env vars in plain English.** Anything phrased as "from now on when X" needs a hook in `settings.json`; this skill writes it for you. Also handles "allow npm commands" or "set DEBUG=true".

```bash
/update-config when a file is edited run prettier on it
```

**Customize keyboard shortcuts.** Rebind keys, add chord bindings or change the submit key via `~/.claude/keybindings.json`.

```bash
/keybindings-help
```

**Skill health check.** Reports on the quality of your installed skills (descriptions, triggering, structure). Pair it with `claude plugin eval` to run eval suites against a plugin in CI.

```bash
/skill-doctor
```

### Plugin skills worth installing

**skill-creator** (official marketplace). Creates skills from scratch, runs evals against them, benchmarks variance between runs and optimizes the description so the skill triggers when it should.

```bash
/skill-creator
```

**mattpocock-skills** (official marketplace). A small set of workflow skills:

- `/grilling` stress-tests a plan or decision by relentlessly questioning it before you build.
- `/wizard` generates an interactive bash wizard for steps only a human can do (credentials, CI secrets, third-party dashboards).
- `/diagnosing-bugs` is a structured diagnosis loop for hard bugs and performance regressions.
- `/writing-for-agents` gives guidance for writing CLAUDE.md, AGENTS.md and skill files that agents actually follow.

```bash
claude plugin install mattpocock-skills@claude-plugins-official
```

**anthropic-agent-skills marketplace.** Besides `claude-api` it ships `mcp-builder` (scaffold an MCP server), `webapp-testing` (drive a web app with Playwright), `frontend-design`, and document skills for `docx`, `pptx`, `xlsx` and `pdf`.

```bash
/plugin marketplace add anthropics/skills
```
