import {getChatGPTUser} from "@/app/chatgpt-auth";
import {listProjects,getActivity,runCommand,StoreError} from "@/lib/store";
import {ZodError} from "zod";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
export async function GET(){if(!await getChatGPTUser())return Response.json({error:"Please sign in again."},{status:401,headers});try{const projects=await listProjects();return Response.json({projects,activity:await getActivity()},{headers});}catch{return Response.json({error:"Unable to load your workspace. Please retry."},{status:503,headers});}}
export async function POST(request:Request){if(!await getChatGPTUser())return Response.json({error:"Please sign in again."},{status:401,headers});const origin=request.headers.get("origin");if(request.headers.get("sec-fetch-site")==="cross-site"||(origin&&origin!==new URL(request.url).origin))return Response.json({error:"Request not allowed."},{status:403,headers});try{const text=await request.text();if(text.length>160000)throw new StoreError("Update too large.",413);return Response.json({project:await runCommand(JSON.parse(text))},{headers});}catch(e){return Response.json({error:e instanceof StoreError?e.message:e instanceof ZodError?e.issues[0]?.message:"Could not save. Please retry."},{status:e instanceof StoreError?e.status:400,headers});}}
