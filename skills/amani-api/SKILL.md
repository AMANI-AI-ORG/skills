---
name: amani-api
description: "Integrate the Amani REST API using the live Amani documentation. Use when adding or implementing the Amani REST API (Backend / server-side)."
metadata:
  amani:
    platform: "backend"
    sdk: "api"
---

# Amani REST API — Backend / server-side

Server-side integration: authentication, profiles, users, document processing, webhooks and AML screening.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **Amani REST API** — https://documentation.amani.ai/documents/api
- **AML** — https://documentation.amani.ai/documents/api/aml
- **Approve/Reject Document** — https://documentation.amani.ai/documents/api/Document%20Process/Approve
- **Archive/Restore Document** — https://documentation.amani.ai/documents/api/Document%20Process/Archive
- **Creating a new user** — https://documentation.amani.ai/documents/api/create_new_user
- **Delete Document** — https://documentation.amani.ai/documents/api/Document%20Process/Delete
- **IP Whitelist** — https://documentation.amani.ai/documents/api/ip_whitelist
- **Managing webhooks** — https://documentation.amani.ai/documents/api/Webhooks/Overview
- **Retrieving a profile token** — https://documentation.amani.ai/documents/api/acquire_profile_token
- **Retrieving a profile's documents** — https://documentation.amani.ai/documents/api/retrieve_documents
- **Securing webhooks** — https://documentation.amani.ai/documents/api/Webhooks/Security
- **swagger** — https://documentation.amani.ai/documents/api/swagger
- **Updating a profile** — https://documentation.amani.ai/documents/api/update_profile
- **Upload Document** — https://documentation.amani.ai/documents/api/Document%20Process/Upload

## How to implement
1. Fetch the live pages above first (start with Requirements / Preparation / Getting Started).
2. Use ONLY the dependency coordinates, repository URLs, commands, permissions, endpoints and initialization code that appear in those docs — never recall them from memory.
3. **Pin the latest version from the docs release notes.** Get the current version ONLY from this SDK's **ReleaseNote** page (listed above, e.g. `.../<sdk>/ReleaseNote`) — never GitHub Releases, jitpack or any external source. Entries are newest-first: the **latest version is the first/topmost entry directly under the "Release Notes" heading** (that entry's heading IS the version, e.g. `v1.41.2`). Replace any placeholder (`Tag`, `LATEST_RELEASE`, `+`, `latest`) with that version and pin it exactly. The page is server-rendered — if your fetch returns an empty / JavaScript-only shell, retry or use a browser-capable fetch; never guess or fall back to a remembered version. If this SDK has no ReleaseNote page, use the version in the setup pages and ask the user if it is a placeholder.
4. Treat secret placeholders (`YOUR_API_KEY`, `sharedSecret`, tokens) as placeholders — wire them via secure config and ask the user; never hardcode a real value.
5. Cite the source URL next to each change. If a required detail is missing from the docs, say so and stop.

## Safety & security (apply to every integration)
- **Official sources only.** Use exactly the repositories/registries in the docs; never substitute mirrors or unverified packages.
- **Pin exact versions** (no floating `+`/`latest`) for reproducible, supply-chain-safe builds.
- **Never hardcode or commit secrets** — API keys, tokens, `sharedSecret`. Use environment variables / secure storage / platform keystores and keep them out of version control.
- **Least privilege.** Add only the permissions the docs require; don't request extras.
- **Keep security features on.** Honor the docs' SSL pinning / request signing / `sharedSecret`; never disable TLS or certificate validation.
- **Protect user data.** Don't log or persist PII / KYC data (ID images, NFC chip data, selfies) beyond what the docs specify.
- **Minimal, reversible changes.** Edit only what's needed, preserve existing config, and confirm before any destructive change to the user's project.
