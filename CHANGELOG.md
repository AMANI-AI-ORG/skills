# Changelog

## v1.0.0

First public release of the **Amani Agent Skills** — dynamic [Agent Skills](https://documentation.amani.ai) that guide AI agents (Claude Code, Cursor, and any Agent-Skills-compatible agent) through integrating the Amani SDKs, grounded in the live documentation.

### What's Changed

* ![Feature](https://img.shields.io/badge/Feature-✨-8c730d) **Added 21 Agent Skills** covering the full Amani SDK surface — KYC (Core & UI), Video Call, BioMatch, Voice Assistant, Web SDK and the REST API — across Android, iOS, Flutter and React Native.
* ![Feature](https://img.shields.io/badge/Feature-✨-8c730d) **Live-docs linked, never stale.** Skills carry only links to <https://documentation.amani.ai> plus grounding rules — no copied documentation — so the agent fetches the current pages at runtime and guidance never drifts.
* ![Feature](https://img.shields.io/badge/Feature-✨-8c730d) **Guided routers.** `amani-kyc` asks **Core vs UI** (explaining the difference) before routing; the Video / BioMatch / Voice routers ask the platform, then route to the right skill.
* ![Feature](https://img.shields.io/badge/Feature-✨-8c730d) **Interactive setup prompts.** iOS installs ask **SPM vs CocoaPods** (SPM recommended); KYC asks the **API version V1 vs V2** (V2 default) and the **security level** (sharedSecret / SSL pinning); KYC Core asks the **selfie mode** (Manual / Auto / Pose Estimation).
* ![Improvement](https://img.shields.io/badge/Improvement-🛠️-8e44ad) **Grounding & safety built into every skill.** Use only documented versions and commands, pin the version from the docs' Release Notes, treat secrets as placeholders, keep security features on, and stay within the docs (no digging through local caches).
* ![Update](https://img.shields.io/badge/Update-🔄-2980b9) **One-command install.** `npx -y github:AMANI-AI-ORG/skills --global`, `git clone`, or a local checkout — installs into `~/.claude/skills` for Claude Code, Cursor and other Agent-Skills agents.

### Skills added (21)

| Group | Skills |
|---|---|
| **KYC** | `amani-kyc` (router) + `amani-kyc-{core,ui}-{android,ios,flutter,react-native}` |
| **Video Call** | `amani-video` (router) + `amani-video-{android,ios,flutter}` |
| **BioMatch** | `amani-biomatch` (router) + `amani-biomatch-{android,ios}` |
| **Voice Assistant** | `amani-voice` (router) + `amani-voice-{android,ios}` |
| **Backend** | `amani-api` |
| **Web** | `amani-web-sdk` |
