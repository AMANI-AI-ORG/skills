#!/usr/bin/env node
// Generates the skills/ tree: dynamic Agent Skills (SKILL.md) that link to
// the LIVE Amani documentation (https://documentation.amani.ai). The skills hold
// no static doc content — only live URLs + instructions — so they never go stale.
// Re-run after the docs change:  node skills/generate.mjs
//
// Pure Node, zero dependencies.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(REPO_ROOT, "documents");
const OUT_DIR = __dirname; // skills/
const SITE = "https://documentation.amani.ai";

const PLATFORM_LABEL = { android: "Android", ios: "iOS", flutter: "Flutter", "react-native": "React Native" };

// --- Taxonomy. `src` = on-disk dir under documents/; `route` = live routeBasePath.
// Mirrors docusaurus.config.js. NOTE: src !== route in several cases.
const MOBILE = {
  kyc: {
    label: "KYC SDK",
    variants: {
      core: {
        label: "Core SDK",
        blurb: "Headless KYC engine — you build your own screens/UI; the SDK provides ID capture, NFC, selfie & liveness via APIs. Choose for full UI control.",
        platforms: {
          android: { src: "androidv3", route: "documents/android" },
          ios: { src: "iosv3", route: "documents/ios" },
          flutter: { src: "flutter", route: "documents/flutter" },
          "react-native": { src: "reactnative", route: "documents/reactnative" },
        },
      },
      ui: {
        label: "UI SDK",
        blurb: "Drop-in, prebuilt KYC screens & flow (an interface layer over the Core SDK). Choose for the fastest integration with minimal UI work.",
        platforms: {
          android: { src: "androidui", route: "documents/androidui" },
          ios: { src: "iosui", route: "documents/iosui" },
          flutter: { src: "flutterui", route: "documents/flutterui" },
          "react-native": { src: "reactnativeui", route: "documents/reactnativeui" },
        },
      },
    },
  },
  video: {
    label: "Video Call SDK",
    blurb: "Live video identity verification / video call integration.",
    platforms: {
      android: { src: "androidvideo", route: "documents/androidVideo" },
      ios: { src: "iosvideo", route: "documents/iosVideo" },
      flutter: { src: "fluttervideo", route: "documents/flutterVideo" },
    },
  },
  biomatch: {
    label: "BioMatch SDK",
    blurb: "Biometric face matching / verification.",
    platforms: {
      android: { src: "androidbiomatch", route: "documents/androidbiomatch" },
      ios: { src: "iosbiomatch", route: "documents/iosbiomatch" },
    },
  },
  voice: {
    label: "Voice Assistant SDK",
    blurb: "In-app voice assistant / TTS guidance.",
    // Pages for both platforms live in one shared section; filter by token.
    pageToken: { android: "Android", ios: "IOS" },
    platforms: {
      android: { src: "voiceAssistant", route: "documents/voiceAssistant" },
      ios: { src: "voiceAssistant", route: "documents/voiceAssistant" },
    },
  },
};
const BACKEND = {
  label: "REST API",
  blurb: "Server-side integration: authentication, profiles, users, document processing, webhooks and AML screening.",
  src: "api",
  route: "documents/api",
};
const WEB = {
  label: "Web SDK",
  blurb: "Browser / JavaScript integration of the Amani KYC flow.",
  src: "websdk",
  route: "documents/websdk",
};

// --- helpers ---------------------------------------------------------------
let count = 0;

function pageRank(noExt) {
  const b = noExt.split("/").pop().toLowerCase().replace(/[\s_-]/g, "");
  if (b.includes("requirement")) return 0;
  if (b.includes("preparation") || b.includes("gettingstarted")) return 1;
  if (b.includes("install")) return 2;
  if (b.includes("initial")) return 3;
  if (b.includes("integrat")) return 4;
  if (b.includes("config")) return 5;
  if (b.includes("usage")) return 6;
  if (b.includes("releasenote") || b.includes("changelog")) return 99;
  return 50;
}

