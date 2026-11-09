import {z} from "zod";
export const statusOptions=["Preparing","Awaiting reply","Submitted","Accepted","Researching","On hold","Not selected","Deadline Missed"] as const;
export const taskSchema=z.object({id:z.string().max(100),title:z.string().trim().min(1).max(500),done:z.boolean().default(false),due:z.string().max(10).default(""),category:z.enum(["Task","Document","Contact"]).default("Task")});
export const projectFields=z.object({title:z.string().trim().min(1).max(180),institution:z.string().max(250).default(""),country:z.string().max(80).default(""),program:z.string().max(350).default(""),cycle:z.string().max(40).default("2027–2028"),status:z.enum(statusOptions).default("Preparing"),deadline:z.string().regex(/^$|^\d{4}-\d{2}-\d{2}$/).default(""),deadlineNote:z.string().max(800).default(""),nextStep:z.string().max(1000).default(""),notes:z.string().max(20000).default(""),pinned:z.boolean().default(false),archived:z.boolean().default(false),tasks:z.array(taskSchema).max(250).default([]),links:z.array(z.object({id:z.string().max(100),title:z.string().max(180),url:z.string().url().max(2000).refine(u=>/^https?:\/\//.test(u),"Use an http or https link")})).max(80).default([]),programs:z.array(z.object({id:z.string().max(100),name:z.string().max(350),level:z.string().max(30),status:z.string().max(100).default("Shortlisted")})).max(80).default([])});
export type Task=z.infer<typeof taskSchema>;
export type ProjectFields=z.infer<typeof projectFields>;
export type Project=ProjectFields&{id:string;version:number;updatedAt:string};
export type Activity={id:string;projectId:string;message:string;source:string;createdAt:string};
export const uid=()=>crypto.randomUUID();
