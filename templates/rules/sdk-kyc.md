## Configuration — ask API version V1 or V2 (default & recommended: V2)
When configuring/initializing the KYC SDK, ask the user **which Amani API version to use — V1 or V2** — presenting **V2 as the default and recommended** option. Briefly explain: this selects the **Amani backend version**; **V2 is the newest and most stable**, and the SDK stays **compatible with both**. Set the choice through the parameter the live docs use for this platform (the name varies — e.g. `version = AmaniVersion.V2` on Android, `amaniVersion` on Android UI, `apiVersion: .v2` on iOS, `apiVersion: AmaniApiVersion.v2` on Flutter) — use exactly what the docs show. Default to V2 unless the user picks V1.

## Security setup — ask which level first (sharedSecret / SSL pinning)
`sharedSecret` (signs & validates network requests) and **SSL pinning** (validates the server certificate) are **optional** hardening layers. Before wiring either, ask the user **which security level they want** — offer these three options:

1. **None — quick setup.** Configure without `sharedSecret` or SSL pinning to get running fastest; both can be added later whenever they want.
2. **`sharedSecret` only.** Pick this if Amani has provided you a `sharedSecret` value; if you're not sure whether you have one, ask Amani.
3. **`sharedSecret` + SSL pinning.** Both enabled together — the most secure setup.

Apply only the chosen level, exactly as the live docs describe it (`sharedSecret` is a `configure()` / init parameter; SSL pinning is a separate call made **before** configure). Offer only the features this platform's docs actually document, use the real value/certificate the user provides (never invent one), and keep secrets out of version control.