function stripQuotes(s) {
  return s.trim().replace(/^['"]|['"]$/g, "");
}

// Lightweight YAML frontmatter read (no deps): returns { slug, title }.
function readFrontmatter(absPath) {
  const raw = fs.readFileSync(absPath, "utf8").replace(/^﻿/, ""); // strip leading BOM
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z0-9_]+):\s*(.+)$/);
    if (kv) fm[kv[1]] = stripQuotes(kv[2]);
  }
  return { slug: fm.slug, id: fm.id, title: fm.title };
}

// Build a doc's live URL, mirroring Docusaurus routing INCLUDING frontmatter slug.
// - slug starting with "/"  -> relative to the plugin route root
// - slug without leading "/" -> relative to the doc's own directory
// - no slug                  -> derived from the file path (index/README -> folder root)
function docUrl(route, relNoExt, slug, id) {
  const segs = relNoExt.split("/");
  const base = segs[segs.length - 1].toLowerCase();
  const eff = slug || id; // Docusaurus: a doc's slug defaults to a custom frontmatter id
  if (eff) {
    if (eff.startsWith("/")) return `${SITE}/${route}${encodeURI(eff)}`;
    const dir = segs.slice(0, -1).map(encodeURIComponent).join("/");
    return `${SITE}/${route}${dir ? "/" + dir : ""}/${encodeURIComponent(eff)}`;
  }
  let out = segs;
  if (base === "index" || base === "readme") out = segs.slice(0, -1); // folder root
  const enc = out.map((s) => encodeURIComponent(s)).join("/");
  return `${SITE}/${route}${enc ? "/" + enc : ""}`;
}

function listPages(src, route, pageToken) {
  const dir = path.join(DOCS_DIR, src);
  if (!fs.existsSync(dir)) {
    console.error(`WARN: missing docs dir ${dir}`);
    return [];
  }
  const entries = fs.readdirSync(dir, { recursive: true, withFileTypes: true });
  let rels = entries
    .filter((e) => e.isFile() && /\.(md|mdx)$/i.test(e.name))
    .map((e) =>
      path.relative(dir, path.join(e.parentPath ?? e.path, e.name)).split(path.sep).join("/"),
    );
  if (pageToken) rels = rels.filter((r) => r.toLowerCase().includes(pageToken.toLowerCase()));
  const pages = rels.map((rel) => {
    const noExt = rel.replace(/\.(md|mdx)$/i, "");
    const { slug, id, title } = readFrontmatter(path.join(dir, rel));
    return {
      title: title || noExt.split("/").pop().replace(/[-_]/g, " "),
      url: docUrl(route, noExt, slug, id),
      rank: pageRank(noExt),
    };
  });
  pages.sort((a, b) => a.rank - b.rank || a.title.localeCompare(b.title));
  return pages;
}

function frontmatter(name, description, meta) {
  const m = Object.entries(meta)
    .map(([k, v]) => `    ${k}: ${typeof v === "string" ? JSON.stringify(v) : v}`)
    .join("\n");
  return `---\nname: ${name}\ndescription: ${JSON.stringify(description)}\nmetadata:\n  amani:\n${m}\n---\n`;
}

function writeSkill(relDir, name, content) {
  const dir = path.join(OUT_DIR, relDir, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "SKILL.md"), content);
  count++;
}

