---
name: amani-video
description: "Implement the Amani Video Call SDK on mobile. Use when the user asks to add or implement the Amani Video Call SDK but has not chosen a platform — this skill asks first, then routes."
metadata:
  amani:
    platform: "mobile"
    sdk: "video"
    role: "router"
---

# Amani Video Call SDK — choose the platform

Live video identity verification / video call integration.

## Step 1 — Confirm the platform
Ask the user which platform, then use the live docs below.

| Platform | Start here (live docs) | Dedicated skill |
|---|---|---|
| Android | https://documentation.amani.ai/documents/androidVideo/Preparation | `amani-video-android` |
| iOS | https://documentation.amani.ai/documents/iosVideo/Preparation | `amani-video-ios` |
| Flutter | https://documentation.amani.ai/documents/flutterVideo/Preparation | `amani-video-flutter` |

Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features enabled, request least-privilege permissions, and cite every source URL.
