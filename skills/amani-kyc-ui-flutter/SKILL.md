---
name: amani-kyc-ui-flutter
description: "Integrate the Amani KYC UI SDK on Flutter using the live Amani documentation. Use when adding or implementing the Amani KYC UI SDK on Flutter."
metadata:
  amani:
    platform: "mobile"
    sdk: "kyc"
    variant: "ui"
    target: "flutter"
---

# Amani KYC UI SDK — Flutter

Drop-in, prebuilt KYC screens & flow (an interface layer over the Core SDK). Choose for the fastest integration with minimal UI work.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **Requirements** — https://documentation.amani.ai/documents/flutterui/Requirements
- **Installation** — https://documentation.amani.ai/documents/flutterui/Installation
- **Integration** — https://documentation.amani.ai/documents/flutterui/Integration
- **Usage** — https://documentation.amani.ai/documents/flutterui/Usage
- **Permissions** — https://documentation.amani.ai/documents/flutterui/Permissions
- **SDK Release Notes** — https://documentation.amani.ai/documents/flutterui/ReleaseNote

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

## iOS setup — ask SPM or CocoaPods first (SPM recommended)
This SDK builds for both Android and iOS. When you reach the **iOS** setup, make this the **first question** for that step: ask the user **which package manager to use — Swift Package Manager (SPM) or CocoaPods** — and present **SPM as the recommended default** (offer it first). Then follow only the chosen method, exactly as written in the live iOS installation docs; if only one manager is documented, use that one and say so. (The Android build needs no such choice.)

## Configuration — ask API version V1 or V2 (default & recommended: V2)
When configuring/initializing the KYC SDK, ask the user **which Amani API version to use — V1 or V2** — presenting **V2 as the default and recommended** option. Briefly explain: this selects the **Amani backend version**; **V2 is the newest and most stable**, and the SDK stays **compatible with both**. Set the choice through the parameter the live docs use for this platform (the name varies — e.g. `version = AmaniVersion.V2` on Android, `amaniVersion` on Android UI, `apiVersion: .v2` on iOS, `apiVersion: AmaniApiVersion.v2` on Flutter) — use exactly what the docs show. Default to V2 unless the user picks V1.

## Security setup — ask which level first (sharedSecret / SSL pinning)
`sharedSecret` (signs & validates network requests) and **SSL pinning** (validates the server certificate) are **optional** hardening layers. Before wiring either, ask the user **which security level they want** — offer these three options:

1. **None — quick setup.** Configure without `sharedSecret` or SSL pinning to get running fastest; both can be added later whenever they want.
2. **`sharedSecret` only.** Pick this if Amani has provided you a `sharedSecret` value; if you're not sure whether you have one, ask Amani.
3. **`sharedSecret` + SSL pinning.** Both enabled together — the most secure setup.

Apply only the chosen level, exactly as the live docs describe it (`sharedSecret` is a `configure()` / init parameter; SSL pinning is a separate call made **before** configure). Offer only the features this platform's docs actually document, use the real value/certificate the user provides (never invent one), and keep secrets out of version control.
