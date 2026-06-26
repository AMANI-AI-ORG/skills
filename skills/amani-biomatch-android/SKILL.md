---
name: amani-biomatch-android
description: "Integrate the Amani BioMatch SDK on Android using the live Amani documentation. Use when adding or implementing the Amani BioMatch SDK on Android."
metadata:
  amani:
    platform: "mobile"
    sdk: "biomatch"
    target: "android"
---

# Amani BioMatch SDK — Android

Biometric face matching / verification.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **Preparation** — https://documentation.amani.ai/documents/androidbiomatch/Preparation
- **Usage** — https://documentation.amani.ai/documents/androidbiomatch/Usage
- **SDK Release Notes** — https://documentation.amani.ai/documents/androidbiomatch/ReleaseNote

## How to implement
1. Fetch the live pages above first (start with the setup / getting-started / overview pages).
2. Use ONLY the dependency coordinates, repository URLs, commands, permissions, endpoints and initialization/config code that appear in those docs — never recall them from memory.
3. Treat secrets as placeholders (`YOUR_API_KEY`, `sharedSecret`, tokens, client IDs) — wire them via secure config and ask the user; never hardcode a real value.
4. Cite the source URL next to each change. If a required detail is missing from the docs, say so and stop.

## Safety & security (apply to every integration)
- **Official sources only.** Use exactly the repositories / registries / endpoints in the docs; never substitute mirrors or unverified packages.
- **Pin exact versions** where the docs specify one (no floating `+`/`latest`) for reproducible, supply-chain-safe builds.
- **Never hardcode or commit secrets** — API keys, tokens, `sharedSecret`. Use environment variables / secure storage / platform keystores and keep them out of version control.
- **Least privilege.** Add only the permissions / scopes the docs require; don't request extras.
- **Protect user data.** Don't log or persist PII / verification data beyond what the docs specify.
- **Minimal, reversible changes.** Edit only what's needed, preserve existing config, and confirm before any destructive change to the user's project.

## Mobile SDK — version & security
- **Pin the latest version from the docs release notes.** Get the current version ONLY from this SDK's **ReleaseNote** page (listed above, e.g. `.../<sdk>/ReleaseNote`) — never GitHub Releases, jitpack or any external source. Entries are newest-first: the **latest version is the first/topmost entry directly under the "Release Notes" heading** (that entry's heading IS the version, e.g. `v1.41.2`). Replace any placeholder (`Tag`, `LATEST_RELEASE`, `+`, `latest`) with that version and pin it exactly. The page is server-rendered — if your fetch returns an empty / JavaScript-only shell, retry or use a browser-capable fetch; never guess. If this SDK has no ReleaseNote page, use the version in the setup pages and ask the user if it is a placeholder.
- **Keep mobile security features on.** Honor the docs' SSL pinning / request signing / `sharedSecret`; never disable TLS or certificate validation.
- **Protect captured data.** Don't log or persist KYC capture data (ID images, NFC chip data, selfies) beyond what the docs specify.
