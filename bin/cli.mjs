#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "..", "package.json"), "utf8"),
);

const [command] = process.argv.slice(2);

function printHelp() {
  console.log(`
  orizon v${pkg.version}

  Usage:
    npx orizon <command>

  Commands:
    init        Set up Orizon in your React + Vite project

  Options:
    --version   Show version number
    --help      Show this help message
`);
}

switch (command) {
  case "init": {
    const { init } = await import("./init.mjs");
    await init();
    break;
  }

  case "--version":
  case "-v":
    console.log(pkg.version);
    break;

  case "--help":
  case "-h":
  case undefined:
    printHelp();
    break;

  default:
    console.error(`Unknown command: ${command}\n`);
    printHelp();
    process.exit(1);
}
