import {NextResponse} from "next/server";

export async function POST(request:Request){
  const form=await request.formData();
  const email=String(form.get("email")||"");
  const password=String(form.get("password")||"");
  if(email!==process.env.TRACKER_EMAIL||password!==process.env.TRACKER_PASSWORD)
    return NextResponse.json({error:"Invalid credentials"},{status:401});
  const response=NextResponse.json({ok:true});
  response.cookies.set("tracker_session","1",{httpOnly:true,sameSite:"lax",secure:true,path:"/",maxAge:60*60*24*30});
  return response;
}
