import { query } from "@anthropic-ai/claude-agent-sdk";
import { readdirSync } from "node:fs";
import { join } from "node:path";








// for await (const message of query({
//   prompt: "What files are in this directory?",
//   options: { allowedTools: ["Bash", "Glob"] }

// })) {
//   if ("result" in message) console.log(message.result);
// }

const IMAGES_DIR = "C:\\Data\\Images";
const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

async function main() {
    const files = readdirSync(IMAGES_DIR).filter(file =>
        IMAGE_EXTENSIONS.some(ext => file.toLowerCase().endsWith(ext))
    );

    for (const file of files) {
        console.log(`\n=== ${file} ===`);

        const q = query({
            prompt: `Please look at the image at ${join(IMAGES_DIR, file)} and tell me what you see in it`,
            options: {
                cwd: IMAGES_DIR,
                model: 'haiku',
                allowedTools: ["Read","Write","Edit","Bash","Glob","Grep", "WebSearch", "WebFetch"],
                env: {
                    ...process.env,
                    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY
                }
            }
        })

        for await (const element of q) {
            if (element.type === "result" && "result" in element) {
                console.log(element.result)
            }
        }
    }
}

main();