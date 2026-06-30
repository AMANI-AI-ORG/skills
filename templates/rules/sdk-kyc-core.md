## Selfie integration — ask which mode (Core SDK only)
The Core SDK has you build the selfie step yourself, and Amani offers **three selfie modes**. When the user asks to add or implement the **selfie** step, do NOT pick one silently — **present all three options, explain the differences below, and ask which they want** — then integrate ONLY the chosen mode from its live doc page (find it in the **Live documentation** list above; the relevant pages are under "Selfie"):

- **Manual Selfie** — the user frames and taps to capture. Simplest flow, full user control. (live-docs page labelled "Manual")
- **Auto Selfie** — the SDK captures automatically when a valid, aligned face is detected (no tap). Smoother, hands-free UX. (live-docs page labelled "Auto")
- **Pose Estimation Selfie** — active liveness: the user follows guided head poses/movements that the SDK validates (strongest anti-spoofing). (live-docs page labelled "Pose Estimation")

Fetch the chosen mode's live page and confirm its exact setup, parameters and callbacks before integrating; implement only that one mode.
