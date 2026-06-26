#!/usr/bin/env node
// Generates the skills/ tree: dynamic Agent Skills (SKILL.md) that link to the
// LIVE Amani documentation (https://documentation.amani.ai). Skills hold no
// static doc content — only live URLs + instructions — so they never go stale.
//
// Content is assembled from templates/ (see CONTRIBUTING.md for the architecture).
// Re-run after the docs change:  node skills/generate.mjs
//
// Pure Node, zero dependencies.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DOCS_DIR = path.join(REPO_ROOT, "documents");
const OUT_DIR = __dirname; // skills repo root
const TEMPLATES = path.join(__dirname, "templates");
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

// Lightweight YAML frontmatter read (no deps): returns { slug, id, title }.
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

// Build a doc's live URL, mirroring Docusaurus routing INCLUDING frontmatter slug/id.
// - slug starting with "/"  -> relative to the plugin route root
// - slug/id without leading "/" -> relative to the doc's own directory
// - none -> derived from the file path (index/README -> folder root)
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
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const pages = rels.map((rel) => {
    const noExt = rel.replace(/\.(md|mdx)$/i, "");
    const segs = noExt.split("/");
    const { slug, id, title } = readFrontmatter(path.join(dir, rel));
    const base = title || segs[segs.length - 1].replace(/[-_]/g, " ");
    // Prefix nested-folder pages with their folder so labels aren't ambiguous
    // (e.g. selfie/AutoSelfie titled "Auto" -> "Selfie / Auto"); skip when redundant.
    const folderRaw = segs.length > 1 ? segs[segs.length - 2] : "";
    const folder = folderRaw ? folderRaw.charAt(0).toUpperCase() + folderRaw.slice(1).replace(/[-_]/g, " ") : "";
    const label = folder && !norm(base).includes(norm(folderRaw)) ? `${folder} / ${base}` : base;
    return {
      title: label,
      url: docUrl(route, noExt, slug, id),
      rank: pageRank(noExt),
    };
  });
  pages.sort((a, b) => a.rank - b.rank || a.title.localeCompare(b.title));
  return pages;
}

// --- templates -------------------------------------------------------------
function readTemplate(rel) {
  return fs.readFileSync(path.join(TEMPLATES, rel), "utf8");
}
function fillTemplate(tmpl, vars) {
  return tmpl.replace(/\{\{(\w+)\}\}/g, (_, k) => (k in vars ? vars[k] : `{{${k}}}`));
}
function metaBlock(meta) {
  return Object.entries(meta).map(([k, v]) => `    ${k}: ${JSON.stringify(v)}`).join("\n");
}
// Shared rules + OPTIONAL scoped additions. Drop a file in templates/rules/ named
//   platform-<mobile|web|backend|android|ios|flutter|react-native>.md   or
//   sdk-<kyc|video|biomatch|voice|web|api>.md
// to append rules only for that scope (category, OS platform, or SDK). See CONTRIBUTING.md.
function assembleRules(platform, sdk, target) {
  const parts = [readTemplate("rules/common.md").trimEnd()];
  const files = [`rules/platform-${platform}.md`];
  if (target) files.push(`rules/platform-${target}.md`);
  files.push(`rules/sdk-${sdk}.md`);
  for (const f of files) {
    const p = path.join(TEMPLATES, f);
    if (fs.existsSync(p)) parts.push(fs.readFileSync(p, "utf8").trim());
  }
  return parts.join("\n\n");
}

function writeSkill(name, content) {
  const dir = path.join(OUT_DIR, "skills", name); // flat layout: Claude plugin + simple install
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "SKILL.md"), content);
  count++;
}

function leafContent({ name, heading, blurb, sdk, variant, target, route, pages, platform, platformLabel }) {
  const sectionUrl = `${SITE}/${route}`;
  const plat = platform ?? "mobile";
  const tLabel = target ? PLATFORM_LABEL[target] : platformLabel ?? "";
  const titleSuffix = target ? ` — ${tLabel}` : "";
  const description = target
    ? `Integrate the Amani ${heading} on ${tLabel} using the live Amani documentation. Use when adding or implementing the Amani ${heading} on ${tLabel}.`
    : `Integrate the Amani ${heading} using the live Amani documentation. Use when adding or implementing the Amani ${heading} (${platformLabel}).`;
  const meta = { platform: plat, sdk };
  if (variant) meta.variant = variant;
  if (target) meta.target = target;
  const liveDocs = (pages.length ? pages.map((p) => `- **${p.title}** — ${p.url}`) : [`- ${sectionUrl}`]).join("\n");
  return fillTemplate(readTemplate("leaf.md"), {
    NAME: name,
    DESCRIPTION: JSON.stringify(description),
    METADATA: metaBlock(meta),
    HEADING: `Amani ${heading}${titleSuffix}`,
    BLURB: blurb,
    LIVE_DOCS: liveDocs,
    RULES: assembleRules(plat, sdk, target),
  });
}

