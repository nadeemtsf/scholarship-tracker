# Scholarship tracker

Live tracker: https://scholarship-tracker-r6s4.onrender.com/ (Render).
The old Sites project ID in .openai/hosting.json is historical; do not create a replacement Site or change hosting for routine record updates.

Use the `scholarship_tracker` MCP connection for progress updates. Do not open the browser, read source, or redeploy to edit application records.
1. `list_scholarships(query=...)` finds compact summaries and current versions. Use status/limit/offset when useful; default limit is 20, maximum 50. Include archived records only when needed.
2. `get_scholarship(id, fields=[...])` returns just the needed fields plus id/version. For task edits request tasks; avoid full notes unless needed.
3. Use add_note, add_task, update_task, or update_scholarship to change only confirmed fields. Use the most recent returned version for consecutive edits. On conflicts, reread and preserve other edits. Write responses are compact acknowledgements.
These tools modify live records directly. They do not rebuild the site or send applications/emails.

Render MCP uses a dedicated random bearer key. Only its SHA-256 fingerprint is committed in mcp-authorized-keys.json. An optional TRACKER_MCP_TOKEN_SHA256 environment variable overrides that list (comma-separated hashes). Never commit the bearer key, credentials or live backups. Browser cookies do not authenticate MCP calls. Sites dispatch authentication is not used on Render.

IMPORTANT: Render currently runs on free compute with an ephemeral filesystem. lib/store.ts writes .data/workspace.json. Redeploys/restarts may lose runtime edits. Before any deployment, save a fresh private JSON backup; after deployment, restore it through the bearer-protected /api/mcp-restore endpoint BEFORE edits resume. Restoration validates the backup and refuses any workspace with activity or versions above 1. Persistent storage is still required to survive unattended restarts. Never reset or reseed live edited records, or edit lib/seed.ts to record progress.

Use only observed/confirmed progress. Drafted is different from signed, uploaded, submitted, admitted or funded. Unknown deadlines stay unconfirmed. The original six France Excellence programme choices remain until the user changes them. A fact becoming clear is permission to maintain the tracker, not permission to send emails or submit applications.

Source and website are separate from personal records. Do not commit credentials or export the production database to source control. The website is password-protected; preserve private access. Never compile .text files.
