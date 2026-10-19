---
description: Write tests for a specific component or file
allowed-tools: Bash(npm list:*)
---

Write comprehensive tests for: $ARGUMENTS

Testing conventions:

- Use Vitest with React Testing Library for unit and integration tests.
- Place test files in a **tests** directory in the same file as the source file
- Name test files as [filename].test.ts(x)
- Use @/prefix for imports

Coverage:

- Test happy paths
- Test edge cases
- Test error states
- Focus on testing behavior and public API's rather than implementation details
