#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, relative, basename } from "node:path";
import { execSync } from "node:child_process";
import { createInterface } from "node:readline";
import pc from "picocolors";

// ---------------------------------------------------------------------------
// Logging helpers
// ---------------------------------------------------------------------------
const log = {
  step: (num, total, msg) =>
    console.log(`\n  ${pc.cyan(`[${num}/${total}]`)} ${pc.bold(msg)}`),
  success: (msg) => console.log(`  ${pc.green("✔")} ${msg}`),
  skip: (msg) => console.log(`  ${pc.yellow("⊘")} ${pc.dim(msg)}`),
  error: (msg) => console.error(`  ${pc.red("✖")} ${msg}`),
  info: (msg) => console.log(`  ${pc.dim(msg)}`),
  detail: (msg) => console.log(`    ${msg}`),
  divider: () => console.log(pc.dim("  " + "─".repeat(50))),
};

// ---------------------------------------------------------------------------
// Prompt helper — ask y/n question
// ---------------------------------------------------------------------------
function ask(question, defaultYes = true) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const hint = defaultYes ? "[Y/n]" : "[y/N]";

  return new Promise((resolve) => {
    rl.question(
      `\n  ${pc.yellow("?")} ${question} ${pc.dim(hint)} `,
      (answer) => {
        rl.close();
        const trimmed = answer.trim().toLowerCase();
        if (trimmed === "") resolve(defaultYes);
        else resolve(trimmed === "y" || trimmed === "yes");
      },
    );
  });
}

// ---------------------------------------------------------------------------
// Prompt helper — ask for text input
// ---------------------------------------------------------------------------
function askText(question, defaultValue = "") {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const hint = defaultValue ? pc.dim(` (${defaultValue})`) : "";

  return new Promise((resolve) => {
    rl.question(
      `\n  ${pc.yellow("?")} ${question}${hint} `,
      (answer) => {
        rl.close();
        const trimmed = answer.trim();
        resolve(trimmed || defaultValue);
      },
    );
  });
}

// ---------------------------------------------------------------------------
// Sleep helper for pacing output
// ---------------------------------------------------------------------------
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------------------------------------------------------------------------
// Detect package manager
// ---------------------------------------------------------------------------
function detectPM(cwd) {
  if (existsSync(join(cwd, "bun.lock")) || existsSync(join(cwd, "bun.lockb")))
    return { name: "bun", install: "bun add -D", installProd: "bun add", create: "bunx", exec: "bunx" };
  if (existsSync(join(cwd, "pnpm-lock.yaml")))
    return { name: "pnpm", install: "pnpm add -D", installProd: "pnpm add", create: "pnpm create", exec: "pnpm dlx" };
  if (existsSync(join(cwd, "yarn.lock")))
    return { name: "yarn", install: "yarn add -D", installProd: "yarn add", create: "yarn create", exec: "yarn dlx" };
  return { name: "npm", install: "npm install -D", installProd: "npm install", create: "npm create", exec: "npx" };
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
// Sanitize project name for npm
// ---------------------------------------------------------------------------
function sanitizeName(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-_.]/g, "")
    .replace(/^[.\-_]+/, "");
}

