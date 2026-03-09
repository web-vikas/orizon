#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import pc from "picocolors";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "..", "package.json"), "utf8"),
);

const [command] = process.argv.slice(2);

function printBanner() {
  console.log();
  console.log(
    pc.cyan(pc.bold("  ⬡ Orizon")) +
      pc.dim(` v${pkg.version}`) +
      pc.dim(" — Ant Design API on shadcn/ui primitives"),
  );
  console.log(pc.dim("  " + "─".repeat(54)));
  console.log();
}

function printHelp() {
  printBanner();
  console.log(
    `  ${pc.bold("Usage")}`,
  );
  console.log(
    `    ${pc.cyan("$")} npx orizon ${pc.green("<command>")}`,
  );
  console.log();
  console.log(
    `  ${pc.bold("Commands")}`,
  );
  console.log(
    `    ${pc.green("init")}          Set up Orizon in your React + Vite project`,
  );
  console.log();
  console.log(
    `  ${pc.bold("Options")}`,
  );
  console.log(
    `    ${pc.yellow("--version")}     Show version number`,
  );
  console.log(
    `    ${pc.yellow("--help")}        Show this help message`,
  );
  console.log();
  console.log(
    pc.dim("  Docs: https://orizon.dev  |  GitHub: github.com/nicepkg/orizon"),
  );
  console.log();
}

switch (command) {
  case "init": {
    const { init } = await import("./init.mjs");
    await init();
    break;
  }

  case "--version":
  case "-v":
    console.log(
      pc.cyan(pc.bold("⬡ Orizon")) + " " + pc.bold(pkg.version),
    );
    break;

  case "--help":
  case "-h":
  case undefined:
    printHelp();
    break;

  default:
    console.log();
    console.error(
      `  ${pc.red("✖")} Unknown command: ${pc.bold(command)}`,
    );
    console.log();
    console.log(
      `  Run ${pc.cyan("npx orizon --help")} to see available commands.`,
    );
    console.log();
    process.exit(1);
}
