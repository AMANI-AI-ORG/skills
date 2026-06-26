## REST API notes
- This is a server-side HTTP API, not a versioned client package — there is **no SDK version to pin**. Authenticate with the documented API key / token (e.g. `x-api-key` / `Authorization: Bearer`), call the documented endpoints exactly, and validate responses against the documented schema.
