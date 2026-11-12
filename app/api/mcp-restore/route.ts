import {authorizeMcp,mcpUnauthorized} from "@/lib/mcp-auth";
import {restoreFreshWorkspace,StoreError} from "@/lib/store";

export async function POST(request:Request) {
  if(!await authorizeMcp(request))return mcpUnauthorized();
  try {
    const text=await request.text();
    if(text.length>2000000)throw new StoreError("Backup too large.",413);
    return Response.json(await restoreFreshWorkspace(JSON.parse(text)),{headers:{"Cache-Control":"no-store"}});
  } catch(e) {
    return Response.json({error:e instanceof StoreError?e.message:"Invalid backup."},{status:e instanceof StoreError?e.status:400});
  }
}
