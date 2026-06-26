---
name: amani-web-sdk
description: "Integrate the Amani Web SDK using the live Amani documentation. Use when adding or implementing the Amani Web SDK (Web / browser)."
metadata:
  amani:
    platform: "web"
    sdk: "web"
---

# Amani Web SDK

Browser / JavaScript integration of the Amani KYC flow.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **Getting Started** — https://documentation.amani.ai/documents/websdk/websdk-getting-started
- **Profile Information** — https://documentation.amani.ai/documents/websdk/websdk-flow-profile-info
- **Configuration and Callbacks** — https://documentation.amani.ai/documents/websdk/websdk-configuration-callbacks
- **Additional Steps** — https://documentation.amani.ai/documents/websdk/websdk-additional-steps
- **BioLogin** — https://documentation.amani.ai/documents/websdk/websdk-biologin
- **BioLogin (Legacy Login Route)** — https://documentation.amani.ai/documents/websdk/websdk-flow-biologin-login-route
- **BioLogin (Selfie Login)** — https://documentation.amani.ai/documents/websdk/websdk-flow-biologin
- **BioPay** — https://documentation.amani.ai/documents/websdk/websdk-biopay
- **BioPay** — https://documentation.amani.ai/documents/websdk/websdk-flow-biopay
- **Call Completion** — https://documentation.amani.ai/documents/websdk/websdk-flow-call-complete
- **Capture (Camera)** — https://documentation.amani.ai/documents/websdk/websdk-flow-capture
- **Capture and Upload** — https://documentation.amani.ai/documents/websdk/websdk-capture-upload
- **Completion and Return** — https://documentation.amani.ai/documents/websdk/websdk-flow-complete-return
- **Continue to the Next Required Step** — https://documentation.amani.ai/documents/websdk/websdk-flow-next-required-step
- **Document Type Selection** — https://documentation.amani.ai/documents/websdk/websdk-flow-document-version-selection
- **Email Verification (OTP)** — https://documentation.amani.ai/documents/websdk/websdk-flow-email-verification
- **Entity Completion** — https://documentation.amani.ai/documents/websdk/websdk-flow-entity-complete
- **Entity Document Upload** — https://documentation.amani.ai/documents/websdk/websdk-flow-entity-upload
- **Entity Information** — https://documentation.amani.ai/documents/websdk/websdk-flow-entity-info
- **Entity Verification** — https://documentation.amani.ai/documents/websdk/websdk-entity
- **KYC Entry (Short Link)** — https://documentation.amani.ai/documents/websdk/websdk-flow-kyc-entry-short-link
- **KYC Entry (Verification Link)** — https://documentation.amani.ai/documents/websdk/websdk-flow-kyc-entry-token-url
- **KYC Flow** — https://documentation.amani.ai/documents/websdk/websdk-kyc-flow
- **Phone Verification (OTP)** — https://documentation.amani.ai/documents/websdk/websdk-flow-phone-verification
- **Proof of Address** — https://documentation.amani.ai/documents/websdk/websdk-flow-proof-of-address
- **Questionnaire** — https://documentation.amani.ai/documents/websdk/websdk-flow-questionnaire
- **Signature** — https://documentation.amani.ai/documents/websdk/websdk-flow-signature
- **Step Selection** — https://documentation.amani.ai/documents/websdk/websdk-flow-step-selection
- **Unknown Route Handling** — https://documentation.amani.ai/documents/websdk/websdk-flow-catch-all
- **Video Call Verification** — https://documentation.amani.ai/documents/websdk/websdk-flow-video-call

## How to implement
1. Fetch the live pages above first (start with the setup / getting-started / overview pages).
2. Use ONLY the dependency coordinates, repository URLs, commands, permissions, endpoints and initialization/config code that appear in those docs — never recall them from memory.
3. Treat secrets as placeholders (`YOUR_API_KEY`, `sharedSecret`, tokens, client IDs) — wire them via secure config and ask the user; never hardcode a real value.
4. Cite the source URL next to each change. If a required detail is missing from the docs, say so and stop.

## Safety & security (apply to every integration)
- **Official sources only.** Use exactly the repositories / registries / endpoints in the docs; never substitute mirrors or unverified packages.
- **Pin exact versions** where the docs specify one (no floating `+`/`latest`) for reproducible, supply-chain-safe builds.
- **Never hardcode or commit secrets** — API keys, tokens, `sharedSecret`. Use environment variables / secure storage / platform keystores and keep them out of version control.
- **Least privilege.** Add only the permissions / scopes the docs require; don't request extras.
- **Protect user data.** Don't log or persist PII / verification data beyond what the docs specify.
- **Minimal, reversible changes.** Edit only what's needed, preserve existing config, and confirm before any destructive change to the user's project.