const RULES = [
  "## How to implement",
  "1. Fetch the live pages above first (start with Requirements / Preparation / Getting Started).",
  "2. Use ONLY the dependency coordinates, repository URLs, commands, permissions, endpoints and initialization code that appear in those docs — never recall them from memory.",
  "3. **Pin the latest version from the docs release notes.** Get the current version ONLY from this SDK's **ReleaseNote** page (listed above, e.g. `.../<sdk>/ReleaseNote`) — never GitHub Releases, jitpack or any external source. Entries are newest-first: the **latest version is the first/topmost entry directly under the \"Release Notes\" heading** (that entry's heading IS the version, e.g. `v1.41.2`). Replace any placeholder (`Tag`, `LATEST_RELEASE`, `+`, `latest`) with that version and pin it exactly. The page is server-rendered — if your fetch returns an empty / JavaScript-only shell, retry or use a browser-capable fetch; never guess or fall back to a remembered version. If this SDK has no ReleaseNote page, use the version in the setup pages and ask the user if it is a placeholder.",
  "4. Treat secret placeholders (`YOUR_API_KEY`, `sharedSecret`, tokens) as placeholders — wire them via secure config and ask the user; never hardcode a real value.",
  "5. Cite the source URL next to each change. If a required detail is missing from the docs, say so and stop.",
  "",
  "## Safety & security (apply to every integration)",
  "- **Official sources only.** Use exactly the repositories/registries in the docs; never substitute mirrors or unverified packages.",
  "- **Pin exact versions** (no floating `+`/`latest`) for reproducible, supply-chain-safe builds.",
  "- **Never hardcode or commit secrets** — API keys, tokens, `sharedSecret`. Use environment variables / secure storage / platform keystores and keep them out of version control.",
  "- **Least privilege.** Add only the permissions the docs require; don't request extras.",
  "- **Keep security features on.** Honor the docs' SSL pinning / request signing / `sharedSecret`; never disable TLS or certificate validation.",
  "- **Protect user data.** Don't log or persist PII / KYC data (ID images, NFC chip data, selfies) beyond what the docs specify.",
  "- **Minimal, reversible changes.** Edit only what's needed, preserve existing config, and confirm before any destructive change to the user's project.",
  "",
];

function leafContent({ name, heading, blurb, sdk, variant, target, route, pages, platform, platformLabel }) {
  const sectionUrl = `${SITE}/${route}`;
  const plat = platform ?? "mobile";
  const tLabel = target ? PLATFORM_LABEL[target] : platformLabel ?? "";
  const titleSuffix = tLabel ? ` — ${tLabel}` : "";
  const description = target
    ? `Integrate the Amani ${heading} on ${tLabel} using the live Amani documentation. Use when adding or implementing the Amani ${heading} on ${tLabel}.`
    : `Integrate the Amani ${heading} using the live Amani documentation. Use when adding or implementing the Amani ${heading} (${platformLabel}).`;
  const meta = { platform: plat, sdk };
  if (variant) meta.variant = variant;
  if (target) meta.target = target;

  const pageLines = pages.length ? pages.map((p) => `- **${p.title}** — ${p.url}`) : [`- ${sectionUrl}`];
  return [
    frontmatter(name, description, meta),
    `# Amani ${heading}${titleSuffix}`,
    "",
    blurb,
    "",
    "## Live documentation (fetch before implementing)",
    `These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.`,
    "",
    ...pageLines,
    "",
    ...RULES,
  ].join("\n");
}

function kycRouterContent(combos) {
  const description =
    "Implement the Amani KYC (identity verification) SDK on mobile. Use when the user asks to add or implement Amani KYC but has not chosen the Core vs UI SDK or the platform — this skill asks first, then routes.";
  const rows = combos
    .slice()
    .sort((a, b) => a.vlabel.localeCompare(b.vlabel) || a.target.localeCompare(b.target))
    .map((c) => `| ${c.vlabel} | ${PLATFORM_LABEL[c.target]} | ${c.entry} | \`${c.name}\` |`)
    .join("\n");
  return [
    frontmatter("amani-kyc", description, { platform: "mobile", sdk: "kyc", role: "router" }),
    "# Amani KYC SDK — choose the right integration",
    "",
    "Amani KYC ships in **two variants**. Before writing any code you MUST ask the user which one, explain the difference, then confirm the platform.",
    "",
    "## Step 1 — Ask the user: Core SDK or UI SDK?",
    "Present BOTH options with this explanation, then let the user choose (do not assume):",
    "- **Core SDK** — *headless*. You build your own screens; the SDK provides the KYC engine (ID capture, NFC, selfie, liveness) via APIs. Choose for full UI control / custom design.",
    "- **UI SDK** — *drop-in*. Prebuilt, ready-made KYC screens & flow (an interface layer over Core). Choose for the fastest integration with minimal UI work.",
    "",
    "## Step 2 — Confirm the platform",
    "Available platforms: Android, iOS, Flutter, React Native.",
    "",
    "## Step 3 — Use the live docs for the chosen combination",
    "| Variant | Platform | Start here (live docs) | Dedicated skill |",
    "|---|---|---|---|",
    rows,
    "",
    "Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features (SSL pinning / request signing / `sharedSecret`) enabled, request least-privilege permissions, and cite every source URL.",
    "",
  ].join("\n");
}

