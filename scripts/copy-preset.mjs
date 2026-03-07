import { copyFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

copyFileSync(
  resolve(root, "src/preset.css"),
  resolve(root, "dist/preset.css")
);

console.log("✓ Copied preset.css to dist/");
