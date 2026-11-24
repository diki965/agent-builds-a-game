// main.ts — copies POST.json from the repository to /output.
// The house reads the post's address from there; it reads the post itself.
// Refuses to copy a POST.json that is not a JSON object with a url string,
// so a broken post file fails loudly here instead of at grading time.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const postPath = join(botDir, "POST.json");
const post = JSON.parse(readFileSync(postPath, "utf8"));
if (!post || typeof post !== "object" || typeof post.url !== "string" || !post.url) {
  throw new Error("POST.json must be a JSON object with a url string");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(postPath, join(outDir, "POST.json"));