function platformRouterContent(sdkKey, sdef, combos) {
  const description = `Implement the Amani ${sdef.label} on mobile. Use when the user asks to add or implement the Amani ${sdef.label} but has not chosen a platform — this skill asks first, then routes.`;
  const rows = combos
    .map((c) => `| ${PLATFORM_LABEL[c.target]} | ${c.entry} | \`${c.name}\` |`)
    .join("\n");
  return [
    frontmatter(`amani-${sdkKey}`, description, { platform: "mobile", sdk: sdkKey, role: "router" }),
    `# Amani ${sdef.label} — choose the platform`,
    "",
    sdef.blurb,
    "",
    "## Step 1 — Confirm the platform",
    "Ask the user which platform, then use the live docs below.",
    "",
    "| Platform | Start here (live docs) | Dedicated skill |",
    "|---|---|---|",
    rows,
    "",
    "Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features enabled, request least-privilege permissions, and cite every source URL.",
    "",
  ].join("\n");
}

// --- generate --------------------------------------------------------------

// KYC (Core + UI) — leaves + Core/UI router
{
  const dir = "mobile/kyc";
  const combos = [];
  for (const [variant, vdef] of Object.entries(MOBILE.kyc.variants)) {
    for (const [target, pdef] of Object.entries(vdef.platforms)) {
      const pages = listPages(pdef.src, pdef.route);
      const name = `amani-kyc-${variant}-${target}`;
      writeSkill(dir, name, leafContent({
        name, heading: `KYC ${vdef.label}`, blurb: vdef.blurb,
        sdk: "kyc", variant, target, route: pdef.route, pages,
      }));
      combos.push({ vlabel: vdef.label, target, entry: pages[0]?.url ?? `${SITE}/${pdef.route}`, name });
    }
  }
  writeSkill(dir, "amani-kyc", kycRouterContent(combos));
}

// Video / BioMatch / Voice — leaves + platform router
for (const sdkKey of ["video", "biomatch", "voice"]) {
  const sdef = MOBILE[sdkKey];
  const dir = `mobile/${sdkKey}`;
  const combos = [];
  for (const [target, pdef] of Object.entries(sdef.platforms)) {
    const pages = listPages(pdef.src, pdef.route, sdef.pageToken?.[target]);
    const name = `amani-${sdkKey}-${target}`;
    writeSkill(dir, name, leafContent({
      name, heading: sdef.label, blurb: sdef.blurb,
      sdk: sdkKey, variant: null, target, route: pdef.route, pages,
    }));
    combos.push({ target, entry: pages[0]?.url ?? `${SITE}/${pdef.route}`, name });
  }
  writeSkill(dir, `amani-${sdkKey}`, platformRouterContent(sdkKey, sdef, combos));
}

// Backend (REST API)
writeSkill("backend", "amani-api", leafContent({
  name: "amani-api", heading: BACKEND.label, blurb: BACKEND.blurb,
  sdk: "api", variant: null, target: null, route: BACKEND.route,
  pages: listPages(BACKEND.src, BACKEND.route), platform: "backend", platformLabel: "Backend / server-side",
}));

// Web SDK
writeSkill("web", "amani-web-sdk", leafContent({
  name: "amani-web-sdk", heading: WEB.label, blurb: WEB.blurb,
  sdk: "web", variant: null, target: null, route: WEB.route,
  pages: listPages(WEB.src, WEB.route), platform: "web", platformLabel: "Web / browser",
}));

// README
fs.writeFileSync(path.join(OUT_DIR, "README.md"), readmeContent());

console.log(`Generated ${count} SKILL.md files + README under skills/`);