// ---------------------------------------------------------------------------
// Scaffold a new React + Vite + TS project
// ---------------------------------------------------------------------------
async function scaffoldProject(cwd) {
  const dirName = basename(cwd);
  const defaultName = sanitizeName(dirName) || "my-orizon-app";

  // Ask project name
  const rawName = await askText("What is your project name?", defaultName);
  const projectName = sanitizeName(rawName);

  if (!projectName) {
    log.error("Invalid project name.");
    process.exit(1);
  }

  const projectDir = join(cwd, projectName);

  if (existsSync(projectDir)) {
    // Check if directory is non-empty
    const { readdirSync } = await import("node:fs");
    const contents = readdirSync(projectDir);
    if (contents.length > 0) {
      log.error(`Directory "${projectName}" already exists and is not empty.`);
      process.exit(1);
    }
  }

  console.log();
  log.info(`Creating ${pc.bold(projectName)} with React + Vite + TypeScript...`);
  log.info(pc.dim(`Directory: ${projectDir}`));
  console.log();

  // Step A: Create Vite project
  log.info("Scaffolding Vite project...");
  const createCmd = `npm create vite@latest ${projectName} -- --template react-ts`;
  log.info(pc.dim(`$ ${createCmd}`));
  await sleep(200);

  try {
    execSync(createCmd, { cwd, stdio: "pipe" });
    log.success("Created Vite + React + TypeScript project");
  } catch (err) {
    log.error("Failed to create Vite project.");
    log.info("Make sure you have npm installed and try again.");
    process.exit(1);
  }

  await sleep(300);

  // Step B: Install base dependencies
  log.info("Installing base dependencies...");
  const installCmd = "npm install";
  log.info(pc.dim(`$ ${installCmd}`));
  await sleep(200);

  try {
    execSync(installCmd, { cwd: projectDir, stdio: "pipe" });
    log.success("Installed base dependencies");
  } catch {
    log.error("Failed to install base dependencies.");
    process.exit(1);
  }

  await sleep(300);

  // Step C: Install Orizon
  log.info("Installing Orizon...");
  const orizonCmd = "npm install orizon";
  log.info(pc.dim(`$ ${orizonCmd}`));
  await sleep(200);

  try {
    execSync(orizonCmd, { cwd: projectDir, stdio: "pipe" });
    log.success("Installed orizon");
  } catch {
    log.error("Failed to install orizon.");
    process.exit(1);
  }

  return { projectDir, projectName };
}

