# Amani Agent Skills

Dynamic [Agent Skills](https://modelcontextprotocol.io) that teach AI agents
(Claude Code, Cursor, and any Agent-Skills-compatible agent) how to integrate
the **Amani SDKs** — grounded in the **live, public documentation** at
<https://documentation.amani.ai>.

These skills contain **no static copies** of the docs — only **live links** and
instructions. The agent fetches the current pages at runtime, so the guidance is
always up to date and never drifts from the published docs.

## Taxonomy

All skills live flat under `skills/` (vendor-prefixed names carry the grouping):

```
skills/
  mobile · KYC:      amani-kyc (router: Core vs UI) + amani-kyc-{core,ui}-{android,ios,flutter,react-native}
  mobile · Video:    amani-video (router) + amani-video-{android,ios,flutter}
  mobile · BioMatch: amani-biomatch (router) + amani-biomatch-{android,ios}
  mobile · Voice:    amani-voice (router) + amani-voice-{android,ios}
  backend:           amani-api
  web:               amani-web-sdk
```

## Install

**Option 1 — npx (no clone):**

```bash
npx -y github:AMANI-AI-ORG/skills            # -> ./.claude/skills  (this project)
npx -y github:AMANI-AI-ORG/skills --global   # -> ~/.claude/skills  (all projects)
npx -y github:AMANI-AI-ORG/skills --list     # list skills, install nothing
```

**Option 2 — git clone:**

```bash
git clone https://github.com/AMANI-AI-ORG/skills.git
node skills/bin/install.mjs --global    # install into ~/.claude/skills
```

**Option 3 — local (no push — for testing your own checkout):**

Already have the repo downloaded (local development / testing)? Install straight from the
folder — no clone or push needed:

```bash
# from inside the repo:
npx -y . --global              # -> ~/.claude/skills
node bin/install.mjs --global  # same, skips npm packing (fastest to re-run)

# or from anywhere, point npx at the folder:
npx -y /path/to/skills --global
```

Reload your agent after installing.

## How the disambiguation works

Ask your agent, e.g. *"Integrate the Amani KYC SDK."* The `amani-kyc` router skill triggers and the agent will:
1. Ask whether you want the **Core SDK** (headless, build your own UI) or the **UI SDK** (drop-in prebuilt screens), explaining the difference.
2. Confirm the platform (Android / iOS / Flutter / React Native).
3. Fetch the matching live documentation and apply it — using only documented versions/commands and citing every source URL.

Video / BioMatch / Voice routers ask only for the platform. `amani-api` (backend) and `amani-web-sdk` are single skills.

## Example prompts

Name the **product** and the **platform**, and let the skill fetch the live docs and pin the right versions.

**✅ Good — clear intent, let the skill do the grounded work:**
- "Integrate the Amani KYC SDK into this Android app."  → router asks Core vs UI, then confirms the platform.
- "Add the Amani KYC **Core** SDK to my iOS project."
- "Set up the Amani Video Call SDK on Flutter."
- "Integrate the Amani Web SDK into our React web app."
- "Use the Amani REST API from our backend to create a verification profile."
- "What's the latest documented version of the Amani Android UI SDK?"  → reads the ReleaseNote page.

**❌ Avoid — these fight the grounding and lead to wrong results:**
- "Add Amani KYC and set `implementation 'ai.amani.android:AmaniAi:3.0.4'`."  — don't hardcode a version from memory; the skill pins the latest from the docs.
- "Just install it from what you already know, no need to check the docs."  — the skill's whole value is reading the current official docs.
- "Integrate Amani KYC — don't ask, just pick Core or UI for me."  — Core vs UI is a real product choice; let it ask so you get the right SDK.
- "If the version shows a placeholder like `Tag`, just guess the newest one."  — it must take the real version from the ReleaseNote page (or ask you).
- "Grab the SDK from GitHub releases or a mirror."  — use only the official sources in the docs.
- "Help me with my app."  — too vague to trigger; name the SDK and the platform.

---

**Contributing / internals:** see [CONTRIBUTING.md](CONTRIBUTING.md) — architecture, how skills are generated from `templates/`, how to add a platform/SDK or a rule, and the release flow.
