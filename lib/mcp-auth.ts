import authorizedKeys from "../mcp-authorized-keys.json";

// Only SHA-256 fingerprints of random 256-bit keys belong in this file.
// The corresponding bearer keys stay on the owner's computer.
export async function authorizeMcp(request: Request): Promise<boolean> {
  const origin = request.headers.get("origin");
  if (origin && origin !== (process.env.RENDER_EXTERNAL_URL || new URL(request.url).origin)) return false;
  const match = /^Bearer ([A-Za-z0-9_-]{43,})$/.exec(request.headers.get("authorization") || "");
  if (!match) return false;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(match[1]));
  const hash = Array.from(new Uint8Array(digest), x => x.toString(16).padStart(2, "0")).join("");
  const configured = process.env.TRACKER_MCP_TOKEN_SHA256;
  const keys = configured ? configured.split(",").map(s => s.trim()) : authorizedKeys.sha256;
  return keys.some(key => key.length === hash.length && [...hash].reduce((diff, c, i) => diff | (c.charCodeAt(0) ^ key.charCodeAt(i)), 0) === 0);
}

export function mcpUnauthorized() {
  return Response.json({error:"MCP bearer authentication required."}, {status:401,headers:{"WWW-Authenticate":'Bearer realm="scholarship-tracker"',"Cache-Control":"no-store"}});
}
