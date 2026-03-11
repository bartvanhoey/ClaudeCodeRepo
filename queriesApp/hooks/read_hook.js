async function main() {
  const chunks = [];

  
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }

  console.error("Received tool arguments:", Buffer.concat(chunks).toString());

  const toolArgs = JSON.parse(Buffer.concat(chunks).toString());

  console.error("Parsed tool arguments:", toolArgs);

  // readPath is the path to the file that Claude is trying to read
  const readPath =
    toolArgs.tool_input?.file_path || toolArgs.tool_input?.path || "";

  // ensure Claude isn't trying to read the .env file
  if (readPath.includes(".env")) {
    console.error("You cannot read the .env file");
    process.exit(2); // exit code 2 - tool blocked (PreToolUse only) 
  }
}

main();
