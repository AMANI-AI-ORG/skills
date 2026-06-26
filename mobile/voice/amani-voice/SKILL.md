---
name: amani-voice
description: "Implement the Amani Voice Assistant SDK on mobile. Use when the user asks to add or implement the Amani Voice Assistant SDK but has not chosen a platform — this skill asks first, then routes."
metadata:
  amani:
    platform: "mobile"
    sdk: "voice"
    role: "router"
---

# Amani Voice Assistant SDK — choose the platform

In-app voice assistant / TTS guidance.

## Step 1 — Confirm the platform
Ask the user which platform, then use the live docs below.

| Platform | Start here (live docs) | Dedicated skill |
|---|---|---|
| Android | https://documentation.amani.ai/documents/voiceAssistant/AmaniVoiceAssistantAndroid | `amani-voice-android` |
| iOS | https://documentation.amani.ai/documents/voiceAssistant/AmaniVoiceAssistantIOS | `amani-voice-ios` |

Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features enabled, request least-privilege permissions, and cite every source URL.
