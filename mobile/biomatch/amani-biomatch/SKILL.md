---
name: amani-biomatch
description: "Implement the Amani BioMatch SDK on mobile. Use when the user asks to add or implement the Amani BioMatch SDK but has not chosen a platform — this skill asks first, then routes."
metadata:
  amani:
    platform: "mobile"
    sdk: "biomatch"
    role: "router"
---

# Amani BioMatch SDK — choose the platform

Biometric face matching / verification.

## Step 1 — Confirm the platform
Ask the user which platform, then use the live docs below.

| Platform | Start here (live docs) | Dedicated skill |
|---|---|---|
| Android | https://documentation.amani.ai/documents/androidbiomatch/Preparation | `amani-biomatch-android` |
| iOS | https://documentation.amani.ai/documents/iosbiomatch/Preparation | `amani-biomatch-ios` |

Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features enabled, request least-privilege permissions, and cite every source URL.
