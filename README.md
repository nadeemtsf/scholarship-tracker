# The “Get Me Out of Here” Initiative

Private graduate scholarship and application tracker.
Live: https://scholarship-tracker-r6s4.onrender.com/

## Codex access

Use the `scholarship_tracker` MCP server at `https://scholarship-tracker-r6s4.onrender.com/mcp`.
It supports authenticated stateless Streamable HTTP and seven tools: list_scholarships, get_scholarship, create_scholarship, update_scholarship, add_task, update_task, add_note.

For low token use, search by query/status, request only needed fields, and patch individual records using current versions. Normal updates need no browser, source reading or deployment. See AGENTS.md.

Configure Codex with an HTTP MCP entry and a bearer key supplied through `bearer_token_env_var`, a credential helper, or a private `http_headers` Authorization value. Never put the key in this repository. Set startup/tool timeouts to 120 seconds for Render cold starts. Restart Codex after adding a connection so it can discover the tools.

`mcp-authorized-keys.json` contains only SHA-256 fingerprints of cryptographically random 256-bit bearer keys. These fingerprints are public verification data, not usable credentials. To revoke/rotate a key, remove/replace its hash and deploy (with a fresh private data backup), or override all hashes with Render's TRACKER_MCP_TOKEN_SHA256 environment variable. Lost keys cannot be recovered from their hashes.

## Storage and deployment

The current Render deployment uses a local JSON file, not D1. **Free Render storage is ephemeral: deploys and restarts can erase runtime edits.** A persistent database/disk is still needed for durability.

Before deployment, download a fresh backup from the UI. After deployment, POST that backup privately to `/api/mcp-restore` using the same MCP bearer authentication. This restores exact IDs, versions, notes and activity, and refuses to overwrite a workspace that has already been edited. Never commit live backups or personal records. The seed is only initial data, not a current backup.

Local validation: `npm ci`, `npm run build`, `npx tsc --noEmit`. Start with `node node_modules/vinext/dist/cli.js start --hostname 127.0.0.1 --port 5198`. Set DATA_DIR to a disposable local test directory for mutation tests.

The .openai hosting files and scripts are retained as historical Sites integration; the active deployment is Render's Docker service.
