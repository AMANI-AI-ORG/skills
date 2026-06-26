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
    platform-<x>.md / sdk-<x>.md   OPTIONAL — add more scoped files as needed (auto-appended to matching skills)
skills/                 GENERATED — flat <name>/SKILL.md (do NOT hand-edit)
bin/install.mjs         installer used by npx / clone (copies skills into .claude/skills)
package.json            npm / npx metadata
README.md               end-user usage
```

## Two repos
- The **docs** (`documents/**`) and `generate.mjs` live in the Docusaurus documentation repo; `generate.mjs` must run there (it reads `../documents`).
- This **skills repo** (`AMANI-AI-ORG/skills`) is the published output. After regenerating in the docs repo, sync the result here (`skills/`, `templates/`, `generate.mjs`, `bin/`, `package.json`, `README.md`, `CONTRIBUTING.md`), then commit/push.

## How to make changes

| Change | Where |
|---|---|
| Reword a shared rule / safety item | `templates/rules/common.md` |
| Change leaf or router wording/structure | `templates/leaf.md` / `router-kyc.md` / `router-platform.md` |
| **Platform-specific rule** | add `templates/rules/platform-<x>.md` (live example: `platform-mobile.md` = version/SSL/capture rules for all mobile SDKs) |
| **SDK-specific rule** | add `templates/rules/sdk-<x>.md` (live example: `sdk-api.md` = REST API note, no version to pin) |
| Add / rename an SDK or platform | edit the `MOBILE` / `BACKEND` / `WEB` taxonomy in `generate.mjs` |
| Change the live docs domain | `SITE` in `generate.mjs` |
| Change the GitHub org/repo | search-replace in `README.md` + `package.json` + `bin/install.mjs` |

Then regenerate (run where `../documents` exists):

```bash
node skills/generate.mjs
```

The rules for a skill = `common.md` **+** `platform-<platform>.md` (if present) **+** `sdk-<sdk>.md` (if present). So platform/SDK rules are opt-in: create the file only when needed; absent files are skipped.

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
- **npm (optional):** `npm publish` ships `skills/ bin/ README.md` (see `package.json` `files`).

## Release / update flow
1. Docs change → `node skills/generate.mjs` (in the docs repo).
2. Sync the output to this skills repo.
3. `git add -A && git commit && git push` (add `git tag vX.Y.Z && git push --tags` for pinned `#vX.Y.Z` installs).
