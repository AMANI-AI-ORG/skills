## Installation — ask SPM or CocoaPods first (SPM recommended)
This is an **iOS** integration. Before giving any installation steps, make this the **first question**: ask the user **which package manager they want to install with — Swift Package Manager (SPM) or CocoaPods** — and present **SPM as the recommended default** (offer it first):

- **Swift Package Manager (SPM)** — Apple's built-in dependency manager, no extra tooling. **Recommended.**
- **CocoaPods** — the established Ruby-based manager (`Podfile` + `pod install`).

Then follow **only** the chosen method, exactly as written on the SDK's live installation page. If the live docs document only one of the two, use that one and tell the user.
