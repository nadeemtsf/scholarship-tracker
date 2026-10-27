# Scholarship tracker

Private Site: appgprj_6ae0d5aa151c8191991c35e2decb3a3d.
Source: this directory. Hosting is controlled by .openai/hosting.json; never create a replacement Site for updates.

For progress updates, use the published Site's tools (list_scholarships, get_scholarship, update_task, update_scholarship, add_note). Read compact status/version first and update only relevant fields. This updates shared D1 records directly without editing source, redeploying or reading every file. On a version conflict, reread and preserve the user's edits.

If tools are absent, get_site(include_mcp_connection=true) supplies the Site plugin connection. Use Sites' supported connection flow. Do not invent credentials or make the Site public to enable updates.

lib/seed.ts is first-run seed only, not live state. Never edit seeds to record progress after first deployment. Routine deployments preserve D1 records. Never reset the database, reseed edited records or change applied migrations. Schema changes require new Drizzle migrations.

Use only observed/confirmed progress. Drafted is different from signed, uploaded, submitted, admitted or funded. Unknown deadlines stay unconfirmed. The original six France Excellence programme choices remain until the user changes them. A fact becoming clear is permission to maintain the tracker, not permission to send emails or submit applications.

Source and website are separate from personal records. Do not commit credentials or export the production database to source control. The website is owner-private; preserve this audience. Never compile .text files.
