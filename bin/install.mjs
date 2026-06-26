#!/usr/bin/env node
// Installs the Amani Agent Skills into an agent's skills directory.
// The nested source tree (mobile/…, backend/…, web/…) is flattened into
// <target>/<skill-name>/SKILL.md, which is what Claude Code / Cursor discover.
//
//   npx -y github:AMANI-AI-ORG/skills            -> ./.claude/skills   (current project)
//   npx -y github:AMANI-AI-ORG/skills --global   -> ~/.claude/skills   (all projects)
//   npx -y github:AMANI-AI-ORG/skills --dir DIR  -> custom directory
//   npx -y github:AMANI-AI-ORG/skills --list     -> list skills, install nothing
//
// Pure Node, zero dependencies.

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = path.resolve(__dirname, ".."); // package root (holds skills/)
const SOURCE_DIRS = ["skills"];

const args = process.argv.slice(2);
const has = (f) => args.includes(f);
const optVal = (f) => {
  const i = args.indexOf(f);
  return i >= 0 ? args[i + 1] : undefined;
};

if (has("--help") || has("-h")) {
  console.log(`Amani Agent Skills — installer

Usage:
  npx -y github:AMANI-AI-ORG/skills            Install into ./.claude/skills (current project)
  npx -y github:AMANI-AI-ORG/skills --global   Install into ~/.claude/skills (all projects)
  npx -y github:AMANI-AI-ORG/skills --dir DIR  Install into a custom skills directory
  npx -y github:AMANI-AI-ORG/skills --list     List the available skills without installing`);
  process.exit(0);
}

function findSkills() {
  const found = [];
  for (const base of SOURCE_DIRS) {
    const root = path.join(PKG_ROOT, base);
    if (!fs.existsSync(root)) continue;
    const stack = [root];
    while (stack.length) {
      const dir = stack.pop();
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      if (entries.some((e) => e.isFile() && e.name === "SKILL.md")) {
        found.push(dir); // this directory IS a skill; don't descend further
        continue;
      }
      for (const e of entries) if (e.isDirectory()) stack.push(path.join(dir, e.name));
    }
  }
  return found.sort();
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name);
    const d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const skills = findSkills();

if (has("--list")) {
  console.log(`Amani skills (${skills.length}):`);
  for (const s of skills) console.log("  - " + path.basename(s));
  process.exit(0);
}

let target;
if (optVal("--dir")) target = path.resolve(optVal("--dir"));
else if (has("--global")) target = path.join(os.homedir(), ".claude", "skills");
else target = path.join(process.cwd(), ".claude", "skills");

fs.mkdirSync(target, { recursive: true });
let n = 0;
for (const s of skills) {
  copyDir(s, path.join(target, path.basename(s)));
  n++;
}

console.log(`Installed ${n} Amani skills into ${target}`);
console.log(`Reload your agent, then try: "Integrate the Amani KYC SDK" — it will ask Core vs UI.`);
