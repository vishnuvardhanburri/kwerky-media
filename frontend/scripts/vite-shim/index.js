#!/usr/bin/env node

const { spawnSync } = require("child_process");
const path = require("path");

const args = process.argv.slice(2);
const command = args[0] || "build";
const frontendDir = path.resolve(__dirname, "..", "..");

if (command !== "build") {
  console.error(`vite shim only supports "build", received "${command}"`);
  process.exit(1);
}

const installResult = spawnSync("npm", ["ci"], {
  cwd: frontendDir,
  stdio: "inherit",
  shell: false,
});

if (installResult.status !== 0) {
  process.exit(installResult.status || 1);
}

const buildResult = spawnSync("npm", ["run", "build"], {
  cwd: frontendDir,
  stdio: "inherit",
  shell: false,
  env: process.env,
});

process.exit(buildResult.status || 1);
