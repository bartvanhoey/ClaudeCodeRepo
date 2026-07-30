#!/bin/bash
fp=$(jq -r .tool_input.file_path)
echo "File path: $fp" > prettier-hook.log
if echo "$fp" | grep -qE '\.tsx?$'; then
  npx prettier --write "$fp" >> prettier-hook.log 2>&1
fi
