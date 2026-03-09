import { copyFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// Copy default preset
copyFileSync(
  resolve(root, "src/preset.css"),
  resolve(root, "dist/preset.css")
);
console.log("✓ Copied preset.css to dist/");

// Copy all theme files from src/themes/ to dist/themes/
const themesDir = resolve(root, "src/themes");
const distThemesDir = resolve(root, "dist/themes");

if (existsSync(themesDir)) {
  mkdirSync(distThemesDir, { recursive: true });
  const themeFiles = readdirSync(themesDir).filter(
    (f) => f.endsWith(".css") && !f.startsWith("_")
  );
  for (const file of themeFiles) {
    copyFileSync(resolve(themesDir, file), resolve(distThemesDir, file));
    console.log(`✓ Copied themes/${file} to dist/themes/`);
  }
}
