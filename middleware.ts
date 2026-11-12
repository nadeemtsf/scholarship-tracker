import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export function middleware(request:NextRequest){
  // These endpoints independently require an MCP bearer key, never a browser cookie.
  if(request.nextUrl.pathname==="/mcp"||request.nextUrl.pathname==="/api/mcp-restore") return NextResponse.next();
  if(request.nextUrl.pathname.startsWith("/login")||request.nextUrl.pathname.startsWith("/api/login")||request.nextUrl.pathname.startsWith("/_next")||request.nextUrl.pathname==="/favicon.svg") return NextResponse.next();
  if(request.cookies.get("tracker_session")?.value!=="1"){
    const url=request.nextUrl.clone(); url.pathname="/login"; url.searchParams.set("return_to",request.nextUrl.pathname); return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config={matcher:["/((?!_next/static|_next/image).*)"]};
