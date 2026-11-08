"use client";

import {FormEvent, useState} from "react";

export default function LoginPage(){
  const [error,setError]=useState("");
  const [busy,setBusy]=useState(false);
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setBusy(true); setError("");
    const form=new FormData(e.currentTarget);
    const res=await fetch("/api/login",{method:"POST",body:form});
    if(res.ok){window.location.href="/";return;}
    setError("The email or password is not correct."); setBusy(false);
  }
  return <main style={{minHeight:"100dvh",display:"grid",placeItems:"center",padding:24}}>
    <form onSubmit={submit} style={{width:"min(380px,100%)",background:"white",borderRadius:20,padding:28,boxShadow:"0 12px 45px #00000012"}}>
      <p className="eyebrow">Private workspace</p>
      <h1 style={{fontSize:32,margin:"8px 0 10px"}}>Sign in</h1>
      <p className="muted">Your scholarship tracker is only available after signing in.</p>
      <label style={{display:"block",marginTop:20,fontSize:12}}>Email<input name="email" type="email" autoComplete="username" required style={{display:"block",width:"100%",marginTop:7,padding:11,border:"1px solid #d7d7dc",borderRadius:8}}/></label>
      <label style={{display:"block",marginTop:14,fontSize:12}}>Password<input name="password" type="password" autoComplete="current-password" required style={{display:"block",width:"100%",marginTop:7,padding:11,border:"1px solid #d7d7dc",borderRadius:8}}/></label>
      {error&&<p style={{color:"#a33e24",fontSize:12,marginTop:12}}>{error}</p>}
      <button className="primary-button" disabled={busy} style={{width:"100%",marginTop:20}}>{busy?"Signing in…":"Sign in"}</button>
    </form>
  </main>;
}
