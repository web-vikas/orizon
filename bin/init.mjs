#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";
import pc from "picocolors";

// ---------------------------------------------------------------------------
// Logging helpers
// ---------------------------------------------------------------------------
const log = {
  step: (msg) => console.log(pc.cyan("●") + " " + msg),
  success: (msg) => console.log(pc.green("✔") + " " + msg),
  skip: (msg) => console.log(pc.yellow("⊘") + " " + pc.dim(msg)),
  error: (msg) => console.error(pc.red("✖") + " " + msg),
  info: (msg) => console.log(pc.dim("  " + msg)),
};

// ---------------------------------------------------------------------------
// Detect package manager
// ---------------------------------------------------------------------------
function detectPM(cwd) {
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb")))
    return { name: "bun", install: "bun add -D" };
  if (existsSync(join(cwd, "pnpm-lock.yaml")))
    return { name: "pnpm", install: "pnpm add -D" };
  if (existsSync(join(cwd, "yarn.lock")))
    return { name: "yarn", install: "yarn add -D" };
  return { name: "npm", install: "npm install -D" };
}

// ---------------------------------------------------------------------------
// Check if a package is already installed (deps or devDeps)
// ---------------------------------------------------------------------------
function isInstalled(pkg, pkgJson) {
  const deps = pkgJson.dependencies || {};
  const devDeps = pkgJson.devDependencies || {};
  return Boolean(deps[pkg] || devDeps[pkg]);
}

// ---------------------------------------------------------------------------
// Patch vite.config.ts — add tailwindcss import + plugin
// ---------------------------------------------------------------------------
function patchViteConfig(filePath) {
  let content = readFileSync(filePath, "utf8");
  let modified = false;

  // 1. Add import if missing
  if (!content.includes("@tailwindcss/vite")) {
    // Find the last import statement and add after it
    const importRegex = /^import\s.+$/gm;
    let lastImportMatch = null;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      lastImportMatch = match;
    }

    const importLine = 'import tailwindcss from "@tailwindcss/vite";';

    if (lastImportMatch) {
      const insertPos = lastImportMatch.index + lastImportMatch[0].length;
      content =
        content.slice(0, insertPos) + "\n" + importLine + content.slice(insertPos);
    } else {
      // No imports found — add at top
      content = importLine + "\n" + content;
    }
    modified = true;
    log.success("Added tailwindcss import to " + filePath.split(/[\\/]/).pop());
  } else {
    log.skip("tailwindcss import already in vite config");
  }

  // 2. Add plugin if missing
  if (!content.includes("tailwindcss()")) {
    // Find plugins: [ and insert tailwindcss() after the opening bracket
    const pluginsMatch = content.match(/plugins\s*:\s*\[/);
    if (pluginsMatch) {
      const insertPos = pluginsMatch.index + pluginsMatch[0].length;
      content =
        content.slice(0, insertPos) +
        "tailwindcss(), " +
        content.slice(insertPos);
      modified = true;
      log.success("Added tailwindcss() plugin to vite config");
    } else {
      log.error(
        "Could not find plugins array in vite config — please add tailwindcss() manually",
      );
    }
  } else {
    log.skip("tailwindcss() plugin already in vite config");
  }

  if (modified) {
    writeFileSync(filePath, content, "utf8");
  }
}

// ---------------------------------------------------------------------------
// Patch CSS file — prepend required @import / @source lines
// ---------------------------------------------------------------------------
function patchCSS(filePath, created) {
  let content = created ? "" : readFileSync(filePath, "utf8");
  const requiredLines = [
    '@import "tailwindcss";',
    '@import "orizon/preset.css";',
    '@source "../node_modules/orizon/dist";',
  ];

  const toAdd = [];
  for (const line of requiredLines) {
    if (!content.includes(line)) {
      toAdd.push(line);
    }
  }

  if (toAdd.length === 0) {
    log.skip("CSS file already has all required imports");
    return;
  }

  // Prepend missing lines at the top
  content = toAdd.join("\n") + (content ? "\n" + content : "\n");
  writeFileSync(filePath, content, "utf8");
  log.success(
    `Added ${toAdd.length} line${toAdd.length > 1 ? "s" : ""} to ${filePath.split(/[\\/]/).pop()}`,
  );
}

