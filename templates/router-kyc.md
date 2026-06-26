---
name: amani-kyc
description: {{DESCRIPTION}}
metadata:
  amani:
    platform: "mobile"
    sdk: "kyc"
    role: "router"
---

# Amani KYC SDK — choose the right integration

Amani KYC ships in **two variants**. Before writing any code you MUST ask the user which one, explain the difference, then confirm the platform.

## Step 1 — Ask the user: Core SDK or UI SDK?
Present BOTH options with this explanation, then let the user choose (do not assume):
- **Core SDK** — *headless*. You build your own screens; the SDK provides the KYC engine (ID capture, NFC, selfie, liveness) via APIs. Choose for full UI control / custom design.
- **UI SDK** — *drop-in*. Prebuilt, ready-made KYC screens & flow (an interface layer over Core). Choose for the fastest integration with minimal UI work.

## Step 2 — Confirm the platform
Available platforms: Android, iOS, Flutter, React Native.

## Step 3 — Use the live docs for the chosen combination
| Variant | Platform | Start here (live docs) | Dedicated skill |
|---|---|---|---|
{{ROWS}}

Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features (SSL pinning / request signing / `sharedSecret`) enabled, request least-privilege permissions, and cite every source URL.
