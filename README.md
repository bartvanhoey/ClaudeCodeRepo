# Claude Code

Claude Code is an AI agent designed to help developers understand and work with codebases more efficiently. It can read, edit, and write code, as well as execute commands and interact with various tools to assist you in your development workflow.

![Tools with Claude Code](images/claude_tools.png)

## Table of Contents

- [Most Used Claude Commands](#most-used-claude-commands)
- [CLAUDE.md file](#claudemd-file)
- [Skills](#skills)
- [Managing Context](#managing-context)
- [Permission Modes](#permission-modes)
- [Planning Mode](#planning-mode)
- [Thinking Mode](#thinking-mode)
- [MCP Servers](#mcp-servers)
- [Hooks](#hooks)
- [Subagents](#subagents)
- [Scheduled Tasks](#scheduled-tasks)
- [Marketplace and Plugins](#marketplace-and-plugins)
- [Initial Permission Mode](#initial-permission-mode)
- [WAT Framework (Workflows, Agent, Tools)](#wat-framework-workflows-agent-tools)
- [Agentic Workflows](#agentic-workflows)
- [Tools and Platforms](#tools-and-platforms)
- [RAG - Retrieval-Augmented Generation](#rag---retrieval-augmented-generation)

## Most Used Claude Commands

```bash

claude

/init - Initialize a new CLAUDE.md file with codebase documentation.

/usage - Shows the usage

(Pound sign: #)  => Memory mode, allows you to save information in memory for later retrieval.
for example:

# The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.

# Use comments sparingly. Only comment complex code

! run a command in the terminal without asking for permission. Use with caution.

& add & after a command to run it in the background without waiting for it to finish. Use with caution.

@ add @src/auth.ths:L42 to a command to specify the file path for the command to operate on. 

/model - Shows the current model being used by Claude, and select which one to use for different tasks.

Escape - Interrupt Claude allowing to redirect or correct it.

/compact - Summarizes the conversation history, keeping only the most relevant information to maintain context while freeing up memory for new information.

/clear - Clears the conversation history, allowing you to start fresh without any previous context.

ALT+V paste in an image into the Claude console (or drag and drop it)

Esc Esc : Rewind the conversation to a previous point, allowing you to go back and change the direction of the conversation or correct any mistakes.
```

## CLAUDE.md file

CLAUDE.md is a markdown file that serves as a guide for Claude to understand your codebase, project structure, and any specific instructions or conventions you want it to follow. It is loaded into Claude's context when you start a conversation, allowing it to reference the information and instructions you have provided.

Guides Claude through your codebase, pointing out:

- Important commands
- Architecture
- Coding style

`/init` - Initializes a new CLAUDE.md file with codebase documentation. This command will prompt you with questions about your project and generate a CLAUDE.md file based on your answers. You can then edit and customize the file as needed to provide more specific instructions or information for Claude.

Different versions of CLAUDE.md:

- CLAUDE.md : Generated with /init, commit to source control and shared with the team.
- CLAUDE.local.md : Personal version of CLAUDE.md, not committed to source control, for your own notes and directions to Claude.
- ~/.claude/CLAUDE.md : Global version of CLAUDE.md, not committed to source control, for general directions to Claude across all projects.

## Skills

Skills are reusable commands that you can create for Claude to perform specific tasks.

They can be simple one-liners or complex multi-step processes. Once created, you can call a skill anytime in the conversation to have Claude execute it.

## Managing Context

When Claude's context window is full, it can lose track of important information from earlier in the conversation. Context Rot is a technique to help mitigate this issue by allowing you to summarize and condense the conversation history, keeping only the most relevant information while freeing up memory for new information.

Useful commands for managing context:

- `/compact` - Summarizes the conversation history, keeping only the most relevant information to maintain context while freeing up memory for new information.
- `/clear` - Clears the conversation history, allowing you to start fresh without any previous context
- `/rewind` - Rewind the conversation to a previous point, allowing you to go back and change the direction of the conversation or correct any mistakes.
- `/context` - View the current conversation context, including all relevant information and details that Claude is currently aware of.

Auto-compaction: Claude will automatically summarize the conversation history when it reaches a certain threshold, ensuring that it always has enough memory to work with new information while retaining the most important context.

## Permission Modes

### Modes

`SHIFT+Tab` to switch between modes.

default: ask before every edit
accept edits: Claude can read, write and edit files without asking. Still asks permission for Bash/shell commands.
plan: analyze and propose changes, but cannot execute anything. Read-only mode for planning and analysis.
auto: Claude decides what is safe. can read, write and edit files and execute Bash/shell commands without asking. Full autonomy. Use with caution.

### Accept Edits

Claude can read, write and edit files without asking.
Still asks permission for Bash/shell commands

### Bypass Permissions

Claude can read, write and edit files and execute Bash/shell commands without asking. Full autonomy. Use with caution.

## Planning Mode

To enable planning mode hit `SHIFT+Tab`  You have a complex task that requires multiple steps. You want Claude to break it down into smaller, manageable steps and execute them one by one. When Plan mode is enabled, Claude can only read files and plans, no edits until you approve.

## Thinking Mode

'Think' | 'Think more' | 'Think a lot' | 'Think longer' | 'Ultrathink'

Planning and Thinking can be used together. When you want Claude to think more about a plan, you can use the 'Think' commands to have it iterate on the plan and come up with better solutions.

## MCP Servers

**MCP (Model Context Protocol) servers** are plugins that give AI assistants like Claude access to external tools and data.

### The core idea

By default, Claude only knows what's in the conversation. MCP servers extend that by letting Claude call out to real systems — databases, APIs, file systems, calendars, etc.

### How it works

```text

You ──► Claude ──► MCP Server ──► External System
                  (the bridge)     (GitHub, DB, files...)
```

1. You ask Claude something
2. Claude calls an MCP server (like a function call)
3. The server fetches/does the real work
4. Claude gets the result back and answers you

### Real examples

| MCP Server | What it gives Claude |
|------------|---------------------|
| `filesystem` | Read/write local files |
| `github` | Browse repos, create PRs |
| `google-calendar` | Check your schedule |
| `sqlite` | Query a database |
| `fetch` | Fetch web pages |

### Why it matters

Without MCP: Claude can only reason about things you paste into the chat.

With MCP: Claude can *act* — look things up, take actions, connect to your actual systems.

Think of MCP servers as **USB ports for AI** — a standard way to plug in capabilities without rebuilding the AI each time.

### Installing an MCP server

```bash
# Add an MCP server to your project
claude mcp add playwright --scope project cmd /c npx @playwright/mcp@latest

# List installed MCP servers
claude mcp list

# Remove an MCP server
claude mcp remove <server-name>
```

## Hooks

  Hooks run your own scripts on events: before a tool call, after a response, on session start. Use them to enforce rules, log activity, or inject
  context. Run /hooks to see what fires when.

Examples:

- Run a code formatter after Claude edits a file
- Stop Claude from editing or reading a particular file
- Check for TODO comments in code that Claude writes and add them to a log file
- Run tests automatically after a file is changed
- Block file edits that add variables that don't follow the naming convention
- Block deprecated function usage in code that Claude writes

### Building a Hook

1. Decide on the trigger: PreToolUse or PostToolUse
2. Determine which type of Tool calls you want to watch for
   (Read, Edit, Write, Bash, Glob, Grep, Task, WebFetch, WebSearch)

   tip: List out the name of all the tools you have access to, bullet point list.

3. Write a command that will receive the tool call
4. If needed, command should provide feedback to Claude.

## Subagents

Subagents are agents spawned by the main agent to handle delegated or parallel subtasks. Each subagent starts fresh with its own isolated context and a limited set of tools, keeping it focused on one job.

- Own isolated context window — no shared state with the parent
- Highly specialized for a specific task
- Can run in parallel to handle multiple tasks at once
- Work with a limited set of tools to stay focused

**How they're triggered:**

| Trigger | How |
|---------|-----|
| Explicit request | You ask Claude to use a subagent for a specific task |
| Claude decides | Claude spawns one autonomously when a task benefits from delegation or parallelism |
| Hooks | A PostToolUse hook fires a subagent automatically after an event (e.g. file edited) |
| Scheduled tasks | A cron job or Cloud Routine triggers a subagent on a schedule (e.g. nightly security scan) |

**Examples:**

| Subagent | What it does |
|----------|-------------|
| Unit Tester | Generates unit tests after every code change |
| Security Auditor | Scans for vulnerabilities on commits or PRs |
| Documentation | Generates and keeps docs up to date |
| UX Reviewer | Reviews user experience and suggests improvements |
| Code Quality | Checks for best practices and maintainability |

## Scheduled Tasks

Claude Code offers three ways to schedule automated tasks:

| Method | Where it runs | Local files? | Machine must be on? |
|--------|--------------|-------------|---------------------|
| `/loop` | Local session | Yes | Yes |
| Desktop tasks | Your machine | Yes | Yes |
| Cloud Routines | Anthropic's servers | No | No |

### Cloud Routines

Released April 2026. Routines run on Anthropic's infrastructure — so they keep working when your laptop is closed.

- Anthropic clones a fresh copy of your **GitHub repo** and runs the agent against it
- No access to local files, `.env`, or uncommitted changes
- Triggers: **schedule** (cron), **API call**, or **GitHub events** (e.g. PR opened)
- Runs fully autonomously — no permission prompts
- Uses your subscription quota

```bash
/schedule "run a security audit" every day at 2am
/schedule list    # see all scheduled routines
/schedule delete  # remove a routine
```

### Desktop Tasks

Run on your local machine — use these when you need access to local files or tools not in your repo.

### /loop

Repeats a prompt on an interval for the duration of the current session only.

```bash
/loop 20m /code-review   # re-run /code-review every 20 minutes
```

## Marketplace and Plugins

What are Plugins?

Plugins are extensions that add new features or enhance existing functionality in Claude. They allow you to customize and extend Claude's capabilities to better suit your workflow and specific needs.
Examples of Plugins:

- **GitHub Plugin**: Integrates GitHub with Claude, allowing you to manage issues, pull requests, and repositories directly from the Claude interface.
- **Jira Plugin**: Connects Jira to Claude, enabling you to create, update, and track Jira issues without leaving the Claude environment.
- **CI/CD Plugin**: Integrates with your CI/CD pipeline, allowing you to monitor

```bash

claude plugin uninstall <plugin-name>
claude plugin remove <plugin-name>
claude plugin list — see all installed plugins
claude plugin disable <plugin-name> — disable without uninstalling
claude plugin enable <plugin-name> — re-enable a disabled plugin

```

How to install the Frontend Design Plugin from Anthropic's Plugin Store:

```bash
/plugin marketplace add anthropics/claude-code
/plugin install frontend-design@claude-code-plugin

```

## Initial Permission Mode

The **Initial Permission Mode** setting controls how Claude handles tool permissions at the start of each new conversation.

Setting it to `bypassPermissions` means Claude will automatically allow all tool calls without prompting for approval — useful for trusted local workflows where you want uninterrupted automation.

![Initial Permission Mode set to bypassPermissions](images/initial_permission_mode.png)

## WAT Framework (Workflows, Agent, Tools)

WAT is a structure for building agentic AI systems with three layers that work together:

- **Workflows** — Markdown files with step-by-step instructions for a task. Stored in the `workflows/` directory.
- **Agent** — The AI (Claude) that reads the workflow, reasons about it, and decides what to do next.
- **Tools** — Python scripts that do the actual work (API calls, data processing, etc.). Stored in the `tools/` directory.

```
Workflow (instructions) ──► Agent (reasons) ──► Tools (executes)
```

## Agentic Workflows

Agentic workflows are a powerful way to automate complex tasks that require multiple steps and decision-making. They allow you to create a sequence of actions that Claude can execute autonomously, based on the goals you set. Agentic workflows can perform a wide range of functions, from data analysis to customer support.

Examples of Agentic Workflows:

- **Automated Code Review Workflow**: Claude can analyze a pull request, identify potential issues, suggest improvements, and even make changes to the codebase autonomously.
- **Automated Testing Workflow**: Claude can run tests, analyze results, and make adjustments to the code or tests as needed to ensure that everything is working correctly.
- **Automated Deployment Workflow**: Claude can handle the entire deployment process, from building and testing to deploying and monitoring the application in production.
- **Automated Bug Fixing Workflow**: Claude can identify bugs in the code, analyze the root cause, and implement fixes autonomously, while keeping you informed of the changes being made.
- **Automated Feature Development Workflow**: Claude can take a feature request, break it down into smaller tasks, and implement the feature autonomously, while keeping you updated on the progress and any decisions being made.
- **Automated Refactoring Workflow**: Claude can analyze the codebase for areas that could benefit from refactoring, suggest improvements, and make changes autonomously to improve code quality and maintainability.

**WAT** stands for "Workflows, Agent, Tools" and is a framework for building agentic workflows. It allows you to define a series of steps that an AI agent can execute to achieve a specific goal. Each step can involve different actions, such as making API calls, processing data, or interacting with users.  

**A2A** stands for "Agent-to-Agent" communication, which is a key aspect of agentic workflows. It enables different AI agents to communicate and collaborate with each other to accomplish tasks that may require multiple skills or expertise. This allows for more complex and efficient workflows, as agents can share information and delegate tasks to each other as needed.

## Tools and Platforms

**Trigger.dev**: A platform that provides tools and resources for building and deploying agentic workflows. It offers a range of features, including a visual workflow builder, pre-built templates, and integration with various AI models and APIs. With Trigger.dev, you can easily create and manage your agentic workflows, allowing you to automate tasks and processes in a more efficient and scalable way.

**Modal**: AI infrastructure provider that allows you to run AI models in the cloud. It provides a simple interface for deploying and managing AI models, making it easier for developers to integrate AI capabilities into their applications. Modal offers features such as auto-scaling, monitoring, and logging, which help ensure that your AI models run smoothly and efficiently. With Modal, you can focus on building your applications while they handle the complexities of AI infrastructure.

**Vercel**: A cloud platform for static sites and serverless functions. It provides a seamless experience for deploying and hosting web applications, making it an ideal choice for developers looking to quickly get their projects online. Vercel offers features such as automatic scaling, global CDN, and easy integration with popular frameworks like Next.js. With Vercel, you can focus on building your application while they handle the deployment and hosting aspects.

**Perplexity**: An AI platform that provides access to powerful language models, including Claude. It offers a range of tools and resources for developers to build and deploy AI-powered applications. With Perplexity, you can easily integrate AI capabilities into your projects, allowing you to create more intelligent and responsive applications.

**Tavily**: Connect AI Agents to the web. Real-time search, extraction and web crawling through a single secure API. Tavily allows you to access and interact with web data in real-time, making it easier to build AI applications that require up-to-date information from the web.

**FireCrawl**: An AI-powered web crawling and data extraction tool. It allows you to easily gather and analyze data from websites, making it easier to build AI applications that require web data.

**NanoBanana**: Nano Banana is an advanced AI image editing model that has quickly gained attention for its exceptional prompt understanding, consistent character editing, and scene preservation.Experience the future of AI image editing.

**Key**: [Key](https://key.ai/) helps communities unlock their potential. It offers a unique approach to creating meaningful professional connections and fostering career development, financial wellbeing and work-life balance.

**Serper**: An AI-powered search engine that provides real-time access to information from the web. It allows you to quickly find relevant information and insights, making it easier to build AI applications that require up-to-date data.

## RAG - Retrieval-Augmented Generation

Retrieval-Augmented Generation (RAG) is a technique that enables large language models (LLMs) to retrieve and incorporate new information from external data sources.[1] With RAG,
