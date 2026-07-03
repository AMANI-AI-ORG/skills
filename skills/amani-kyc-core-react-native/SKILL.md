---
name: amani-kyc-core-react-native
description: "Integrate the Amani KYC Core SDK on React Native using the live Amani documentation. Use when adding or implementing the Amani KYC Core SDK on React Native."
metadata:
  amani:
    platform: "mobile"
    sdk: "kyc"
    variant: "core"
    target: "react-native"
---

# Amani KYC Core SDK — React Native

Headless KYC engine — you build your own screens/UI; the SDK provides ID capture, NFC, selfie & liveness via APIs. Choose for full UI control.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **Preparation** — https://documentation.amani.ai/documents/reactnative/Preparation
- **Initializing the SDK** — https://documentation.amani.ai/documents/reactnative/initializing-the-sdk
- **Auto Selfie** — https://documentation.amani.ai/documents/reactnative/Selfie/AutoSelfie
- **ID Capture** — https://documentation.amani.ai/documents/reactnative/IDCapture
- **Manual Selfie** — https://documentation.amani.ai/documents/reactnative/Selfie/ManualSelfie
- **NFC Capture** — https://documentation.amani.ai/documents/reactnative/NFCCapture/NFCCapture
- **NFC Capture on Android** — https://documentation.amani.ai/documents/reactnative/NFCCapture/NFCCaptureOnAndroid
- **NFC Capture on iOS** — https://documentation.amani.ai/documents/reactnative/NFCCapture/NFCCaptureOnIOS
- **Pose Estimation Selfie** — https://documentation.amani.ai/documents/reactnative/Selfie/PoseEstimation
- **Selfie** — https://documentation.amani.ai/documents/reactnative/Selfie/Selfie

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

## Selfie integration — ask which mode (Core SDK only)
The Core SDK has you build the selfie step yourself, and Amani offers **three selfie modes**. When the user asks to add or implement the **selfie** step, do NOT pick one silently — **present all three options, explain the differences below, and ask which they want** — then integrate ONLY the chosen mode from its live doc page (find it in the **Live documentation** list above; the relevant pages are under "Selfie"):

- **Manual Selfie** — the user frames and taps to capture. Simplest flow, full user control. (live-docs page labelled "Manual")
- **Auto Selfie** — the SDK captures automatically when a valid, aligned face is detected (no tap). Smoother, hands-free UX. (live-docs page labelled "Auto")
- **Pose Estimation Selfie** — active liveness: the user follows guided head poses/movements that the SDK validates (strongest anti-spoofing). (live-docs page labelled "Pose Estimation")

Fetch the chosen mode's live page and confirm its exact setup, parameters and callbacks before integrating; implement only that one mode.
