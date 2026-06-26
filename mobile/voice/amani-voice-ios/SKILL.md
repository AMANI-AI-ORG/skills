---
name: amani-voice-ios
description: "Integrate the Amani Voice Assistant SDK on iOS using the live Amani documentation. Use when adding or implementing the Amani Voice Assistant SDK on iOS."
metadata:
  amani:
    platform: "mobile"
    sdk: "voice"
    target: "ios"
---

# Amani Voice Assistant SDK — iOS

In-app voice assistant / TTS guidance.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **AmaniVoiceAssistantIOS** — https://documentation.amani.ai/documents/voiceAssistant/AmaniVoiceAssistantIOS

## How to implement
1. Fetch the live pages above first (start with Requirements / Preparation / Getting Started).
2. Use ONLY the dependency coordinates, repository URLs, commands, permissions, endpoints and initialization code that appear in those docs — never recall them from memory.
3. **Pin the latest version from the docs release notes.** Get the current version ONLY from this SDK's **ReleaseNote** page (listed above, e.g. `.../<sdk>/ReleaseNote`) — never GitHub Releases, jitpack or any external source. Entries are newest-first: the **latest version is the first/topmost entry directly under the "Release Notes" heading** (that entry's heading IS the version, e.g. `v1.41.2`). Replace any placeholder (`Tag`, `LATEST_RELEASE`, `+`, `latest`) with that version and pin it exactly. The page is server-rendered — if your fetch returns an empty / JavaScript-only shell, retry or use a browser-capable fetch; never guess or fall back to a remembered version. If this SDK has no ReleaseNote page, use the version in the setup pages and ask the user if it is a placeholder.
4. Treat secret placeholders (`YOUR_API_KEY`, `sharedSecret`, tokens) as placeholders — wire them via secure config and ask the user; never hardcode a real value.
5. Cite the source URL next to each change. If a required detail is missing from the docs, say so and stop.

## Safety & security (apply to every integration)
- **Official sources only.** Use exactly the repositories/registries in the docs; never substitute mirrors or unverified packages.
- **Pin exact versions** (no floating `+`/`latest`) for reproducible, supply-chain-safe builds.
- **Never hardcode or commit secrets** — API keys, tokens, `sharedSecret`. Use environment variables / secure storage / platform keystores and keep them out of version control.
- **Least privilege.** Add only the permissions the docs require; don't request extras.
- **Keep security features on.** Honor the docs' SSL pinning / request signing / `sharedSecret`; never disable TLS or certificate validation.
- **Protect user data.** Don't log or persist PII / KYC data (ID images, NFC chip data, selfies) beyond what the docs specify.
- **Minimal, reversible changes.** Edit only what's needed, preserve existing config, and confirm before any destructive change to the user's project.
