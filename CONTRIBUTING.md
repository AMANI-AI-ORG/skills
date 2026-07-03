# Contributing & Architecture — Amani Agent Skills

Internal/technical guide: how these skills are built, changed, and distributed.
End-user usage lives in [README.md](README.md).

## What this is
A set of **dynamic Agent Skills** (`SKILL.md`) that guide AI agents to integrate
the Amani SDKs. Each skill carries **only live links** to
<https://documentation.amani.ai> plus grounding rules — never copies of the docs —
so guidance stays current automatically. The agent fetches the live pages at runtime.

## Architecture

```
documents/**        templates/             generate.mjs          skills/
(URL source of      (prompt/rule           (assembler,           (generated output,
 truth)              templates)             zero deps)            committed)
      \                  |                       |                       |
       \________________ reads _________________/ ___ writes __________/
                                                                         |
                                          runtime: agent fetches live docs
```

- **`generate.mjs`** is the only build step. It (a) walks `documents/**` to find pages, (b) maps each to its **live URL** (mirroring Docusaurus routing), (c) fills `templates/` with per-skill data + shared rules, (d) writes flat `skills/<name>/SKILL.md`.
- **Output is self-contained:** every `SKILL.md` embeds its rules. Agent Skills load individually, and a shared *referenced* file would not reliably load (and breaks after install/flatten) — so rules are embedded, but sourced **once** from `templates/rules/common.md`.

## Repo layout

```
generate.mjs            build script (pure Node, zero deps)
templates/
  leaf.md               per-platform skill body — placeholders {{NAME}} {{HEADING}} {{BLURB}} {{LIVE_DOCS}} {{RULES}} ...
  router-kyc.md         KYC Core-vs-UI disambiguation router
  router-platform.md    single-SDK platform router (video / biomatch / voice)
  rules/
    common.md           shared rules (How to implement + Safety) injected into EVERY skill
    platform-mobile.md  scoped: version-from-ReleaseNote + SSL/capture rules (all mobile SDKs)
    sdk-api.md          scoped: REST API note (no version to pin)
    sdk-kyc.md          scoped: API version (V1/V2) + security-level (sharedSecret/SSL) prompts — all KYC leaves
    sdk-kyc-core.md     scoped: selfie-mode choice (Manual/Auto/Pose) — KYC Core leaves only
    platform-ios.md / platform-flutter.md / platform-react-native.md   scoped: SPM-vs-CocoaPods install choice (SPM recommended) — iOS-involving leaves
    platform-<x>.md / sdk-<x>.md / sdk-<sdk>-<variant>.md   OPTIONAL — add more scoped files (auto-appended to matching skills)
skills/                 GENERATED — flat <name>/SKILL.md (do NOT hand-edit)
bin/install.mjs         installer used by npx / clone (copies skills into .claude/skills)
package.json            npm / npx metadata
README.md               end-user usage
```

## Where the docs come from
- The **docs** (`documents/**`) are the URL source of truth and live in the Docusaurus documentation repo.
- `generate.mjs` reads them from a sibling `documents/` by default, or from **`$AMANI_DOCS_DIR`** when this skills repo is standalone (docs checked out in another repo). It embeds only the resulting live URLs — never doc content — so no docs are copied here.
- This **skills repo** (`AMANI-AI-ORG/skills`) is the published output: `generate.mjs`, `templates/`, the generated `skills/`, `bin/`, `package.json`. Regenerate after the docs change, then commit/push.

## How to make changes

| Change | Where |
|---|---|
| Reword a shared rule / safety item | `templates/rules/common.md` |
| Change leaf or router wording/structure | `templates/leaf.md` / `router-kyc.md` / `router-platform.md` |
| **Platform-specific rule** | add `templates/rules/platform-<x>.md` (live example: `platform-mobile.md` = version/SSL/capture rules for all mobile SDKs) |
| **SDK-specific rule** | add `templates/rules/sdk-<x>.md` (live example: `sdk-api.md` = REST API note, no version to pin) |
| **SDK + variant rule** | add `templates/rules/sdk-<sdk>-<variant>.md` (live example: `sdk-kyc-core.md` = selfie-mode choice for KYC **Core** leaves only) |
| Add / rename an SDK or platform | edit the `MOBILE` / `BACKEND` / `WEB` taxonomy in `generate.mjs` |
| Change the live docs domain | `SITE` in `generate.mjs` |
| Change the GitHub org/repo | search-replace in `README.md` + `package.json` + `bin/install.mjs` |

Then regenerate (point at the docs if they aren't a sibling `documents/`):

```bash
# docs as a sibling directory:
node generate.mjs
# or docs checked out in another repo:
AMANI_DOCS_DIR="/path/to/Documentation/documents" node generate.mjs
```

The rules for a skill = `common.md` **+** `platform-<category>.md` & `platform-<os>.md` (if present) **+** `sdk-<sdk>.md` (if present) **+** `sdk-<sdk>-<variant>.md` (if present). So scoped rules are opt-in: create the file only when needed; absent files are skipped.

## How live URLs are derived (important)
`generate.mjs` mirrors Docusaurus routing so links resolve on the live site:
- `path` ≠ `routeBasePath` (e.g. `documents/iosv3` → `/documents/ios`; case-sensitive `iosVideo`).
- Honors frontmatter **`slug`** (absolute `/x` vs directory-relative) and **`id`** (a doc's slug defaults to a custom id — e.g. every Web SDK page).
- Strips a leading **BOM** (`﻿`) before parsing frontmatter (some pages start with one).
- The latest **version** is taken from each **mobile** SDK's docs **ReleaseNote** page (newest entry on top) — never GitHub/jitpack/guessing. This rule lives in `templates/rules/platform-mobile.md`; backend/web have no version to pin.

## Verifying generated URLs
A stale/wrong URL returns the ~8931-byte SPA shell. Audit all of them:

```bash
grep -rhoE "https://documentation\.amani\.ai/[^ )]+" skills | sort -u | while read -r u; do
  b=$(curl -s -L -o /dev/null -w "%{size_download}" "$u"); [ "${b:-0}" -lt 9500 ] && echo "BROKEN $b $u"; done
```

(A few mobile feature sub-pages may report broken if they aren't deployed on the live site yet — a docs-deployment gap, not a generator bug.)

## Distribution
- **npx:** `npx -y github:AMANI-AI-ORG/skills --global`
- **git clone:** `git clone https://github.com/AMANI-AI-ORG/skills.git && node skills/bin/install.mjs --global`
- **local (no push — testing a checkout):** from inside the repo `npx -y . --global` or `node bin/install.mjs --global` (or `npx -y /path/to/skills --global` from elsewhere). `npx` honors the package `bin` + `files`, so it installs the same set as a published package without committing/pushing.
- **npm (optional):** `npm publish` ships `skills/ bin/ README.md` (see `package.json` `files`).

## Release / update flow
1. Docs change → regenerate: `node generate.mjs` (or with `AMANI_DOCS_DIR=…`).
2. `git add -A && git commit && git push` (add `git tag vX.Y.Z && git push --tags` for pinned `#vX.Y.Z` installs).