// ---------------------------------------------------------------------------
// Find vite config in a directory
// ---------------------------------------------------------------------------
function findViteConfig(dir) {
  const candidates = ["vite.config.ts", "vite.config.js", "vite.config.mts"];
  for (const name of candidates) {
    const full = join(dir, name);
    if (existsSync(full)) return full;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Main init function
// ---------------------------------------------------------------------------
export async function init() {
  let cwd = process.cwd();
  let scaffolded = false;
  let projectName = "";

  console.log();
  console.log(
    pc.bold(pc.cyan("  ⬡ Orizon")) + pc.dim(" — project setup wizard"),
  );
  console.log(pc.dim("  " + "─".repeat(54)));
  console.log();

  // -----------------------------------------------------------------------
  // Pre-flight: Detect project or scaffold a new one
  // -----------------------------------------------------------------------
  const pkgPath = join(cwd, "package.json");
  const hasProject = existsSync(pkgPath);
  const hasViteConfig = hasProject && findViteConfig(cwd) !== null;

  if (hasProject && hasViteConfig) {
    // Existing Vite project — proceed with setup
    log.success("Detected existing Vite project");
  } else if (hasProject && !hasViteConfig) {
    // Has package.json but not a Vite project
    log.info("Found package.json but no vite.config — not a Vite project.");
    log.error("Currently only React + Vite projects are supported.");
    process.exit(1);
  } else {
    // No project at all — offer to create one
    log.info("No project detected in this directory.");
    console.log();
    log.info("Orizon can create a new React + Vite + TypeScript project for you");
    log.info("and set up everything automatically.");

    const proceed = await ask("Create a new project?");
    if (!proceed) {
      log.info("No worries! To set up an existing project, run this from its root directory.");
      process.exit(0);
    }

    const result = await scaffoldProject(cwd);
    cwd = result.projectDir;
    projectName = result.projectName;
    scaffolded = true;

    console.log();
    log.divider();
    console.log();
    log.info("Project created! Now configuring Orizon...");
  }

  // -----------------------------------------------------------------------
  // From here on, we're in a valid Vite project (either existing or new)
  // -----------------------------------------------------------------------
  const viteConfigPath = findViteConfig(cwd);
  const pm = detectPM(cwd);
  const currentPkgJson = JSON.parse(
    readFileSync(join(cwd, "package.json"), "utf8"),
  );

  const TOTAL_STEPS = scaffolded ? 6 : 5;
  let stepNum = scaffolded ? 2 : 1; // if scaffolded, step 1 was "Create project"

  if (scaffolded) {
    log.step(1, TOTAL_STEPS, "Create project");
    log.success(`Created ${pc.bold(projectName)} with React + Vite + TypeScript`);
    log.success("Installed base dependencies & Orizon");
  }

  if (!scaffolded) {
    log.info(`Package manager: ${pc.bold(pm.name)}`);
    log.info(`Config file: ${pc.bold(viteConfigPath.split(/[\\/]/).pop())}`);
  }

  // =======================================================================
  // STEP: Install Tailwind CSS dependencies
  // =======================================================================
  log.step(stepNum, TOTAL_STEPS, "Tailwind CSS dependencies");
  log.info("Orizon uses Tailwind CSS v4 for styling.");
  log.info("These packages are required for Tailwind to work with Vite.");
  await sleep(300);

  const tailwindDeps = [
    { pkg: "tailwindcss", label: "Tailwind CSS core" },
    { pkg: "@tailwindcss/vite", label: "Tailwind CSS Vite plugin" },
  ];

  const tailwindMissing = tailwindDeps.filter(
    (d) => !isInstalled(d.pkg, currentPkgJson),
  );
  const tailwindInstalled = tailwindDeps.filter((d) =>
    isInstalled(d.pkg, currentPkgJson),
  );

  for (const d of tailwindInstalled) {
    log.skip(`${d.pkg} — already installed`);
  }

  if (tailwindMissing.length > 0) {
    for (const d of tailwindMissing) {
      log.detail(`${pc.bold(d.pkg)} ${pc.dim(`— ${d.label}`)}`);
    }

    const proceed = scaffolded
      ? true
      : await ask(
          `Install ${tailwindMissing.length} Tailwind package${tailwindMissing.length > 1 ? "s" : ""}?`,
        );
    if (proceed) {
      const cmd = `${pm.install} ${tailwindMissing.map((d) => d.pkg).join(" ")}`;
      log.info(pc.dim(`Running: ${cmd}`));
      await sleep(200);
      try {
        execSync(cmd, { cwd, stdio: "pipe" });
        for (const d of tailwindMissing) {
          log.success(`Installed ${d.pkg}`);
        }
      } catch {
        log.error(`Failed to install. Run manually:\n    ${cmd}`);
      }
    } else {
      log.skip("Skipped — you can install these manually later");
    }
  }
  stepNum++;

  // =======================================================================
  // STEP: Install Form & Validation dependencies
  // =======================================================================
  log.step(stepNum, TOTAL_STEPS, "Form & validation dependencies");
  log.info("These packages power the Form component with Zod validation.");
  log.info("Needed for: Form, Form.Item, Form.useForm, Form.List");
  await sleep(300);

  const formDeps = [
    { pkg: "react-hook-form", label: "Form state management" },
    { pkg: "@hookform/resolvers", label: "Schema validation adapters" },
    { pkg: "zod", label: "Schema validation library" },
  ];

  const formMissing = formDeps.filter(
    (d) => !isInstalled(d.pkg, currentPkgJson),
  );
  const formAlreadyInstalled = formDeps.filter((d) =>
    isInstalled(d.pkg, currentPkgJson),
  );

  for (const d of formAlreadyInstalled) {
    log.skip(`${d.pkg} — already installed`);
  }

  if (formMissing.length > 0) {
    for (const d of formMissing) {
      log.detail(`${pc.bold(d.pkg)} ${pc.dim(`— ${d.label}`)}`);
    }

    const proceed = scaffolded
      ? true
      : await ask(
          `Install ${formMissing.length} form package${formMissing.length > 1 ? "s" : ""}?`,
        );
    if (proceed) {
      const cmd = `${pm.install} ${formMissing.map((d) => d.pkg).join(" ")}`;
      log.info(pc.dim(`Running: ${cmd}`));
      await sleep(200);
      try {
        execSync(cmd, { cwd, stdio: "pipe" });
        for (const d of formMissing) {
          log.success(`Installed ${d.pkg}`);
        }
      } catch {
        log.error(`Failed to install. Run manually:\n    ${cmd}`);
      }
    } else {
      log.skip("Skipped — Form component will not work without these");
    }
  }
  stepNum++;

  // =======================================================================
  // STEP: Configure Vite
  // =======================================================================
  log.step(stepNum, TOTAL_STEPS, "Configure Vite");
  log.info("The Tailwind CSS Vite plugin must be added to your vite config.");
  log.info(`File: ${pc.bold(viteConfigPath.split(/[\\/]/).pop())}`);
  await sleep(300);

  const viteContent = readFileSync(viteConfigPath, "utf8");
  const viteNeedsImport = !viteContent.includes("@tailwindcss/vite");
  const viteNeedsPlugin = !viteContent.includes("tailwindcss()");

  if (viteNeedsImport || viteNeedsPlugin) {
    log.info("Changes needed:");
    if (viteNeedsImport) {
      log.detail(
        pc.green("+ ") +
          pc.cyan('import tailwindcss from "@tailwindcss/vite"'),
      );
    }
    if (viteNeedsPlugin) {
      log.detail(
        pc.green("+ ") +
          pc.cyan("tailwindcss()") +
          pc.dim(" in plugins array"),
      );
    }

    const proceed = scaffolded ? true : await ask("Apply these changes?");
    if (proceed) {
      let content = readFileSync(viteConfigPath, "utf8");
      let modified = false;

      // Add import
      if (viteNeedsImport) {
        const importRegex = /^import\s.+$/gm;
        let lastImportMatch = null;
        let match;
        while ((match = importRegex.exec(content)) !== null) {
          lastImportMatch = match;
        }

        const importLine = 'import tailwindcss from "@tailwindcss/vite";';
        if (lastImportMatch) {
          const insertPos =
            lastImportMatch.index + lastImportMatch[0].length;
          content =
            content.slice(0, insertPos) +
            "\n" +
            importLine +
            content.slice(insertPos);
        } else {
          content = importLine + "\n" + content;
        }
        modified = true;
        log.success("Added tailwindcss import");
      }

      // Add plugin
      if (viteNeedsPlugin) {
        const pluginsMatch = content.match(/plugins\s*:\s*\[/);
        if (pluginsMatch) {
          const insertPos = pluginsMatch.index + pluginsMatch[0].length;
          content =
            content.slice(0, insertPos) +
            "tailwindcss(), " +
            content.slice(insertPos);
          modified = true;
          log.success("Added tailwindcss() to plugins");
        } else {
          log.error(
            "Could not find plugins array — please add tailwindcss() manually",
          );
        }
      }

      if (modified) {
        writeFileSync(viteConfigPath, content, "utf8");
      }
    } else {
      log.skip("Skipped — remember to add tailwindcss to your vite config");
    }
  } else {
    log.skip("Vite config already has tailwindcss configured");
  }
  stepNum++;

  // =======================================================================
  // STEP: Set up CSS
  // =======================================================================
  log.step(stepNum, TOTAL_STEPS, "Set up CSS");
  log.info("Orizon needs 3 lines at the top of your main CSS file:");
  log.detail(pc.cyan('@import "tailwindcss";'));
  log.detail(pc.cyan('@import "orizon/preset.css";'));
  log.detail(pc.cyan('@source "../node_modules/orizon/dist";'));
  await sleep(300);

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
      log.info(`Found: ${pc.bold(candidate)}`);
      break;
    }
  }

  if (!cssPath) {
    log.info("No existing CSS file found.");
    const proceed = scaffolded ? true : await ask("Create src/index.css?");
    if (proceed) {
      const srcDir = join(cwd, "src");
      if (!existsSync(srcDir)) mkdirSync(srcDir, { recursive: true });
      cssPath = join(srcDir, "index.css");
      cssCreated = true;
    } else {
      log.skip("Skipped — you'll need to add the CSS imports manually");
    }
  }

  if (cssPath) {
    const currentCSS = cssCreated ? "" : readFileSync(cssPath, "utf8");
    const requiredLines = [
      '@import "tailwindcss";',
      '@import "orizon/preset.css";',
      '@source "../node_modules/orizon/dist";',
    ];
    const linesToAdd = requiredLines.filter((l) => !currentCSS.includes(l));

    if (linesToAdd.length > 0) {
      log.info(`Lines to add to ${pc.bold(cssPath.split(/[\\/]/).pop())}:`);
      for (const line of linesToAdd) {
        log.detail(pc.green("+ ") + pc.cyan(line));
      }

      const proceed = scaffolded ? true : await ask("Add these lines?");
      if (proceed) {
        let content = cssCreated ? "" : readFileSync(cssPath, "utf8");
        content = linesToAdd.join("\n") + (content ? "\n" + content : "\n");
        writeFileSync(cssPath, content, "utf8");
        log.success(
          `Added ${linesToAdd.length} line${linesToAdd.length > 1 ? "s" : ""} to ${cssPath.split(/[\\/]/).pop()}`,
        );
      } else {
        log.skip("Skipped CSS changes");
      }
    } else {
      log.skip("CSS file already has all required imports");
    }
  }
  stepNum++;

  // =======================================================================
  // STEP: Link stylesheet in index.html
  // =======================================================================
  log.step(stepNum, TOTAL_STEPS, "Link stylesheet in HTML");
  log.info(
    "Per Tailwind CSS docs, the stylesheet should be linked in index.html.",
  );
  await sleep(300);

  const htmlPath = join(cwd, "index.html");

  if (existsSync(htmlPath) && cssPath) {
    const cssRelFromRoot = "/" + relative(cwd, cssPath).replace(/\\/g, "/");
    const htmlContent = readFileSync(htmlPath, "utf8");

    // Check if already linked (ignoring commented-out versions)
    const commentPattern = /<!--[\s\S]*?-->/g;
    const withoutComments = htmlContent.replace(commentPattern, "");
    const alreadyLinked = withoutComments.includes(`href="${cssRelFromRoot}"`);

    if (!alreadyLinked) {
      const linkTag = `<link rel="stylesheet" href="${cssRelFromRoot}">`;
      log.info(`Add to ${pc.bold("index.html")} <head>:`);
      log.detail(pc.green("+ ") + pc.cyan(linkTag));

      if (
        htmlContent.includes(`<!--`) &&
        htmlContent.includes(cssRelFromRoot)
      ) {
        log.info(
          pc.dim("Note: found a commented-out link — it will be replaced."),
        );
      }

      const proceed = scaffolded
        ? true
        : await ask("Add stylesheet link to index.html?");
      if (proceed) {
        let content = htmlContent;

        // Remove commented-out link if present
        const commentedLinkRegex = new RegExp(
          `\\s*<!--\\s*<link[^>]*href="${cssRelFromRoot.replace(/\//g, "\\/")}"[^>]*>\\s*-->`,
          "g",
        );
        content = content.replace(commentedLinkRegex, "");

        // Insert before </head>
        const headCloseIndex = content.indexOf("</head>");
        if (headCloseIndex !== -1) {
          const indent = "    ";
          content =
            content.slice(0, headCloseIndex) +
            `${indent}<link rel="stylesheet" href="${cssRelFromRoot}">\n  ` +
            content.slice(headCloseIndex);
          writeFileSync(htmlPath, content, "utf8");
          log.success("Added stylesheet link to index.html");
        } else {
          log.error(
            "Could not find </head> tag — please add the link manually",
          );
        }
      } else {
        log.skip("Skipped — make sure your CSS file is imported somewhere");
      }
    } else {
      log.skip("Stylesheet already linked in index.html");
    }
  } else if (!existsSync(htmlPath)) {
    log.skip("No index.html found — skipping");
  }

  // =======================================================================
  // Done!
  // =======================================================================
  console.log();
  console.log(pc.dim("  " + "─".repeat(54)));
  console.log();
  console.log(pc.green(pc.bold("  ✓ Orizon setup complete!")));
  console.log();

  if (scaffolded) {
    console.log(pc.bold("  Get started:"));
    console.log(`    ${pc.cyan("$")} ${pc.bold(`cd ${projectName}`)}`);
    console.log(`    ${pc.cyan("$")} ${pc.bold("npm run dev")}`);
    console.log();
  }

  console.log(pc.bold("  Import components:"));
  console.log(
    `    ${pc.cyan('import { Button, Form, Input, Select } from')} ${pc.green('"orizon"')}${pc.cyan(";")}`,
  );
  console.log();
  console.log(pc.bold("  Example with Form + Zod:"));
  console.log(
    `    ${pc.dim("const [form] = Form.useForm({ schema: myZodSchema });")}`,
  );
  console.log();
  console.log(
    pc.dim("  Docs: https://orizon.dev  |  68 components ready to use"),
  );
  console.log();
}
