---
description: Your goal is to update any vulnerable dependencies.
allowed-tools: Bash(npm audit:*), Bash(npm show:*), Bash(npm install:*)
---


Your goal is to update any vulnerable dependencies.

Do the following:

1. Run `npm audit` to find vulnerable installed packages in this project
2. Run `npm audit fix` to automatically update any vulnerable packages
3. Review the audit report and manually update any remaining vulnerable packages
4. Run tests and verify the app works correctly after updates and the updates did not introduce any breaking changes
