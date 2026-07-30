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