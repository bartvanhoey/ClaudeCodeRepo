# Claude Code

![Tools with Claude Code](images/claude_tools.png)

## Most Used Claude Commands

```bash

claude

/usage - Shows the usage 

/init - Initialize a new CLAUDE.md file with codebase documentation.

(Pound sign: #)  => Memory mode, allows you to save information in memory for later retrieval.
for example:

# The database schema is defined in the @prisma/schema.prisma file. Reference it anytime you need to understand the structure of data stored in the database.

# Use comments sparingly. Only comment complex code    

/model - Shows the current model being used by Claude, and select which one to use for different tasks.

Escape - Interrupt Claude allowing to redirect or correct it.

/compact - Summarizes the conversation history, keeping only the most relevant information to maintain context while freeing up memory for new information.

/clear - Clears the conversation history, allowing you to start fresh without any previous context.

ALT+V paste in an image into the Claude console (or drag and drop it) 

Esc Esc : Rewind the conversation to a previous point, allowing you to go back and change the direction of the conversation or correct any mistakes.
```

## CLAUDE.md file

Guides Claude through your codebase, pointing out:

- Important commands
- Architecture
- Coding style

Allows you to give Claude specific or custom directions.

Different versions of CLAUDE.md:

- CLAUDE.md : Generated with /init, commit to source control and shared with the team.
- CLAUDE.local.md : Personal version of CLAUDE.md, not committed to source control, for your own notes and directions to Claude.
- ~/.claude/CLAUDE.md : Global version of CLAUDE.md, not committed to source control, for general directions to Claude across all projects.

## Useful Prompts

## Custom Commands

## Planning Mode

To enable planning mode hit `SHIFT+Tab` twice You have a complex task that requires multiple steps. You want Claude to break it down into smaller, manageable steps and execute them one by one. When Plan mode is enabled, Claude can only read files and plans, no edits until you approve.

## Thinking Mode

'Think' | 'Think more' | 'Think a lot' | 'Think longer' | 'Ultrathink'

Planning and Thinking can be used together. When you want Claude to think more about a plan, you can use the 'Think' commands to have it iterate on the plan and come up with better solutions.

## MCP Servers

What are MCP servers and how to use them with Claude?

**Playwright:**

Run the following command `claude mcp add playwright --scope project cmd /c  npx  @playwright/mcp@latest` in your terminal to install the Playwright MCP server for your project.

```bash


Open the app in the browser and iterate on the styling a few times. Go for a sleek modern design with a dark theme. Do not change the Color Palette. Use the same colors but in a more modern way. Make sure to use the colors in the palette and not add any new colors. Do not change the layout of the app, just make it look better with a sleek modern design and a dark theme.
```

## Hooks

Run a command before or after Claude does something to automate tasks and improve your workflow.

Examples:

- Run a code formatter after Claude edits a file
- Stop Claude from editing or reading a particular file
- Check for TODO comments in code that Claude writes and add them to a log file
- Run tests automatically after a file is changed
- Block file edits that add variables that don't follow the naming convention
- Block deprecated function usage in code that Claude writes
