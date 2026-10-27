# Scholarships — Nadim

Private, persistent application workspace. Live data is stored in D1 and shared across devices. Application records are separate from source and survive deployments.

Site ID: appgprj_6ae0d5aa151c8191991c35e2decb3a3d
Expected URL: https://nadim-scholarships.nmdevs26.chatgpt.site

Features: applications, statuses, task/document/contact checklists, deadlines, programme choices, links, notes, activity history, pinning, archive/restore, search, JSON backup. Live refresh every 30 seconds while visible and on focus. Sign in with the same ChatGPT account on phone and desktop.

Agent updates: the Site publishes seven tools through POST /mcp. Read compact status/version, then patch only relevant fields or task completion. This does not rebuild or redeploy the website. See AGENTS.md.

Data provenance: lib/seed.ts captures known progress from the conversation on 27 October 2026. It runs only on first database initialisation. Unconfirmed dates/statuses are labelled. A draft is not a signed, uploaded or submitted document. Original France Excellence programme choices are retained.

Local verification: generate Drizzle migrations, build, apply migrations to local D1 with the starter's documented command, then run the dev server. scripts/qa.mjs performs browser and API integration checks with local-only QA records. Browser screenshots and backups belong under ignored outputs/.

Publishing: follow the Sites skill, preserve .openai/hosting.json identity and owner-private access, use source workflow and a matching deployment archive. Never commit credentials or local runtime data.
