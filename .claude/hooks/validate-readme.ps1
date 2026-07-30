if ($env:CLAUDE_FILE_PATH -notlike "*README.md") { exit 0 }

$errors = @()

$ml = & npx markdownlint-cli $env:CLAUDE_FILE_PATH 2>&1
if ($LASTEXITCODE -ne 0) { $errors += "markdownlint:`n$ml" }

$mlc = & npx markdown-link-check $env:CLAUDE_FILE_PATH --quiet 2>&1
if ($LASTEXITCODE -ne 0) { $errors += "broken links:`n$mlc" }

if ($errors.Count -gt 0) {
    Write-Output "README.md validation failed:"
    $errors | ForEach-Object { Write-Output $_ }
    exit 1
}

Write-Output "README.md validation passed."
