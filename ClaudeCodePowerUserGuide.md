# Claude Code Power User Guide

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

## Claude Usage Monitor (statusline)

[claude-usage-monitor](https://github.com/aiedwardyi/claude-usage-monitor) is a statusline plugin for Claude Code. It shows your 5-hour and 7-day quota usage, context window usage, token counts, and reset countdowns directly in the terminal. It runs locally and needs no API key. Its only network call is to `https://api.anthropic.com/api/oauth/usage`.

### Requirements

- Claude Code CLI with an active subscription
- Python 3.10+ (`python3`, `python`, or `py -3`)
- An OAuth login. If you authenticated with an API key, run `claude login`.

### Install

Windows PowerShell:

```powershell
irm https://raw.githubusercontent.com/aiedwardyi/claude-usage-monitor/v0.2.1/install.ps1 | iex
```

macOS / Linux:

```bash
curl -fsSL https://raw.githubusercontent.com/aiedwardyi/claude-usage-monitor/v0.2.1/install.sh | bash
```

To read the code before running it, clone the repo and run the installer yourself:

```bash
git clone https://github.com/aiedwardyi/claude-usage-monitor.git
cd claude-usage-monitor
git switch --detach v0.2.1
python install.py
```

The installer copies the plugin to `~/.claude/plugins/claude-usage-monitor`, adds a `statusLine` entry to `~/.claude/settings.json` (the old file is backed up as `settings.json.bak`), and runs a smoke check. Restart Claude Code afterwards.

### What the statusline shows

- Model and project/git branch
- Context window remaining (bar and percentage)
- Input and output tokens for the session
- 5h and 7d quota, each with a bar and a reset countdown
- Session duration

Bars show remaining quota and change color: green below 70% used, yellow at 70-90%, red above 90%. The first render can show `5h: --` and `7d: --` until the background fetch completes.

### Configuration

Set these as environment variables, or in the `env` block of `~/.claude/settings.json`:

| Variable | Default | Description |
|---|---|---|
| `CQB_TOKENS` | `1` | Show token counts |
| `CQB_RESET` | `1` | Show reset countdowns |
| `CQB_DURATION` | `1` | Show session duration |
| `CQB_BRANCH` | `1` | Show git branch |
| `CQB_CONTEXT_SIZE` | `0` | Show context size label such as `of 1M` |
| `CQB_PACE` | `0` | Show pacing indicator |
| `CQB_COST` | `0` | Show session cost |
| `CQB_REMAINING` | `1` | `1` shows remaining %, `0` shows used % |
| `CQB_BAR` | `1` | Show progress bar beside 5h/7d quotas |
| `CQB_EMAIL` | `0` | Show logged-in account email (OAuth only) |
| `CQB_MAX_WIDTH` | terminal width | Max line width; low-priority segments drop on overflow |

Example:

```json
{
  "env": {
    "CQB_PACE": "1",
    "CQB_CONTEXT_SIZE": "1",
    "CQB_COST": "1"
  }
}
```

### Troubleshooting

- `5h: no token | 7d: no token`: run `claude login` to authenticate with OAuth.
- Garbled characters: use a UTF-8 font, or run `chcp 65001` in older Windows terminals.
- Launcher check fails: confirm `python3`, `python`, or `py -3` runs from your shell.

### Uninstall

Delete `~/.claude/plugins/claude-usage-monitor/`, remove the `statusLine` entry from `~/.claude/settings.json` (or restore `settings.json.bak`), and restart Claude Code.

## AskForUserQuestion

AskForUserQuestion is a built-in tool in Claude Code that prompts the user for input before executing certain actions. It ensures that the user explicitly confirms or provides necessary information, adding an extra layer of safety and interactivity to the workflow.

## Useful Claude Code Skills

Claude Code Skills are modular, file-based extensions — each one a folder with a `SKILL.md` (plus optional scripts/resources) that packages domain knowledge or a specific workflow. Claude loads a skill's full instructions only when it's relevant (matched by its description or invoked explicitly via `/skill-name`), keeping the rest of the context window free. They're how you give Claude reusable, specialized capabilities — like a particular review process, a design system, or a deployment routine — without bloating every conversation with instructions it doesn't need yet.

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

**[skill-creator](https://skillsmp.com/creators/anthropics/skills/skills-skill-creator)** (official marketplace). A meta-skill that guides you through creating your own Claude Code Skill, with best practices for writing clear instructions, defining triggers and structuring files. It generates a boilerplate `SKILL.md` and folder structure from your input, runs evals against the skill, benchmarks variance between runs and optimizes the description so the skill triggers when it should.

```bash
/plugin marketplace add anthropics/skills
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

### Community skills

**[Frontend Design Skill by Anthropic](https://skillsmp.com/creators/anthropics/skills/skills-frontend-design).** Guides Claude to commit to a distinctive design direction (purpose, tone, constraints, differentiation) before writing any UI code, and bans generic AI defaults like Inter, Roboto, and purple gradients — so output doesn't look templated.

```text
npx skills add https://github.com/anthropics/skills --skill frontend-design

/frontend-design
```

**[Grill with Docs by Matt Pocock](https://github.com/mattpocock/skills/blob/main/skills/engineering/grill-with-docs/SKILL.md).** A Socratic, interview-style planning skill: it grills you on a proposed change one question at a time, checks your answers against the codebase and existing docs, and writes confirmed terminology and decisions back into `CONTEXT.md` and ADRs (Architecture Decision Records) as you go. Best used before starting a significant change.

```text
npx skills@latest add mattpocock/skills

/grill-with-docs
```

**[Test Driven Development Workflow by Affaan-m](https://github.com/affaan-m/ECC/tree/main/skills/tdd-workflow).** Enforces a strict red-green-refactor TDD cycle (user journeys → write failing tests → minimal implementation → pass tests → refactor → verify 80%+ coverage → evidence report) for new features, bug fixes, and refactors, with Git checkpoints at each stage.

```text
npx skills add https://github.com/affaan-m/ECC --skill tdd-workflow

/tdd-workflow
```

**[Code Reviewer Skill by Shubhamsaboo](https://github.com/Shubhamsaboo/awesome-llm-apps/tree/main/awesome_agent_skills/code-reviewer).** A prioritized code review skill that checks security (SQL injection, XSS, secrets) first, then performance, correctness, maintainability, and test coverage, surfacing findings by severity with concrete fix suggestions. Use it on PRs, pre-deployment code, or security audits.

```text
npx skills add https://github.com/Shubhamsaboo/awesome-llm-apps --skill code-reviewer

/code-reviewer
```

**[Security Audit Skill by Cloudflare](https://github.com/cloudflare/security-audit-skill).** Security guidance and vulnerability review for codebases, APIs, services, CLI tools, libraries and daemons. Use it for focused security questions, vulnerability research, full audits and pen-test style reviews. It isn't published through a marketplace, so install it manually by cloning the repo and copying the skill folder into your personal skills directory (PowerShell):

```powershell
git clone https://github.com/cloudflare/security-audit-skill $env:TEMP\security-audit-skill
Copy-Item -Recurse $env:TEMP\security-audit-skill\skills\security-audit $env:USERPROFILE\.claude\skills\security-audit
```

Restart Claude Code so it picks up the new skill, then run it:

```text
/security-audit
```

## next-steps plugin

next-steps is a small productivity plugin by Thariq Shihipar (MIT, v1.0.0) that suggests what to type next after Claude finishes a turn. It isn't a skill or slash command but a [mod](README.md#mods): a function-hooks plugin (`hooks/register.tsx`).

It is available in the `anthropics/claude-plugins-community` marketplace. In Claude Code, add the marketplace (skip if you already have it), then install the plugin:

```bash
/plugin marketplace add anthropics/claude-plugins-community
/plugin install next-steps@claude-community
```

After each answer it shows up to three suggested prompts above the input box:

```text
next:
  1: run the tests you just wrote
  2: do the same for the settings page
  3: /code-review high
  0: dismiss
```

- Press `1`, `2` or `3` on an empty prompt to put that suggestion into the box as an editable draft; `0` dismisses them. The top suggestion also shows as ghost text, so `Tab` accepts it. Nothing is submitted until you press Enter.
- Suggestions come from a fork of your session that shares its prompt cache, so it costs about one short reply and never blocks your turn. Your skills and slash commands are passed along, so a suggestion can be a command like `/code-review high`.
- The output is treated as untrusted: escape sequences, control and invisible Unicode characters are stripped, and text containing Unicode tag characters is rejected, so a hidden prompt injection can't reach your prompt box.

Config options: `minAnswerChars` (default `80`, no suggestions after shorter answers) and `suggestSkills` (default `true`, passes your skills and commands to the suggester).
