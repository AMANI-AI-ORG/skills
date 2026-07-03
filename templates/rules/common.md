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
