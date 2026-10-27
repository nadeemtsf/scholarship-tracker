import {env} from "cloudflare:workers";
import {projectFields,taskSchema,uid,type Project,type Activity} from "./model";
import {seedProjects} from "./seed";
function db(){if(!env.DB)throw new Error("Storage unavailable");return env.DB;}
export class StoreError extends Error{constructor(message:string,public status=400){super(message);}}
function unpack(row:any):Project{return {...JSON.parse(row.data),id:row.id,version:row.version,updatedAt:row.updated_at};}
export async function ensureSeed(){const d=db();if(await d.prepare("SELECT value FROM workspace_meta WHERE key = ?").bind("initialised").first())return;const now=new Date().toISOString();await d.batch([...seedProjects.map(({id,...p})=>d.prepare("INSERT OR IGNORE INTO scholarships (id,data,version,updated_at) VALUES (?,?,1,?)").bind(id,JSON.stringify(p),now)),d.prepare("INSERT OR IGNORE INTO workspace_meta (key,value) VALUES (?,?)").bind("initialised",now)]);}
export async function listProjects(){await ensureSeed();const r=await db().prepare("SELECT * FROM scholarships ORDER BY updated_at DESC").all();return r.results.map(unpack);}
export async function getProject(id:string){await ensureSeed();const r=await db().prepare("SELECT * FROM scholarships WHERE id = ?").bind(id).first();if(!r)throw new StoreError("Scholarship not found.",404);return unpack(r);}
export async function getActivity(){const r=await db().prepare("SELECT id,project_id AS projectId,message,source,created_at AS createdAt FROM activity ORDER BY created_at DESC LIMIT 60").all();return r.results as Activity[];}
export async function createProject(input:unknown,source="You"){await ensureSeed();const p=projectFields.parse(input),id=uid(),now=new Date().toISOString();await db().batch([db().prepare("INSERT INTO scholarships (id,data,version,updated_at) VALUES (?,?,1,?)").bind(id,JSON.stringify(p),now),db().prepare("INSERT INTO activity (id,project_id,message,source,created_at) VALUES (?,?,?,?,?)").bind(uid(),id,"Added scholarship",source,now)]);return {...p,id,version:1,updatedAt:now};}
export async function editProject(id:string,expectedVersion:number,patch:unknown,message="Updated scholarship",source="You"){
 const old=await getProject(id);if(old.version!==expectedVersion)throw new StoreError("Changed on another device. Refresh and try again.",409);
 const updated=projectFields.parse({...old,...projectFields.partial().parse(patch)}),now=new Date().toISOString();
 const r=await db().batch([db().prepare("UPDATE scholarships SET data = ?, version = version + 1, updated_at = ? WHERE id = ? AND version = ?").bind(JSON.stringify(updated),now,id,expectedVersion),db().prepare("INSERT INTO activity (id,project_id,message,source,created_at) SELECT ?,?,?,?,? WHERE changes() > 0").bind(uid(),id,message.slice(0,500),source,now)]);
 if(!r[0].meta.changes)throw new StoreError("Changed on another device. Refresh and try again.",409);return {...updated,id,version:expectedVersion+1,updatedAt:now};
}
export async function runCommand(c:any,source="You"){
 if(c.action==="create")return createProject(c.data,source);
 if(typeof c.id!=="string"||!Number.isInteger(c.expectedVersion))throw new StoreError("Scholarship ID and current version required.");
 if(c.action==="edit")return editProject(c.id,c.expectedVersion,c.patch,"Updated details",source);
 const p=await getProject(c.id);
 if(c.action==="add_task"){const t=taskSchema.parse({id:uid(),done:false,...c.task});return editProject(c.id,c.expectedVersion,{tasks:[...p.tasks,t]},"Added task: "+t.title,source);}
 if(c.action==="task"){const item=p.tasks.find(t=>t.id===c.taskId);if(!item)throw new StoreError("Task not found.",404);const tasks=c.remove?p.tasks.filter(t=>t.id!==c.taskId):p.tasks.map(t=>t.id===c.taskId?taskSchema.parse({...t,...c.patch,id:t.id}):t);const msg=c.remove?"Removed task: "+item.title:c.patch?.done!==undefined?(c.patch.done?"Completed: ":"Reopened: ")+item.title:"Edited task: "+item.title;return editProject(c.id,c.expectedVersion,{tasks},msg,source);}
 if(c.action==="note"){if(typeof c.note!=="string"||c.note.length>10000)throw new StoreError("Invalid note.");return editProject(c.id,c.expectedVersion,{notes:[p.notes,c.note].filter(Boolean).join("\n\n")},"Added note",source);}
 throw new StoreError("Unknown action.");
}
