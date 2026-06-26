---
name: amani-api
description: "Integrate the Amani REST API using the live Amani documentation. Use when adding or implementing the Amani REST API (Backend / server-side)."
metadata:
  amani:
    platform: "backend"
    sdk: "api"
---

# Amani REST API

Server-side integration: authentication, profiles, users, document processing, webhooks and AML screening.

## Live documentation (fetch before implementing)
These are the authoritative, always-current docs. Fetch the relevant pages below, follow them exactly, and use ONLY the values they contain.

- **Amani REST API** — https://documentation.amani.ai/documents/api
- **AML** — https://documentation.amani.ai/documents/api/aml
- **Creating a new user** — https://documentation.amani.ai/documents/api/create_new_user
- **Document Process / Approve/Reject Document** — https://documentation.amani.ai/documents/api/Document%20Process/Approve
- **Document Process / Archive/Restore Document** — https://documentation.amani.ai/documents/api/Document%20Process/Archive
- **Document Process / Delete Document** — https://documentation.amani.ai/documents/api/Document%20Process/Delete
- **Document Process / Upload Document** — https://documentation.amani.ai/documents/api/Document%20Process/Upload
- **IP Whitelist** — https://documentation.amani.ai/documents/api/ip_whitelist
- **Managing webhooks** — https://documentation.amani.ai/documents/api/Webhooks/Overview
- **Retrieving a profile token** — https://documentation.amani.ai/documents/api/acquire_profile_token
- **Retrieving a profile's documents** — https://documentation.amani.ai/documents/api/retrieve_documents
- **Securing webhooks** — https://documentation.amani.ai/documents/api/Webhooks/Security
- **swagger** — https://documentation.amani.ai/documents/api/swagger
- **Updating a profile** — https://documentation.amani.ai/documents/api/update_profile

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

## REST API notes
- This is a server-side HTTP API, not a versioned client package — there is **no SDK version to pin**. Authenticate with the documented API key / token (e.g. `x-api-key` / `Authorization: Bearer`), call the documented endpoints exactly, and validate responses against the documented schema.
