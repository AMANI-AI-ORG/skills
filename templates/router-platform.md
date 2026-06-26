---
name: amani-{{SDK}}
description: {{DESCRIPTION}}
metadata:
  amani:
    platform: "mobile"
    sdk: "{{SDK}}"
    role: "router"
---

# Amani {{SDK_LABEL}} — choose the platform

{{BLURB}}

## Step 1 — Confirm the platform
Ask the user which platform, then use the live docs below.

| Platform | Start here (live docs) | Dedicated skill |
|---|---|---|
{{ROWS}}

Then follow the matching skill above. Always: use only official documented sources, **resolve & pin the latest version from the SDK's ReleaseNote page on documentation.amani.ai** (never GitHub Releases / jitpack / any external source, never a floating `Tag`/`latest`), never hardcode secrets, keep the docs' security features enabled, request least-privilege permissions, and cite every source URL.