function readmeContent() {
  return `# Amani Agent Skills

Dynamic [Agent Skills](https://modelcontextprotocol.io) that teach AI agents
(Claude Code, Cursor, and any Agent-Skills-compatible agent) how to integrate
the **Amani SDKs** — grounded in the **live, public documentation** at
<${SITE}>.

These skills contain **no static copies** of the docs — only **live links** and
instructions. The agent fetches the current pages at runtime, so the guidance is
always up to date and never drifts from the published docs.

## Taxonomy

\`\`\`
skills/
  mobile/
    kyc/    amani-kyc (router: Core vs UI) + amani-kyc-{core,ui}-{android,ios,flutter,react-native}
    video/  amani-video (router) + amani-video-{android,ios,flutter}
    biomatch/ amani-biomatch (router) + amani-biomatch-{android,ios}
    voice/  amani-voice (router) + amani-voice-{android,ios}
  backend/  amani-api
  web/      amani-web-sdk
\`\`\`

## Install

**Option 1 — npx (no clone):**

\`\`\`bash
npx -y github:AmaniTechnologiesLtd/skills            # -> ./.claude/skills  (this project)
npx -y github:AmaniTechnologiesLtd/skills --global   # -> ~/.claude/skills  (all projects)
npx -y github:AmaniTechnologiesLtd/skills --list     # list skills, install nothing
\`\`\`

**Option 2 — git clone:**

\`\`\`bash
git clone https://github.com/AmaniTechnologiesLtd/skills.git
node skills/bin/install.mjs --global    # flatten + install into ~/.claude/skills
# (or copy the skill folders manually into your agent's skills directory)
\`\`\`

Both flatten the tree into \`<skills-dir>/<skill-name>/SKILL.md\`, which Claude
Code and Cursor discover automatically. Reload your agent afterwards. (If the
package is published to npm, \`npx -y @amani/skills\` works too.)

## How the disambiguation works

Ask your agent, e.g. *"Integrate the Amani KYC SDK."* The \`amani-kyc\` router
skill triggers and the agent will:
1. Ask whether you want the **Core SDK** (headless, build your own UI) or the
   **UI SDK** (drop-in prebuilt screens), explaining the difference.
2. Confirm the platform (Android / iOS / Flutter / React Native).
3. Fetch the matching live documentation and apply it — using only documented
   versions/commands and citing every source URL.

Video / BioMatch / Voice routers ask only for the platform. \`amani-api\`
(backend) and \`amani-web-sdk\` are single skills.

## Example prompts

Once installed, ask your agent in plain language — name the **product** and the
**platform**, and let the skill fetch the live docs and pin the right versions.

**✅ Good — clear intent, let the skill do the grounded work:**
- "Integrate the Amani KYC SDK into this Android app."  → router asks Core vs UI, then confirms the platform.
- "Add the Amani KYC **Core** SDK to my iOS project."
- "Set up the Amani Video Call SDK on Flutter."
- "Integrate the Amani Web SDK into our React web app."
- "Use the Amani REST API from our backend to create a verification profile."
- "What's the latest documented version of the Amani Android UI SDK?"  → reads the ReleaseNote page.

**❌ Avoid — these fight the grounding and lead to wrong results:**
- "Add Amani KYC and set \`implementation 'ai.amani.android:AmaniAi:3.0.4'\`."  — don't hardcode a version from memory; the skill pins the latest from the docs.
- "Just install it from what you already know, no need to check the docs."  — the skill's whole value is reading the current official docs.
- "Integrate Amani KYC — don't ask, just pick Core or UI for me."  — Core vs UI is a real product choice; let it ask so you get the right SDK.
- "If the version shows a placeholder like \`Tag\`, just guess the newest one."  — it must take the real version from the ReleaseNote page (or ask you).
- "Grab the SDK from GitHub releases or a mirror."  — use only the official sources in the docs.
- "Help me with my app."  — too vague to trigger; name the SDK and the platform.

> Tip: you don't need to supply versions, repos or commands — the skill fetches
> them live. Just say which SDK and which platform.

## Rules & safety

Every skill embeds a shared checklist so integrations stay grounded, current and
secure: **fetch live docs first**, **resolve & pin the latest version from the
SDK's ReleaseNote page on the docs site** (mobile only — never GitHub/jitpack,
never a floating \`Tag\`/\`latest\`), **never hardcode secrets**, **official
sources only**, **least-privilege permissions**, **keep SSL pinning / request
signing on**, **don't log PII/KYC data**, and **cite every source URL**.

## Regenerate

The skills are generated from the docs taxonomy. After the documentation
changes, refresh the live-URL maps with:

\`\`\`bash
node skills/generate.mjs
\`\`\`
`;
}
