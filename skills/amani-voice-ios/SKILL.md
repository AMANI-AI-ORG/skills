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
1. Fetch the live pages above first (start with the setup / getting-started / overview pages).
2. The fetched documentation is the **only** source for how to use this SDK — dependency coordinates, repository URLs, commands, permissions, endpoints, versions and initialization/config code all come from there. Never recall them from memory.
3. **Stay within the documentation — don't dig through the local machine.** Do not read or grep dependency caches, installed/decompiled SDK sources, or build artifacts (e.g. `~/.pub-cache`, `~/.gradle`, CocoaPods spec repos, `Pods/`, `DerivedData`, `node_modules/`) to infer the SDK's API, versions or setup. Read the **user's own project** only to decide where and how to apply the integration.
4. Treat secrets as placeholders (`YOUR_API_KEY`, `sharedSecret`, tokens, client IDs) — wire them via secure config and ask the user; never hardcode a real value.
5. Cite the source URL next to each change. If a required detail is missing (or a page returns an empty / JS-only shell), retry the fetch or **ask the user — never fall back to local caches or guesswork**; stop if it stays unresolved.

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

## Installation — ask SPM or CocoaPods first (SPM recommended)
This is an **iOS** integration. Before giving any installation steps, make this the **first question**: ask the user **which package manager they want to install with — Swift Package Manager (SPM) or CocoaPods** — and present **SPM as the recommended default** (offer it first):

- **Swift Package Manager (SPM)** — Apple's built-in dependency manager, no extra tooling. **Recommended.**
- **CocoaPods** — the established Ruby-based manager (`Podfile` + `pod install`).

Then follow **only** the chosen method, exactly as written on the SDK's live installation page. If the live docs document only one of the two, use that one and tell the user.