// ---------------------------------------------------------------------------
// Main init function
// ---------------------------------------------------------------------------
export async function init() {
  const cwd = process.cwd();

  console.log();
  console.log(pc.bold("  Orizon") + pc.dim(" — setting up your project"));
  console.log();

  // -----------------------------------------------------------------------
  // Step 0: Validate we're in a project
  // -----------------------------------------------------------------------
  const pkgPath = join(cwd, "package.json");
  if (!existsSync(pkgPath)) {
    log.error("No package.json found in current directory.");
    log.info("Run this command from the root of your project.");
    process.exit(1);
  }

  // Check for vite config
  const viteConfigTS = join(cwd, "vite.config.ts");
  const viteConfigJS = join(cwd, "vite.config.js");
  const viteConfigMTS = join(cwd, "vite.config.mts");
  const viteConfigPath = existsSync(viteConfigTS)
    ? viteConfigTS
    : existsSync(viteConfigJS)
      ? viteConfigJS
      : existsSync(viteConfigMTS)
        ? viteConfigMTS
        : null;

  if (!viteConfigPath) {
    log.error("No vite.config.ts/js found. Currently only Vite projects are supported.");
    process.exit(1);
  }

  log.success("Detected Vite project");

  // -----------------------------------------------------------------------
  // Step 1: Detect package manager
  // -----------------------------------------------------------------------
  const pm = detectPM(cwd);
  log.info(`Using ${pc.bold(pm.name)}`);
  console.log();

  // -----------------------------------------------------------------------
  // Step 2: Install dependencies
  // -----------------------------------------------------------------------
  log.step("Installing dependencies...");

  const pkgJson = JSON.parse(readFileSync(pkgPath, "utf8"));
  const toInstall = [];

  if (!isInstalled("tailwindcss", pkgJson)) toInstall.push("tailwindcss");
  if (!isInstalled("@tailwindcss/vite", pkgJson))
    toInstall.push("@tailwindcss/vite");

  if (toInstall.length > 0) {
    const cmd = `${pm.install} ${toInstall.join(" ")}`;
    log.info(pc.dim(`$ ${cmd}`));
    try {
      execSync(cmd, { cwd, stdio: "pipe" });
      log.success(`Installed ${toInstall.join(", ")}`);
    } catch (err) {
      log.error(`Failed to install dependencies. Run manually:\n  ${cmd}`);
      process.exit(1);
    }
  } else {
    log.skip("tailwindcss & @tailwindcss/vite already installed");
  }

  console.log();

  // -----------------------------------------------------------------------
  // Step 3: Patch vite config
  // -----------------------------------------------------------------------
  log.step("Configuring Vite...");
  patchViteConfig(viteConfigPath);
  console.log();

  // -----------------------------------------------------------------------
  // Step 4: Patch CSS
  // -----------------------------------------------------------------------
  log.step("Setting up CSS...");

  const cssSearchOrder = [
    "src/index.css",
    "src/main.css",
    "src/styles.css",
    "src/globals.css",
    "src/app.css",
    "src/App.css",
  ];

  let cssPath = null;
  let cssCreated = false;

  for (const candidate of cssSearchOrder) {
    const full = join(cwd, candidate);
    if (existsSync(full)) {
      cssPath = full;
      break;
    }
  }

  if (!cssPath) {
    // Create src/index.css
    const srcDir = join(cwd, "src");
    if (!existsSync(srcDir)) mkdirSync(srcDir, { recursive: true });
    cssPath = join(srcDir, "index.css");
    cssCreated = true;
    log.info("Creating src/index.css");
  }

  patchCSS(cssPath, cssCreated);
  console.log();

  // -----------------------------------------------------------------------
  // Step 5: Done!
  // -----------------------------------------------------------------------
  console.log(pc.green(pc.bold("  ✓ Orizon is ready!")));
  console.log();
  console.log("  You can now import components:");
  console.log(pc.cyan('    import { Button } from "orizon";'));
  console.log();
}