function kycRouterContent(combos) {
  const description =
    "Implement the Amani KYC (identity verification) SDK on mobile. Use when the user asks to add or implement Amani KYC but has not chosen the Core vs UI SDK or the platform — this skill asks first, then routes.";
  const rows = combos
    .slice()
    .sort((a, b) => a.vlabel.localeCompare(b.vlabel) || a.target.localeCompare(b.target))
    .map((c) => `| ${c.vlabel} | ${PLATFORM_LABEL[c.target]} | ${c.entry} | \`${c.name}\` |`)
    .join("\n");
  return fillTemplate(readTemplate("router-kyc.md"), { DESCRIPTION: JSON.stringify(description), ROWS: rows });
}

function platformRouterContent(sdkKey, sdef, combos) {
  const description = `Implement the Amani ${sdef.label} on mobile. Use when the user asks to add or implement the Amani ${sdef.label} but has not chosen a platform — this skill asks first, then routes.`;
  const rows = combos.map((c) => `| ${PLATFORM_LABEL[c.target]} | ${c.entry} | \`${c.name}\` |`).join("\n");
  return fillTemplate(readTemplate("router-platform.md"), {
    SDK: sdkKey,
    SDK_LABEL: sdef.label,
    DESCRIPTION: JSON.stringify(description),
    BLURB: sdef.blurb,
    ROWS: rows,
  });
}

// --- generate --------------------------------------------------------------

// KYC (Core + UI) — leaves + Core/UI router
{
  const combos = [];
  for (const [variant, vdef] of Object.entries(MOBILE.kyc.variants)) {
    for (const [target, pdef] of Object.entries(vdef.platforms)) {
      const pages = listPages(pdef.src, pdef.route);
      const name = `amani-kyc-${variant}-${target}`;
      writeSkill(name, leafContent({
        name, heading: `KYC ${vdef.label}`, blurb: vdef.blurb,
        sdk: "kyc", variant, target, route: pdef.route, pages,
      }));
      combos.push({ vlabel: vdef.label, target, entry: pages[0]?.url ?? `${SITE}/${pdef.route}`, name });
    }
  }
  writeSkill("amani-kyc", kycRouterContent(combos));
}

// Video / BioMatch / Voice — leaves + platform router
for (const sdkKey of ["video", "biomatch", "voice"]) {
  const sdef = MOBILE[sdkKey];
  const combos = [];
  for (const [target, pdef] of Object.entries(sdef.platforms)) {
    const pages = listPages(pdef.src, pdef.route, sdef.pageToken?.[target]);
    const name = `amani-${sdkKey}-${target}`;
    writeSkill(name, leafContent({
      name, heading: sdef.label, blurb: sdef.blurb,
      sdk: sdkKey, variant: null, target, route: pdef.route, pages,
    }));
    combos.push({ target, entry: pages[0]?.url ?? `${SITE}/${pdef.route}`, name });
  }
  writeSkill(`amani-${sdkKey}`, platformRouterContent(sdkKey, sdef, combos));
}

// Backend (REST API)
writeSkill("amani-api", leafContent({
  name: "amani-api", heading: BACKEND.label, blurb: BACKEND.blurb,
  sdk: "api", variant: null, target: null, route: BACKEND.route,
  pages: listPages(BACKEND.src, BACKEND.route), platform: "backend", platformLabel: "Backend / server-side",
}));

// Web SDK
writeSkill("amani-web-sdk", leafContent({
  name: "amani-web-sdk", heading: WEB.label, blurb: WEB.blurb,
  sdk: "web", variant: null, target: null, route: WEB.route,
  pages: listPages(WEB.src, WEB.route), platform: "web", platformLabel: "Web / browser",
}));

console.log(`Generated ${count} skills under skills/`);
