---
name: amani-kyc
description: "Implement the Amani KYC (identity verification) SDK on mobile. Use when the user asks to add or implement Amani KYC but has not chosen the Core vs UI SDK or the platform — this skill asks first, then routes."
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
| Core SDK | Android | https://documentation.amani.ai/documents/android/Preparation | `amani-kyc-core-android` |
| Core SDK | Flutter | https://documentation.amani.ai/documents/flutter/Preparation | `amani-kyc-core-flutter` |
| Core SDK | iOS | https://documentation.amani.ai/documents/ios/Preparation | `amani-kyc-core-ios` |
| Core SDK | React Native | https://documentation.amani.ai/documents/reactnative/Preparation | `amani-kyc-core-react-native` |
| UI SDK | Android | https://documentation.amani.ai/documents/androidui/Preparation | `amani-kyc-ui-android` |
| UI SDK | Flutter | https://documentation.amani.ai/documents/flutterui/Requirements | `amani-kyc-ui-flutter` |
| UI SDK | iOS | https://documentation.amani.ai/documents/iosui/Preparation | `amani-kyc-ui-ios` |
| UI SDK | React Native | https://documentation.amani.ai/documents/reactnativeui/Requirements | `amani-kyc-ui-react-native` |

Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features (SSL pinning / request signing / `sharedSecret`) enabled, request least-privilege permissions, and cite every source URL.
